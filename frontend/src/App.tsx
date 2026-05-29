import { useEffect, useState } from "react";

import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import MetricCard from "./components/MetricCard";
import Pipeline from "./components/Pipeline";
import OrderForm from "./components/OrderForm";
import ServiceHealth from "./components/ServiceHealth";
import RecentOrders from "./components/RecentOrders";
import OrderTimeline from "./components/OrderTimeline";
import LiveEventStream from "./components/LiveEventStream";

import { getOrders } from "./services/orderService";
import { getPayments } from "./services/paymentService";
import { getInventory } from "./services/inventoryService";
import { getNotifications } from "./services/notificationService";

type Order = {
  orderId: number;
  productName: string;
  price: number;
};

function App() {

  const [orders, setOrders] =
    useState<Order[]>([]);

  const [paymentCount, setPaymentCount] =
    useState(0);

  const [inventoryCount, setInventoryCount] =
    useState(0);

  const [notificationCount, setNotificationCount] =
    useState(0);

  const fetchDashboardData = async () => {

    try {

      const [
        ordersData,
        paymentsData,
        inventoryData,
        notificationsData,
      ] = await Promise.all([
        getOrders(),
        getPayments(),
        getInventory(),
        getNotifications(),
      ]);

      setOrders(ordersData);

      setPaymentCount(
        paymentsData.length
      );

      setInventoryCount(
        inventoryData.length
      );

      setNotificationCount(
        notificationsData.length
      );

    } catch (error) {

      console.error(error);

    }

  };

  useEffect(() => {

    fetchDashboardData();

    const interval = setInterval(() => {

      fetchDashboardData();

    }, 3000);

    return () => clearInterval(interval);

  }, []);

  return (
    <div className="relative min-h-screen bg-black">

      <div className="fixed left-0 top-0 h-[500px] w-[500px] rounded-full bg-purple-600/10 blur-[120px]" />

      <div className="fixed bottom-0 right-0 h-[500px] w-[500px] rounded-full bg-cyan-600/10 blur-[120px]" />

      <Navbar />

      <main className="mx-auto max-w-7xl px-6 py-10">

        <Hero />

        <div className="mt-10 grid gap-6 md:grid-cols-4">

          <MetricCard
            title="Orders"
            value={String(orders.length)}
          />

          <MetricCard
            title="Payments"
            value={String(paymentCount)}
          />

          <MetricCard
            title="Inventory"
            value={String(inventoryCount)}
          />

          <MetricCard
            title="Notifications"
            value={String(notificationCount)}
          />

        </div>

        <div className="mt-10">
          <Pipeline />
        </div>

        <div className="mt-10">
          <LiveEventStream />
        </div>

        <div className="mt-10 grid gap-10 lg:grid-cols-2">

          <OrderForm
            onOrderCreated={fetchDashboardData}
          />

          <ServiceHealth />

        </div>

        <div className="mt-10 grid gap-10 lg:grid-cols-2">

          <RecentOrders
            orders={orders}
          />

          <OrderTimeline />

        </div>

      </main>

    </div>
  );
}

export default App;