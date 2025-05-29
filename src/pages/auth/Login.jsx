"use client"

import { useState } from "react"
import { Link, useNavigate, useLocation } from "react-router-dom"
import { useAuth } from "../../contexts/AuthContext"
import { VALIDATION } from "../../constants"
import { toast } from "../../components/ui/Toaster"
import Input from "../../components/ui/Input"
import Button from "../../components/ui/Button"
import Card from "../../components/ui/Card"

const Login = () => {
    const navigate = useNavigate()
    const location = useLocation()
    const { login } = useAuth()
    const [formData, setFormData] = useState({
        email: "",
        password: "",
    })
    const [errors, setErrors] = useState({})
    const [isSubmitting, setIsSubmitting] = useState(false)

    // Get the redirect path from location state or default to home
    const from = location.state?.from?.pathname || "/"

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

        if (!formData.email) {
            newErrors.email = VALIDATION.required
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            newErrors.email = VALIDATION.email
        }

        if (!formData.password) {
            newErrors.password = VALIDATION.required
        }

        setErrors(newErrors)
        return Object.keys(newErrors).length === 0
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        if (!validateForm()) return

        setIsSubmitting(true)

        try {
            await login(formData)
            toast.success("Login successful!")
            navigate(from, { replace: true })
        } catch (error) {
            const errorMessage = error.response?.data?.message || "Login failed. Please try again."
            toast.error(errorMessage)

            // Set field-specific errors if returned from API
            if (error.response?.data?.errors) {
                setErrors(error.response.data.errors)
            }
        } finally {
            setIsSubmitting(false)
        }
    }

    return (
        <div className="min-h-screen pt-20 pb-12 flex flex-col justify-center">
            <div className="container-custom max-w-md mx-auto">
                <Card className="p-8">
                    <div className="text-center mb-8">
                        <h1 className="text-3xl font-bold mb-2 text-gradient">Welcome Back</h1>
                        <p style={{ color: "var(--secondary-text)" }}>Sign in to your account to continue</p>
                    </div>

                    <form onSubmit={handleSubmit}>
                        <Input
                            label="Email Address"
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            placeholder="your@email.com"
                            error={errors.email}
                            disabled={isSubmitting}
                            required
                        />

                        <Input
                            label="Password"
                            type="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            placeholder="••••••••"
                            error={errors.password}
                            disabled={isSubmitting}
                            required
                        />

                        <div className="flex justify-between items-center mb-6">
                            <div className="flex items-center">
                                <input type="checkbox" id="remember" className="mr-2" />
                                <label htmlFor="remember" style={{ color: "var(--secondary-text)" }}>
                                    Remember me
                                </label>
                            </div>

                            <Link to="/forgot-password" className="text-sm link">
                                Forgot password?
                            </Link>
                        </div>

                        <Button type="submit" variant="gradient" className="w-full" disabled={isSubmitting}>
                            {isSubmitting ? "Signing in..." : "Sign In"}
                        </Button>
                    </form>

                    <div className="mt-6 text-center">
                        <p style={{ color: "var(--secondary-text)" }}>
                            Don't have an account?{" "}
                            <Link to="/register" className="link">
                                Sign up
                            </Link>
                        </p>
                    </div>
                </Card>
            </div>
        </div>
    )
}

export default Login
