"use client"

import { createContext, useContext, useEffect, useState } from "react"
import { authService } from "../services/authService"

const AuthContext = createContext()

export const useAuth = () => {
    const context = useContext(AuthContext)
    if (!context) {
        throw new Error("useAuth must be used within an AuthProvider")
    }
    return context
}

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const initializeAuth = async () => {
            try {
                const token = localStorage.getItem("token")
                if (token) {
                    const response = await authService.verifyToken()
                    setUser(response.user)
                }
            } catch (error) {
                localStorage.removeItem("token")
                console.error("Auth verification failed:", error)
            } finally {
                setLoading(false)
            }
        }

        initializeAuth()
    }, [])

    const register = async (userData) => {
        console.log(userData);
        
        const response = await authService.register(userData)
        const { token, user } = response

        localStorage.setItem("token", token)
        setUser(user)
        return user
    }

    const login = async (credentials) => {
        const response = await authService.login(credentials)
        const { token, user } = response

        localStorage.setItem("token", token)
        setUser(user)
        return user
    }

    const logout = async () => {
        try {
            await authService.logout()
        } catch (error) {
            console.error("Logout error:", error)
        } finally {
            localStorage.removeItem("token")
            setUser(null)
        }
    }

    const updateProfile = async (profileData) => {
        const response = await authService.updateProfile(profileData)
        setUser(response.user)
        return response.user
    }

    const value = {
        user,
        loading,
        register,
        login,
        logout,
        updateProfile,
    }

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
