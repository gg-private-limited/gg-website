"use client"

import { useState, useEffect } from "react"
import { useParams, useNavigate } from "react-router-dom"
import { motion } from "framer-motion"
import {
    Star,
    Clock,
    Users,
    CheckCircle,
    ArrowLeft,
    Share2,
    Heart,
    MessageCircle,
    DollarSign,
    Award,
    Zap,
} from "lucide-react"
import { serviceService } from "../services/serviceService"
import { useAuth } from "../contexts/AuthContext"
import Card from "../components/ui/Card"
import Button from "../components/ui/Button"
import Badge from "../components/ui/Badge"
import GradientText from "../components/ui/GradientText"
import Loader from "../components/ui/Loader"
import { toast } from "react-hot-toast"

const ServiceDetail = () => {
    const { id } = useParams()
    const navigate = useNavigate()
    const { user } = useAuth()
    const [service, setService] = useState(null)
    const [loading, setLoading] = useState(true)
    const [requesting, setRequesting] = useState(false)
    const [reviews, setReviews] = useState([])
    const [newReview, setNewReview] = useState({ rating: 5, comment: "" })

    useEffect(() => {
        fetchService()
        fetchReviews()
    }, [id])

    const fetchService = async () => {
        try {
            const response = await serviceService.getById(id)
            setService(response.data)
        } catch (error) {
            toast.error("Failed to load service details")
            navigate("/services")
        } finally {
            setLoading(false)
        }
    }

    const fetchReviews = async () => {
        try {
            const response = await serviceService.getReviews(id)
            setReviews(response.data)
        } catch (error) {
            console.error("Failed to load reviews:", error)
        }
    }

    const handleServiceRequest = async () => {
        if (!user) {
            toast.error("Please login to request a service")
            navigate("/login")
            return
        }

        setRequesting(true)
        try {
            await serviceService.requestService(id, {
                message: "I would like to request this service",
                urgency: "medium",
            })
            toast.success("Service request submitted successfully!")
        } catch (error) {
            toast.error("Failed to submit service request")
        } finally {
            setRequesting(false)
        }
    }

    const handleReviewSubmit = async (e) => {
        e.preventDefault()
        if (!user) {
            toast.error("Please login to submit a review")
            return
        }

        try {
            await serviceService.addReview(id, newReview)
            toast.success("Review submitted successfully!")
            setNewReview({ rating: 5, comment: "" })
            fetchReviews()
            fetchService() // Refresh to update rating
        } catch (error) {
            toast.error("Failed to submit review")
        }
    }

    if (loading) return <Loader fullScreen />

    if (!service) return null

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
            <div className="container mx-auto px-4 py-8">
                {/* Back Button */}
                <motion.button
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    onClick={() => navigate("/services")}
                    className="flex items-center gap-2 text-gray-600 hover:text-blue-600 mb-6 transition-colors"
                >
                    <ArrowLeft size={20} />
                    Back to Services
                </motion.button>

                <div className="grid lg:grid-cols-3 gap-8">
                    {/* Main Content */}
                    <div className="lg:col-span-2 space-y-6">
                        {/* Service Header */}
                        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
                            <Card className="p-8">
                                <div className="flex flex-wrap gap-2 mb-4">
                                    <Badge variant="primary">{service.category}</Badge>
                                    {service.featured && <Badge variant="gold">Featured</Badge>}
                                    {service.tags?.map((tag) => (
                                        <Badge key={tag} variant="outline">
                                            {tag}
                                        </Badge>
                                    ))}
                                </div>

                                <GradientText className="text-3xl font-bold mb-4">{service.title}</GradientText>

                                <div className="flex items-center gap-6 mb-6">
                                    <div className="flex items-center gap-1">
                                        <Star className="text-yellow-400 fill-current" size={20} />
                                        <span className="font-semibold">{service.averageRating?.toFixed(1) || "N/A"}</span>
                                        <span className="text-gray-500">({service.totalReviews || 0} reviews)</span>
                                    </div>
                                    <div className="flex items-center gap-1 text-gray-600">
                                        <Users size={16} />
                                        <span>{service.popularity || 0} requests</span>
                                    </div>
                                    <div className="flex items-center gap-1 text-gray-600">
                                        <Clock size={16} />
                                        <span>{service.deliveryTime || "Contact for timeline"}</span>
                                    </div>
                                </div>

                                <p className="text-gray-700 leading-relaxed mb-6">{service.description}</p>

                                {/* Features */}
                                {service.features && service.features.length > 0 && (
                                    <div className="mb-6">
                                        <h3 className="text-xl font-semibold mb-4">What's Included</h3>
                                        <div className="grid md:grid-cols-2 gap-3">
                                            {service.features.map((feature, index) => (
                                                <div key={index} className="flex items-center gap-2">
                                                    <CheckCircle className="text-green-500" size={16} />
                                                    <span>{feature}</span>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )}

                                {/* Gallery */}
                                {service.gallery && service.gallery.length > 0 && (
                                    <div className="mb-6">
                                        <h3 className="text-xl font-semibold mb-4">Gallery</h3>
                                        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                                            {service.gallery.map((image, index) => (
                                                <img
                                                    key={index}
                                                    src={image || "/placeholder.svg"}
                                                    alt={`${service.title} ${index + 1}`}
                                                    className="rounded-lg object-cover h-32 w-full hover:scale-105 transition-transform cursor-pointer"
                                                />
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </Card>
                        </motion.div>

                        {/* Reviews Section */}
                        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
                            <Card className="p-6">
                                <h3 className="text-2xl font-bold mb-6">Reviews & Ratings</h3>

                                {/* Add Review Form */}
                                {user && (
                                    <form onSubmit={handleReviewSubmit} className="mb-8 p-4 bg-gray-50 rounded-lg">
                                        <h4 className="font-semibold mb-4">Write a Review</h4>
                                        <div className="mb-4">
                                            <label className="block text-sm font-medium mb-2">Rating</label>
                                            <div className="flex gap-1">
                                                {[1, 2, 3, 4, 5].map((star) => (
                                                    <button
                                                        key={star}
                                                        type="button"
                                                        onClick={() => setNewReview((prev) => ({ ...prev, rating: star }))}
                                                        className={`p-1 ${star <= newReview.rating ? "text-yellow-400" : "text-gray-300"}`}
                                                    >
                                                        <Star size={20} fill="currentColor" />
                                                    </button>
                                                ))}
                                            </div>
                                        </div>
                                        <div className="mb-4">
                                            <label className="block text-sm font-medium mb-2">Comment</label>
                                            <textarea
                                                value={newReview.comment}
                                                onChange={(e) => setNewReview((prev) => ({ ...prev, comment: e.target.value }))}
                                                className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                                rows="3"
                                                placeholder="Share your experience..."
                                                required
                                            />
                                        </div>
                                        <Button type="submit" className="w-full">
                                            Submit Review
                                        </Button>
                                    </form>
                                )}

                                {/* Reviews List */}
                                <div className="space-y-4">
                                    {reviews.map((review) => (
                                        <div key={review._id} className="border-b pb-4 last:border-b-0">
                                            <div className="flex items-center gap-3 mb-2">
                                                <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white font-semibold">
                                                    {review.user?.name?.charAt(0) || "U"}
                                                </div>
                                                <div>
                                                    <p className="font-semibold">{review.user?.name || "Anonymous"}</p>
                                                    <div className="flex items-center gap-2">
                                                        <div className="flex">
                                                            {[1, 2, 3, 4, 5].map((star) => (
                                                                <Star
                                                                    key={star}
                                                                    size={14}
                                                                    className={star <= review.rating ? "text-yellow-400 fill-current" : "text-gray-300"}
                                                                />
                                                            ))}
                                                        </div>
                                                        <span className="text-sm text-gray-500">
                                                            {new Date(review.createdAt).toLocaleDateString()}
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>
                                            <p className="text-gray-700">{review.comment}</p>
                                        </div>
                                    ))}
                                    {reviews.length === 0 && (
                                        <p className="text-center text-gray-500 py-8">No reviews yet. Be the first to review!</p>
                                    )}
                                </div>
                            </Card>
                        </motion.div>
                    </div>

                    {/* Sidebar */}
                    <div className="space-y-6">
                        {/* Pricing Card */}
                        <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.1 }}>
                            <Card className="p-6 sticky top-6">
                                <div className="text-center mb-6">
                                    <div className="flex items-center justify-center gap-2 mb-2">
                                        <DollarSign className="text-green-500" size={24} />
                                        <span className="text-3xl font-bold text-gray-900">
                                            {service.pricing?.type === "fixed"
                                                ? `$${service.pricing.amount}`
                                                : service.pricing?.type === "hourly"
                                                    ? `$${service.pricing.amount}/hr`
                                                    : "Contact for Quote"}
                                        </span>
                                    </div>
                                    {service.pricing?.type === "package" && (
                                        <p className="text-sm text-gray-600">Starting from ${service.pricing.amount}</p>
                                    )}
                                </div>

                                <Button onClick={handleServiceRequest} disabled={requesting} className="w-full mb-4" size="lg">
                                    {requesting ? "Requesting..." : "Request Service"}
                                </Button>

                                <div className="flex gap-2">
                                    <Button variant="outline" className="flex-1">
                                        <Share2 size={16} />
                                        Share
                                    </Button>
                                    <Button variant="outline" className="flex-1">
                                        <Heart size={16} />
                                        Save
                                    </Button>
                                </div>

                                {/* Service Stats */}
                                <div className="mt-6 pt-6 border-t space-y-3">
                                    <div className="flex items-center justify-between">
                                        <span className="text-gray-600">Response Time</span>
                                        <span className="font-semibold">Within 24 hours</span>
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <span className="text-gray-600">Delivery</span>
                                        <span className="font-semibold">{service.deliveryTime || "Varies"}</span>
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <span className="text-gray-600">Revisions</span>
                                        <span className="font-semibold">Unlimited</span>
                                    </div>
                                </div>

                                {/* Trust Badges */}
                                <div className="mt-6 pt-6 border-t">
                                    <div className="flex items-center gap-2 text-sm text-gray-600 mb-2">
                                        <Award className="text-blue-500" size={16} />
                                        <span>Verified Service Provider</span>
                                    </div>
                                    <div className="flex items-center gap-2 text-sm text-gray-600">
                                        <Zap className="text-yellow-500" size={16} />
                                        <span>Fast Delivery Guaranteed</span>
                                    </div>
                                </div>
                            </Card>
                        </motion.div>

                        {/* Contact Card */}
                        <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }}>
                            <Card className="p-6">
                                <h3 className="font-semibold mb-4">Need Help?</h3>
                                <p className="text-gray-600 text-sm mb-4">
                                    Have questions about this service? Our team is here to help.
                                </p>
                                <Button variant="outline" className="w-full">
                                    <MessageCircle size={16} />
                                    Contact Support
                                </Button>
                            </Card>
                        </motion.div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ServiceDetail
