/** Landing after Razorpay checkout: reassure, then send them back to the app.
 *  Activation is webhook-driven (source of truth) and lands within a minute. */
import { useSearchParams } from "react-router-dom";

const PaymentSuccess = () => {
  const [params] = useSearchParams();
  const kind = params.get("kind") ?? "plan";
  const what =
    kind === "course" ? "Your course" : kind === "freeze" ? "Your streak freeze" : "Your plan";
  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-6">
      <div className="max-w-md text-center space-y-5">
        <div className="text-5xl">🎉</div>
        <h1 className="text-3xl font-bold">Payment received</h1>
        <p className="text-muted-foreground leading-relaxed">
          {what} unlocks automatically within a minute — our payment
          confirmation runs server-side, so you don't need to do anything.
          Head back to the Knowgraph app and pull to refresh.
        </p>
        <a
          href="knowgraph://payment-success"
          className="inline-block rounded-xl bg-primary px-6 py-3 font-semibold text-primary-foreground"
        >
          Open the app
        </a>
        <p className="text-xs text-muted-foreground">
          Didn't unlock after a few minutes? Email mayurwaghchoure1995@gmail.com
          with your payment reference.
        </p>
      </div>
    </div>
  );
};
export default PaymentSuccess;
