"use client"

import { useState } from "react"
import { Send } from "lucide-react"
import { contactService } from "../services/contactService"
import { toast } from "./ui/Toaster"
import Button from "./ui/Button"
import Input from "./ui/Input"

const ContactForm = () => {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        subject: "",
        message: "",
    })
    const [isSubmitting, setIsSubmitting] = useState(false)

    const handleChange = (e) => {
        const { name, value } = e.target
        setFormData((prev) => ({ ...prev, [name]: value }))
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        setIsSubmitting(true)

        try {
            await contactService.sendMessage(formData)
            toast.success("Thank you! Your message has been sent successfully.")
            setFormData({ name: "", email: "", subject: "", message: "" })
        } catch (error) {
            toast.error(error.response?.data?.message || "Failed to send message. Please try again.")
        } finally {
            setIsSubmitting(false)
        }
    }

    return (
        <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Input
                    label="Full Name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="John Doe"
                    required
                    disabled={isSubmitting}
                />
                <Input
                    label="Email Address"
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="john@example.com"
                    required
                    disabled={isSubmitting}
                />
            </div>

            <Input
                label="Subject"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                placeholder="How can we help you?"
                required
                disabled={isSubmitting}
            />

            <div>
                <label htmlFor="message" className="block text-sm font-medium mb-1" style={{ color: "var(--primary-text)" }}>
                    Message
                </label>
                <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={5}
                    disabled={isSubmitting}
                    className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    style={{
                        backgroundColor: "var(--input-bg)",
                        borderColor: "var(--border-color)",
                        color: "var(--primary-text)",
                    }}
                    placeholder="Your message here..."
                />
            </div>

            <Button type="submit" disabled={isSubmitting} className="flex items-center justify-center w-full md:w-auto">
                {isSubmitting ? (
                    "Sending..."
                ) : (
                    <>
                        Send Message <Send size={18} className="ml-2" />
                    </>
                )}
            </Button>
        </form>
    )
}

export default ContactForm
