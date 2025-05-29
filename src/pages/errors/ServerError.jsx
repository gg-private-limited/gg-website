"use client"

import { motion } from "framer-motion"
import { RefreshCw, Home, AlertTriangle } from "lucide-react"
import { useNavigate } from "react-router-dom"
import Button from "../../components/ui/Button"
import GradientText from "../../components/ui/GradientText"

const ServerError = () => {
    const navigate = useNavigate()

    const handleRefresh = () => {
        window.location.reload()
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-red-50 via-white to-orange-50 flex items-center justify-center">
            <div className="container mx-auto px-4 text-center">
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-2xl mx-auto">
                    {/* Error Icon */}
                    <motion.div
                        initial={{ scale: 0.8 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                        className="mb-8"
                    >
                        <div className="mx-auto w-32 h-32 bg-gradient-to-r from-red-500 to-orange-500 rounded-full flex items-center justify-center mb-6">
                            <AlertTriangle className="text-white" size={64} />
                        </div>
                        <GradientText className="text-6xl font-bold mb-4">500</GradientText>
                    </motion.div>

                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }}>
                        <h1 className="text-3xl font-bold text-gray-900 mb-4">Server Error</h1>
                        <p className="text-lg text-gray-600 mb-8">
                            Something went wrong on our end. We're working to fix this issue. Please try again in a few moments.
                        </p>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.6 }}
                        className="flex flex-col sm:flex-row gap-4 justify-center"
                    >
                        <Button onClick={handleRefresh} size="lg">
                            <RefreshCw size={20} />
                            Try Again
                        </Button>
                        <Button onClick={() => navigate("/")} variant="outline" size="lg">
                            <Home size={20} />
                            Go Home
                        </Button>
                    </motion.div>

                    {/* Additional Info */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.8 }}
                        className="mt-12 p-6 bg-white/50 rounded-lg border"
                    >
                        <h3 className="font-semibold text-gray-900 mb-2">What can you do?</h3>
                        <ul className="text-sm text-gray-600 space-y-1">
                            <li>• Refresh the page to try again</li>
                            <li>• Check your internet connection</li>
                            <li>• Contact support if the problem persists</li>
                        </ul>
                    </motion.div>
                </motion.div>
            </div>
        </div>
    )
}

export default ServerError
