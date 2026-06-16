import {
  ShoppingCart,
  Shield,
  Cpu,
  Radio,
  CreditCard,
  Package,
  Bell,
  RefreshCw,
  AlertTriangle,
  Network,
  MonitorPlay,
} from "lucide-react";

function Pipeline() {
  return (
    <div className="rounded-3xl border border-zinc-800 bg-zinc-900 p-8">
      <div className="mb-8 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-semibold text-white">
            System Event Architecture Flow
          </h2>
          <p className="mt-2 text-zinc-400 text-sm">
            End-to-End tracking and error resilience visualization of our distributed system.
          </p>
        </div>
        <div className="self-start md:self-auto rounded-full border border-green-500/30 bg-green-500/10 px-4 py-1.5 text-sm text-green-400 font-medium">
          System Active
        </div>
      </div>

      <div className="flex flex-col items-center space-y-4 max-w-4xl mx-auto text-zinc-300">
        
        {/* Step 1: React Dashboard */}
        <div className="flex flex-col items-center w-full max-w-sm">
          <div className="flex items-center gap-3 w-full border border-purple-500/30 bg-purple-950/20 rounded-2xl p-4 justify-center">
            <MonitorPlay size={20} className="text-purple-400 animate-pulse" />
            <div>
              <p className="font-semibold text-white text-sm">React Dashboard</p>
              <p className="text-xs text-zinc-500">Port 5173</p>
            </div>
          </div>
          <div className="h-6 w-[2px] bg-zinc-800" />
        </div>

        {/* Step 2: API Gateway */}
        <div className="flex flex-col items-center w-full max-w-sm">
          <div className="flex items-center gap-3 w-full border border-blue-500/30 bg-blue-950/20 rounded-2xl p-4 justify-center">
            <Shield size={20} className="text-blue-400" />
            <div>
              <p className="font-semibold text-white text-sm">API Gateway</p>
              <p className="text-xs text-zinc-500">Port 8060 (Deduplicates CORS/Headers)</p>
            </div>
          </div>
          <div className="h-6 w-[2px] bg-zinc-800" />
        </div>

        {/* Step 3: Order Service */}
        <div className="flex flex-col items-center w-full max-w-sm">
          <div className="flex items-center gap-3 w-full border border-purple-500/30 bg-purple-950/20 rounded-2xl p-4 justify-center">
            <ShoppingCart size={20} className="text-purple-400" />
            <div>
              <p className="font-semibold text-white text-sm">Order Service</p>
              <p className="text-xs text-zinc-500">Port 8080 (Generates Tracking ID)</p>
            </div>
          </div>
          <div className="h-6 w-[2px] bg-zinc-800" />
        </div>

        {/* Step 4: Kafka orders Topic */}
        <div className="flex flex-col items-center w-full max-w-md">
          <div className="flex items-center gap-3 w-full border border-cyan-500/30 bg-cyan-950/20 rounded-2xl p-4 justify-center">
            <Radio size={20} className="text-cyan-400" />
            <div>
              <p className="font-semibold text-white text-sm">Kafka Topic: <span className="font-mono text-cyan-400">orders</span></p>
              <p className="text-xs text-zinc-500">Distributes new orders to consumers</p>
            </div>
          </div>
        </div>

        {/* Split line pointing to 3 consumers */}
        <div className="w-full flex flex-col items-center pt-2">
          <div className="h-6 w-[2px] bg-zinc-800" />
          <div className="w-[68%] h-[2px] bg-zinc-800" />
          <div className="w-full flex justify-between px-[16%] -mt-[2px]">
            <div className="w-[2px] h-6 bg-zinc-800" />
            <div className="w-[2px] h-6 bg-zinc-800" />
            <div className="w-[2px] h-6 bg-zinc-800" />
          </div>
        </div>

        {/* Downstream Consumers Row */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full pt-2">
          
          {/* Payment Column */}
          <div className="flex flex-col items-center space-y-4">
            <div className="border border-zinc-700 bg-black rounded-2xl p-4 w-full flex flex-col items-center text-center">
              <CreditCard size={20} className="text-emerald-400 mb-1" />
              <p className="font-semibold text-white text-xs">Payment Service</p>
              <p className="text-[10px] text-zinc-500">Port 8081 | Saves Status</p>
            </div>
            
            <div className="w-[2px] h-4 bg-zinc-800" />
            
            <div className="border border-yellow-500/20 bg-yellow-950/5 rounded-2xl p-3 w-full flex flex-col items-center text-center">
              <RefreshCw size={16} className="text-yellow-400 mb-1 animate-spin-slow" />
              <p className="font-medium text-white text-xs">Retry Topic</p>
              <p className="text-[9px] text-zinc-500">4 attempts, exp backoff</p>
            </div>

            <div className="w-[2px] h-4 bg-zinc-800" />

            <div className="border border-red-500/20 bg-red-950/5 rounded-2xl p-3 w-full flex flex-col items-center text-center">
              <AlertTriangle size={16} className="text-red-400 mb-1" />
              <p className="font-medium text-white text-xs">DLQ Topic</p>
              <p className="text-[9px] text-zinc-500">Stores permanent errors</p>
            </div>
          </div>

          {/* Inventory Column */}
          <div className="flex flex-col items-center space-y-4">
            <div className="border border-zinc-700 bg-black rounded-2xl p-4 w-full flex flex-col items-center text-center">
              <Package size={20} className="text-cyan-400 mb-1" />
              <p className="font-semibold text-white text-xs">Inventory Service</p>
              <p className="text-[10px] text-zinc-500">Port 8082 | Saves Status</p>
            </div>

            <div className="w-[2px] h-4 bg-zinc-800" />

            <div className="border border-yellow-500/20 bg-yellow-950/5 rounded-2xl p-3 w-full flex flex-col items-center text-center">
              <RefreshCw size={16} className="text-yellow-400 mb-1 animate-spin-slow" />
              <p className="font-medium text-white text-xs">Retry Topic</p>
              <p className="text-[9px] text-zinc-500">4 attempts, exp backoff</p>
            </div>

            <div className="w-[2px] h-4 bg-zinc-800" />

            <div className="border border-red-500/20 bg-red-950/5 rounded-2xl p-3 w-full flex flex-col items-center text-center">
              <AlertTriangle size={16} className="text-red-400 mb-1" />
              <p className="font-medium text-white text-xs">DLQ Topic</p>
              <p className="text-[9px] text-zinc-500">Stores permanent errors</p>
            </div>
          </div>

          {/* Notification Column */}
          <div className="flex flex-col items-center space-y-4">
            <div className="border border-zinc-700 bg-black rounded-2xl p-4 w-full flex flex-col items-center text-center">
              <Bell size={20} className="text-yellow-400 mb-1" />
              <p className="font-semibold text-white text-xs">Notification Service</p>
              <p className="text-[10px] text-zinc-500">Port 8083 | Saves Status</p>
            </div>

            <div className="w-[2px] h-4 bg-zinc-800" />

            <div className="border border-yellow-500/20 bg-yellow-950/5 rounded-2xl p-3 w-full flex flex-col items-center text-center">
              <RefreshCw size={16} className="text-yellow-400 mb-1 animate-spin-slow" />
              <p className="font-medium text-white text-xs">Retry Topic</p>
              <p className="text-[9px] text-zinc-500">4 attempts, exp backoff</p>
            </div>

            <div className="w-[2px] h-4 bg-zinc-800" />

            <div className="border border-red-500/20 bg-red-950/5 rounded-2xl p-3 w-full flex flex-col items-center text-center">
              <AlertTriangle size={16} className="text-red-400 mb-1" />
              <p className="font-medium text-white text-xs">DLQ Topic</p>
              <p className="text-[9px] text-zinc-500">Stores permanent errors</p>
            </div>
          </div>

        </div>

        {/* Merge Flow back from 3 columns */}
        <div className="w-full flex flex-col items-center pt-2">
          <div className="w-full flex justify-between px-[16%]">
            <div className="w-[2px] h-6 bg-zinc-800" />
            <div className="w-[2px] h-6 bg-zinc-800" />
            <div className="w-[2px] h-6 bg-zinc-800" />
          </div>
          <div className="w-[68%] h-[2px] bg-zinc-800 -mt-[2px]" />
          <div className="h-6 w-[2px] bg-zinc-800" />
        </div>

        {/* Step 5: dashboard-events Topic */}
        <div className="flex flex-col items-center w-full max-w-md">
          <div className="flex items-center gap-3 w-full border border-cyan-500/30 bg-cyan-950/20 rounded-2xl p-4 justify-center">
            <Radio size={20} className="text-cyan-400" />
            <div>
              <p className="font-semibold text-white text-sm">Kafka Topic: <span className="font-mono text-cyan-400">dashboard-events</span></p>
              <p className="text-xs text-zinc-500">Consolidates success and failure tracking events</p>
            </div>
          </div>
          <div className="h-6 w-[2px] bg-zinc-800" />
        </div>

        {/* Step 6: Order Service SSE */}
        <div className="flex flex-col items-center w-full max-w-sm">
          <div className="flex items-center gap-3 w-full border border-purple-500/30 bg-purple-950/20 rounded-2xl p-4 justify-center">
            <Network size={20} className="text-purple-400" />
            <div>
              <p className="font-semibold text-white text-sm">Order Service SSE Stream</p>
              <p className="text-xs text-zinc-500">Pushes stream events to client browser</p>
            </div>
          </div>
          <div className="h-6 w-[2px] bg-zinc-800" />
        </div>

        {/* Step 7: React Dashboard Loop */}
        <div className="flex flex-col items-center w-full max-w-sm">
          <div className="flex items-center gap-3 w-full border border-purple-500/30 bg-purple-950/20 rounded-2xl p-4 justify-center">
            <Cpu size={20} className="text-purple-400" />
            <div>
              <p className="font-semibold text-white text-sm">React Live Stream & Timeline</p>
              <p className="text-xs text-zinc-500">Visualizes workflow under Tracking ID</p>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}

export default Pipeline;