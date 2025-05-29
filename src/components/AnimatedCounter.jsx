"use client"

import { useState, useEffect, useRef } from "react"
import { motion, useInView } from "framer-motion"

const AnimatedCounter = ({ end, duration = 2, title, icon }) => {
    const [count, setCount] = useState(0)
    const ref = useRef(null)
    const isInView = useInView(ref, { once: true })

    useEffect(() => {
        if (isInView) {
            let startTime
            let animationFrame

            const updateCount = (timestamp) => {
                if (!startTime) startTime = timestamp
                const progress = Math.min((timestamp - startTime) / (duration * 1000), 1)

                setCount(Math.floor(progress * end))

                if (progress < 1) {
                    animationFrame = requestAnimationFrame(updateCount)
                }
            }

            animationFrame = requestAnimationFrame(updateCount)

            return () => cancelAnimationFrame(animationFrame)
        }
    }, [isInView, end, duration])

    return (
        <motion.div
            ref={ref}
            className="text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
        >
            <div className="flex justify-center mb-4">
                <div className="w-16 h-16 rounded-full bg-blue-100 flex items-center justify-center text-blue-600">{icon}</div>
            </div>
            <h3 className="text-4xl font-bold mb-2">{count}+</h3>
            <p className="text-gray-600">{title}</p>
        </motion.div>
    )
}

export default AnimatedCounter
