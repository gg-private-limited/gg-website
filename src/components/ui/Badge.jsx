"use client"

import { motion } from "framer-motion"

const Badge = ({ children, variant = "default", size = "md", className = "", animate = true, ...props }) => {
    const getVariantClasses = () => {
        switch (variant) {
            case "primary":
                return "bg-blue-100 text-blue-800 border-blue-200"
            case "secondary":
                return "bg-gray-100 text-gray-800 border-gray-200"
            case "success":
                return "bg-green-100 text-green-800 border-green-200"
            case "warning":
                return "bg-yellow-100 text-yellow-800 border-yellow-200"
            case "danger":
                return "bg-red-100 text-red-800 border-red-200"
            case "info":
                return "bg-cyan-100 text-cyan-800 border-cyan-200"
            case "gradient":
                return "bg-gradient-to-r from-blue-500 to-purple-600 text-white border-transparent"
            case "gold":
                return "bg-gradient-to-r from-yellow-400 to-orange-500 text-white border-transparent"
            case "outline":
                return "bg-transparent text-gray-600 border-gray-300"
            default:
                return "bg-gray-100 text-gray-800 border-gray-200"
        }
    }

    const getSizeClasses = () => {
        switch (size) {
            case "sm":
                return "px-2 py-1 text-xs"
            case "lg":
                return "px-4 py-2 text-base"
            case "xl":
                return "px-6 py-3 text-lg"
            default:
                return "px-3 py-1 text-sm"
        }
    }

    const badgeClasses = `
    inline-flex items-center font-medium rounded-full border
    ${getVariantClasses()}
    ${getSizeClasses()}
    ${className}
  `

    const badgeElement = (
        <span className={badgeClasses} {...props}>
            {children}
        </span>
    )

    if (!animate) return badgeElement

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
            viewport={{ once: true }}
            whileHover={{ scale: 1.05 }}
            className="inline-block"
        >
            {badgeElement}
        </motion.div>
    )
}

export default Badge
