"use client"

import { useState } from "react"
import { Link } from "react-router-dom"
import axios from "axios"
import { API, VALIDATION } from "../../constants"
import { toast } from "../../components/ui/Toaster"
import Input from "../../components/ui/Input"
import Button from "../../components/ui/Button"
import Card from "../../components/ui/Card"

const ForgotPassword = () => {
    const [email, setEmail] = useState("")
    const [error, setError] = useState("")
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [isSubmitted, setIsSubmitted] = useState(false)

    const handleSubmit = async (e) => {
        e.preventDefault()

        if (!email) {
            setError(VALIDATION.required)
            return
        }

        if (!/\S+@\S+\.\S+/.test(email)) {
            setError(VALIDATION.email)
            return
        }

        setIsSubmitting(true)
        setError("")

        try {
            await axios.post(`${API.base}${API.auth.resetPassword}`, { email })
            setIsSubmitted(true)
            toast.success("Password reset link sent to your email")
        } catch (error) {
            const errorMessage = error.response?.data?.message || "Failed to send reset link. Please try again."
            toast.error(errorMessage)
            setError(errorMessage)
        } finally {
            setIsSubmitting(false)
        }
    }

    return (
        <div className="min-h-screen pt-20 pb-12 flex flex-col justify-center">
            <div className="container-custom max-w-md mx-auto">
                <Card className="p-8">
                    <div className="text-center mb-8">
                        <h1 className="text-3xl font-bold mb-2 text-gradient">Forgot Password</h1>
                        <p style={{ color: "var(--secondary-text)" }}>
                            Enter your email address and we'll send you a link to reset your password
                        </p>
                    </div>

                    {isSubmitted ? (
                        <div className="text-center">
                            <div className="mb-6 p-4 rounded-lg bg-green-50 text-green-700">
                                We've sent a password reset link to <strong>{email}</strong>. Please check your email.
                            </div>
                            <Link to="/login" className="btn-primary inline-block">
                                Back to Login
                            </Link>
                        </div>
                    ) : (
                        <form onSubmit={handleSubmit}>
                            <Input
                                label="Email Address"
                                type="email"
                                value={email}
                                onChange={(e) => {
                                    setEmail(e.target.value)
                                    setError("")
                                }}
                                placeholder="your@email.com"
                                error={error}
                                disabled={isSubmitting}
                                required
                            />

                            <Button type="submit" variant="gradient" className="w-full" disabled={isSubmitting}>
                                {isSubmitting ? "Sending..." : "Send Reset Link"}
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
                    )}
                </Card>
            </div>
        </div>
    )
}

export default ForgotPassword
