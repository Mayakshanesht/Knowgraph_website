/**
 * Razorpay Standard Web Checkout (on-site modal).
 *
 * openCourseCheckout() creates an order server-side (/api/create-order owns
 * the price), opens the modal, and verifies the signature server-side
 * (/api/verify-payment) before reporting success. The key secret never
 * reaches this file — the public key_id arrives with the order.
 */

declare global {
  interface Window {
    Razorpay?: new (options: Record<string, unknown>) => {
      open: () => void;
      on: (event: string, cb: (resp: unknown) => void) => void;
    };
  }
}

const CHECKOUT_JS = 'https://checkout.razorpay.com/v1/checkout.js';

function loadCheckoutScript(): Promise<void> {
  return new Promise((resolve, reject) => {
    if (window.Razorpay) return resolve();
    const existing = document.querySelector(`script[src="${CHECKOUT_JS}"]`);
    if (existing) {
      existing.addEventListener('load', () => resolve());
      existing.addEventListener('error', () => reject(new Error('checkout.js failed to load')));
      return;
    }
    const s = document.createElement('script');
    s.src = CHECKOUT_JS;
    s.onload = () => resolve();
    s.onerror = () => reject(new Error('checkout.js failed to load'));
    document.body.appendChild(s);
  });
}

export interface CheckoutResult {
  status: 'paid' | 'cancelled' | 'failed';
  error?: string;
}

export async function openCourseCheckout(opts: {
  courseId: string;
  uid: string;
  title?: string;
}): Promise<CheckoutResult> {
  await loadCheckoutScript();

  const orderRes = await fetch('/api/create-order', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      courseId: opts.courseId,
      notes: { uid: opts.uid, courseId: opts.courseId },
    }),
  });
  const order = await orderRes.json();
  if (!orderRes.ok || !order.order_id) {
    throw new Error(order?.error?.toString?.() ?? 'could not create order');
  }

  return new Promise((resolve) => {
    const rzp = new window.Razorpay!({
      key: order.key_id ?? import.meta.env.VITE_RAZORPAY_KEY_ID,
      order_id: order.order_id,
      amount: order.amount,
      currency: order.currency,
      name: 'KnowGraph',
      description: opts.title ?? `Course: ${opts.courseId}`,
      notes: { uid: opts.uid, courseId: opts.courseId },
      theme: { color: '#6d28d9' },
      modal: { ondismiss: () => resolve({ status: 'cancelled' }) },
      handler: async (resp: {
        razorpay_payment_id: string;
        razorpay_order_id: string;
        razorpay_signature: string;
      }) => {
        try {
          const v = await fetch('/api/verify-payment', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(resp),
          });
          const out = await v.json();
          resolve(
            v.ok && out.verified
              ? { status: 'paid' }
              : { status: 'failed', error: 'payment could not be verified' },
          );
        } catch {
          resolve({ status: 'failed', error: 'verification request failed' });
        }
      },
    });
    rzp.on('payment.failed', (resp: unknown) => {
      const desc = (resp as { error?: { description?: string } })?.error?.description;
      resolve({ status: 'failed', error: desc ?? 'payment failed' });
    });
    rzp.open();
  });
}
