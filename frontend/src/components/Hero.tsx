import { motion } from "framer-motion";
import {
  Activity,
  Database,
  Cpu,
  ArrowRight
} from "lucide-react";

function Hero() {
  return (
    <motion.section
      initial={{
        opacity: 0,
        y: 30,
      }}
      animate={{
        opacity: 1,
        y: 0,
      }}
      transition={{
        duration: 0.8,
      }}
      className="
        relative
        overflow-hidden
        rounded-[32px]
        border
        border-zinc-800
        bg-zinc-900/60
        p-10
        backdrop-blur-xl
      "
    >
      <div className="absolute -top-32 right-0 h-96 w-96 rounded-full bg-purple-600/20 blur-[140px]" />

      <div className="absolute bottom-0 left-0 h-96 w-96 rounded-full bg-cyan-500/20 blur-[140px]" />

      <div className="relative z-10">

        <div
          className="
            inline-flex
            items-center
            gap-2
            rounded-full
            border
            border-purple-500/30
            bg-purple-500/10
            px-4
            py-2
            text-sm
            text-purple-300
          "
        >
          <Activity size={16} />
          Real-Time Event Processing Platform
        </div>

        <h1
          className="
            mt-8
            max-w-5xl
            text-6xl
            font-black
            leading-tight
            text-white
            lg:text-7xl
          "
        >
          Monitor &
          Orchestrate

          <span
            className="
              block
              bg-gradient-to-r
              from-purple-400
              via-pink-400
              to-cyan-400
              bg-clip-text
              text-transparent
            "
          >
            Kafka Powered
          </span>

          Microservices
        </h1>

        <p
          className="
            mt-8
            max-w-3xl
            text-lg
            leading-relaxed
            text-zinc-400
          "
        >
          Enterprise-grade event driven architecture
          built using Spring Boot, Apache Kafka,
          PostgreSQL and Docker. Track orders,
          monitor services and visualize distributed
          workflows in real time.
        </p>

        <div className="mt-10 flex flex-wrap gap-4">

          <button
            className="
              flex
              items-center
              gap-2
              rounded-2xl
              bg-gradient-to-r
              from-purple-600
              to-cyan-500
              px-6
              py-4
              font-semibold
              text-white
            "
          >
            Create Order
            <ArrowRight size={18} />
          </button>

          <button
            className="
              rounded-2xl
              border
              border-zinc-700
              px-6
              py-4
              text-white
            "
          >
            View Architecture
          </button>

        </div>

        <div
          className="
            mt-12
            grid
            gap-4
            md:grid-cols-3
          "
        >

          <div
            className="
              rounded-2xl
              border
              border-zinc-800
              bg-black/30
              p-5
            "
          >
            <Cpu
              className="mb-3 text-purple-400"
              size={22}
            />

            <p className="text-sm text-zinc-500">
              Services
            </p>

            <h3 className="mt-2 text-3xl font-bold text-white">
              4
            </h3>

          </div>

          <div
            className="
              rounded-2xl
              border
              border-zinc-800
              bg-black/30
              p-5
            "
          >
            <Activity
              className="mb-3 text-cyan-400"
              size={22}
            />

            <p className="text-sm text-zinc-500">
              Event Broker
            </p>

            <h3 className="mt-2 text-3xl font-bold text-white">
              Kafka
            </h3>

          </div>

          <div
            className="
              rounded-2xl
              border
              border-zinc-800
              bg-black/30
              p-5
            "
          >
            <Database
              className="mb-3 text-green-400"
              size={22}
            />

            <p className="text-sm text-zinc-500">
              Database
            </p>

            <h3 className="mt-2 text-3xl font-bold text-white">
              PostgreSQL
            </h3>

          </div>

        </div>

      </div>
    </motion.section>
  );
}

export default Hero;