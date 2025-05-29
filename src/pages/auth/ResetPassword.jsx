"use client"

import { useState, useEffect } from "react"
import { Link, useNavigate, useLocation } from "react-router-dom"
import axios from "axios"
import { API, VALIDATION } from "../../constants"
import { toast } from "../../components/ui/Toaster"
import Input from "../../components/ui/Input"
import Button from "../../components/ui/Button"
import Card from "../../components/ui/Card"
import Loader from "../../components/ui/Loader"

const ResetPassword = () => {
    const navigate = useNavigate()
    const location = useLocation()
    const [token, setToken] = useState("")
    const [formData, setFormData] = useState({
        password: "",
        confirmPassword: "",
    })
    const [errors, setErrors] = useState({})
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [isValidToken, setIsValidToken] = useState(false)
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        // Extract token from URL query parameters
        const queryParams = new URLSearchParams(location.search)
        const tokenFromUrl = queryParams.get("token")

        if (!tokenFromUrl) {
            toast.error("Invalid or missing reset token")
            navigate("/forgot-password")
            return
        }

        // Verify token validity
        const verifyToken = async () => {
            try {
                await axios.get(`${API.base}${API.auth.resetPassword}?token=${tokenFromUrl}`)
                setToken(tokenFromUrl)
                setIsValidToken(true)
            } catch (error) {
                toast.error("Invalid or expired reset token")
                navigate("/forgot-password")
            } finally {
                setIsLoading(false)
            }
        }

        verifyToken()
    }, [location, navigate])

    const handleChange = (e) => {
        const { name, value } = e.target
        setFormData((prev) => ({ ...prev, [name]: value }))

        // Clear error when user types
        if (errors[name]) {
            setErrors((prev) => ({ ...prev, [name]: "" }))
        }
    }

    const validateForm = () => {
        const newErrors = {}

        if (!formData.password) {
            newErrors.password = VALIDATION.required
        } else if (formData.password.length < 8) {
            newErrors.password = VALIDATION.password.minLength
        }

        if (!formData.confirmPassword) {
            newErrors.confirmPassword = VALIDATION.required
        } else if (formData.password !== formData.confirmPassword) {
            newErrors.confirmPassword = VALIDATION.match
        }

        setErrors(newErrors)
        return Object.keys(newErrors).length === 0
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        if (!validateForm()) return

        setIsSubmitting(true)

        try {
            await axios.post(`${API.base}${API.auth.resetPassword}`, {
                token,
                password: formData.password,
            })
            toast.success("Password reset successful!")
            navigate("/login")
        } catch (error) {
            const errorMessage = error.response?.data?.message || "Password reset failed. Please try again."
            toast.error(errorMessage)

            // Set field-specific errors if returned from API
            if (error.response?.data?.errors) {
                setErrors(error.response.data.errors)
            }
        } finally {
            setIsSubmitting(false)
        }
    }

    if (isLoading) {
        return (
            <div className="min-h-screen pt-20 pb-12 flex flex-col justify-center">
                <Loader fullScreen text="Verifying reset token..." />
            </div>
        )
    }

    return (
        <div className="min-h-screen pt-20 pb-12 flex flex-col justify-center">
            <div className="container-custom max-w-md mx-auto">
                <Card className="p-8">
                    <div className="text-center mb-8">
                        <h1 className="text-3xl font-bold mb-2 text-gradient">Reset Password</h1>
                        <p style={{ color: "var(--secondary-text)" }}>Enter your new password below</p>
                    </div>

                    <form onSubmit={handleSubmit}>
                        <Input
                            label="New Password"
                            type="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            placeholder="••••••••"
                            error={errors.password}
                            disabled={isSubmitting}
                            required
                        />

                        <Input
                            label="Confirm New Password"
                            type="password"
                            name="confirmPassword"
                            value={formData.confirmPassword}
                            onChange={handleChange}
                            placeholder="••••••••"
                            error={errors.confirmPassword}
                            disabled={isSubmitting}
                            required
                        />

                        <Button type="submit" variant="gradient" className="w-full" disabled={isSubmitting}>
                            {isSubmitting ? "Resetting..." : "Reset Password"}
                        </Button>

                        <div className="mt-6 text-center">
                            <p style={{ color: "var(--secondary-text)" }}>
                                Remember your password?{" "}
                                <Link to="/login" className="link">
                                    Sign in
                                </Link>
                            </p>
                        </div>
                    </form>
                </Card>
            </div>
        </div>
    )
}

export default ResetPassword
