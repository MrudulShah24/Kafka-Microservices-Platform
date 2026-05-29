export const getInventory = async () => {

  const response = await fetch(
    "http://localhost:8082/inventory"
  );

  if (!response.ok) {
    throw new Error(
      "Failed to fetch inventory"
    );
  }

  return response.json();
};