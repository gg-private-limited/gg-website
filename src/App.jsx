"use client"

import { Routes, Route, Navigate } from "react-router-dom"
import { Suspense, lazy } from "react"
import { useAuth } from "./contexts/AuthContext"
import Layout from "./components/layout/Layout"
import Loader from "./components/ui/Loader"
import ProtectedRoute from "./components/auth/ProtectedRoute"

// Lazy load pages for better performance
const Home = lazy(() => import("./pages/Home"))
const Services = lazy(() => import("./pages/Services"))
const ServiceDetail = lazy(() => import("./pages/ServiceDetail"))
const Internships = lazy(() => import("./pages/Internships"))
const InternshipDetail = lazy(() => import("./pages/InternshipDetail"))
const About = lazy(() => import("./pages/About"))
const Contact = lazy(() => import("./pages/Contact"))
const Login = lazy(() => import("./pages/auth/Login"))
const Register = lazy(() => import("./pages/auth/Register"))
const ForgotPassword = lazy(() => import("./pages/auth/ForgotPassword"))
const ResetPassword = lazy(() => import("./pages/auth/ResetPassword"))

// User Dashboard Pages
const UserDashboard = lazy(() => import("./pages/user/Dashboard"))
const UserApplications = lazy(() => import("./pages/user/Applications"))
const UserServices = lazy(() => import("./pages/user/Services"))
const UserReviews = lazy(() => import("./pages/user/Reviews"))
const UserProfile = lazy(() => import("./pages/user/Profile"))

// Error Pages
const NotFound = lazy(() => import("./pages/errors/NotFound"))
const ServerError = lazy(() => import("./pages/errors/ServerError"))

function App() {
  const { user, loading } = useAuth()

  if (loading) {
    return <Loader fullScreen />
  }

  return (
    <Suspense fallback={<Loader fullScreen />}>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="services" element={<Services />} />
          <Route path="services/:id" element={<ServiceDetail />} />
          <Route path="internships" element={<Internships />} />
          <Route path="internships/:id" element={<InternshipDetail />} />
          <Route path="about" element={<About />} />
          <Route path="contact" element={<Contact />} />

          {/* Auth Routes */}
          <Route path="login" element={user ? <Navigate to="/" /> : <Login />} />
          <Route path="register" element={user ? <Navigate to="/" /> : <Register />} />
          <Route path="forgot-password" element={user ? <Navigate to="/" /> : <ForgotPassword />} />
          <Route path="reset-password" element={user ? <Navigate to="/" /> : <ResetPassword />} />

          {/* Protected User Routes */}
          <Route path="user" element={<ProtectedRoute />}>
            <Route path="dashboard" element={<UserDashboard />} />
            <Route path="applications" element={<UserApplications />} />
            <Route path="services" element={<UserServices />} />
            <Route path="reviews" element={<UserReviews />} />
            <Route path="profile" element={<UserProfile />} />
          </Route>

          {/* Error Routes */}
          <Route path="server-error" element={<ServerError />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </Suspense>
  )
}

export default App
