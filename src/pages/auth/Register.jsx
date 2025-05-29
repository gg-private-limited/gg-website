"use client"

import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { useAuth } from "../../contexts/AuthContext"
import { VALIDATION } from "../../constants"
import { toast } from "../../components/ui/Toaster"
import Input from "../../components/ui/Input"
import Button from "../../components/ui/Button"
import Card from "../../components/ui/Card"

const Register = () => {
    const navigate = useNavigate()
    const { register } = useAuth()
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
    })
    const [errors, setErrors] = useState({})
    const [isSubmitting, setIsSubmitting] = useState(false)

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

        if (!formData.name) {
            newErrors.name = VALIDATION.required
        }

        if (!formData.email) {
            newErrors.email = VALIDATION.required
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            newErrors.email = VALIDATION.email
        }

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
            await register({
                name: formData.name,
                email: formData.email,
                password: formData.password,
            })
            toast.success("Registration successful!")
            navigate("/")
        } catch (error) {
            const errorMessage = error.response?.data?.message || "Registration failed. Please try again."
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
                        <h1 className="text-3xl font-bold mb-2 text-gradient">Create Account</h1>
                        <p style={{ color: "var(--secondary-text)" }}>Sign up to get started with GG Private Limited</p>
                    </div>

                    <form onSubmit={handleSubmit}>
                        <Input
                            label="Full Name"
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            placeholder="John Doe"
                            error={errors.name}
                            disabled={isSubmitting}
                            required
                        />

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

                        <Input
                            label="Confirm Password"
                            type="password"
                            name="confirmPassword"
                            value={formData.confirmPassword}
                            onChange={handleChange}
                            placeholder="••••••••"
                            error={errors.confirmPassword}
                            disabled={isSubmitting}
                            required
                        />

                        <div className="mb-6">
                            <div className="flex items-center">
                                <input type="checkbox" id="terms" className="mr-2" required />
                                <label htmlFor="terms" style={{ color: "var(--secondary-text)" }}>
                                    I agree to the{" "}
                                    <Link to="/terms" className="link">
                                        Terms of Service
                                    </Link>{" "}
                                    and{" "}
                                    <Link to="/privacy" className="link">
                                        Privacy Policy
                                    </Link>
                                </label>
                            </div>
                        </div>

                        <Button type="submit" variant="gradient" className="w-full" disabled={isSubmitting}>
                            {isSubmitting ? "Creating Account..." : "Create Account"}
                        </Button>
                    </form>

                    <div className="mt-6 text-center">
                        <p style={{ color: "var(--secondary-text)" }}>
                            Already have an account?{" "}
                            <Link to="/login" className="link">
                                Sign in
                            </Link>
                        </p>
                    </div>
                </Card>
            </div>
        </div>
    )
}

export default Register
