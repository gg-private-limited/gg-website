"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { User, Mail, Edit, Save, X, Camera, Shield, Award, FileText } from "lucide-react"
import { useAuth } from "../../contexts/AuthContext"
import { userService } from "../../services/userService"
import Card from "../../components/ui/Card"
import Button from "../../components/ui/Button"
import Badge from "../../components/ui/Badge"
import GradientText from "../../components/ui/GradientText"
import Loader from "../../components/ui/Loader"
import { toast } from "react-hot-toast"

const Profile = () => {
    const { user, updateUser } = useAuth()
    const [loading, setLoading] = useState(false)
    const [editing, setEditing] = useState(false)
    const [profileData, setProfileData] = useState({
        name: "",
        email: "",
        phone: "",
        bio: "",
        location: "",
        skills: [],
        education: "",
        experience: "",
    })
    const [stats, setStats] = useState({
        applications: 0,
        serviceRequests: 0,
        reviews: 0,
    })

    useEffect(() => {
        if (user) {
            setProfileData({
                name: user.name || "",
                email: user.email || "",
                phone: user.phone || "",
                bio: user.bio || "",
                location: user.location || "",
                skills: user.skills || [],
                education: user.education || "",
                experience: user.experience || "",
            })
        }
        fetchUserStats()
    }, [user])

    const fetchUserStats = async () => {
        try {
            const response = await userService.getStats()
            setStats(response.data)
        } catch (error) {
            console.error("Failed to load user stats:", error)
        }
    }

    const handleSave = async () => {
        setLoading(true)
        try {
            const response = await userService.updateProfile(profileData)
            updateUser(response.data)
            toast.success("Profile updated successfully!")
            setEditing(false)
        } catch (error) {
            toast.error("Failed to update profile")
        } finally {
            setLoading(false)
        }
    }

    const handleCancel = () => {
        if (user) {
            setProfileData({
                name: user.name || "",
                email: user.email || "",
                phone: user.phone || "",
                bio: user.bio || "",
                location: user.location || "",
                skills: user.skills || [],
                education: user.education || "",
                experience: user.experience || "",
            })
        }
        setEditing(false)
    }

    const handleSkillAdd = (skill) => {
        if (skill && !profileData.skills.includes(skill)) {
            setProfileData((prev) => ({
                ...prev,
                skills: [...prev.skills, skill],
            }))
        }
    }

    const handleSkillRemove = (skillToRemove) => {
        setProfileData((prev) => ({
            ...prev,
            skills: prev.skills.filter((skill) => skill !== skillToRemove),
        }))
    }

    if (!user) return <Loader fullScreen />

    return (
        <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-cyan-50">
            <div className="container mx-auto px-4 py-8">
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
                    <GradientText className="text-3xl font-bold mb-2">My Profile</GradientText>
                    <p className="text-gray-600">Manage your personal information and preferences</p>
                </motion.div>

                <div className="grid lg:grid-cols-3 gap-8">
                    {/* Profile Card */}
                    <div className="lg:col-span-2 space-y-6">
                        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
                            <Card className="p-8">
                                <div className="flex items-center justify-between mb-6">
                                    <h2 className="text-2xl font-bold text-gray-900">Personal Information</h2>
                                    {!editing ? (
                                        <Button onClick={() => setEditing(true)} variant="outline">
                                            <Edit size={16} />
                                            Edit Profile
                                        </Button>
                                    ) : (
                                        <div className="flex gap-2">
                                            <Button onClick={handleSave} disabled={loading}>
                                                <Save size={16} />
                                                {loading ? "Saving..." : "Save"}
                                            </Button>
                                            <Button onClick={handleCancel} variant="outline">
                                                <X size={16} />
                                                Cancel
                                            </Button>
                                        </div>
                                    )}
                                </div>

                                {/* Profile Picture */}
                                <div className="flex items-center gap-6 mb-8">
                                    <div className="relative">
                                        <div className="w-24 h-24 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white text-2xl font-bold">
                                            {user.name?.charAt(0) || "U"}
                                        </div>
                                        {editing && (
                                            <button className="absolute -bottom-2 -right-2 bg-blue-500 text-white p-2 rounded-full hover:bg-blue-600 transition-colors">
                                                <Camera size={16} />
                                            </button>
                                        )}
                                    </div>
                                    <div>
                                        <h3 className="text-xl font-semibold text-gray-900">{user.name}</h3>
                                        <p className="text-gray-600">{user.email}</p>
                                        <div className="flex items-center gap-2 mt-2">
                                            <Badge variant="success">
                                                <Shield size={12} />
                                                Verified
                                            </Badge>
                                            <Badge variant="outline">Member since {new Date(user.createdAt).getFullYear()}</Badge>
                                        </div>
                                    </div>
                                </div>

                                {/* Form Fields */}
                                <div className="grid md:grid-cols-2 gap-6">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
                                        {editing ? (
                                            <input
                                                type="text"
                                                value={profileData.name}
                                                onChange={(e) => setProfileData((prev) => ({ ...prev, name: e.target.value }))}
                                                className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                            />
                                        ) : (
                                            <p className="p-3 bg-gray-50 rounded-lg">{profileData.name || "Not provided"}</p>
                                        )}
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                                        <p className="p-3 bg-gray-50 rounded-lg text-gray-600">{profileData.email}</p>
                                        <p className="text-xs text-gray-500 mt-1">Email cannot be changed</p>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">Phone</label>
                                        {editing ? (
                                            <input
                                                type="tel"
                                                value={profileData.phone}
                                                onChange={(e) => setProfileData((prev) => ({ ...prev, phone: e.target.value }))}
                                                className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                            />
                                        ) : (
                                            <p className="p-3 bg-gray-50 rounded-lg">{profileData.phone || "Not provided"}</p>
                                        )}
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">Location</label>
                                        {editing ? (
                                            <input
                                                type="text"
                                                value={profileData.location}
                                                onChange={(e) => setProfileData((prev) => ({ ...prev, location: e.target.value }))}
                                                className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                            />
                                        ) : (
                                            <p className="p-3 bg-gray-50 rounded-lg">{profileData.location || "Not provided"}</p>
                                        )}
                                    </div>
                                </div>

                                <div className="mt-6">
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Bio</label>
                                    {editing ? (
                                        <textarea
                                            value={profileData.bio}
                                            onChange={(e) => setProfileData((prev) => ({ ...prev, bio: e.target.value }))}
                                            className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                            rows="4"
                                            placeholder="Tell us about yourself..."
                                        />
                                    ) : (
                                        <p className="p-3 bg-gray-50 rounded-lg">{profileData.bio || "No bio provided"}</p>
                                    )}
                                </div>

                                {/* Skills */}
                                <div className="mt-6">
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Skills</label>
                                    {editing ? (
                                        <div>
                                            <div className="flex flex-wrap gap-2 mb-3">
                                                {profileData.skills.map((skill, index) => (
                                                    <Badge key={index} variant="outline" className="flex items-center gap-1">
                                                        {skill}
                                                        <button
                                                            onClick={() => handleSkillRemove(skill)}
                                                            className="ml-1 text-red-500 hover:text-red-700"
                                                        >
                                                            <X size={12} />
                                                        </button>
                                                    </Badge>
                                                ))}
                                            </div>
                                            <input
                                                type="text"
                                                placeholder="Add a skill and press Enter"
                                                className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                                onKeyPress={(e) => {
                                                    if (e.key === "Enter") {
                                                        handleSkillAdd(e.target.value.trim())
                                                        e.target.value = ""
                                                    }
                                                }}
                                            />
                                        </div>
                                    ) : (
                                        <div className="flex flex-wrap gap-2">
                                            {profileData.skills.length > 0 ? (
                                                profileData.skills.map((skill, index) => (
                                                    <Badge key={index} variant="outline">
                                                        {skill}
                                                    </Badge>
                                                ))
                                            ) : (
                                                <p className="text-gray-500">No skills added</p>
                                            )}
                                        </div>
                                    )}
                                </div>
                            </Card>
                        </motion.div>
                    </div>

                    {/* Sidebar */}
                    <div className="space-y-6">
                        {/* Stats Card */}
                        <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }}>
                            <Card className="p-6">
                                <h3 className="font-semibold mb-4">Activity Stats</h3>
                                <div className="space-y-4">
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center gap-2">
                                            <FileText className="text-blue-500" size={16} />
                                            <span className="text-gray-600">Applications</span>
                                        </div>
                                        <span className="font-semibold">{stats.applications}</span>
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center gap-2">
                                            <Award className="text-green-500" size={16} />
                                            <span className="text-gray-600">Service Requests</span>
                                        </div>
                                        <span className="font-semibold">{stats.serviceRequests}</span>
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center gap-2">
                                            <User className="text-purple-500" size={16} />
                                            <span className="text-gray-600">Reviews</span>
                                        </div>
                                        <span className="font-semibold">{stats.reviews}</span>
                                    </div>
                                </div>
                            </Card>
                        </motion.div>

                        {/* Account Settings */}
                        <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.3 }}>
                            <Card className="p-6">
                                <h3 className="font-semibold mb-4">Account Settings</h3>
                                <div className="space-y-3">
                                    <Button variant="outline" className="w-full justify-start">
                                        <Shield size={16} />
                                        Change Password
                                    </Button>
                                    <Button variant="outline" className="w-full justify-start">
                                        <Mail size={16} />
                                        Email Preferences
                                    </Button>
                                    <Button variant="outline" className="w-full justify-start">
                                        <User size={16} />
                                        Privacy Settings
                                    </Button>
                                </div>
                            </Card>
                        </motion.div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Profile
