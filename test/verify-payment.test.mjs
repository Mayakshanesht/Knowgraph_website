import { afterEach, beforeEach, test } from 'node:test';
import assert from 'node:assert/strict';
import { createHmac } from 'node:crypto';
import { readFile } from 'node:fs/promises';
import ts from 'typescript';

// Execute the production handler without a server or additional test dependencies.
const source = await readFile(new URL('../api/verify-payment.ts', import.meta.url), 'utf8');
const { outputText } = ts.transpileModule(source, {
  compilerOptions: { target: ts.ScriptTarget.ES2020, module: ts.ModuleKind.ESNext },
});
const { default: handler } = await import(`data:text/javascript;base64,${Buffer.from(outputText).toString('base64')}`);

const envKeys = [
  'RAZORPAY_KEY_ID', 'RAZORPAY_KEY_SECRET', 'RAZORPAY_API_KEY', 'RAZORPAY_API_SECRET',
  'KG_PAYMENT_SECRET', 'KG_API_URL', 'LMS_API_URL', 'RAZORPAY_WEBHOOK_SECRET',
];
const originalEnv = new Map(envKeys.map(key => [key, process.env[key]]));
const originalFetch = globalThis.fetch;
const orderId = 'order_test123';
const paymentId = 'pay_test123';
const gatewaySecret = 'test-gateway-secret';
const bridgeSecret = 'test-bridge-secret';

beforeEach(() => {
  for (const key of envKeys) delete process.env[key];
  process.env.RAZORPAY_KEY_ID = 'test-key-id';
  process.env.RAZORPAY_KEY_SECRET = gatewaySecret;
  process.env.KG_PAYMENT_SECRET = bridgeSecret;
  process.env.KG_API_URL = 'https://worker.example.test';
  process.env.LMS_API_URL = 'https://lms.example.test';
  // A missing mock must never result in a live gateway call.
  globalThis.fetch = async () => { throw new Error('Unexpected fetch'); };
});

afterEach(() => {
  globalThis.fetch = originalFetch;
  for (const [key, value] of originalEnv) {
    if (value === undefined) delete process.env[key];
    else process.env[key] = value;
  }
});

function mockGateway(options = {}) {
  const calls = [];
  const order = {
    id: orderId, amount: 249900, currency: 'INR', status: 'paid',
    notes: { uid: 'user-test123', courseId: 'ai-bootcamp' },
    ...options.order,
  };
  const payment = {
    id: paymentId, order_id: orderId, amount: 249900, currency: 'INR',
    status: 'captured', captured: true, amount_refunded: 0, refund_status: null,
    email: 'student@example.test', ...options.payment,
  };
  globalThis.fetch = async (url, init) => {
    calls.push({ url: String(url), init });
    if (String(url) === `https://api.razorpay.com/v1/orders/${orderId}`) {
      if (options.orderThrows) throw new Error('Gateway unavailable');
      return Response.json(order, { status: options.orderStatus ?? 200 });
    }
    if (String(url) === `https://api.razorpay.com/v1/payments/${paymentId}`) {
      if (options.paymentThrows) throw new Error('Gateway unavailable');
      if (options.invalidPaymentJson) return new Response('not json');
      return Response.json(payment, { status: options.paymentStatus ?? 200 });
    }
    if (String(url) === 'https://worker.example.test/v1/webhooks/payment' ||
        String(url) === 'https://lms.example.test/api/payment-grant') {
      if (options.bridgeThrows) throw new Error('Unlock temporarily unavailable');
      return Response.json({ ok: true });
    }
    throw new Error(`Unexpected mocked URL: ${String(url)}`);
  };
  return calls;
}

function callbackBody(overrides = {}) {
  return {
    razorpay_order_id: orderId, razorpay_payment_id: paymentId,
    razorpay_signature: createHmac('sha256', gatewaySecret)
      .update(`${orderId}|${paymentId}`).digest('hex'),
    ...overrides,
  };
}

async function invoke(body = callbackBody()) {
  const result = { status: 200, body: undefined };
  const response = {
    status(code) { result.status = code; return response; },
    json(value) { result.body = value; return response; },
    end() { return response; },
  };
  await handler({ method: 'POST', body }, response);
  return result;
}

function assertNoUnlock(calls) {
  assert.equal(calls.filter(call => call.init?.method === 'POST').length, 0);
}

