export const COMPANY = {
  name: "GG Private Limited",
  tagline: "Innovating Tomorrow, Today",
  description:
    "Leading technology solutions and internship opportunities for the next generation of innovators.",
  email: "info@ggprivatelimited.com",
  phone: "+1 (555) 123-4567",
  address: "123 Tech Park, Innovation Street, Digital City, 12345",
  socialMedia: {
    facebook: "https://facebook.com/ggprivatelimited",
    twitter: "https://twitter.com/ggprivatelimited",
    linkedin: "https://linkedin.com/company/ggprivatelimited",
    instagram: "https://instagram.com/ggprivatelimited",
  },
};

export const API_BASE_URL =
  import.meta.env.VITE_API_URL || "http://localhost:5000/api";

export const API = {
  base: import.meta.env.VITE_API_URL || "http://localhost:5000/api",

  // Authentication endpoints
  auth: {
    register: "/auth/register",
    login: "/auth/login",
    logout: "/auth/logout",
    verify: "/auth/verify",
    forgotPassword: "/auth/forgot-password",
    resetPassword: "/auth/reset-password",
    refreshToken: "/auth/refresh-token",
  },

  // User endpoints
  user: {
    profile: "/user/profile",
    updateProfile: "/user/profile",
    dashboard: "/user/dashboard",
    applications: "/user/applications",
    serviceRequests: "/user/service-requests",
    reviews: "/user/reviews",
    uploadAvatar: "/user/upload-avatar",
    changePassword: "/user/change-password",
  },

  // Service endpoints
  services: {
    getAll: "/services",
    getById: "/services",
    getFeatured: "/services/featured",
    getByCategory: "/services/category",
    search: "/services/search",
    request: "/services/request",
    getReviews: "/services/reviews",
    addReview: "/services/review",
  },

  // Internship endpoints
  internships: {
    getAll: "/internships",
    getById: "/internships",
    getFeatured: "/internships/featured",
    getByCategory: "/internships/category",
    search: "/internships/search",
    apply: "/internships/apply",
    getApplications: "/internships/applications",
  },

  // Application endpoints
  applications: {
    getAll: "/applications",
    getById: "/applications",
    create: "/applications",
    update: "/applications",
    withdraw: "/applications/withdraw",
    getStatus: "/applications/status",
  },

  // Review endpoints
  reviews: {
    getAll: "/reviews",
    getById: "/reviews",
    create: "/reviews",
    update: "/reviews",
    delete: "/reviews",
    getByService: "/reviews/service",
    getByUser: "/reviews/user",
  },

  // Contact endpoint
  contact: "/contact",

  // File upload
  upload: {
    image: "/upload/image",
    document: "/upload/document",
    resume: "/upload/resume",
  },
};

export const NAV_LINKS = [
  { name: "Home", path: "/" },
  { name: "Services", path: "/services" },
  { name: "Internships", path: "/internships" },
  { name: "About", path: "/about" },
  { name: "Contact", path: "/contact" },
];

export const USER_NAV_LINKS = [
  { name: "Dashboard", path: "/user/dashboard" },
  { name: "Applications", path: "/user/applications" },
  { name: "Services", path: "/user/services" },
  { name: "Reviews", path: "/user/reviews" },
  { name: "Profile", path: "/user/profile" },
];

export const VALIDATION = {
  required: "This field is required",
  email: "Please enter a valid email address",
  match: "Passwords do not match",
  password: {
    minLength: "Password must be at least 8 characters long",
    pattern:
      "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character",
  },
  phone: "Please enter a valid phone number",
  url: "Please enter a valid URL",
};

export const APPLICATION_STATUS = {
  PENDING: "pending",
  REVIEWING: "reviewing",
  INTERVIEW: "interview",
  ACCEPTED: "accepted",
  REJECTED: "rejected",
  WITHDRAWN: "withdrawn",
};

export const SERVICE_REQUEST_STATUS = {
  PENDING: "pending",
  IN_PROGRESS: "in_progress",
  COMPLETED: "completed",
  CANCELLED: "cancelled",
  ON_HOLD: "on_hold",
};

export const INTERNSHIP_CATEGORIES = [
  "Frontend Development",
  "Backend Development",
  "Full Stack Development",
  "Mobile Development",
  "UI/UX Design",
  "Data Science",
  "Machine Learning",
  "DevOps",
  "Quality Assurance",
  "Product Management",
  "Digital Marketing",
  "Content Writing",
];

export const SERVICE_CATEGORIES = [
  "Web Development",
  "Mobile App Development",
  "UI/UX Design",
  "Digital Marketing",
  "SEO Services",
  "Content Writing",
  "Graphic Design",
  "E-commerce Solutions",
  "Cloud Services",
  "Consulting",
];

export const EXPERIENCE_LEVELS = [
  "Beginner",
  "Intermediate",
  "Advanced",
  "Expert",
];

export const URGENCY_LEVELS = {
  LOW: "low",
  MEDIUM: "medium",
  HIGH: "high",
  URGENT: "urgent",
};

export const THEME_MODES = {
  LIGHT: "light",
  DARK: "dark",
  SYSTEM: "system",
};
