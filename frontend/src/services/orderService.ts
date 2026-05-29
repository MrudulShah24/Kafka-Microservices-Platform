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
    "http://localhost:8080/orders",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(order),
    }
  );

  if (!response.ok) {
    throw new Error("Failed to create order");
  }

  return response;
};

export const getOrders = async () => {

  const response = await fetch(
    "http://localhost:8080/orders"
  );

  if (!response.ok) {
    throw new Error("Failed to fetch orders");
  }

  return response.json();
};