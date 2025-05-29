import { API_BASE_URL } from "../constants";

const getAuthHeaders = () => {
  const token = localStorage.getItem("token");
  return {
    ...(token && { Authorization: `Bearer ${token}` }),
  };
};

export const fileService = {
  // Upload file
  uploadFile: async (file, type = "general") => {
    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("type", type);

      const response = await fetch(`${API_BASE_URL}/upload`, {
        method: "POST",
        headers: getAuthHeaders(),
        body: formData,
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to upload file");
      }

      return data;
    } catch (error) {
      console.error("Upload file error:", error);
      throw error;
    }
  },

  // Upload multiple files
  uploadMultipleFiles: async (files, type = "general") => {
    try {
      const formData = new FormData();
      files.forEach((file, index) => {
        formData.append(`files`, file);
      });
      formData.append("type", type);

      const response = await fetch(`${API_BASE_URL}/upload/multiple`, {
        method: "POST",
        headers: getAuthHeaders(),
        body: formData,
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to upload files");
      }

      return data;
    } catch (error) {
      console.error("Upload multiple files error:", error);
      throw error;
    }
  },

  // Delete file
  deleteFile: async (fileUrl) => {
    try {
      const response = await fetch(`${API_BASE_URL}/upload/delete`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          ...getAuthHeaders(),
        },
        body: JSON.stringify({ fileUrl }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to delete file");
      }

      return data;
    } catch (error) {
      console.error("Delete file error:", error);
      throw error;
    }
  },
};
