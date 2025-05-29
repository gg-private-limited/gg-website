import apiClient from "./api";
import { API_BASE_URL } from "../constants";

const getAuthHeaders = () => {
  const token = localStorage.getItem("token");
  return {
    "Content-Type": "application/json",
    ...(token && { Authorization: `Bearer ${token}` }),
  };
};

export const internshipService = {
  // Get all internships
  getAll: async (params = {}) => {
    try {
      const queryParams = new URLSearchParams(params).toString();
      const url = `${API_BASE_URL}/internships${
        queryParams ? `?${queryParams}` : ""
      }`;

      const response = await fetch(url, {
        method: "GET",
        headers: getAuthHeaders(),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to fetch internships");
      }

      return data;
    } catch (error) {
      console.error("Get internships error:", error);
      throw error;
    }
  },

  // Get internship by ID
  getById: async (id) => {
    try {
      const response = await fetch(`${API_BASE_URL}/internships/${id}`, {
        method: "GET",
        headers: getAuthHeaders(),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to fetch internship");
      }

      return data;
    } catch (error) {
      console.error("Get internship error:", error);
      throw error;
    }
  },

  // Apply for internship
  apply: async (internshipId, applicationData) => {
    try {
      const formData = new FormData();

      // Add text fields
      Object.keys(applicationData).forEach((key) => {
        if (key !== "resume" && key !== "coverLetter") {
          formData.append(key, applicationData[key]);
        }
      });

      // Add files
      if (applicationData.resume) {
        formData.append("resume", applicationData.resume);
      }
      if (applicationData.coverLetter) {
        formData.append("coverLetter", applicationData.coverLetter);
      }

      const token = localStorage.getItem("token");
      const headers = {};
      if (token) {
        headers.Authorization = `Bearer ${token}`;
      }

      const response = await fetch(
        `${API_BASE_URL}/internships/${internshipId}/apply`,
        {
          method: "POST",
          headers,
          body: formData,
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to submit application");
      }

      return data;
    } catch (error) {
      console.error("Apply internship error:", error);
      throw error;
    }
  },

  // Get user applications
  getUserApplications: async () => {
    const response = await apiClient.get(`${API_BASE_URL}/user/applications`, {
      headers: getAuthHeaders(),
    });
    return response.data;
  },

  // Get application by ID
  getApplicationById: async (id) => {
    const response = await apiClient.get(
      `${API_BASE_URL}/user/applications/${id}`,
      {
        headers: getAuthHeaders(),
      }
    );
    return response.data;
  },

  // Get internship categories
  getCategories: async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/internships/categories`, {
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

  // Search internships
  search: async (query, filters = {}) => {
    try {
      const params = { q: query, ...filters };
      const queryParams = new URLSearchParams(params).toString();

      const response = await fetch(
        `${API_BASE_URL}/internships/search?${queryParams}`,
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