test('captured payment verifies and signs exact verified uid/email grants', async () => {
  const calls = mockGateway();
  const result = await invoke();
  assert.deepEqual(result, { status: 200, body: { verified: true, forwarded: true } });
  assert.equal(calls.length, 4);
  for (const call of calls.slice(0, 2)) {
    assert.equal(call.init.headers.Authorization,
      `Basic ${Buffer.from(`test-key-id:${gatewaySecret}`).toString('base64')}`);
  }
  const worker = calls.find(call => call.url.includes('/v1/webhooks/payment'));
  assert.deepEqual(JSON.parse(worker.init.body), {
    type: 'course', userId: 'user-test123', courseId: 'ai-bootcamp',
    amountCents: 249900, email: 'student@example.test',
  });
  const lms = calls.find(call => call.url.includes('/api/payment-grant'));
  assert.deepEqual(JSON.parse(lms.init.body), {
    email: 'student@example.test', courseSlug: 'ai-bootcamp', amountCents: 249900,
    paymentId,
  });
  for (const call of [worker, lms]) {
    assert.equal(call.init.headers['X-Signature'],
      createHmac('sha256', bridgeSecret).update(call.init.body).digest('hex'));
  }
});

test('guest course checkout retains the payment-email LMS bridge', async () => {
  const calls = mockGateway({ order: { notes: { courseId: 'ai-bootcamp' } } });
  const result = await invoke();
  assert.deepEqual(result.body, { verified: true, forwarded: false });
  assert.equal(calls.length, 3);
  assert.equal(calls[2].url, 'https://lms.example.test/api/payment-grant');
});

test('actual capture is verified even without an instant-unlock secret', async () => {
  delete process.env.KG_PAYMENT_SECRET;
  const calls = mockGateway();
  assert.deepEqual(await invoke(), {
    status: 200, body: { verified: true, forwarded: false },
  });
  assert.equal(calls.length, 2);
});

test('signature mismatch fails before any gateway or grant request', async () => {
  const calls = mockGateway();
  const result = await invoke(callbackBody({ razorpay_signature: 'invalid' }));
  assert.equal(result.status, 400);
  assert.equal(result.body.verified, false);
  assert.equal(calls.length, 0);
});

for (const [name, payment] of [
  ['authorization without capture', { status: 'authorized', captured: false }],
  ['captured status without captured flag', { captured: false }],
  ['noncaptured status with captured flag', { status: 'authorized' }],
]) {
  test(`${name} never verifies or grants`, async () => {
    const calls = mockGateway({ payment });
    const result = await invoke();
    assert.equal(result.status, 409);
    assert.equal(result.body.verified, false);
    assert.match(result.body.error, /not been captured/);
    assertNoUnlock(calls);
  });
}

test('uncaptured payment still fails when instant unlocking is disabled', async () => {
  delete process.env.KG_PAYMENT_SECRET;
  const calls = mockGateway({ payment: { status: 'authorized', captured: false } });
  const result = await invoke();
  assert.equal(result.status, 409);
  assert.equal(result.body.verified, false);
  assert.equal(calls.length, 2);
});

for (const [name, options] of [
  ['different fetched order id', { order: { id: 'order_other' } }],
  ['different fetched payment id', { payment: { id: 'pay_other' } }],
  ['payment belonging to another order', { payment: { order_id: 'order_other' } }],
  ['amount mismatch', { payment: { amount: 249899 } }],
  ['currency mismatch', { payment: { currency: 'EUR' } }],
  ['empty currency', { order: { currency: '' }, payment: { currency: '' } }],
  ['zero amount', { order: { amount: 0 }, payment: { amount: 0 } }],
  ['fractional amount', { order: { amount: 12.5 }, payment: { amount: 12.5 } }],
  ['string amount', { order: { amount: '249900' }, payment: { amount: '249900' } }],
  ['partial refund', { payment: { amount_refunded: 100, refund_status: 'partial' } }],
  ['refund status despite inconsistent zero refund amount', { payment: { refund_status: 'full' } }],
  ['missing refund evidence', { payment: { amount_refunded: undefined } }],
]) {
  test(`${name} fails without any signed unlock`, async () => {
    const calls = mockGateway(options);
    const result = await invoke();
    assert.equal(result.status, 400);
    assert.equal(result.body.verified, false);
    assertNoUnlock(calls);
  });
}

for (const [name, options] of [
  ['order lookup failure', { orderStatus: 500 }],
  ['payment lookup failure', { paymentStatus: 404 }],
  ['order network failure', { orderThrows: true }],
  ['payment network failure', { paymentThrows: true }],
  ['malformed gateway response', { invalidPaymentJson: true }],
]) {
  test(`${name} cannot report a verified payment`, async () => {
    const calls = mockGateway(options);
    const result = await invoke();
    assert.equal(result.status, 502);
    assert.equal(result.body.verified, false);
    assert.match(result.body.error, /retry verification/i);
    assertNoUnlock(calls);
  });
}

test('captured payment stays verified if unlock bridge fails; webhook can retry', async () => {
  const calls = mockGateway({ bridgeThrows: true });
  assert.deepEqual(await invoke(), {
    status: 200, body: { verified: true, forwarded: false },
  });
  assert.equal(calls.length, 4);
});
