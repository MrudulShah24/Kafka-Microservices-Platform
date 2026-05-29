import { motion } from "framer-motion";
import {
  ShoppingCart,
  Radio,
  CreditCard,
  Package,
  Bell,
} from "lucide-react";

function Pipeline() {
  return (
    <div className="rounded-3xl border border-zinc-800 bg-zinc-900 p-8">

      <div className="mb-10 flex items-center justify-between">

        <div>
          <h2 className="text-2xl font-semibold text-white">
            Event Flow Architecture
          </h2>

          <p className="mt-2 text-zinc-400">
            Real-time Kafka powered microservices pipeline
          </p>
        </div>

        <div
          className="
            rounded-full
            border
            border-green-500/30
            bg-green-500/10
            px-4
            py-2
            text-sm
            text-green-400
          "
        >
          System Active
        </div>

      </div>

      <div className="flex flex-col items-center">

        <motion.div
          animate={{
            y: [0, -5, 0],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
          }}
          className="
            flex
            w-64
            items-center
            justify-center
            gap-3
            rounded-3xl
            border
            border-purple-500/30
            bg-purple-500/10
            p-6
          "
        >
          <ShoppingCart size={24} />

          <span className="font-semibold text-white">
            Order Service
          </span>
        </motion.div>

        <div className="h-12 w-[2px] bg-gradient-to-b from-purple-500 to-cyan-500" />

        <motion.div
          animate={{
            scale: [1, 1.05, 1],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
          }}
          className="
            flex
            w-72
            items-center
            justify-center
            gap-3
            rounded-3xl
            border
            border-cyan-500/30
            bg-cyan-500/10
            p-8
          "
        >
          <Radio size={28} />

          <span className="text-xl font-bold text-white">
            Kafka Broker
          </span>
        </motion.div>

        <div className="mt-12 flex w-full justify-center">

          <div className="grid gap-6 md:grid-cols-3">

            <motion.div
              whileHover={{
                scale: 1.05,
              }}
              className="
                rounded-3xl
                border
                border-zinc-700
                bg-black
                p-6
              "
            >
              <CreditCard
                className="mb-4 text-green-400"
                size={28}
              />

              <h3 className="font-semibold text-white">
                Payment Service
              </h3>

              <p className="mt-2 text-sm text-zinc-400">
                Processes payment events
              </p>

              <div className="mt-4 text-green-400">
                ● Healthy
              </div>
            </motion.div>

            <motion.div
              whileHover={{
                scale: 1.05,
              }}
              className="
                rounded-3xl
                border
                border-zinc-700
                bg-black
                p-6
              "
            >
              <Package
                className="mb-4 text-cyan-400"
                size={28}
              />

              <h3 className="font-semibold text-white">
                Inventory Service
              </h3>

              <p className="mt-2 text-sm text-zinc-400">
                Updates stock information
              </p>

              <div className="mt-4 text-green-400">
                ● Healthy
              </div>
            </motion.div>

            <motion.div
              whileHover={{
                scale: 1.05,
              }}
              className="
                rounded-3xl
                border
                border-zinc-700
                bg-black
                p-6
              "
            >
              <Bell
                className="mb-4 text-yellow-400"
                size={28}
              />

              <h3 className="font-semibold text-white">
                Notification Service
              </h3>

              <p className="mt-2 text-sm text-zinc-400">
                Sends customer notifications
              </p>

              <div className="mt-4 text-green-400">
                ● Healthy
              </div>
            </motion.div>

          </div>

        </div>

      </div>

    </div>
  );
}

export default Pipeline;