"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { FileText, Clock, CheckCircle, XCircle, Eye, Download, Calendar, MapPin, Search } from "lucide-react"
import { userService } from "../../services/userService"
import Card from "../../components/ui/Card"
import Button from "../../components/ui/Button"
import Badge from "../../components/ui/Badge"
import GradientText from "../../components/ui/GradientText"
import Loader from "../../components/ui/Loader"
import { toast } from "react-hot-toast"

const Applications = () => {
    const [applications, setApplications] = useState([])
    const [loading, setLoading] = useState(true)
    const [filter, setFilter] = useState("all")
    const [searchTerm, setSearchTerm] = useState("")

    useEffect(() => {
        fetchApplications()
    }, [])

    const fetchApplications = async () => {
        try {
            const response = await userService.getApplications()
            setApplications(response.data)
        } catch (error) {
            toast.error("Failed to load applications")
        } finally {
            setLoading(false)
        }
    }

    const getStatusIcon = (status) => {
        switch (status) {
            case "pending":
                return <Clock className="text-yellow-500" size={16} />
            case "approved":
                return <CheckCircle className="text-green-500" size={16} />
            case "rejected":
                return <XCircle className="text-red-500" size={16} />
            default:
                return <FileText className="text-gray-500" size={16} />
        }
    }

    const getStatusColor = (status) => {
        switch (status) {
            case "pending":
                return "warning"
            case "approved":
                return "success"
            case "rejected":
                return "danger"
            default:
                return "outline"
        }
    }

    const filteredApplications = applications.filter((app) => {
        const matchesFilter = filter === "all" || app.status === filter
        const matchesSearch =
            app.internship?.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            app.internship?.category?.toLowerCase().includes(searchTerm.toLowerCase())
        return matchesFilter && matchesSearch
    })

    if (loading) return <Loader fullScreen />

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
            <div className="container mx-auto px-4 py-8">
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
                    <GradientText className="text-3xl font-bold mb-2">My Applications</GradientText>
                    <p className="text-gray-600">Track your internship applications and their status</p>
                </motion.div>

                {/* Filters */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="mb-6"
                >
                    <Card className="p-6">
                        <div className="flex flex-col md:flex-row gap-4">
                            <div className="flex-1">
                                <div className="relative">
                                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                                    <input
                                        type="text"
                                        placeholder="Search applications..."
                                        value={searchTerm}
                                        onChange={(e) => setSearchTerm(e.target.value)}
                                        className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    />
                                </div>
                            </div>
                            <div className="flex gap-2">
                                <select
                                    value={filter}
                                    onChange={(e) => setFilter(e.target.value)}
                                    className="px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                >
                                    <option value="all">All Status</option>
                                    <option value="pending">Pending</option>
                                    <option value="approved">Approved</option>
                                    <option value="rejected">Rejected</option>
                                </select>
                            </div>
                        </div>
                    </Card>
                </motion.div>

                {/* Applications List */}
                <div className="space-y-6">
                    {filteredApplications.map((application, index) => (
                        <motion.div
                            key={application._id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                        >
                            <Card className="p-6 hover:shadow-lg transition-shadow">
                                <div className="flex flex-col lg:flex-row lg:items-center gap-4">
                                    <div className="flex-1">
                                        <div className="flex items-start justify-between mb-3">
                                            <div>
                                                <h3 className="text-xl font-semibold text-gray-900 mb-1">
                                                    {application.internship?.title || "Internship Title"}
                                                </h3>
                                                <div className="flex items-center gap-4 text-sm text-gray-600">
                                                    <div className="flex items-center gap-1">
                                                        <MapPin size={14} />
                                                        <span>{application.internship?.location || "Location"}</span>
                                                    </div>
                                                    <div className="flex items-center gap-1">
                                                        <Calendar size={14} />
                                                        <span>Applied {new Date(application.createdAt).toLocaleDateString()}</span>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="flex items-center gap-2">
                                                {getStatusIcon(application.status)}
                                                <Badge variant={getStatusColor(application.status)}>{application.status}</Badge>
                                            </div>
                                        </div>

                                        <p className="text-gray-700 mb-4 line-clamp-2">{application.coverLetter}</p>

                                        <div className="flex flex-wrap gap-2 mb-4">
                                            <Badge variant="outline">{application.internship?.category || "Category"}</Badge>
                                            <Badge variant="outline">{application.internship?.type || "Type"}</Badge>
                                            {application.internship?.remote && <Badge variant="info">Remote</Badge>}
                                        </div>
                                    </div>

                                    <div className="flex flex-col gap-2 lg:w-48">
                                        <Button variant="outline" className="w-full">
                                            <Eye size={16} />
                                            View Details
                                        </Button>
                                        {application.resume && (
                                            <Button variant="outline" className="w-full">
                                                <Download size={16} />
                                                Download Resume
                                            </Button>
                                        )}
                                    </div>
                                </div>

                                {application.feedback && (
                                    <div className="mt-4 p-4 bg-gray-50 rounded-lg">
                                        <h4 className="font-semibold text-gray-900 mb-2">Feedback</h4>
                                        <p className="text-gray-700">{application.feedback}</p>
                                    </div>
                                )}
                            </Card>
                        </motion.div>
                    ))}

                    {filteredApplications.length === 0 && (
                        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-12">
                            <FileText className="mx-auto text-gray-400 mb-4" size={48} />
                            <h3 className="text-xl font-semibold text-gray-900 mb-2">No Applications Found</h3>
                            <p className="text-gray-600 mb-6">
                                {searchTerm || filter !== "all"
                                    ? "Try adjusting your search or filter criteria"
                                    : "You haven't applied to any internships yet"}
                            </p>
                            {!searchTerm && filter === "all" && (
                                <Button onClick={() => (window.location.href = "/internships")}>Browse Internships</Button>
                            )}
                        </motion.div>
                    )}
                </div>
            </div>
        </div>
    )
}

export default Applications
