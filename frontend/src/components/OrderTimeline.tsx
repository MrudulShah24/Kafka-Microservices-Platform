import { motion } from "framer-motion";
import {
  CheckCircle2,
  ShoppingCart,
  Radio,
  CreditCard,
  Package,
  Bell,
} from "lucide-react";

function OrderTimeline() {
  const events = [
    {
      icon: ShoppingCart,
      title: "Order Created",
      description: "Customer order received by Order Service",
      time: "11:52:41",
    },
    {
      icon: Radio,
      title: "Kafka Event Published",
      description: "Order event pushed to Kafka topic",
      time: "11:52:42",
    },
    {
      icon: CreditCard,
      title: "Payment Processed",
      description: "Payment Service completed transaction",
      time: "11:52:42",
    },
    {
      icon: Package,
      title: "Inventory Updated",
      description: "Inventory reserved successfully",
      time: "11:52:43",
    },
    {
      icon: Bell,
      title: "Notification Sent",
      description: "Customer notification dispatched",
      time: "11:52:43",
    },
  ];

  return (
    <div className="rounded-3xl border border-zinc-800 bg-zinc-900 p-6">

      <div className="mb-8 flex items-center justify-between">

        <h2 className="text-2xl font-semibold text-white">
          Event Activity Feed
        </h2>

        <div className="rounded-full bg-green-500/10 px-3 py-1 text-sm text-green-400">
          Live
        </div>

      </div>

      <div className="relative">

        <div className="absolute left-[19px] top-0 h-full w-[2px] bg-zinc-800" />

        <div className="space-y-6">

          {events.map((event, index) => {
            const Icon = event.icon;

            return (
              <motion.div
                key={index}
                initial={{
                  opacity: 0,
                  x: -20,
                }}
                animate={{
                  opacity: 1,
                  x: 0,
                }}
                transition={{
                  delay: index * 0.1,
                }}
                className="relative flex gap-4"
              >

                <div
                  className="
                    z-10
                    flex
                    h-10
                    w-10
                    items-center
                    justify-center
                    rounded-full
                    border
                    border-green-500/30
                    bg-green-500/10
                  "
                >
                  <Icon
                    size={18}
                    className="text-green-400"
                  />
                </div>

                <div
                  className="
                    flex-1
                    rounded-2xl
                    border
                    border-zinc-800
                    bg-black/40
                    p-4
                  "
                >

                  <div className="flex items-center justify-between">

                    <h3 className="font-semibold text-white">
                      {event.title}
                    </h3>

                    <span className="text-xs text-zinc-500">
                      {event.time}
                    </span>

                  </div>

                  <p className="mt-2 text-sm text-zinc-400">
                    {event.description}
                  </p>

                  <div className="mt-3 flex items-center gap-2">

                    <CheckCircle2
                      size={16}
                      className="text-green-400"
                    />

                    <span className="text-sm text-green-400">
                      Completed Successfully
                    </span>

                  </div>

                </div>

              </motion.div>
            );
          })}

        </div>

      </div>

    </div>
  );
}

export default OrderTimeline;