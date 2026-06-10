import { API_BASE_URL } from "../config";

export const createOrder = async (
  productName: string,
  price: number
) => {

  const order = {
    orderId: Math.floor(
      Math.random() * 100000
    ),
    productName,
    price,
  };

  const response = await fetch(
    `${API_BASE_URL}/orders`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(order),
    }
  );

  if (!response.ok) {
    let message = "Failed to create order";
    const contentType = response.headers.get("content-type");

    if (contentType && contentType.includes("application/json")) {
      try {
        const body = await response.json();
        if (body?.fieldErrors) {
          message = Object.values(body.fieldErrors).join(", ");
        } else if (body?.message) {
          message = body.message;
        }
      } catch {
        // keep default message
      }
    }

    throw new Error(message);
  }

  return response;
};

export const getOrders = async () => {

  const response = await fetch(
    `${API_BASE_URL}/orders`
  );

  if (!response.ok) {
    throw new Error("Failed to fetch orders");
  }

  return response.json();
};