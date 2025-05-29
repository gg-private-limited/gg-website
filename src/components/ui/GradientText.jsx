"use client"

import { motion } from "framer-motion"

const GradientText = ({ children, gradient = "blue-purple", className = "", animate = true, ...props }) => {
    const getGradientClass = () => {
        switch (gradient) {
            case "blue-purple":
                return "bg-gradient-to-r from-blue-600 via-purple-600 to-blue-800"
            case "green-blue":
                return "bg-gradient-to-r from-green-500 via-blue-500 to-purple-600"
            case "pink-purple":
                return "bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-600"
            case "orange-red":
                return "bg-gradient-to-r from-orange-500 via-red-500 to-pink-600"
            case "rainbow":
                return "bg-gradient-to-r from-red-500 via-yellow-500 via-green-500 via-blue-500 to-purple-500"
            case "sunset":
                return "bg-gradient-to-r from-orange-400 via-pink-500 to-purple-600"
            case "ocean":
                return "bg-gradient-to-r from-blue-400 via-cyan-500 to-teal-600"
            default:
                return "bg-gradient-to-r from-blue-600 to-purple-600"
        }
    }

    const textElement = (
        <span className={`${getGradientClass()} bg-clip-text text-transparent ${className}`} {...props}>
            {children}
        </span>
    )

    if (!animate) return textElement

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="inline-block"
        >
            {textElement}
        </motion.div>
    )
}

export default GradientText
