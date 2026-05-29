import { motion } from "framer-motion";
import {
  ShoppingCart,
  CreditCard,
  Package,
  Bell,
  TrendingUp,
} from "lucide-react";

type MetricCardProps = {
  title: string;
  value: string;
};

function MetricCard({
  title,
  value,
}: MetricCardProps) {

  const getData = () => {

    switch (title) {

      case "Orders":
        return {
          icon: <ShoppingCart size={22} />,
          subtitle: "Active Orders",
          color: "text-purple-400",
        };

      case "Payments":
        return {
          icon: <CreditCard size={22} />,
          subtitle: "Successful Payments",
          color: "text-emerald-400",
        };

      case "Inventory":
        return {
          icon: <Package size={22} />,
          subtitle: "Inventory Updated",
          color: "text-cyan-400",
        };

      case "Notifications":
        return {
          icon: <Bell size={22} />,
          subtitle: "Notifications Sent",
          color: "text-yellow-400",
        };

      default:
        return {
          icon: <ShoppingCart size={22} />,
          subtitle: "",
          color: "text-purple-400",
        };
    }
  };

  const data = getData();

  return (
    <motion.div
      whileHover={{
        scale: 1.04,
        y: -4,
      }}
      className="
        relative
        overflow-hidden
        rounded-3xl
        border
        border-zinc-800
        bg-zinc-900
        p-6
      "
    >

      <div className="absolute -right-10 -top-10 h-24 w-24 rounded-full bg-purple-500/20 blur-2xl" />

      <div className="flex items-center justify-between">

        <div className={data.color}>
          {data.icon}
        </div>

        <div className="
          flex
          items-center
          gap-1
          rounded-full
          bg-green-500/10
          px-2
          py-1
          text-xs
          text-green-400
        ">
          <TrendingUp size={12} />
          Live
        </div>

      </div>

      <p className="mt-5 text-zinc-400">
        {title}
      </p>

      <h2 className="mt-2 text-4xl font-bold text-white">
        {value}
      </h2>

      <p className="mt-2 text-sm text-zinc-500">
        {data.subtitle}
      </p>

    </motion.div>
  );
}

export default MetricCard;