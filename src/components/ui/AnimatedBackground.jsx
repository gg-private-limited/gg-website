"use client"

import { motion } from "framer-motion"
import { useEffect, useState } from "react"

const AnimatedBackground = ({ children, variant = "default" }) => {
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })

    useEffect(() => {
        const handleMouseMove = (e) => {
            setMousePosition({
                x: e.clientX / window.innerWidth,
                y: e.clientY / window.innerHeight,
            })
        }

        window.addEventListener("mousemove", handleMouseMove)
        return () => window.removeEventListener("mousemove", handleMouseMove)
    }, [])

    const getBackgroundVariant = () => {
        switch (variant) {
            case "gradient":
                return "bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50"
            case "dark":
                return "bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900"
            case "colorful":
                return "bg-gradient-to-br from-pink-50 via-purple-50 to-indigo-50"
            default:
                return "bg-gradient-to-br from-blue-50 to-purple-50"
        }
    }

    return (
        <div className={`relative overflow-hidden ${getBackgroundVariant()}`}>
            {/* Animated Background Elements */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                {/* Floating Orbs */}
                {[...Array(6)].map((_, i) => (
                    <motion.div
                        key={i}
                        className={`absolute rounded-full opacity-20 ${i % 3 === 0 ? "bg-blue-400" : i % 3 === 1 ? "bg-purple-400" : "bg-pink-400"
                            }`}
                        style={{
                            width: `${100 + i * 50}px`,
                            height: `${100 + i * 50}px`,
                            left: `${10 + i * 15}%`,
                            top: `${10 + i * 10}%`,
                        }}
                        animate={{
                            x: [0, 30, 0],
                            y: [0, -30, 0],
                            scale: [1, 1.1, 1],
                        }}
                        transition={{
                            duration: 8 + i * 2,
                            repeat: Number.POSITIVE_INFINITY,
                            ease: "easeInOut",
                        }}
                    />
                ))}

                {/* Interactive Mouse Follower */}
                <motion.div
                    className="absolute w-96 h-96 rounded-full bg-gradient-to-r from-blue-400/10 to-purple-400/10 blur-3xl"
                    animate={{
                        x: mousePosition.x * window.innerWidth - 192,
                        y: mousePosition.y * window.innerHeight - 192,
                    }}
                    transition={{ type: "spring", stiffness: 50, damping: 30 }}
                />

                {/* Grid Pattern */}
                <div className="absolute inset-0 opacity-5">
                    <div
                        className="w-full h-full"
                        style={{
                            backgroundImage: `
                linear-gradient(rgba(59, 130, 246, 0.1) 1px, transparent 1px),
                linear-gradient(90deg, rgba(59, 130, 246, 0.1) 1px, transparent 1px)
              `,
                            backgroundSize: "50px 50px",
                        }}
                    />
                </div>

                {/* Animated Lines */}
                <svg className="absolute inset-0 w-full h-full" xmlns="http://www.w3.org/2000/svg">
                    <defs>
                        <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                            <stop offset="0%" stopColor="rgba(59, 130, 246, 0.2)" />
                            <stop offset="100%" stopColor="rgba(147, 51, 234, 0.2)" />
                        </linearGradient>
                    </defs>
                    {[...Array(3)].map((_, i) => (
                        <motion.path
                            key={i}
                            d={`M${i * 200},0 Q${i * 200 + 100},${100 + i * 50} ${i * 200 + 200},${200 + i * 30}`}
                            stroke="url(#lineGradient)"
                            strokeWidth="2"
                            fill="none"
                            initial={{ pathLength: 0, opacity: 0 }}
                            animate={{ pathLength: 1, opacity: 1 }}
                            transition={{
                                duration: 3,
                                delay: i * 0.5,
                                repeat: Number.POSITIVE_INFINITY,
                                repeatType: "reverse",
                            }}
                        />
                    ))}
                </svg>
            </div>

            {/* Content */}
            <div className="relative z-10">{children}</div>
        </div>
    )
}

export default AnimatedBackground
