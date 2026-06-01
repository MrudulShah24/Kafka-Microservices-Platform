import { useEffect, useState } from "react";

import { motion } from "framer-motion";
import {
  ShoppingCart,
} from "lucide-react";

type EventMessage = {
  type: string;
  message: string;
};

function LiveEventStream() {

  const [events, setEvents] =
    useState<EventMessage[]>([]);

  useEffect(() => {

    const eventSource =
      new EventSource(
        "http://localhost:8080/events/stream"
      );

    eventSource.onmessage = (
      event
    ) => {

      const newEvent =
        JSON.parse(event.data);

      setEvents((previous) => [

        newEvent,

        ...previous,

      ].slice(0, 10));

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

      <div className="max-h-[400px] space-y-4 overflow-y-auto pr-2">

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

              <ShoppingCart
                size={20}
                className="text-purple-400"
              />

              <span className="text-white">

                {event.message}

              </span>

            </div>

            <span
              className="
                rounded-full
                bg-green-500/10
                px-3
                py-1
                text-xs
                font-medium
                text-green-400
              "
            >
              LIVE
            </span>

          </motion.div>

        ))}

      </div>

    </div>
  );
}

export default LiveEventStream;