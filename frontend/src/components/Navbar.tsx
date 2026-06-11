type NavbarProps = {
  onScrollTo: (id: string) => void;
};

function Navbar({ onScrollTo }: NavbarProps) {
  return (
    <nav className="sticky top-0 z-50 border-b border-zinc-800 bg-black/40 backdrop-blur-md">

      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">

        <div>
          <h1 className="text-2xl font-bold text-white">
            KafkaFlow
          </h1>

          <p className="text-sm text-zinc-400">
            Event Driven Order Platform
          </p>
        </div>

        <div className="flex gap-6 text-zinc-400 text-sm font-medium">

          <button onClick={() => onScrollTo("metrics")} className="hover:text-white transition-colors">
            Metrics
          </button>

          <button onClick={() => onScrollTo("architecture")} className="hover:text-white transition-colors">
            Architecture
          </button>

          <button onClick={() => onScrollTo("stream")} className="hover:text-white transition-colors">
            Live Stream
          </button>

          <button onClick={() => onScrollTo("order-form")} className="hover:text-white transition-colors">
            Place Order
          </button>

          <button onClick={() => onScrollTo("recent-tables")} className="hover:text-white transition-colors">
            Recent Activity
          </button>

        </div>

      </div>

    </nav>
  );
}

export default Navbar;