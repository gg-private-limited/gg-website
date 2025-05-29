import { API_BASE_URL } from "../constants";

const getAuthHeaders = () => {
  const token = localStorage.getItem("token");
  return {
    "Content-Type": "application/json",
    ...(token && { Authorization: `Bearer ${token}` }),
  };
};

export const contactService = {
  // Send contact message
  sendMessage: async (messageData) => {
    try {
      const response = await fetch(`${API_BASE_URL}/contact`, {
        method: "POST",
        headers: getAuthHeaders(),
        body: JSON.stringify(messageData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to send message");
      }

      return data;
    } catch (error) {
      console.error("Send message error:", error);
      throw error;
    }
  },

  // Get contact info
  getContactInfo: async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/contact/info`, {
        method: "GET",
        headers: getAuthHeaders(),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to fetch contact info");
      }

      return data;
    } catch (error) {
      console.error("Get contact info error:", error);
      throw error;
    }
  },

  // Subscribe to newsletter
  subscribe: async (email) => {
    try {
      const response = await fetch(`${API_BASE_URL}/contact/subscribe`, {
        method: "POST",
        headers: getAuthHeaders(),
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to subscribe");
      }

      return data;
    } catch (error) {
      console.error("Subscribe error:", error);
      throw error;
    }
  },
};
