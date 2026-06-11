import TrackingIdDisplay from "./TrackingIdDisplay";

type Inventory = {
  orderId: number;
  productName: string;
  price: number;
  inventoryStatus: string;
  trackingId?: string;
};

type RecentInventoryProps = {
  inventory: Inventory[];
};

function RecentInventory({
  inventory,
}: RecentInventoryProps) {
  const recentInventory = inventory.slice(-5);

  return (
    <div className="rounded-3xl border border-zinc-800 bg-zinc-900 p-6">

      <h2 className="mb-6 text-2xl font-semibold text-white">
        Recent Inventory Updates
      </h2>

      <div className="space-y-4">

        {recentInventory.map((item) => (
          <div
            key={item.orderId}
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
                #{item.orderId}
              </p>

              <p className="text-sm text-zinc-400 font-semibold mt-0.5">
                {item.productName}
              </p>

              {item.trackingId && (
                <div className="mt-1 flex items-center gap-1">
                  <span className="text-xs text-zinc-500">Tracking:</span>
                  <TrackingIdDisplay trackingId={item.trackingId} />
                </div>
              )}

            </div>

            <div className="text-right">

              <p className="text-white font-medium">
                ₹{item.price.toLocaleString()}
              </p>

              <span className="text-cyan-400 text-xs font-semibold">
                {item.inventoryStatus}
              </span>

            </div>

          </div>
        ))}

      </div>

    </div>
  );
}

export default RecentInventory;