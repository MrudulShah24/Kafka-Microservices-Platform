export const getPayments = async () => {

  const response = await fetch(
    "http://localhost:8081/payments"
  );

  if (!response.ok) {
    throw new Error(
      "Failed to fetch payments"
    );
  }

  return response.json();
};