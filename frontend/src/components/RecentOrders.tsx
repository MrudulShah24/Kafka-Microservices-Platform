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
              p-4
            "
          >
            <div>

              <p className="font-medium text-white">
                #{order.orderId}
              </p>

              <p className="text-sm text-zinc-400">
                {order.productName}
              </p>

              {order.trackingId && (
                <p className="text-xs text-zinc-500 font-mono mt-1">
                  Tracking: {order.trackingId.substring(0, 8)}...
                </p>
              )}

            </div>

            <div className="text-right">

              <p className="text-white">
                ₹{order.price.toLocaleString()}
              </p>

              <span className="text-green-400">
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