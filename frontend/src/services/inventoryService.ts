import { API_BASE_URL } from "../config";

export const getInventory = async () => {

  const response = await fetch(
    `${API_BASE_URL}/inventory`
  );

  if (!response.ok) {
    throw new Error(
      "Failed to fetch inventory"
    );
  }

  return response.json();
};