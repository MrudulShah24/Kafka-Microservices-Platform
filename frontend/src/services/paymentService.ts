import { API_BASE_URL } from "../config";

export const getPayments = async () => {

  const response = await fetch(
    `${API_BASE_URL}/payments`
  );

  if (!response.ok) {
    throw new Error(
      "Failed to fetch payments"
    );
  }

  return response.json();
};