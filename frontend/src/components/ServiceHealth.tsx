import { useEffect, useState } from "react";
import { motion } from "framer-motion";

import {
  Database,
  Radio,
  ShoppingCart,
  CreditCard,
  Package,
  Bell,
} from "lucide-react";

import {
  checkServiceHealth,
} from "../services/healthService";

function ServiceHealth() {

  const [status, setStatus] = useState({
    order: false,
    payment: false,
    inventory: false,
    notification: false,
  });

  const fetchHealth = async () => {

    const [
      order,
      payment,
      inventory,
      notification,
    ] = await Promise.all([
      checkServiceHealth(
        "http://localhost:8080/orders"
      ),
      checkServiceHealth(
        "http://localhost:8081/payments"
      ),
      checkServiceHealth(
        "http://localhost:8082/inventory"
      ),
      checkServiceHealth(
        "http://localhost:8083/notifications"
      ),
    ]);

    setStatus({
      order,
      payment,
      inventory,
      notification,
    });

  };

  useEffect(() => {

    fetchHealth();

    const interval =
      setInterval(
        fetchHealth,
        5000
      );

    return () =>
      clearInterval(interval);

  }, []);

  const services = [
    {
      name: "Kafka Broker",
      icon: Radio,
      color: "text-cyan-400",
      healthy: true,
    },
    {
      name: "PostgreSQL",
      icon: Database,
      color: "text-green-400",
      healthy: true,
    },
    {
      name: "Order Service",
      icon: ShoppingCart,
      color: "text-purple-400",
      healthy: status.order,
    },
    {
      name: "Payment Service",
      icon: CreditCard,
      color: "text-emerald-400",
      healthy: status.payment,
    },
    {
      name: "Inventory Service",
      icon: Package,
      color: "text-cyan-400",
      healthy: status.inventory,
    },
    {
      name: "Notification Service",
      icon: Bell,
      color: "text-yellow-400",
      healthy: status.notification,
    },
  ];

  const allHealthy =
    services.every(
      (service) => service.healthy
    );

  return (
    <div className="rounded-3xl border border-zinc-800 bg-zinc-900 p-6">

      <div className="mb-8 flex items-center justify-between">

        <h2 className="text-2xl font-semibold text-white">
          Infrastructure Monitor
        </h2>

        <div
          className={`
            rounded-full
            px-3
            py-1
            text-sm
            border
            ${
              allHealthy
                ? "border-green-500/30 bg-green-500/10 text-green-400"
                : "border-red-500/30 bg-red-500/10 text-red-400"
            }
          `}
        >
          {allHealthy
            ? "All Systems Operational"
            : "System Issue Detected"}
        </div>

      </div>

      <div className="space-y-4">

        {services.map((service) => {

          const Icon =
            service.icon;

          return (
            <motion.div
              key={service.name}
              whileHover={{
                scale: 1.02,
              }}
              className="
                rounded-2xl
                border
                border-zinc-800
                bg-black/40
                p-4
              "
            >
              <div className="flex items-center justify-between">

                <div className="flex items-center gap-3">

                  <div className="
                    flex
                    h-10
                    w-10
                    items-center
                    justify-center
                    rounded-xl
                    bg-zinc-900
                  ">
                    <Icon
                      size={20}
                      className={
                        service.color
                      }
                    />
                  </div>

                  <p className="font-medium text-white">
                    {service.name}
                  </p>

                </div>

                <div className="flex items-center gap-2">

                  <div
                    className={`
                      h-3
                      w-3
                      rounded-full
                      ${
                        service.healthy
                          ? "bg-green-500"
                          : "bg-red-500"
                      }
                    `}
                  />

                  <span
                    className={
                      service.healthy
                        ? "text-green-400"
                        : "text-red-400"
                    }
                  >
                    {service.healthy
                      ? "UP"
                      : "DOWN"}
                  </span>

                </div>

              </div>
            </motion.div>
          );
        })}

      </div>

    </div>
  );
}

export default ServiceHealth;