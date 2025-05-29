"use client"

import { motion } from "framer-motion"
import { forwardRef } from "react"

const Button = forwardRef(
    (
        {
            children,
            variant = "primary",
            size = "md",
            className = "",
            animate = true,
            loading = false,
            disabled = false,
            as: Component = "button",
            ...props
        },
        ref,
    ) => {
        const getVariantClasses = () => {
            switch (variant) {
                case "primary":
                    return "bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:from-blue-700 hover:to-purple-700 shadow-lg hover:shadow-xl"
                case "secondary":
                    return "bg-gray-100 text-gray-900 hover:bg-gray-200 border border-gray-300"
                case "outline":
                    return "bg-transparent text-blue-600 border-2 border-blue-600 hover:bg-blue-600 hover:text-white"
                case "ghost":
                    return "bg-transparent text-gray-600 hover:bg-gray-100"
                case "danger":
                    return "bg-red-600 text-white hover:bg-red-700 shadow-lg hover:shadow-xl"
                case "success":
                    return "bg-green-600 text-white hover:bg-green-700 shadow-lg hover:shadow-xl"
                case "gradient":
                    return "bg-gradient-to-r from-pink-500 to-purple-600 text-white hover:from-pink-600 hover:to-purple-700 shadow-lg hover:shadow-xl"
                default:
                    return "bg-blue-600 text-white hover:bg-blue-700 shadow-lg hover:shadow-xl"
            }
        }

        const getSizeClasses = () => {
            switch (size) {
                case "sm":
                    return "px-3 py-1.5 text-sm"
                case "lg":
                    return "px-6 py-3 text-lg"
                case "xl":
                    return "px-8 py-4 text-xl"
                default:
                    return "px-4 py-2 text-base"
            }
        }

        const buttonClasses = `
    inline-flex items-center justify-center font-medium rounded-lg
    transition-all duration-300 transform
    ${getVariantClasses()}
    ${getSizeClasses()}
    ${disabled || loading ? "opacity-50 cursor-not-allowed" : "hover:scale-105 active:scale-95"}
    ${className}
  `

        const buttonContent = (
            <>
                {loading && (
                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                        <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        />
                    </svg>
                )}
                {children}
            </>
        )

        const buttonElement = (
            <Component ref={ref} className={buttonClasses} disabled={disabled || loading} {...props}>
                {buttonContent}
            </Component>
        )

        if (!animate) return buttonElement

        return (
            <motion.div
                whileHover={{ scale: disabled || loading ? 1 : 1.02 }}
                whileTap={{ scale: disabled || loading ? 1 : 0.98 }}
                className="inline-block"
            >
                {buttonElement}
            </motion.div>
        )
    },
)

Button.displayName = "Button"

export default Button
