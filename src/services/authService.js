import { API_BASE_URL } from "../constants"

const getAuthHeaders = () => {
  const token = localStorage.getItem("token")
  return {
    "Content-Type": "application/json",
    ...(token && { Authorization: `Bearer ${token}` }),
  }
}

export const authService = {
  // Register new user
  register: async (userData) => {
    try {
      const response = await fetch(`${API_BASE_URL}/auth/register`, {
        method: "POST",
        headers: getAuthHeaders(),
        body: JSON.stringify(userData),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.message || "Registration failed")
      }

      if (data.token) {
        localStorage.setItem("token", data.token)
        localStorage.setItem("user", JSON.stringify(data.user))
      }

      return data
    } catch (error) {
      console.error("Registration error:", error)
      throw error
    }
  },

  // Login user
  login: async (credentials) => {
    try {
      const response = await fetch(`${API_BASE_URL}/auth/login`, {
        method: "POST",
        headers: getAuthHeaders(),
        body: JSON.stringify(credentials),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.message || "Login failed")
      }

      if (data.token) {
        localStorage.setItem("token", data.token)
        localStorage.setItem("user", JSON.stringify(data.user))
      }

      return data
    } catch (error) {
      console.error("Login error:", error)
      throw error
    }
  },

  // Logout user
  logout: async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/auth/logout`, {
        method: "POST",
        headers: getAuthHeaders(),
      })

      // Clear local storage regardless of response
      localStorage.removeItem("token")
      localStorage.removeItem("user")

      if (!response.ok) {
        const data = await response.json()
        throw new Error(data.message || "Logout failed")
      }

      return { success: true }
    } catch (error) {
      console.error("Logout error:", error)
      // Still clear local storage on error
      localStorage.removeItem("token")
      localStorage.removeItem("user")
      throw error
    }
  },

  // Verify token
  verifyToken: async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/auth/verify`, {
        method: "GET",
        headers: getAuthHeaders(),
      })

      const data = await response.json()

      if (!response.ok) {
        localStorage.removeItem("token")
        localStorage.removeItem("user")
        throw new Error(data.message || "Token verification failed")
      }

      return data
    } catch (error) {
      console.error("Token verification error:", error)
      localStorage.removeItem("token")
      localStorage.removeItem("user")
      throw error
    }
  },

  // Forgot password
  forgotPassword: async (email) => {
    try {
      const response = await fetch(`${API_BASE_URL}/auth/forgot-password`, {
        method: "POST",
        headers: getAuthHeaders(),
        body: JSON.stringify({ email }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.message || "Failed to send reset email")
      }

      return data
    } catch (error) {
      console.error("Forgot password error:", error)
      throw error
    }
  },

  // Reset password
  resetPassword: async (token, password) => {
    try {
      const response = await fetch(`${API_BASE_URL}/auth/reset-password`, {
        method: "POST",
        headers: getAuthHeaders(),
        body: JSON.stringify({ token, password }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.message || "Password reset failed")
      }

      return data
    } catch (error) {
      console.error("Reset password error:", error)
      throw error
    }
  },

  // Change password
  changePassword: async (currentPassword, newPassword) => {
    try {
      const response = await fetch(`${API_BASE_URL}/auth/change-password`, {
        method: "POST",
        headers: getAuthHeaders(),
        body: JSON.stringify({ currentPassword, newPassword }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.message || "Password change failed")
      }

      return data
    } catch (error) {
      console.error("Change password error:", error)
      throw error
    }
  },
}
