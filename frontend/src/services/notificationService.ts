export const getNotifications = async () => {

  const response = await fetch(
    "http://localhost:8083/notifications"
  );

  if (!response.ok) {
    throw new Error(
      "Failed to fetch notifications"
    );
  }

  return response.json();
};