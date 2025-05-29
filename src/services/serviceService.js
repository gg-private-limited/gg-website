import { API_BASE_URL } from "../constants";

const getAuthHeaders = () => {
  const token = localStorage.getItem("token");
  return {
    "Content-Type": "application/json",
    ...(token && { Authorization: `Bearer ${token}` }),
  };
};

export const serviceService = {
  // Get all services
  getAll: async (params = {}) => {
    try {
      const queryParams = new URLSearchParams(params).toString();
      const url = `${API_BASE_URL}/services${
        queryParams ? `?${queryParams}` : ""
      }`;

      const response = await fetch(url, {
        method: "GET",
        headers: getAuthHeaders(),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to fetch services");
      }

      return data;
    } catch (error) {
      console.error("Get services error:", error);
      throw error;
    }
  },

  // Get service by ID
  getById: async (id) => {
    try {
      const response = await fetch(`${API_BASE_URL}/services/${id}`, {
        method: "GET",
        headers: getAuthHeaders(),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to fetch service");
      }

      return data;
    } catch (error) {
      console.error("Get service error:", error);
      throw error;
    }
  },

  // Get service reviews
  getReviews: async (serviceId) => {
    try {
      const response = await fetch(
        `${API_BASE_URL}/services/${serviceId}/reviews`,
        {
          method: "GET",
          headers: getAuthHeaders(),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to fetch reviews");
      }

      return data;
    } catch (error) {
      console.error("Get reviews error:", error);
      throw error;
    }
  },

  // Request service
  requestService: async (serviceId, requestData) => {
    try {
      const response = await fetch(
        `${API_BASE_URL}/services/${serviceId}/request`,
        {
          method: "POST",
          headers: getAuthHeaders(),
          body: JSON.stringify(requestData),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to request service");
      }

      return data;
    } catch (error) {
      console.error("Service request error:", error);
      throw error;
    }
  },

  // Add review
  addReview: async (serviceId, reviewData) => {
    try {
      const response = await fetch(
        `${API_BASE_URL}/services/${serviceId}/reviews`,
        {
          method: "POST",
          headers: getAuthHeaders(),
          body: JSON.stringify(reviewData),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to add review");
      }

      return data;
    } catch (error) {
      console.error("Add review error:", error);
      throw error;
    }
  },

  // Get service categories
  getCategories: async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/services/categories`, {
        method: "GET",
        headers: getAuthHeaders(),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to fetch categories");
      }

      return data;
    } catch (error) {
      console.error("Get categories error:", error);
      throw error;
    }
  },

  // Search services
  search: async (query, filters = {}) => {
    try {
      const params = { q: query, ...filters };
      const queryParams = new URLSearchParams(params).toString();

      const response = await fetch(
        `${API_BASE_URL}/services/search?${queryParams}`,
        {
          method: "GET",
          headers: getAuthHeaders(),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Search failed");
      }

      return data;
    } catch (error) {
      console.error("Search error:", error);
      throw error;
    }
  },
};
