function Navbar() {
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

        <div className="flex gap-6 text-zinc-400">

          <button className="hover:text-white">
            Dashboard
          </button>

          <button className="hover:text-white">
            Orders
          </button>

          <button className="hover:text-white">
            Analytics
          </button>

        </div>

      </div>

    </nav>
  );
}

export default Navbar;