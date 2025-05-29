"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import {
    Settings,
    Clock,
    CheckCircle,
    XCircle,
    Eye,
    MessageCircle,
    Calendar,
    DollarSign,
    Search,
    Plus,
} from "lucide-react"
import { userService } from "../../services/userService"
import Card from "../../components/ui/Card"
import Button from "../../components/ui/Button"
import Badge from "../../components/ui/Badge"
import GradientText from "../../components/ui/GradientText"
import Loader from "../../components/ui/Loader"
import { toast } from "react-hot-toast"

const Services = () => {
    const [serviceRequests, setServiceRequests] = useState([])
    const [loading, setLoading] = useState(true)
    const [filter, setFilter] = useState("all")
    const [searchTerm, setSearchTerm] = useState("")

    useEffect(() => {
        fetchServiceRequests()
    }, [])

    const fetchServiceRequests = async () => {
        try {
            const response = await userService.getServiceRequests()
            setServiceRequests(response.data)
        } catch (error) {
            toast.error("Failed to load service requests")
        } finally {
            setLoading(false)
        }
    }

    const getStatusIcon = (status) => {
        switch (status) {
            case "pending":
                return <Clock className="text-yellow-500" size={16} />
            case "in-progress":
                return <Settings className="text-blue-500" size={16} />
            case "completed":
                return <CheckCircle className="text-green-500" size={16} />
            case "cancelled":
                return <XCircle className="text-red-500" size={16} />
            default:
                return <Settings className="text-gray-500" size={16} />
        }
    }

    const getStatusColor = (status) => {
        switch (status) {
            case "pending":
                return "warning"
            case "in-progress":
                return "info"
            case "completed":
                return "success"
            case "cancelled":
                return "danger"
            default:
                return "outline"
        }
    }

    const getUrgencyColor = (urgency) => {
        switch (urgency) {
            case "high":
                return "danger"
            case "medium":
                return "warning"
            case "low":
                return "success"
            default:
                return "outline"
        }
    }

    const filteredRequests = serviceRequests.filter((request) => {
        const matchesFilter = filter === "all" || request.status === filter
        const matchesSearch =
            request.service?.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            request.service?.category?.toLowerCase().includes(searchTerm.toLowerCase())
        return matchesFilter && matchesSearch
    })

    if (loading) return <Loader fullScreen />

    return (
        <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-blue-50">
            <div className="container mx-auto px-4 py-8">
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
                    <div className="flex justify-between items-start">
                        <div>
                            <GradientText className="text-3xl font-bold mb-2">My Service Requests</GradientText>
                            <p className="text-gray-600">Manage your service requests and track their progress</p>
                        </div>
                        <Button onClick={() => (window.location.href = "/services")}>
                            <Plus size={16} />
                            Request New Service
                        </Button>
                    </div>
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
                                        placeholder="Search service requests..."
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
                                    <option value="in-progress">In Progress</option>
                                    <option value="completed">Completed</option>
                                    <option value="cancelled">Cancelled</option>
                                </select>
                            </div>
                        </div>
                    </Card>
                </motion.div>

                {/* Service Requests List */}
                <div className="space-y-6">
                    {filteredRequests.map((request, index) => (
                        <motion.div
                            key={request._id}
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
                                                    {request.service?.title || "Service Title"}
                                                </h3>
                                                <div className="flex items-center gap-4 text-sm text-gray-600">
                                                    <div className="flex items-center gap-1">
                                                        <Calendar size={14} />
                                                        <span>Requested {new Date(request.createdAt).toLocaleDateString()}</span>
                                                    </div>
                                                    {request.service?.pricing && (
                                                        <div className="flex items-center gap-1">
                                                            <DollarSign size={14} />
                                                            <span>${request.service.pricing.amount}</span>
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                            <div className="flex items-center gap-2">
                                                {getStatusIcon(request.status)}
                                                <Badge variant={getStatusColor(request.status)}>{request.status}</Badge>
                                            </div>
                                        </div>

                                        <p className="text-gray-700 mb-4 line-clamp-2">{request.message}</p>

                                        <div className="flex flex-wrap gap-2 mb-4">
                                            <Badge variant="outline">{request.service?.category || "Category"}</Badge>
                                            <Badge variant={getUrgencyColor(request.urgency)}>{request.urgency} priority</Badge>
                                            {request.service?.pricing?.type && (
                                                <Badge variant="outline">{request.service.pricing.type}</Badge>
                                            )}
                                        </div>

                                        {/* Progress Bar */}
                                        {request.status === "in-progress" && (
                                            <div className="mb-4">
                                                <div className="flex justify-between text-sm text-gray-600 mb-1">
                                                    <span>Progress</span>
                                                    <span>{request.progress || 0}%</span>
                                                </div>
                                                <div className="w-full bg-gray-200 rounded-full h-2">
                                                    <div
                                                        className="bg-blue-500 h-2 rounded-full transition-all duration-300"
                                                        style={{ width: `${request.progress || 0}%` }}
                                                    ></div>
                                                </div>
                                            </div>
                                        )}
                                    </div>

                                    <div className="flex flex-col gap-2 lg:w-48">
                                        <Button variant="outline" className="w-full">
                                            <Eye size={16} />
                                            View Details
                                        </Button>
                                        <Button variant="outline" className="w-full">
                                            <MessageCircle size={16} />
                                            Contact Support
                                        </Button>
                                    </div>
                                </div>

                                {request.adminNotes && (
                                    <div className="mt-4 p-4 bg-blue-50 rounded-lg">
                                        <h4 className="font-semibold text-blue-900 mb-2">Admin Notes</h4>
                                        <p className="text-blue-800">{request.adminNotes}</p>
                                    </div>
                                )}

                                {request.status === "completed" && (
                                    <div className="mt-4 p-4 bg-green-50 rounded-lg">
                                        <div className="flex items-center justify-between">
                                            <div>
                                                <h4 className="font-semibold text-green-900 mb-1">Service Completed</h4>
                                                <p className="text-green-800 text-sm">
                                                    Completed on {new Date(request.completedAt).toLocaleDateString()}
                                                </p>
                                            </div>
                                            <Button variant="outline" size="sm">
                                                Leave Review
                                            </Button>
                                        </div>
                                    </div>
                                )}
                            </Card>
                        </motion.div>
                    ))}

                    {filteredRequests.length === 0 && (
                        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-12">
                            <Settings className="mx-auto text-gray-400 mb-4" size={48} />
                            <h3 className="text-xl font-semibold text-gray-900 mb-2">No Service Requests Found</h3>
                            <p className="text-gray-600 mb-6">
                                {searchTerm || filter !== "all"
                                    ? "Try adjusting your search or filter criteria"
                                    : "You haven't requested any services yet"}
                            </p>
                            {!searchTerm && filter === "all" && (
                                <Button onClick={() => (window.location.href = "/services")}>Browse Services</Button>
                            )}
                        </motion.div>
                    )}
                </div>
            </div>
        </div>
    )
}

export default Services
