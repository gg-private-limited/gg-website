"use client"

import { motion } from "framer-motion"
import { Star, CheckCircle, Quote } from "lucide-react"

const TestimonialCard = ({ testimonial, delay = 0 }) => {
    const { name, role, company, content, rating = 5, avatar, serviceUsed, date, verified = false } = testimonial || {}

    const formatDate = (dateString) => {
        if (!dateString) return ""
        return new Date(dateString).toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
            year: "numeric",
        })
    }

    const renderStars = () => {
        const stars = []
        for (let i = 0; i < 5; i++) {
            stars.push(
                <Star key={i} size={16} className={i < rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"} />,
            )
        }
        return stars
    }

    return (
        <motion.div
            className="relative bg-white rounded-xl shadow-lg p-6 flex flex-col h-full overflow-hidden border border-gray-100"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            whileHover={{ scale: 1.02, y: -5 }}
            transition={{ duration: 0.4, delay }}
            viewport={{ once: true }}
        >
            {/* Background Gradient */}
            <div className="absolute inset-0 bg-gradient-to-br from-blue-50/50 to-purple-50/50 rounded-xl"></div>

            {/* Quote Icon */}
            <Quote className="absolute top-4 right-4 text-blue-200 opacity-50 h-8 w-8" />

            <div className="relative z-10">
                {/* Header */}
                <div className="flex items-center mb-4">
                    <div className="w-12 h-12 rounded-full overflow-hidden mr-4 bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center">
                        {avatar ? (
                            <img
                                src={avatar || "/placeholder.svg"}
                                alt={name}
                                className="w-full h-full object-cover"
                                onError={(e) => {
                                    e.target.style.display = "none"
                                    e.target.nextSibling.style.display = "flex"
                                }}
                            />
                        ) : null}
                        <span className="text-white font-bold text-lg">{name ? name.slice(0, 2).toUpperCase() : "U"}</span>
                    </div>

                    <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                            <h4 className="font-bold text-lg text-gray-800">{name || "Anonymous User"}</h4>
                            {verified && <CheckCircle className="text-green-500 h-5 w-5" />}
                        </div>
                        <p className="text-sm text-gray-600">
                            {role || "Customer"}
                            {company && `, ${company}`}
                        </p>
                    </div>
                </div>

                {/* Rating */}
                <div className="flex items-center gap-2 mb-4">
                    <div className="flex">{renderStars()}</div>
                    <span className="text-sm text-gray-600 font-medium">{rating}/5</span>
                </div>

                {/* Content */}
                <blockquote className="text-gray-700 italic flex-grow leading-relaxed mb-4">
                    "{content || "Great service and excellent support! Highly recommended."}"
                </blockquote>

                {/* Footer */}
                <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                    {/* Service Badge */}
                    {serviceUsed && (
                        <span className="bg-blue-100 text-blue-700 text-xs rounded-full px-3 py-1 font-medium">{serviceUsed}</span>
                    )}

                    {/* Date */}
                    {date && <span className="text-gray-500 text-xs">{formatDate(date)}</span>}
                </div>
            </div>
        </motion.div>
    )
}

export default TestimonialCard
