"use client"

import { motion } from "framer-motion"
import { forwardRef } from "react"

const Card = forwardRef(
    ({ children, className = "", variant = "default", hover = true, animate = true, ...props }, ref) => {
        const getVariantClasses = () => {
            switch (variant) {
                case "glass":
                    return "bg-white/10 backdrop-blur-md border border-white/20"
                case "gradient":
                    return "bg-gradient-to-br from-white to-blue-50 border border-blue-100"
                case "dark":
                    return "bg-gray-900 border border-gray-700"
                case "colorful":
                    return "bg-gradient-to-br from-pink-50 to-purple-50 border border-purple-200"
                default:
                    return "bg-white border border-gray-200"
            }
        }

        const baseClasses = `
    rounded-xl shadow-lg
    ${getVariantClasses()}
    ${hover ? "hover:shadow-xl hover:scale-[1.02] transition-all duration-300" : ""}
    ${className}
  `

        const cardContent = (
            <div ref={ref} className={baseClasses} {...props}>
                {children}
            </div>
        )

        if (!animate) return cardContent

        return (
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
                whileHover={hover ? { y: -5 } : {}}
            >
                {cardContent}
            </motion.div>
        )
    },
)

Card.displayName = "Card"

export default Card
