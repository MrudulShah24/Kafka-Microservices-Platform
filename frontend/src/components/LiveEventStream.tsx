import { useEffect, useState } from "react";
import { API_BASE_URL } from "../config";

import { motion } from "framer-motion";

import {
  ShoppingCart,
  CreditCard,
  Package,
  Bell,
  XCircle,
} from "lucide-react";

type EventMessage = {
  type: string;
  message: string;
  timestamp: string;
  trackingId?: string;
};

function getEventIcon(type: string) {

  switch (type) {

    case "ORDER_CREATED":
      return (
        <ShoppingCart
          size={20}
          className="text-purple-400"
        />
      );

    case "PAYMENT_SUCCESS":
      return (
        <CreditCard
          size={20}
          className="text-green-400"
        />
      );

    case "INVENTORY_UPDATED":
      return (
        <Package
          size={20}
          className="text-blue-400"
        />
      );

    case "NOTIFICATION_SENT":
      return (
        <Bell
          size={20}
          className="text-yellow-400"
        />
      );

    case "PAYMENT_FAILED":
    case "INVENTORY_FAILED":
    case "NOTIFICATION_FAILED":
      return (
        <XCircle
          size={20}
          className="text-red-400"
        />
      );

    default:
      return (
        <ShoppingCart
          size={20}
          className="text-purple-400"
        />
      );
  }
}

function getBadgeStyle(type: string) {

  switch (type) {

    case "ORDER_CREATED":
      return "bg-purple-500/10 text-purple-400";

    case "PAYMENT_SUCCESS":
      return "bg-green-500/10 text-green-400";

    case "INVENTORY_UPDATED":
      return "bg-blue-500/10 text-blue-400";

    case "NOTIFICATION_SENT":
      return "bg-yellow-500/10 text-yellow-400";

    case "PAYMENT_FAILED":
    case "INVENTORY_FAILED":
    case "NOTIFICATION_FAILED":
      return "bg-red-500/10 text-red-400";

    default:
      return "bg-zinc-500/10 text-zinc-400";
  }
}

function getEventLabel(type: string) {

  switch (type) {

    case "ORDER_CREATED":
      return "Order Created";

    case "PAYMENT_SUCCESS":
      return "Payment Success";

    case "INVENTORY_UPDATED":
      return "Inventory Updated";

    case "NOTIFICATION_SENT":
      return "Notification Sent";

    case "PAYMENT_FAILED":
      return "Payment Failed";

    case "INVENTORY_FAILED":
      return "Inventory Failed";

    case "NOTIFICATION_FAILED":
      return "Notification Failed";

    default:
      return type;
  }

}

function LiveEventStream() {

  const [events, setEvents] =
    useState<EventMessage[]>([]);

  useEffect(() => {

    const eventSource =
      new EventSource(
        `${API_BASE_URL}/events/stream`
      );

    eventSource.onmessage = (
      event
    ) => {

      const incomingEvent =
        JSON.parse(event.data);

      const newEvent = {

        ...incomingEvent,

        timestamp:
          new Date().toLocaleTimeString(),

      };

      setEvents((previous) => [

        newEvent,

        ...previous,

      ].slice(0, 20));

    };

    eventSource.onerror = () => {

      console.error(
        "SSE Connection Error"
      );

    };

    return () => {

      eventSource.close();

    };

  }, []);

  return (

    <div className="rounded-3xl border border-zinc-800 bg-zinc-900 p-6">

      <div className="mb-6 flex items-center justify-between">

        <h2 className="text-2xl font-semibold text-white">
          Live Event Stream
        </h2>

        <div className="flex items-center gap-2 text-green-400">

          <div className="h-2 w-2 rounded-full bg-green-400 animate-pulse" />

          Live

        </div>

      </div>

      <div className="max-h-[500px] space-y-4 overflow-y-auto pr-2">

        {events.length === 0 && (

          <div
            className="
              rounded-2xl
              border
              border-zinc-800
              bg-black/40
              p-4
              text-zinc-500
            "
          >
            Waiting for events...
          </div>

        )}

        {events.map((event, index) => (

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

              {getEventIcon(event.type)}

              <div className="flex flex-col">
                <span className="text-white font-medium">
                  {event.message}
                </span>
                {event.trackingId && (
                  <span className="text-xs text-zinc-500 mt-1 font-mono">
                    Tracking ID: {event.trackingId}
                  </span>
                )}
              </div>

            </div>

            <div className="flex flex-col items-end gap-1">

              <span className="text-xs text-zinc-500">

                {event.timestamp}

              </span>

              <span
                className={`
                  rounded-full
                  px-3
                  py-1
                  text-xs
                  font-medium
                  ${getBadgeStyle(event.type)}
                `}
              >
                {getEventLabel(event.type)}
              </span>

            </div>

          </motion.div>

        ))}

      </div>

    </div>

  );
}

export default LiveEventStream;