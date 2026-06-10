import { API_BASE_URL } from "../config";

export const getNotifications = async () => {

  const response = await fetch(
    `${API_BASE_URL}/notifications`
  );

  if (!response.ok) {
    throw new Error(
      "Failed to fetch notifications"
    );
  }

  return response.json();
};