"use client"

import { motion } from "framer-motion"
import { MapPin, Phone, Mail, Clock } from "lucide-react"
import ContactForm from "../components/ContactForm"

const Contact = () => {
    const contactInfo = [
        {
            icon: <MapPin size={24} className="text-blue-600" />,
            title: "Our Location",
            details: ["123 Tech Park, Innovation Street", "Digital City, 12345", "India"],
        },
        {
            icon: <Phone size={24} className="text-blue-600" />,
            title: "Phone Number",
            details: ["+1 (555) 123-4567", "+1 (555) 765-4321"],
        },
        {
            icon: <Mail size={24} className="text-blue-600" />,
            title: "Email Address",
            details: ["info@ggprivatelimited.com", "support@ggprivatelimited.com"],
        },
        {
            icon: <Clock size={24} className="text-blue-600" />,
            title: "Working Hours",
            details: ["Monday - Friday: 9:00 AM - 6:00 PM", "Saturday: 10:00 AM - 2:00 PM", "Sunday: Closed"],
        },
    ]

    return (
        <main>
            {/* Hero Section */}
            <section className="pt-32 pb-20 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
                <div className="container-custom">
                    <motion.div
                        className="max-w-3xl"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                    >
                        <h1 className="heading-xl mb-6">Contact Us</h1>
                        <p className="text-xl text-white/90">
                            Have a question or want to work with us? Reach out to our team and we'll get back to you as soon as
                            possible.
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* Contact Information */}
            <section className="section-padding">
                <div className="container-custom">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                        {/* Contact Form */}
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.5 }}
                            viewport={{ once: true }}
                        >
                            <h2 className="heading-md mb-6">Send Us a Message</h2>
                            <ContactForm />
                        </motion.div>

                        {/* Contact Information */}
                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.5 }}
                            viewport={{ once: true }}
                        >
                            <h2 className="heading-md mb-6">Contact Information</h2>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                {contactInfo.map((info, index) => (
                                    <div key={index} className="bg-white rounded-xl shadow-md p-6">
                                        <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center mb-4">
                                            {info.icon}
                                        </div>
                                        <h3 className="text-xl font-bold mb-3">{info.title}</h3>
                                        <div className="space-y-1">
                                            {info.details.map((detail, i) => (
                                                <p key={i} className="text-gray-600">
                                                    {detail}
                                                </p>
                                            ))}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Map Section */}
            <section className="section-padding bg-gray-50">
                <div className="container-custom">
                    <motion.div
                        className="text-center max-w-3xl mx-auto mb-12"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        viewport={{ once: true }}
                    >
                        <h2 className="heading-lg mb-4">Our Location</h2>
                        <p className="text-gray-600 text-lg">Visit our office or get in touch with us through the contact form.</p>
                    </motion.div>

                    <motion.div
                        className="rounded-xl overflow-hidden shadow-lg h-[400px]"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        viewport={{ once: true }}
                    >
                        {/* Placeholder for map - in a real project, you would use Google Maps or similar */}
                        <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                            <p className="text-gray-600 text-lg">Map Placeholder - Google Maps would be integrated here</p>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* FAQ Section */}
            <section className="section-padding">
                <div className="container-custom">
                    <motion.div
                        className="text-center max-w-3xl mx-auto mb-12"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        viewport={{ once: true }}
                    >
                        <h2 className="heading-lg mb-4">Frequently Asked Questions</h2>
                        <p className="text-gray-600 text-lg">Find answers to common questions about our services and programs.</p>
                    </motion.div>

                    <div className="max-w-3xl mx-auto">
                        <motion.div
                            className="space-y-6"
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5 }}
                            viewport={{ once: true }}
                        >
                            {[
                                {
                                    question: "What services does GG Private Limited offer?",
                                    answer:
                                        "We offer a wide range of IT services including web development, AI solutions, custom software development, training programs, and more. Visit our Services page for more details.",
                                },
                                {
                                    question: "How can I apply for an internship program?",
                                    answer:
                                        "You can apply for our internship programs by filling out the contact form on this page or visiting our Internships page for more information about available opportunities.",
                                },
                                {
                                    question: "Do you offer remote services?",
                                    answer:
                                        "Yes, we offer remote services for clients worldwide. Our team is equipped to work with clients regardless of their location.",
                                },
                                {
                                    question: "How long does it take to complete a project?",
                                    answer:
                                        "Project timelines vary depending on the scope and complexity. We provide detailed timelines during the planning phase and keep our clients updated throughout the development process.",
                                },
                                {
                                    question: "Do you provide post-launch support?",
                                    answer:
                                        "Yes, we offer comprehensive post-launch support and maintenance services to ensure your solution continues to run smoothly.",
                                },
                            ].map((faq, index) => (
                                <div key={index} className="bg-white rounded-xl shadow-md p-6">
                                    <h3 className="text-xl font-bold mb-3">{faq.question}</h3>
                                    <p className="text-gray-600">{faq.answer}</p>
                                </div>
                            ))}
                        </motion.div>
                    </div>
                </div>
            </section>
        </main>
    )
}

export default Contact
