"use client"

import { motion } from "framer-motion"
import { Calendar, Clock, MapPin, Users, DollarSign, AlertCircle } from "lucide-react"
import { Link } from "react-router-dom"
import { useState, useEffect } from "react"

const InternshipCard = ({ internship, delay = 0 }) => {
    const {
        _id,
        title,
        description,
        department,
        location,
        duration,
        startDate,
        endDate,
        requirements,
        benefits,
        stipend,
        applicationDeadline,
        maxApplications = 100,
        currentApplications = 0,
        status,
        isRemote,
        experienceLevel,
    } = internship || {}

    const [timeRemaining, setTimeRemaining] = useState("")
    const [isUrgent, setIsUrgent] = useState(false)

    useEffect(() => {
        if (!applicationDeadline) return

        const updateTimeRemaining = () => {
            const now = new Date()
            const deadline = new Date(applicationDeadline)
            const timeDiff = deadline - now

            if (timeDiff <= 0) {
                setTimeRemaining("Expired")
                return
            }

            const days = Math.floor(timeDiff / (1000 * 60 * 60 * 24))
            const hours = Math.floor((timeDiff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))

            if (days > 0) {
                setTimeRemaining(`${days} day${days > 1 ? "s" : ""} left`)
                setIsUrgent(days <= 3)
            } else {
                setTimeRemaining(`${hours} hour${hours > 1 ? "s" : ""} left`)
                setIsUrgent(true)
            }
        }

        updateTimeRemaining()
        const interval = setInterval(updateTimeRemaining, 60000) // Update every minute

        return () => clearInterval(interval)
    }, [applicationDeadline])

    const spotsLeft = maxApplications - currentApplications
    const applicationProgress = (currentApplications / maxApplications) * 100

    const formatDate = (dateString) => {
        if (!dateString) return "TBD"
        return new Date(dateString).toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
            year: "numeric",
        })
    }

    return (
        <motion.div
            className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 border border-gray-100"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay }}
            viewport={{ once: true }}
            whileHover={{ y: -3 }}
        >
            {/* Header */}
            <div className="p-6 pb-4">
                <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                        <Link to={`/internships/${_id}`} className="hover:text-blue-600 transition-colors">
                            <h3 className="text-xl font-bold text-gray-800 mb-2 line-clamp-2">{title || "Internship Position"}</h3>
                        </Link>
                        <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                            {description || "Internship description will be displayed here."}
                        </p>
                    </div>
                </div>

                {/* Badges */}
                <div className="flex flex-wrap gap-2 mb-4">
                    {department && (
                        <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-medium">{department}</span>
                    )}
                    {isRemote && (
                        <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs font-medium">🏠 Remote</span>
                    )}
                    {experienceLevel && (
                        <span className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-xs font-medium">
                            {experienceLevel}
                        </span>
                    )}
                    {status === "urgent" && (
                        <span className="px-3 py-1 bg-red-100 text-red-700 rounded-full text-xs font-medium animate-pulse">
                            🚨 Urgent
                        </span>
                    )}
                </div>

                {/* Details */}
                <div className="space-y-3 mb-4">
                    <div className="flex items-center text-gray-600 text-sm">
                        <Clock size={16} className="mr-2 text-blue-500" />
                        <span>{duration || "Duration TBD"}</span>
                    </div>

                    <div className="flex items-center text-gray-600 text-sm">
                        <MapPin size={16} className="mr-2 text-blue-500" />
                        <span>{location || "Location TBD"}</span>
                    </div>

                    <div className="flex items-center text-gray-600 text-sm">
                        <Calendar size={16} className="mr-2 text-blue-500" />
                        <span>Starts: {formatDate(startDate)}</span>
                    </div>

                    {stipend && (
                        <div className="flex items-center text-gray-600 text-sm">
                            <DollarSign size={16} className="mr-2 text-green-500" />
                            <span className="font-medium text-green-600">${stipend}/month</span>
                        </div>
                    )}
                </div>

                {/* Requirements Preview */}
                {requirements && requirements.length > 0 && (
                    <div className="mb-4">
                        <h4 className="text-sm font-semibold text-gray-700 mb-2">Requirements:</h4>
                        <ul className="space-y-1">
                            {requirements.slice(0, 2).map((req, index) => (
                                <li key={index} className="flex items-start text-sm text-gray-600">
                                    <div className="w-1.5 h-1.5 bg-blue-500 rounded-full mr-2 mt-2 flex-shrink-0"></div>
                                    {req}
                                </li>
                            ))}
                            {requirements.length > 2 && (
                                <li className="text-sm text-blue-600 font-medium">+{requirements.length - 2} more requirements</li>
                            )}
                        </ul>
                    </div>
                )}

                {/* Application Progress */}
                {maxApplications > 0 && (
                    <div className="mb-4">
                        <div className="flex items-center justify-between mb-2">
                            <div className="flex items-center text-sm text-gray-600">
                                <Users size={16} className="mr-2 text-blue-500" />
                                <span>
                                    {currentApplications}/{maxApplications} Applications
                                </span>
                            </div>
                            {spotsLeft <= 10 && spotsLeft > 0 && (
                                <span className="text-xs text-orange-600 font-medium">Only {spotsLeft} spots left!</span>
                            )}
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                            <div
                                className={`h-2 rounded-full transition-all duration-300 ${applicationProgress > 80 ? "bg-red-500" : applicationProgress > 60 ? "bg-orange-500" : "bg-blue-500"
                                    }`}
                                style={{ width: `${Math.min(applicationProgress, 100)}%` }}
                            ></div>
                        </div>
                    </div>
                )}

                {/* Deadline Warning */}
                {applicationDeadline && (
                    <div className={`flex items-center text-sm mb-4 ${isUrgent ? "text-red-600" : "text-gray-600"}`}>
                        <AlertCircle size={16} className={`mr-2 ${isUrgent ? "text-red-500" : "text-blue-500"}`} />
                        <span className={isUrgent ? "font-medium" : ""}>Deadline: {timeRemaining}</span>
                    </div>
                )}
            </div>

            {/* Footer */}
            <div className="px-6 py-4 bg-gray-50 border-t border-gray-100">
                <Link
                    to={`/internships/${_id}`}
                    className="block w-full py-2 px-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white text-center font-medium rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-300 transform hover:scale-105"
                >
                    View Details & Apply
                </Link>
            </div>

            {/* Urgent Badge */}
            {isUrgent && applicationDeadline && (
                <div className="absolute top-4 right-4">
                    <span className="bg-red-500 text-white text-xs px-2 py-1 rounded-full font-medium shadow-lg animate-pulse">
                        ⏰ Urgent
                    </span>
                </div>
            )}
        </motion.div>
    )
}

export default InternshipCard
