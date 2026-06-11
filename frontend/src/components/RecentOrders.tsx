import TrackingIdDisplay from "./TrackingIdDisplay";

type Order = {
  orderId: number;
  productName: string;
  price: number;
  trackingId?: string;
};

type RecentOrdersProps = {
  orders: Order[];
};

function RecentOrders({
  orders,
}: RecentOrdersProps) {
  const recentOrders = orders.slice(-5);

  return (
    <div className="rounded-3xl border border-zinc-800 bg-zinc-900 p-6">

      <h2 className="mb-6 text-2xl font-semibold text-white">
        Recent Orders
      </h2>

      <div className="space-y-4">

        {recentOrders.map((order) => (
          <div
            key={order.orderId}
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
                #{order.orderId}
              </p>

              <p className="text-sm text-zinc-400 font-semibold mt-0.5">
                {order.productName}
              </p>

              {order.trackingId && (
                <div className="mt-1 flex items-center gap-1">
                  <span className="text-xs text-zinc-500">Tracking:</span>
                  <TrackingIdDisplay trackingId={order.trackingId} />
                </div>
              )}

            </div>

            <div className="text-right">

              <p className="text-white font-medium">
                ₹{order.price.toLocaleString()}
              </p>

              <span className="text-green-400 text-xs font-semibold">
                Completed
              </span>

            </div>

          </div>
        ))}

      </div>

    </div>
  );
}

export default RecentOrders;