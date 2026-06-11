import TrackingIdDisplay from "./TrackingIdDisplay";

type Payment = {
  orderId: number;
  productName: string;
  price: number;
  paymentStatus: string;
  trackingId?: string;
};

type RecentPaymentsProps = {
  payments: Payment[];
};

function RecentPayments({
  payments,
}: RecentPaymentsProps) {
  const recentPayments = payments.slice(-5);

  return (
    <div className="rounded-3xl border border-zinc-800 bg-zinc-900 p-6">

      <h2 className="mb-6 text-2xl font-semibold text-white">
        Recent Payments
      </h2>

      <div className="space-y-4">

        {recentPayments.map((payment) => (
          <div
            key={payment.orderId}
            className="
              flex
              items-center
              justify-between
              rounded-xl
              border
              border-zinc-800
              bg-black/20
              p-4
            "
          >
            <div>

              <p className="font-medium text-white">
                #{payment.orderId}
              </p>

              <p className="text-sm text-zinc-400 font-semibold mt-0.5">
                {payment.productName}
              </p>

              {payment.trackingId && (
                <div className="mt-1 flex items-center gap-1">
                  <span className="text-xs text-zinc-500">Tracking:</span>
                  <TrackingIdDisplay trackingId={payment.trackingId} />
                </div>
              )}

            </div>

            <div className="text-right">

              <p className="text-white font-medium">
                ₹{payment.price.toLocaleString()}
              </p>

              <span className="text-green-400 text-xs font-semibold">
                {payment.paymentStatus}
              </span>

            </div>

          </div>
        ))}

      </div>

    </div>
  );
}

export default RecentPayments;