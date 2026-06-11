import { motion } from "framer-motion";
import {
  CheckCircle2,
  ShoppingCart,
  CreditCard,
  Package,
  Bell,
  Clock,
} from "lucide-react";

type Order = {
  orderId: number;
  productName: string;
  price: number;
  trackingId?: string;
};

type OrderTimelineProps = {
  orders: Order[];
  payments: any[];
  inventory: any[];
  notifications: any[];
};

function OrderTimeline({
  orders,
  payments,
  inventory,
  notifications,
}: OrderTimelineProps) {
  // Get latest 3 orders that have a trackingId, in reverse order (newest first)
  const recentOrders = orders
    .filter((o) => o.trackingId)
    .slice(-3)
    .reverse();

  return (
    <div className="rounded-3xl border border-zinc-800 bg-zinc-900 p-6">
      <div className="mb-8 flex items-center justify-between">
        <h2 className="text-2xl font-semibold text-white">
          Order Tracking Timelines
        </h2>
        <div className="rounded-full bg-green-500/10 px-3 py-1 text-sm text-green-400">
          Live Feed
        </div>
      </div>

      <div className="space-y-8 overflow-y-auto max-h-[500px] pr-2">
        {recentOrders.length === 0 ? (
          <div className="rounded-2xl border border-zinc-800 bg-black/40 p-4 text-zinc-500">
            No tracked orders yet. Place an order to see its timeline.
          </div>
        ) : (
          recentOrders.map((order) => {
            const hasPayment = payments.some(
              (p) => p.orderId === order.orderId && p.paymentStatus === "SUCCESS"
            );
            const hasInventory = inventory.some(
              (i) => i.orderId === order.orderId && i.inventoryStatus === "UPDATED"
            );
            const hasNotification = notifications.some(
              (n) => n.orderId === order.orderId && n.notificationStatus === "SENT"
            );

            const steps = [
              {
                icon: ShoppingCart,
                title: "Order Created",
                description: `Order successfully placed for ${order.productName}`,
                completed: true,
              },
              {
                icon: CreditCard,
                title: "Payment Processed",
                description: hasPayment
                  ? "Payment received and processed successfully"
                  : "Payment transaction pending or failed",
                completed: hasPayment,
              },
              {
                icon: Package,
                title: "Inventory Updated",
                description: hasInventory
                  ? "Stock reserved and inventory updated"
                  : "Waiting to verify and reserve stock",
                completed: hasInventory,
              },
              {
                icon: Bell,
                title: "Notification Sent",
                description: hasNotification
                  ? "Customer notification dispatched successfully"
                  : "Notification delivery pending",
                completed: hasNotification,
              },
            ];

            return (
              <div
                key={order.trackingId}
                className="rounded-2xl border border-zinc-800 bg-black/20 p-5 space-y-4"
              >
                <div className="flex items-center justify-between border-b border-zinc-800/80 pb-3">
                  <div>
                    <h3 className="text-sm font-semibold text-white">
                      {order.productName}
                    </h3>
                    <p className="text-xs font-mono text-purple-400 mt-1">
                      ID: {order.trackingId}
                    </p>
                  </div>
                  <span className="text-xs text-zinc-500 font-medium bg-zinc-850 px-2.5 py-1 rounded-md">
                    #{order.orderId}
                  </span>
                </div>

                <div className="relative pl-8 space-y-6">
                  <div className="absolute left-[13px] top-2 bottom-2 w-[2px] bg-zinc-850" />

                  {steps.map((step, stepIdx) => {
                    const StepIcon = step.icon;
                    return (
                      <motion.div
                        key={stepIdx}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: stepIdx * 0.05 }}
                        className="relative flex gap-4"
                      >
                        <div
                          className={`
                            absolute -left-8
                            z-10
                            flex
                            h-7
                            w-7
                            items-center
                            justify-center
                            rounded-full
                            border
                            ${
                              step.completed
                                ? "border-green-500/30 bg-green-500/10 text-green-400"
                                : "border-zinc-700 bg-zinc-900 text-zinc-500"
                            }
                          `}
                        >
                          <StepIcon size={14} />
                        </div>

                        <div className="flex-1">
                          <div className="flex items-center justify-between">
                            <h4
                              className={`text-sm font-medium ${
                                step.completed ? "text-white" : "text-zinc-500"
                              }`}
                            >
                              {step.title}
                            </h4>
                            {step.completed ? (
                              <CheckCircle2 size={14} className="text-green-400" />
                            ) : (
                              <Clock size={14} className="text-zinc-500 animate-pulse" />
                            )}
                          </div>
                          <p className="text-xs text-zinc-400 mt-1">
                            {step.description}
                          </p>
                        </div>
                      </motion.div>
                    );
                  })}
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}

export default OrderTimeline;