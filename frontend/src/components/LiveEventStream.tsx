import { motion } from "framer-motion";
import {
  ShoppingCart,
  Radio,
  CreditCard,
  Package,
  Bell,
} from "lucide-react";

const events = [
  {
    icon: ShoppingCart,
    title: "Order #95787 Created",
    color: "text-purple-400",
  },
  {
    icon: Radio,
    title: "Published To Kafka",
    color: "text-cyan-400",
  },
  {
    icon: CreditCard,
    title: "Payment Processed",
    color: "text-green-400",
  },
  {
    icon: Package,
    title: "Inventory Updated",
    color: "text-blue-400",
  },
  {
    icon: Bell,
    title: "Notification Sent",
    color: "text-yellow-400",
  },
];

function LiveEventStream() {
  return (
    <div className="rounded-3xl border border-zinc-800 bg-zinc-900 p-6 overflow-hidden">

      <div className="mb-6 flex items-center justify-between">

        <h2 className="text-2xl font-semibold text-white">
          Live Event Stream
        </h2>

        <div className="flex items-center gap-2 text-green-400">

          <div className="h-2 w-2 rounded-full bg-green-400 animate-pulse" />

          Live

        </div>

      </div>

      <div className="space-y-4">

        {events.map((event, index) => {
          const Icon = event.icon;

          return (
            <motion.div
              key={index}
              initial={{
                opacity: 0,
                x: -30,
              }}
              animate={{
                opacity: 1,
                x: 0,
              }}
              transition={{
                delay: index * 0.15,
              }}
              className="
                flex
                items-center
                justify-between
                rounded-2xl
                border
                border-zinc-800
                bg-black/40
                p-4
              "
            >
              <div className="flex items-center gap-3">

                <Icon
                  size={20}
                  className={event.color}
                />

                <span className="text-white">
                  {event.title}
                </span>

              </div>

              <span className="text-sm text-zinc-500">
                just now
              </span>

            </motion.div>
          );
        })}

      </div>

    </div>
  );
}

export default LiveEventStream;