"use client"

import { useState, useEffect } from "react"
import { useParams, useNavigate } from "react-router-dom"
import { motion } from "framer-motion"
import {
    ArrowLeft,
    MapPin,
    Clock,
    Calendar,
    Users,
    DollarSign,
    CheckCircle,
    AlertCircle,
    Send,
    Download,
    Share2,
    Heart,
} from "lucide-react"
import { internshipService } from "../services/internshipService"
import { useAuth } from "../contexts/AuthContext"
import Card from "../components/ui/Card"
import Button from "../components/ui/Button"
import Badge from "../components/ui/Badge"
import GradientText from "../components/ui/GradientText"
import Loader from "../components/ui/Loader"
import { toast } from "react-hot-toast"

const InternshipDetail = () => {
    const { id } = useParams()
    const navigate = useNavigate()
    const { user } = useAuth()
    const [internship, setInternship] = useState(null)
    const [loading, setLoading] = useState(true)
    const [applying, setApplying] = useState(false)
    const [application, setApplication] = useState({
        coverLetter: "",
        resume: null,
        portfolio: "",
        availability: "",
    })

    useEffect(() => {
        fetchInternship()
    }, [id])

    const fetchInternship = async () => {
        try {
            const response = await internshipService.getById(id)
            setInternship(response.data)
        } catch (error) {
            toast.error("Failed to load internship details")
            navigate("/internships")
        } finally {
            setLoading(false)
        }
    }

    const handleApply = async (e) => {
        e.preventDefault()
        if (!user) {
            toast.error("Please login to apply for internships")
            navigate("/login")
            return
        }

        setApplying(true)
        try {
            const formData = new FormData()
            formData.append("internshipId", id)
            formData.append("coverLetter", application.coverLetter)
            formData.append("portfolio", application.portfolio)
            formData.append("availability", application.availability)
            if (application.resume) {
                formData.append("resume", application.resume)
            }

            await internshipService.apply(formData)
            toast.success("Application submitted successfully!")
            setApplication({ coverLetter: "", resume: null, portfolio: "", availability: "" })
        } catch (error) {
            toast.error("Failed to submit application")
        } finally {
            setApplying(false)
        }
    }

    const getUrgencyColor = (deadline) => {
        const daysLeft = Math.ceil((new Date(deadline) - new Date()) / (1000 * 60 * 60 * 24))
        if (daysLeft <= 3) return "text-red-500"
        if (daysLeft <= 7) return "text-yellow-500"
        return "text-green-500"
    }

    const getDaysLeft = (deadline) => {
        const daysLeft = Math.ceil((new Date(deadline) - new Date()) / (1000 * 60 * 60 * 24))
        return daysLeft > 0 ? daysLeft : 0
    }

    if (loading) return <Loader fullScreen />

    if (!internship) return null

    const daysLeft = getDaysLeft(internship.deadline)
    const isExpired = daysLeft === 0

    return (
        <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-blue-50">
            <div className="container mx-auto px-4 py-8">
                {/* Back Button */}
                <motion.button
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    onClick={() => navigate("/internships")}
                    className="flex items-center gap-2 text-gray-600 hover:text-blue-600 mb-6 transition-colors"
                >
                    <ArrowLeft size={20} />
                    Back to Internships
                </motion.button>

                <div className="grid lg:grid-cols-3 gap-8">
                    {/* Main Content */}
                    <div className="lg:col-span-2 space-y-6">
                        {/* Internship Header */}
                        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
                            <Card className="p-8">
                                <div className="flex flex-wrap gap-2 mb-4">
                                    <Badge variant="primary">{internship.category}</Badge>
                                    <Badge variant={internship.type === "paid" ? "success" : "outline"}>{internship.type}</Badge>
                                    <Badge variant={internship.remote ? "info" : "outline"}>
                                        {internship.remote ? "Remote" : "On-site"}
                                    </Badge>
                                    {isExpired && <Badge variant="danger">Expired</Badge>}
                                </div>

                                <GradientText className="text-3xl font-bold mb-4">{internship.title}</GradientText>

                                <div className="flex flex-wrap items-center gap-6 mb-6 text-gray-600">
                                    <div className="flex items-center gap-1">
                                        <MapPin size={16} />
                                        <span>{internship.location}</span>
                                    </div>
                                    <div className="flex items-center gap-1">
                                        <Clock size={16} />
                                        <span>{internship.duration}</span>
                                    </div>
                                    <div className="flex items-center gap-1">
                                        <Calendar size={16} />
                                        <span className={getUrgencyColor(internship.deadline)}>{daysLeft} days left</span>
                                    </div>
                                    <div className="flex items-center gap-1">
                                        <Users size={16} />
                                        <span>{internship.spotsAvailable} spots available</span>
                                    </div>
                                    {internship.stipend && (
                                        <div className="flex items-center gap-1">
                                            <DollarSign size={16} />
                                            <span>${internship.stipend}/month</span>
                                        </div>
                                    )}
                                </div>

                                <p className="text-gray-700 leading-relaxed mb-6">{internship.description}</p>

                                {/* Requirements */}
                                {internship.requirements && internship.requirements.length > 0 && (
                                    <div className="mb-6">
                                        <h3 className="text-xl font-semibold mb-4">Requirements</h3>
                                        <div className="space-y-2">
                                            {internship.requirements.map((requirement, index) => (
                                                <div key={index} className="flex items-start gap-2">
                                                    <CheckCircle className="text-green-500 mt-0.5" size={16} />
                                                    <span>{requirement}</span>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )}

                                {/* Skills */}
                                {internship.skills && internship.skills.length > 0 && (
                                    <div className="mb-6">
                                        <h3 className="text-xl font-semibold mb-4">Required Skills</h3>
                                        <div className="flex flex-wrap gap-2">
                                            {internship.skills.map((skill, index) => (
                                                <Badge key={index} variant="outline">
                                                    {skill}
                                                </Badge>
                                            ))}
                                        </div>
                                    </div>
                                )}

                                {/* Benefits */}
                                {internship.benefits && internship.benefits.length > 0 && (
                                    <div className="mb-6">
                                        <h3 className="text-xl font-semibold mb-4">What You'll Get</h3>
                                        <div className="grid md:grid-cols-2 gap-3">
                                            {internship.benefits.map((benefit, index) => (
                                                <div key={index} className="flex items-center gap-2">
                                                    <CheckCircle className="text-blue-500" size={16} />
                                                    <span>{benefit}</span>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </Card>
                        </motion.div>

                        {/* Application Form */}
                        {!isExpired && (
                            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
                                <Card className="p-6">
                                    <h3 className="text-2xl font-bold mb-6">Apply for this Internship</h3>

                                    {user ? (
                                        <form onSubmit={handleApply} className="space-y-6">
                                            <div>
                                                <label className="block text-sm font-medium mb-2">Cover Letter *</label>
                                                <textarea
                                                    value={application.coverLetter}
                                                    onChange={(e) => setApplication((prev) => ({ ...prev, coverLetter: e.target.value }))}
                                                    className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                                    rows="6"
                                                    placeholder="Tell us why you're interested in this internship..."
                                                    required
                                                />
                                            </div>

                                            <div>
                                                <label className="block text-sm font-medium mb-2">Resume *</label>
                                                <input
                                                    type="file"
                                                    accept=".pdf,.doc,.docx"
                                                    onChange={(e) => setApplication((prev) => ({ ...prev, resume: e.target.files[0] }))}
                                                    className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                                    required
                                                />
                                                <p className="text-sm text-gray-500 mt-1">Upload your resume (PDF, DOC, DOCX)</p>
                                            </div>

                                            <div>
                                                <label className="block text-sm font-medium mb-2">Portfolio URL</label>
                                                <input
                                                    type="url"
                                                    value={application.portfolio}
                                                    onChange={(e) => setApplication((prev) => ({ ...prev, portfolio: e.target.value }))}
                                                    className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                                    placeholder="https://your-portfolio.com"
                                                />
                                            </div>

                                            <div>
                                                <label className="block text-sm font-medium mb-2">Availability *</label>
                                                <select
                                                    value={application.availability}
                                                    onChange={(e) => setApplication((prev) => ({ ...prev, availability: e.target.value }))}
                                                    className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                                    required
                                                >
                                                    <option value="">Select your availability</option>
                                                    <option value="immediate">Immediate</option>
                                                    <option value="2-weeks">2 weeks notice</option>
                                                    <option value="1-month">1 month notice</option>
                                                    <option value="flexible">Flexible</option>
                                                </select>
                                            </div>

                                            <Button type="submit" disabled={applying} className="w-full" size="lg">
                                                {applying ? "Submitting..." : "Submit Application"}
                                                <Send size={16} />
                                            </Button>
                                        </form>
                                    ) : (
                                        <div className="text-center py-8">
                                            <p className="text-gray-600 mb-4">Please login to apply for this internship</p>
                                            <Button onClick={() => navigate("/login")}>Login to Apply</Button>
                                        </div>
                                    )}
                                </Card>
                            </motion.div>
                        )}
                    </div>

                    {/* Sidebar */}
                    <div className="space-y-6">
                        {/* Quick Info */}
                        <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.1 }}>
                            <Card className="p-6 sticky top-6">
                                <h3 className="font-semibold mb-4">Quick Info</h3>

                                <div className="space-y-4">
                                    <div className="flex justify-between">
                                        <span className="text-gray-600">Duration</span>
                                        <span className="font-semibold">{internship.duration}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-gray-600">Type</span>
                                        <span className="font-semibold capitalize">{internship.type}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-gray-600">Location</span>
                                        <span className="font-semibold">{internship.location}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-gray-600">Spots</span>
                                        <span className="font-semibold">{internship.spotsAvailable}</span>
                                    </div>
                                    {internship.stipend && (
                                        <div className="flex justify-between">
                                            <span className="text-gray-600">Stipend</span>
                                            <span className="font-semibold">${internship.stipend}/month</span>
                                        </div>
                                    )}
                                    <div className="flex justify-between">
                                        <span className="text-gray-600">Deadline</span>
                                        <span className={`font-semibold ${getUrgencyColor(internship.deadline)}`}>
                                            {new Date(internship.deadline).toLocaleDateString()}
                                        </span>
                                    </div>
                                </div>

                                {daysLeft <= 7 && daysLeft > 0 && (
                                    <div className="mt-4 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                                        <div className="flex items-center gap-2 text-yellow-700">
                                            <AlertCircle size={16} />
                                            <span className="text-sm font-medium">Deadline approaching!</span>
                                        </div>
                                        <p className="text-sm text-yellow-600 mt-1">Only {daysLeft} days left to apply</p>
                                    </div>
                                )}

                                <div className="flex gap-2 mt-6">
                                    <Button variant="outline" className="flex-1">
                                        <Share2 size={16} />
                                        Share
                                    </Button>
                                    <Button variant="outline" className="flex-1">
                                        <Heart size={16} />
                                        Save
                                    </Button>
                                </div>
                            </Card>
                        </motion.div>

                        {/* Company Info */}
                        <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }}>
                            <Card className="p-6">
                                <h3 className="font-semibold mb-4">About GG Private Limited</h3>
                                <p className="text-gray-600 text-sm mb-4">
                                    Leading technology company providing innovative solutions and fostering the next generation of tech
                                    talent.
                                </p>
                                <Button variant="outline" className="w-full">
                                    <Download size={16} />
                                    Company Profile
                                </Button>
                            </Card>
                        </motion.div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default InternshipDetail
