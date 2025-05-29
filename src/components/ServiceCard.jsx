"use client"

import { motion } from "framer-motion"
import { Link } from "react-router-dom"
import { Star, Code, Zap, Shield, Globe } from "lucide-react"

const ServiceCard = ({ service, delay = 0 }) => {
    const {
        _id,
        title,
        description,
        category,
        pricing,
        features,
        rating = 5,
        reviewCount = 0,
        duration,
        difficulty,
        isPopular,
        tags,
        isFeatured,
    } = service || {}

    const getPricingDisplay = () => {
        if (!pricing) return "Contact for pricing"

        switch (pricing.type) {
            case "hourly":
                return `$${pricing.rate}/hr`
            case "project":
                return `$${pricing.rate}/project`
            case "fixed":
                return `$${pricing.rate}`
            default:
                return "Contact for pricing"
        }
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

    const getCategoryIcon = () => {
        switch (category?.toLowerCase()) {
            case "web development":
                return <Code className="w-5 h-5" />
            case "ai solutions":
                return <Zap className="w-5 h-5" />
            case "security":
                return <Shield className="w-5 h-5" />
            default:
                return <Globe className="w-5 h-5" />
        }
    }

    return (
        <motion.div
            className="group relative bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border border-gray-100"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay }}
            viewport={{ once: true }}
            whileHover={{ y: -5 }}
        >
            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

            {/* Animated Border */}
            <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-blue-500 to-purple-500 opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
            <div className="absolute inset-[1px] rounded-xl bg-white"></div>

            <div className="relative p-6 z-10">
                {/* Header with Category and Badges */}
                <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2">
                        <div className="p-2 bg-blue-50 rounded-lg text-blue-600 group-hover:bg-blue-100 transition-colors">
                            {getCategoryIcon()}
                        </div>
                        <span className="text-sm font-medium text-gray-600">{category || "Service"}</span>
                    </div>

                    {difficulty && (
                        <span className="px-2 py-1 bg-gray-100 text-gray-600 rounded-full text-xs font-medium">{difficulty}</span>
                    )}
                </div>

                {/* Title */}
                <h3 className="text-xl font-bold mb-3 text-gray-800 group-hover:text-blue-600 transition-colors duration-300">
                    {title || "Service Title"}
                </h3>

                {/* Description */}
                <p className="text-gray-600 mb-4 line-clamp-3 leading-relaxed">
                    {description || "Service description will be displayed here."}
                </p>

                {/* Features Preview */}
                {features && features.length > 0 && (
                    <div className="mb-4">
                        <h4 className="text-sm font-semibold text-gray-700 mb-2">Key Features:</h4>
                        <ul className="space-y-1">
                            {features.slice(0, 3).map((feature, index) => (
                                <li key={index} className="flex items-center text-sm text-gray-600">
                                    <div className="w-1.5 h-1.5 bg-blue-500 rounded-full mr-2"></div>
                                    {feature}
                                </li>
                            ))}
                            {features.length > 3 && (
                                <li className="text-sm text-blue-600 font-medium">+{features.length - 3} more features</li>
                            )}
                        </ul>
                    </div>
                )}

                {/* Rating and Reviews */}
                <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2">
                        <div className="flex">{renderStars()}</div>
                        <span className="text-sm text-gray-600">
                            {rating}/5 ({reviewCount} reviews)
                        </span>
                    </div>
                </div>

                {/* Pricing */}
                <div className="flex items-center justify-between mb-4">
                    <div>
                        <span className="text-2xl font-bold text-blue-600">{getPricingDisplay()}</span>
                        {duration && <p className="text-sm text-gray-500">Duration: {duration}</p>}
                    </div>
                </div>

                {/* Tags */}
                {tags && tags.length > 0 && (
                    <div className="flex flex-wrap gap-2 mb-4">
                        {tags.slice(0, 3).map((tag, index) => (
                            <span
                                key={index}
                                className="px-2 py-1 bg-blue-50 text-blue-600 rounded-full text-xs font-medium hover:bg-blue-100 transition-colors"
                            >
                                {tag}
                            </span>
                        ))}
                    </div>
                )}

                {/* Action Button */}
                <Link
                    to={`/services/${_id}`}
                    className="block w-full py-3 px-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white text-center font-medium rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-300 transform hover:scale-105"
                >
                    View Details
                </Link>
            </div>

            {/* Status Badges */}
            <div className="absolute top-4 right-4 flex flex-col gap-2">
                {isPopular && (
                    <span className="bg-green-500 text-white text-xs px-2 py-1 rounded-full font-medium shadow-lg">
                        🔥 Popular
                    </span>
                )}
                {isFeatured && (
                    <span className="bg-purple-500 text-white text-xs px-2 py-1 rounded-full font-medium shadow-lg">
                        ⭐ Featured
                    </span>
                )}
            </div>
        </motion.div>
    )
}

export default ServiceCard
