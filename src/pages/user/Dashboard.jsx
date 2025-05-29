"use client"

import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import { useAuth } from "../../contexts/AuthContext"
import { userService } from "../../services/userService"
import { toast } from "../../components/ui/Toaster"
import Card from "../../components/ui/Card"
import Button from "../../components/ui/Button"
import Loader from "../../components/ui/Loader"
import { Clock, CheckCircle, AlertCircle, Calendar, FileText } from "lucide-react"

const Dashboard = () => {
    const { user } = useAuth()
    const [loading, setLoading] = useState(true)
    const [dashboardData, setDashboardData] = useState({
        applications: [],
        services: [],
        reviews: [],
        stats: {
            totalApplications: 0,
            totalServices: 0,
            totalReviews: 0,
            pendingApplications: 0,
        },
    })

    useEffect(() => {
        const fetchDashboardData = async () => {
            try {
                const response = await userService.getDashboard()
                setDashboardData(response.data)
            } catch (error) {
                console.error("Error fetching dashboard data:", error)
                toast.error("Failed to load dashboard data")
            } finally {
                setLoading(false)
            }
        }

        fetchDashboardData()
    }, [])

    const getStatusIcon = (status, type) => {
        const iconMap = {
            pending: <Clock className="text-yellow-500" size={20} />,
            reviewing: <FileText className="text-blue-500" size={20} />,
            interview: <Calendar className="text-purple-500" size={20} />,
            accepted: <CheckCircle className="text-green-500" size={20} />,
            rejected: <AlertCircle className="text-red-500" size={20} />,
            in_progress: <FileText className="text-blue-500" size={20} />,
            completed: <CheckCircle className="text-green-500" size={20} />,
            cancelled: <AlertCircle className="text-red-500" size={20} />,
        }
        return iconMap[status] || <Clock className="text-gray-500" size={20} />
    }

    const getStatusClass = (status) => {
        const classMap = {
            pending: "bg-yellow-100 text-yellow-800",
            reviewing: "bg-blue-100 text-blue-800",
            interview: "bg-purple-100 text-purple-800",
            accepted: "bg-green-100 text-green-800",
            rejected: "bg-red-100 text-red-800",
            in_progress: "bg-blue-100 text-blue-800",
            completed: "bg-green-100 text-green-800",
            cancelled: "bg-red-100 text-red-800",
        }
        return classMap[status] || "bg-gray-100 text-gray-800"
    }

    if (loading) {
        return <Loader text="Loading dashboard..." />
    }

    return (
        <div className="pt-24 pb-12">
            <div className="container-custom">
                <div className="mb-8">
                    <h1 className="text-3xl font-bold mb-2">Welcome, {user?.name || "User"}!</h1>
                    <p style={{ color: "var(--secondary-text)" }}>
                        Manage your internship applications, service requests, and reviews
                    </p>
                </div>

                {/* Stats Cards */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-10">
                    <Card className="p-6">
                        <div className="flex items-center justify-between mb-4">
                            <h2 className="text-xl font-semibold">Applications</h2>
                            <div className="w-10 h-10 rounded-full bg-gradient flex items-center justify-center text-white">
                                {dashboardData.stats.totalApplications}
                            </div>
                        </div>
                        <p style={{ color: "var(--secondary-text)" }} className="mb-4">
                            Track your internship applications
                        </p>
                        <Link to="/user/applications">
                            <Button variant="outline" className="w-full">
                                View All
                            </Button>
                        </Link>
                    </Card>

                    <Card className="p-6">
                        <div className="flex items-center justify-between mb-4">
                            <h2 className="text-xl font-semibold">Services</h2>
                            <div className="w-10 h-10 rounded-full bg-gradient flex items-center justify-center text-white">
                                {dashboardData.stats.totalServices}
                            </div>
                        </div>
                        <p style={{ color: "var(--secondary-text)" }} className="mb-4">
                            Manage your service requests
                        </p>
                        <Link to="/user/services">
                            <Button variant="outline" className="w-full">
                                View All
                            </Button>
                        </Link>
                    </Card>

                    <Card className="p-6">
                        <div className="flex items-center justify-between mb-4">
                            <h2 className="text-xl font-semibold">Reviews</h2>
                            <div className="w-10 h-10 rounded-full bg-gradient flex items-center justify-center text-white">
                                {dashboardData.stats.totalReviews}
                            </div>
                        </div>
                        <p style={{ color: "var(--secondary-text)" }} className="mb-4">
                            Your feedback and testimonials
                        </p>
                        <Link to="/user/reviews">
                            <Button variant="outline" className="w-full">
                                View All
                            </Button>
                        </Link>
                    </Card>

                    <Card className="p-6">
                        <div className="flex items-center justify-between mb-4">
                            <h2 className="text-xl font-semibold">Pending</h2>
                            <div className="w-10 h-10 rounded-full bg-gradient flex items-center justify-center text-white">
                                {dashboardData.stats.pendingApplications}
                            </div>
                        </div>
                        <p style={{ color: "var(--secondary-text)" }} className="mb-4">
                            Applications under review
                        </p>
                        <Link to="/user/applications?status=pending">
                            <Button variant="outline" className="w-full">
                                View Pending
                            </Button>
                        </Link>
                    </Card>
                </div>

                {/* Recent Activity */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {/* Recent Applications */}
                    <div>
                        <h2 className="text-2xl font-bold mb-4">Recent Applications</h2>
                        {dashboardData.applications.length > 0 ? (
                            <div className="space-y-4">
                                {dashboardData.applications.slice(0, 3).map((application) => (
                                    <Card key={application._id} className="p-4">
                                        <div className="flex justify-between items-start">
                                            <div>
                                                <h3 className="font-semibold text-lg">{application.internship?.title || "Internship"}</h3>
                                                <p style={{ color: "var(--secondary-text)" }} className="text-sm mb-2">
                                                    Applied: {new Date(application.createdAt).toLocaleDateString()}
                                                </p>
                                                <div
                                                    className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusClass(application.status)}`}
                                                >
                                                    {getStatusIcon(application.status)}
                                                    <span className="ml-1 capitalize">{application.status}</span>
                                                </div>
                                            </div>
                                            <Link to={`/user/applications/${application._id}`}>
                                                <Button variant="ghost" size="sm">
                                                    View
                                                </Button>
                                            </Link>
                                        </div>
                                    </Card>
                                ))}
                                {dashboardData.applications.length > 3 && (
                                    <div className="text-center mt-4">
                                        <Link to="/user/applications" className="link">
                                            View all applications
                                        </Link>
                                    </div>
                                )}
                            </div>
                        ) : (
                            <Card className="p-6 text-center">
                                <p style={{ color: "var(--secondary-text)" }} className="mb-4">
                                    You haven't applied for any internships yet
                                </p>
                                <Link to="/internships">
                                    <Button>Browse Internships</Button>
                                </Link>
                            </Card>
                        )}
                    </div>

                    {/* Recent Services */}
                    <div>
                        <h2 className="text-2xl font-bold mb-4">Recent Services</h2>
                        {dashboardData.services.length > 0 ? (
                            <div className="space-y-4">
                                {dashboardData.services.slice(0, 3).map((service) => (
                                    <Card key={service._id} className="p-4">
                                        <div className="flex justify-between items-start">
                                            <div>
                                                <h3 className="font-semibold text-lg">{service.service?.title || "Service"}</h3>
                                                <p style={{ color: "var(--secondary-text)" }} className="text-sm mb-2">
                                                    Requested: {new Date(service.createdAt).toLocaleDateString()}
                                                </p>
                                                <div
                                                    className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusClass(service.status)}`}
                                                >
                                                    {getStatusIcon(service.status)}
                                                    <span className="ml-1 capitalize">{service.status.replace("_", " ")}</span>
                                                </div>
                                            </div>
                                            <Link to={`/user/services/${service._id}`}>
                                                <Button variant="ghost" size="sm">
                                                    View
                                                </Button>
                                            </Link>
                                        </div>
                                    </Card>
                                ))}
                                {dashboardData.services.length > 3 && (
                                    <div className="text-center mt-4">
                                        <Link to="/user/services" className="link">
                                            View all services
                                        </Link>
                                    </div>
                                )}
                            </div>
                        ) : (
                            <Card className="p-6 text-center">
                                <p style={{ color: "var(--secondary-text)" }} className="mb-4">
                                    You haven't requested any services yet
                                </p>
                                <Link to="/services">
                                    <Button>Browse Services</Button>
                                </Link>
                            </Card>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Dashboard
