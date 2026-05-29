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

  const [loading, setLoading] = useState(false);

  const handleSubmit = async (
    e: React.FormEvent
  ) => {
    e.preventDefault();

    try {
      setLoading(true);

      await createOrder(
        productName,
        Number(price)
      );

      onOrderCreated();

      alert(
        "Order Created Successfully 🚀"
      );

      setProductName("");
      setPrice("");

    } catch (error) {

      console.error(error);

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
            onChange={(e) =>
              setProductName(
                e.target.value
              )
            }
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
            onChange={(e) =>
              setPrice(
                e.target.value
              )
            }
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