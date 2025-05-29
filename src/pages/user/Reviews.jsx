"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Star, MessageCircle, Calendar, Edit, Trash2, Plus, Search } from "lucide-react"
import { userService } from "../../services/userService"
import Card from "../../components/ui/Card"
import Button from "../../components/ui/Button"
import Badge from "../../components/ui/Badge"
import GradientText from "../../components/ui/GradientText"
import Loader from "../../components/ui/Loader"
import { toast } from "react-hot-toast"

const Reviews = () => {
    const [reviews, setReviews] = useState([])
    const [loading, setLoading] = useState(true)
    const [filter, setFilter] = useState("all")
    const [searchTerm, setSearchTerm] = useState("")
    const [editingReview, setEditingReview] = useState(null)
    const [newReview, setNewReview] = useState({
        rating: 5,
        comment: "",
        serviceId: "",
    })

    useEffect(() => {
        fetchReviews()
    }, [])

    const fetchReviews = async () => {
        try {
            const response = await userService.getReviews()
            setReviews(response.data)
        } catch (error) {
            toast.error("Failed to load reviews")
        } finally {
            setLoading(false)
        }
    }

    const handleEditReview = async (reviewId, updatedData) => {
        try {
            await userService.updateReview(reviewId, updatedData)
            toast.success("Review updated successfully!")
            setEditingReview(null)
            fetchReviews()
        } catch (error) {
            toast.error("Failed to update review")
        }
    }

    const handleDeleteReview = async (reviewId) => {
        if (!confirm("Are you sure you want to delete this review?")) return

        try {
            await userService.deleteReview(reviewId)
            toast.success("Review deleted successfully!")
            fetchReviews()
        } catch (error) {
            toast.error("Failed to delete review")
        }
    }

    const renderStars = (rating, interactive = false, onRatingChange = null) => {
        return (
            <div className="flex gap-1">
                {[1, 2, 3, 4, 5].map((star) => (
                    <button
                        key={star}
                        type="button"
                        onClick={() => interactive && onRatingChange && onRatingChange(star)}
                        className={`${interactive ? "cursor-pointer hover:scale-110" : "cursor-default"} transition-transform`}
                        disabled={!interactive}
                    >
                        <Star size={20} className={star <= rating ? "text-yellow-400 fill-current" : "text-gray-300"} />
                    </button>
                ))}
            </div>
        )
    }

    const filteredReviews = reviews.filter((review) => {
        const matchesFilter =
            filter === "all" ||
            (filter === "high" && review.rating >= 4) ||
            (filter === "medium" && review.rating === 3) ||
            (filter === "low" && review.rating <= 2)

        const matchesSearch =
            review.service?.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            review.comment?.toLowerCase().includes(searchTerm.toLowerCase())

        return matchesFilter && matchesSearch
    })

    if (loading) return <Loader fullScreen />

    return (
        <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-pink-50">
            <div className="container mx-auto px-4 py-8">
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
                    <div className="flex justify-between items-start">
                        <div>
                            <GradientText className="text-3xl font-bold mb-2">My Reviews</GradientText>
                            <p className="text-gray-600">Manage your service reviews and feedback</p>
                        </div>
                        <Button>
                            <Plus size={16} />
                            Write Review
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
                                        placeholder="Search reviews..."
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
                                    <option value="all">All Ratings</option>
                                    <option value="high">4-5 Stars</option>
                                    <option value="medium">3 Stars</option>
                                    <option value="low">1-2 Stars</option>
                                </select>
                            </div>
                        </div>
                    </Card>
                </motion.div>

                {/* Reviews List */}
                <div className="space-y-6">
                    {filteredReviews.map((review, index) => (
                        <motion.div
                            key={review._id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                        >
                            <Card className="p-6 hover:shadow-lg transition-shadow">
                                {editingReview === review._id ? (
                                    // Edit Mode
                                    <div className="space-y-4">
                                        <div>
                                            <label className="block text-sm font-medium mb-2">Rating</label>
                                            {renderStars(newReview.rating, true, (rating) => setNewReview((prev) => ({ ...prev, rating })))}
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium mb-2">Comment</label>
                                            <textarea
                                                value={newReview.comment}
                                                onChange={(e) => setNewReview((prev) => ({ ...prev, comment: e.target.value }))}
                                                className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                                rows="4"
                                                placeholder="Update your review..."
                                            />
                                        </div>
                                        <div className="flex gap-2">
                                            <Button onClick={() => handleEditReview(review._id, newReview)} size="sm">
                                                Save Changes
                                            </Button>
                                            <Button variant="outline" onClick={() => setEditingReview(null)} size="sm">
                                                Cancel
                                            </Button>
                                        </div>
                                    </div>
                                ) : (
                                    // View Mode
                                    <div>
                                        <div className="flex items-start justify-between mb-4">
                                            <div className="flex-1">
                                                <div className="flex items-center gap-3 mb-2">
                                                    <h3 className="text-lg font-semibold text-gray-900">
                                                        {review.service?.title || "Service Review"}
                                                    </h3>
                                                    <Badge variant="outline">{review.service?.category}</Badge>
                                                </div>
                                                <div className="flex items-center gap-4 text-sm text-gray-600">
                                                    {renderStars(review.rating)}
                                                    <div className="flex items-center gap-1">
                                                        <Calendar size={14} />
                                                        <span>{new Date(review.createdAt).toLocaleDateString()}</span>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="flex gap-2">
                                                <Button
                                                    variant="outline"
                                                    size="sm"
                                                    onClick={() => {
                                                        setEditingReview(review._id)
                                                        setNewReview({
                                                            rating: review.rating,
                                                            comment: review.comment,
                                                            serviceId: review.service?._id,
                                                        })
                                                    }}
                                                >
                                                    <Edit size={14} />
                                                </Button>
                                                <Button
                                                    variant="outline"
                                                    size="sm"
                                                    onClick={() => handleDeleteReview(review._id)}
                                                    className="text-red-600 hover:text-red-700"
                                                >
                                                    <Trash2 size={14} />
                                                </Button>
                                            </div>
                                        </div>

                                        <p className="text-gray-700 mb-4 leading-relaxed">{review.comment}</p>

                                        {review.service && (
                                            <div className="p-4 bg-gray-50 rounded-lg">
                                                <h4 className="font-semibold text-gray-900 mb-2">Service Details</h4>
                                                <div className="flex items-center gap-4 text-sm text-gray-600">
                                                    <span>Category: {review.service.category}</span>
                                                    {review.service.pricing && <span>Price: ${review.service.pricing.amount}</span>}
                                                </div>
                                            </div>
                                        )}

                                        {review.adminResponse && (
                                            <div className="mt-4 p-4 bg-blue-50 rounded-lg">
                                                <h4 className="font-semibold text-blue-900 mb-2">Admin Response</h4>
                                                <p className="text-blue-800">{review.adminResponse}</p>
                                            </div>
                                        )}
                                    </div>
                                )}
                            </Card>
                        </motion.div>
                    ))}

                    {filteredReviews.length === 0 && (
                        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-12">
                            <MessageCircle className="mx-auto text-gray-400 mb-4" size={48} />
                            <h3 className="text-xl font-semibold text-gray-900 mb-2">No Reviews Found</h3>
                            <p className="text-gray-600 mb-6">
                                {searchTerm || filter !== "all"
                                    ? "Try adjusting your search or filter criteria"
                                    : "You haven't written any reviews yet"}
                            </p>
                            {!searchTerm && filter === "all" && (
                                <Button onClick={() => (window.location.href = "/services")}>Browse Services to Review</Button>
                            )}
                        </motion.div>
                    )}
                </div>
            </div>
        </div>
    )
}

export default Reviews
