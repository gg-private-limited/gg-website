import { API_BASE_URL } from "../constants";

const getAuthHeaders = () => {
  const token = localStorage.getItem("token");
  return {
    "Content-Type": "application/json",
    ...(token && { Authorization: `Bearer ${token}` }),
  };
};

export const userService = {
  // Get user profile
  getProfile: async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/user/profile`, {
        method: "GET",
        headers: getAuthHeaders(),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to fetch profile");
      }

      return data;
    } catch (error) {
      console.error("Get profile error:", error);
      throw error;
    }
  },

  // Update profile
  updateProfile: async (profileData) => {
    try {
      const response = await fetch(`${API_BASE_URL}/user/profile`, {
        method: "PUT",
        headers: getAuthHeaders(),
        body: JSON.stringify(profileData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to update profile");
      }

      // Update local storage
      if (data.user) {
        localStorage.setItem("user", JSON.stringify(data.user));
      }

      return data;
    } catch (error) {
      console.error("Update profile error:", error);
      throw error;
    }
  },

  // Get user dashboard data
  getDashboard: async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/user/dashboard`, {
        method: "GET",
        headers: getAuthHeaders(),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to fetch dashboard data");
      }

      return data;
    } catch (error) {
      console.error("Get dashboard error:", error);
      throw error;
    }
  },

  // Get user applications
  getApplications: async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/user/applications`, {
        method: "GET",
        headers: getAuthHeaders(),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to fetch applications");
      }

      return data;
    } catch (error) {
      console.error("Get applications error:", error);
      throw error;
    }
  },

  // Get application by ID
  getApplicationById: async (id) => {
    try {
      const response = await fetch(`${API_BASE_URL}/user/applications/${id}`, {
        method: "GET",
        headers: getAuthHeaders(),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to fetch application");
      }

      return data;
    } catch (error) {
      console.error("Get application error:", error);
      throw error;
    }
  },

  // Get user service requests
  getServiceRequests: async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/user/services`, {
        method: "GET",
        headers: getAuthHeaders(),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to fetch service requests");
      }

      return data;
    } catch (error) {
      console.error("Get service requests error:", error);
      throw error;
    }
  },

  // Get service request by ID
  getServiceRequestById: async (id) => {
    try {
      const response = await fetch(`${API_BASE_URL}/user/services/${id}`, {
        method: "GET",
        headers: getAuthHeaders(),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to fetch service request");
      }

      return data;
    } catch (error) {
      console.error("Get service request error:", error);
      throw error;
    }
  },

  // Get user reviews
  getReviews: async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/user/reviews`, {
        method: "GET",
        headers: getAuthHeaders(),
      });

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

  // Add review
  addReview: async (reviewData) => {
    try {
      const response = await fetch(`${API_BASE_URL}/user/reviews`, {
        method: "POST",
        headers: getAuthHeaders(),
        body: JSON.stringify(reviewData),
      });

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

  // Update review
  updateReview: async (id, reviewData) => {
    try {
      const response = await fetch(`${API_BASE_URL}/user/reviews/${id}`, {
        method: "PUT",
        headers: getAuthHeaders(),
        body: JSON.stringify(reviewData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to update review");
      }

      return data;
    } catch (error) {
      console.error("Update review error:", error);
      throw error;
    }
  },

  // Delete review
  deleteReview: async (id) => {
    try {
      const response = await fetch(`${API_BASE_URL}/user/reviews/${id}`, {
        method: "DELETE",
        headers: getAuthHeaders(),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to delete review");
      }

      return data;
    } catch (error) {
      console.error("Delete review error:", error);
      throw error;
    }
  },

  // Upload profile picture
  uploadProfilePicture: async (file) => {
    try {
      const formData = new FormData();
      formData.append("profilePicture", file);

      const token = localStorage.getItem("token");
      const headers = {};
      if (token) {
        headers.Authorization = `Bearer ${token}`;
      }

      const response = await fetch(
        `${API_BASE_URL}/user/upload-profile-picture`,
        {
          method: "POST",
          headers,
          body: formData,
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to upload profile picture");
      }

      // Update local storage
      if (data.user) {
        localStorage.setItem("user", JSON.stringify(data.user));
      }

      return data;
    } catch (error) {
      console.error("Upload profile picture error:", error);
      throw error;
    }
  },
};
