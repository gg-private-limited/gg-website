"use client"

import { motion } from "framer-motion"
import { Home, ArrowLeft, Search } from "lucide-react"
import { useNavigate } from "react-router-dom"
import Button from "../../components/ui/Button"
import GradientText from "../../components/ui/GradientText"

const NotFound = () => {
    const navigate = useNavigate()

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center">
            <div className="container mx-auto px-4 text-center">
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-2xl mx-auto">
                    {/* 404 Animation */}
                    <motion.div
                        initial={{ scale: 0.8 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                        className="mb-8"
                    >
                        <GradientText className="text-9xl font-bold mb-4">404</GradientText>
                    </motion.div>

                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }}>
                        <h1 className="text-3xl font-bold text-gray-900 mb-4">Oops! Page Not Found</h1>
                        <p className="text-lg text-gray-600 mb-8">
                            The page you're looking for doesn't exist or has been moved. Don't worry, let's get you back on track!
                        </p>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.6 }}
                        className="flex flex-col sm:flex-row gap-4 justify-center"
                    >
                        <Button onClick={() => navigate("/")} size="lg">
                            <Home size={20} />
                            Go Home
                        </Button>
                        <Button onClick={() => navigate(-1)} variant="outline" size="lg">
                            <ArrowLeft size={20} />
                            Go Back
                        </Button>
                        <Button onClick={() => navigate("/services")} variant="outline" size="lg">
                            <Search size={20} />
                            Browse Services
                        </Button>
                    </motion.div>

                    {/* Floating Elements */}
                    <div className="absolute inset-0 overflow-hidden pointer-events-none">
                        <motion.div
                            animate={{
                                y: [0, -20, 0],
                                rotate: [0, 5, 0],
                            }}
                            transition={{
                                duration: 3,
                                repeat: Number.POSITIVE_INFINITY,
                                ease: "easeInOut",
                            }}
                            className="absolute top-1/4 left-1/4 w-16 h-16 bg-blue-200 rounded-full opacity-20"
                        />
                        <motion.div
                            animate={{
                                y: [0, 20, 0],
                                rotate: [0, -5, 0],
                            }}
                            transition={{
                                duration: 4,
                                repeat: Number.POSITIVE_INFINITY,
                                ease: "easeInOut",
                                delay: 1,
                            }}
                            className="absolute top-1/3 right-1/4 w-12 h-12 bg-purple-200 rounded-full opacity-20"
                        />
                        <motion.div
                            animate={{
                                y: [0, -15, 0],
                                x: [0, 10, 0],
                            }}
                            transition={{
                                duration: 5,
                                repeat: Number.POSITIVE_INFINITY,
                                ease: "easeInOut",
                                delay: 2,
                            }}
                            className="absolute bottom-1/4 left-1/3 w-20 h-20 bg-pink-200 rounded-full opacity-20"
                        />
                    </div>
                </motion.div>
            </div>
        </div>
    )
}

export default NotFound
