import { useState } from "react";
import { createOrder } from "../services/orderService";

type OrderFormProps = {
  onOrderCreated: () => void;
};

function OrderForm({
  onOrderCreated,
}: OrderFormProps) {
  const [productName, setProductName] = useState("");
  const [price, setPrice] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const [loading, setLoading] = useState(false);

  const handleSubmit = async (
    e: React.FormEvent
  ) => {
    e.preventDefault();

    const trimmedName = productName.trim();
    const numericPrice = Number(price);

    if (!trimmedName) {
      setErrorMessage("Product name is required");
      return;
    }

    if (!Number.isFinite(numericPrice) || numericPrice <= 0) {
      setErrorMessage("Price must be a positive number");
      return;
    }

    try {
      setErrorMessage("");
      setLoading(true);

      await createOrder(
        trimmedName,
        numericPrice
      );

      onOrderCreated();

      alert(
        "Order Created Successfully 🚀"
      );

      setProductName("");
      setPrice("");
      setErrorMessage("");

    } catch (error) {

      const message =
        error instanceof Error
          ? error.message
          : "Failed to create order";

      console.error(error);

      setErrorMessage(message);

      alert(
        "Failed To Create Order ❌"
      );

    } finally {

      setLoading(false);

    }
  };

  return (
    <div className="rounded-3xl border border-zinc-800 bg-zinc-900 p-8">

      <h2 className="mb-6 text-2xl font-semibold text-white">
        Create New Order
      </h2>

      {errorMessage ? (
        <div className="mb-4 rounded-xl border border-red-600/40 bg-red-950/40 p-3 text-sm text-red-200">
          {errorMessage}
        </div>
      ) : null}

      <form
        onSubmit={handleSubmit}
        className="space-y-5"
      >

        <div>

          <label className="mb-2 block text-sm text-zinc-400">
            Product Name
          </label>

          <input
            type="text"
            placeholder="MacBook Pro"
            value={productName}
            onChange={(e) => {
              setProductName(
                e.target.value
              );
              if (errorMessage) {
                setErrorMessage("");
              }
            }}
            className="
              w-full
              rounded-xl
              border
              border-zinc-700
              bg-black
              p-4
              text-white
              outline-none
              focus:border-purple-500
            "
          />

        </div>

        <div>

          <label className="mb-2 block text-sm text-zinc-400">
            Price
          </label>

          <input
            type="number"
            placeholder="200000"
            value={price}
            min={1}
            onChange={(e) => {
              setPrice(
                e.target.value
              );
              if (errorMessage) {
                setErrorMessage("");
              }
            }}
            className="
              w-full
              rounded-xl
              border
              border-zinc-700
              bg-black
              p-4
              text-white
              outline-none
              focus:border-purple-500
            "
          />

        </div>

        <button
          type="submit"
          disabled={loading}
          className="
            w-full
            rounded-xl
            bg-gradient-to-r
            from-purple-600
            to-cyan-500
            p-4
            font-semibold
            text-white
          "
        >
          {loading
            ? "Creating..."
            : "Create Order"}
        </button>

      </form>

    </div>
  );
}

export default OrderForm;