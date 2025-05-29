"use client"
import { useAuth } from "../contexts/AuthContext"
import { useState, useEffect, Suspense } from "react"
import { motion } from "framer-motion"
import {
    Globe,
    TrendingUp,
    GraduationCap,
    Briefcase,
    Bot,
    ShoppingCart,
    Smartphone,
    Brain,
    MessageCircle,
    UserCheck,
    Building,
    Lightbulb,
    Code2
} from "lucide-react"
import { Canvas } from "@react-three/fiber"
import { OrbitControls, Sphere, MeshDistortMaterial, Float, Environment } from "@react-three/drei"
import { FaServer, FaCodeBranch, FaLayerGroup, FaLightbulb } from "react-icons/fa";

const Home = () => {

    const { loading } = useAuth()

    // Animated 3D Globe Component
    const AnimatedGlobe = () => (
        <Float speed={1.4} rotationIntensity={1} floatIntensity={2}>
            <Sphere args={[1, 100, 200]} scale={2}>
                <MeshDistortMaterial color="" attach="material" distort={0.3} speed={1.5} roughness={0} />
            </Sphere>
        </Float>
    )

    // Services data
    const services = [
        {
            icon: <GraduationCap className="w-8 h-8" />,
            title: "Internship Programs",
            description: "Learn by working on real projects",
            color: "from-blue-500 to-cyan-500",
        },
        {
            icon: <Briefcase className="w-8 h-8" />,
            title: "Training Modules",
            description: "Industry-ready courses in MERN, AI, Java & more",
            color: "from-purple-500 to-pink-500",
        },
        {
            icon: <Globe className="w-8 h-8" />,
            title: "Web Development",
            description: "Full-stack website solutions for clients",
            color: "from-green-500 to-emerald-500",
        },
        {
            icon: <Bot className="w-8 h-8" />,
            title: "AI Project Services",
            description: "Smart tools, automation & ML systems",
            color: "from-orange-500 to-red-500",
        },
        {
            icon: <ShoppingCart className="w-8 h-8" />,
            title: "E-Commerce Solutions",
            description: "Custom shopping platforms for startups",
            color: "from-indigo-500 to-purple-500",
        },
        {
            icon: <Smartphone className="w-8 h-8" />,
            title: "Custom Software",
            description: "Tailored tools to meet any business need",
            color: "from-teal-500 to-blue-500",
        },
    ]

    // Why Choose Us features
    const whyChooseFeatures = [
        "Practical Work Experience",
        "Real Clients, Real Projects",
        "Affordable Service Plans",
        "Personal Mentorship",
        "Certification with Verification Code",
        "Lifetime Portfolio Hosting",
    ]

    // featues
    const features = [
        {
            title: "Scalability",
            icon: <FaServer className="text-yellow-500 text-4xl" />,
            description: "Our scalable web development solutions grow with your business. Easily handle increased traffic and add new features without compromising performance.",
            tags: ["Increased_Traffic", "Stable_Performance", "New_features"]
        },
        {
            title: "Future-proof architecture",
            icon: <FaCodeBranch className="text-yellow-500 text-4xl" />,
            description: "Our development ensures your site is built on a future-proof architecture, adapting to new technologies and evolving needs.",
            tags: ["Our_development", "New_technologies", "Adapt_to_your_needs"]
        },
        {
            title: "Comprehensive tech stack",
            icon: <FaLayerGroup className="text-yellow-500 text-4xl" />,
            description: "Our tech stack delivers top-notch websites with innovation, performance, security, and scalability.",
            tags: ["Performance", "Security", "Scalability"]
        },
        {
            title: "Tailored solutions",
            icon: <FaLightbulb className="text-yellow-500 text-4xl" />,
            description: "We specialize in crafting customized websites that precisely meet each client's unique needs and goals, ensuring satisfaction and success.",
            tags: ["Duck_IT_team", "Customized_solutions", "Customer"]
        }
    ];

    // AI Assistants
    const aiAssistants = [
        {
            icon: <MessageCircle className="w-12 h-12" />,
            title: "Tech Interview Bot",
            description: "Practice technical interviews with AI feedback",
            color: "from-blue-500 to-cyan-500",
        },
        {
            icon: <Lightbulb className="w-12 h-12" />,
            title: "Business Planner Bot",
            description: "AI-powered business strategy and planning",
            color: "from-purple-500 to-pink-500",
        },
        {
            icon: <UserCheck className="w-12 h-12" />,
            title: "Client Chat Bot",
            description: "24/7 customer support and assistance",
            color: "from-green-500 to-emerald-500",
        },
        {
            icon: <Brain className="w-12 h-12" />,
            title: "Behavioral Feedback Bot",
            description: "Improve soft skills with AI coaching",
            color: "from-orange-500 to-red-500",
        },
    ]

    // Use Cases
    const useCases = [
        {
            icon: <Building className="w-8 h-8" />,
            title: "Colleges & Institutes",
            description: "Internship & training programs",
            color: "from-blue-500 to-cyan-500",
        },
        {
            icon: <GraduationCap className="w-8 h-8" />,
            title: "Students & Freshers",
            description: "Career building support",
            color: "from-purple-500 to-pink-500",
        },
        {
            icon: <TrendingUp className="w-8 h-8" />,
            title: "Entrepreneurs",
            description: "Software solutions & e-commerce",
            color: "from-green-500 to-emerald-500",
        },
        {
            icon: <Bot className="w-8 h-8" />,
            title: "AI Enthusiasts",
            description: "ML & automation tools",
            color: "from-orange-500 to-red-500",
        },
        {
            icon: <Briefcase className="w-8 h-8" />,
            title: "Small Businesses",
            description: "Website & app development",
            color: "from-indigo-500 to-purple-500",
        },
    ]

    // Testimonials
    const testimonials = [
        {
            name: "Aarav",
            role: "BTech CSE",
            content: "Their internship helped me crack my first job!",
            rating: 5,
        },
        {
            name: "Ramesh Traders",
            role: "Business Owner",
            content: "Our e-commerce site was ready in 2 weeks. Great support.",
            rating: 5,
        },
        {
            name: "Priya Sharma",
            role: "Startup Founder",
            content: "The AI solutions transformed our business operations completely.",
            rating: 5,
        },
    ]

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 to-purple-50">
                <div className="relative">
                    <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
                    <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-16 h-16 bg-blue-600 rounded-full animate-pulse"></div>
                    </div>
                </div>
            </div>
        )
    }

    return (
        <div className="min-h-screen overflow-hidden">
            {/* Hero Section with 3D Background */}
            <section className="relative min-h-screen flex justify-center overflow-hidden bg-gray-50 dark:bg-gray-900">
                {/* Decorative background blob */}
                <div className="absolute w-[32rem] h-[32rem] bg-purple-400 rounded-full blur-3xl opacity-20 top-0 left-1/4 -z-10"></div>

                {/* 3D Background */}
                <div className="absolute inset-0 z-0">
                    <Canvas
                        className="!z-[-1]"
                        camera={{ position: [0, 0, 5] }}
                        dpr={[1, 1.5]}
                        gl={{ preserveDrawingBuffer: true }}
                        onCreated={({ gl }) => {
                            gl.getContext().getExtension("WEBGL_lose_context")?.restoreContext?.()
                        }}
                    >
                        <Suspense fallback={null}>
                            <ambientLight intensity={0.5} />
                            <pointLight position={[10, 10, 10]} />
                            <AnimatedGlobe />
                            <OrbitControls enableZoom={false} enablePan={false} autoRotate autoRotateSpeed={0.5} />
                            <Environment preset="sunset" />
                        </Suspense>
                    </Canvas>
                </div>

                {/* Hero Content */}
                <div className="relative z-10 text-center px-4 max-w-7xl mx-auto mt-24">
                    <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
                        <p className="text-sm md:text-base uppercase tracking-wide text-blue-600 font-semibold my-4">
                            Empowering Youth & Businesses
                        </p>

                        <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mt-16 mb-10 leading-tight">
                            <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                                From Learning to Launch
                            </span>
                            <br />
                            <span className="text-gray-800 dark:text-white">
                                Build Your Tech Career or Digital Dream with Us
                            </span>
                        </h1>

                        <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 my-14 max-w-4xl mx-auto">
                            Internships, Training, Projects & Software Solutions—all under one roof.
                        </p>

                        <div className="flex flex-col md:flex-row gap-4 justify-around">
                            <motion.button
                                className="px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-full font-semibold text-lg hover:shadow-[0_10px_20px_rgba(0,0,0,0.2)] transition-all duration-300 flex items-center gap-2 justify-center"
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                            >
                                <motion.span
                                    animate={{ rotate: [0, 10, -10, 0] }}
                                    transition={{ repeat: Infinity, duration: 2 }}
                                >
                                </motion.span>
                                Services
                            </motion.button>

                            <motion.button
                                className="px-8 py-4 border-2 border-gray-300 dark:border-gray-600 text-gray-800 dark:text-white rounded-full font-semibold text-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-all duration-300 flex items-center gap-2 justify-center"
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                            >
                                <motion.span
                                    animate={{ rotate: [0, 10, -10, 0] }}
                                    transition={{ repeat: Infinity, duration: 2 }}
                                >
                                </motion.span>
                                Career
                            </motion.button>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* About GG Private Limited */}
            <section className="py-20 bg-white dark:bg-gray-900">
                <div className="max-w-7xl mx-auto px-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">

                        {/* Left: Text Content */}
                        <motion.div
                            className="text-center md:text-left"
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6 }}
                            viewport={{ once: true }}
                        >
                            <h2 className="text-3xl md:text-4xl font-bold mb-6">Who We Are</h2>
                            <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 leading-relaxed">
                                GG Private Limited is a youth-driven tech startup aimed at empowering students, professionals, and small
                                businesses through hands-on internships, training, and affordable software solutions. We bridge the gap
                                between learning and real-world application.
                            </p>
                        </motion.div>

                        {/* Right: Image Content */}
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.8, ease: 'easeOut' }}
                            viewport={{ once: true }}
                            className="flex justify-center"
                        >
                            <img
                                src="https://res.cloudinary.com/dtyyhhrtx/image/upload/v1748339167/christina-wocintechchat-com-rg1y72eKw6o-unsplash_n86c8o.jpg"
                                alt="Who We Are Illustration"
                                className="rounded-2xl shadow-xl w-full max-w-md object-cover"
                            />
                        </motion.div>

                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center mt-16">

                        {/* right: Text Content */}
                        <motion.div
                            className="md:order-2 text-center md:text-left"
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6 }}
                            viewport={{ once: true }}
                        >
                            <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 leading-relaxed">
                                At GG Private Limited, our core mission is to support college students in their academic and professional journeys by offering end-to-end solutions for IT projects, real-world internships, and essential digital services. We strive to make technology accessible and practical, helping students gain industry-relevant experience while also assisting them in building strong portfolios that open doors to future opportunities.
                            </p>
                        </motion.div>

                        {/* left: Image Content */}
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.8, ease: 'easeOut' }}
                            viewport={{ once: true }}
                            className="md:order-1 flex justify-center"
                        >
                            <img
                                src="https://res.cloudinary.com/dtyyhhrtx/image/upload/v1748340693/rut-miit-Z2rn5dL-64w-unsplash_o1vu0w.jpg"
                                alt="Who We Are Illustration"
                                className="rounded-2xl shadow-xl w-full max-w-md object-cover"
                            />
                        </motion.div>
                    </div>
                </div>
            </section>


            {/* Services We Offer */}
            {/* <section className="py-20 bg-gradient-to-br from-blue-50 to-purple-50 dark:from-gray-800 dark:to-gray-900">
                <div className="max-w-6xl mx-auto px-4">
                    <motion.div
                        className="text-center mb-16"
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        viewport={{ once: true }}
                    >
                        <h2 className="text-3xl md:text-4xl font-bold mb-4">What We Do Best</h2>
                    </motion.div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {services.map((service, index) => (
                            <motion.div
                                key={index}
                                className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300"
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                                viewport={{ once: true }}
                                whileHover={{ y: -5 }}
                            >
                                <div
                                    className={`w-16 h-16 rounded-2xl bg-gradient-to-r ${service.color} flex items-center justify-center text-white mb-4`}
                                >
                                    {service.icon}
                                </div>
                                <h3 className="text-xl font-semibold mb-3">{service.title}</h3>
                                <p className="text-gray-600 dark:text-gray-300">{service.description}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section> */}

            {/* Why Choose GG? */}

            <section className="bg-white py-20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <motion.div
                        className="text-center mb-16"
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        viewport={{ once: true }}
                    >
                        <h2 className="text-4xl font-bold text-gray-800">Why Choose GG Private Limited</h2>
                    </motion.div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
                        <motion.div
                            className="bg-gray-50 rounded-xl shadow-lg p-8 transition hover:shadow-xl border border-gray-200 sm:col-span-2"
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0 * 0.2 }}
                            viewport={{ once: true }}
                        >
                            <div className="flex items-center gap-4 mb-4">
                                <div className="p-3 bg-yellow-100 rounded-full">
                                    {features[0].icon}
                                </div>
                                <h3 className="text-xl font-semibold text-gray-800">{features[0].title}</h3>
                            </div>
                            <p className="text-gray-600 text-sm mb-4">{features[0].description}</p>
                            <div className="flex w-full">
                                <img
                                    src="https://res.cloudinary.com/dtyyhhrtx/image/upload/v1748338454/1-Picsart-AiImageEnhancer-Photoroom-Picsart-BackgroundChanger_saui9l.png"
                                    alt=""
                                    className="w-full"
                                />
                            </div>
                        </motion.div>

                        <motion.div
                            className="bg-gray-50 rounded-xl shadow-lg p-8 transition hover:shadow-xl border border-gray-200 sm:col-span-1"
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 1 * 0.2 }}
                            viewport={{ once: true }}
                        >
                            <div className="flex items-center gap-4 mb-4">
                                <div className="p-3 bg-yellow-100 rounded-full">
                                    {features[1].icon}
                                </div>
                                <h3 className="text-xl font-semibold text-gray-800">{features[1].title}</h3>
                            </div>
                            <p className="text-gray-600 text-sm mb-4">{features[1].description}</p>

                            <div className="flex w-full">
                                <img
                                    src="https://res.cloudinary.com/dtyyhhrtx/image/upload/v1748341224/2-Picsart-AiImageEnhancer-Picsart-BackgroundChanger_se7a2x.png"
                                    alt=""
                                    className="w-full"
                                />
                            </div>
                        </motion.div>

                        <motion.div
                            className="bg-gray-50 rounded-xl shadow-lg p-8 transition hover:shadow-xl border border-gray-200 sm:col-span-1"
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 2 * 0.2 }}
                            viewport={{ once: true }}
                        >
                            <div className="flex items-center gap-4 mb-4">
                                <div className="p-3 bg-yellow-100 rounded-full">
                                    {features[2].icon}
                                </div>
                                <h3 className="text-xl font-semibold text-gray-800">{features[2].title}</h3>
                            </div>
                            <p className="text-gray-600 text-sm mb-4">{features[2].description}</p>

                            <div className="flex w-full justify-center mt-12">
                                <div className="py-10 px-14 bg-gray-200 border border-black border-dashed">
                                    <Code2 size={40} className="bg-yellow-400 p-1" />
                                </div>
                            </div>
                        </motion.div>

                        <motion.div
                            className="bg-gray-50 rounded-xl shadow-lg p-8 transition hover:shadow-xl border border-gray-200 sm:col-span-2"
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 3 * 0.2 }}
                            viewport={{ once: true }}
                        >
                            <div className="flex items-center gap-4 mb-4">
                                <div className="p-3 bg-yellow-100 rounded-full">
                                    {features[3].icon}
                                </div>
                                <h3 className="text-xl font-semibold text-gray-800">{features[3].title}</h3>
                            </div>
                            <p className="text-gray-600 text-sm mb-4">{features[3].description}</p>

                            <div className="flex w-full">
                                <img
                                    src="https://res.cloudinary.com/dtyyhhrtx/image/upload/v1748342184/4-Picsart-AiImageEnhancer-Picsart-BackgroundChanger_niifxy.png"
                                    alt=""
                                    className="w-full"
                                />
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Meet Our AI Assistants */}
            {/* <section className="py-20 bg-gradient-to-br from-purple-50 to-pink-50 dark:from-gray-800 dark:to-gray-900">
                <div className="max-w-7xl mx-auto px-4">
                    <motion.div
                        className="text-center mb-16"
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        viewport={{ once: true }}
                    >
                        <h2 className="text-3xl md:text-4xl font-bold mb-4">Smart. Scalable. AI-Powered.</h2>
                        <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
                            We use AI to enhance training, simulate interviews, and build tools. Meet our smart agents:
                        </p>
                    </motion.div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {aiAssistants.map((assistant, index) => (
                            <motion.div
                                key={index}
                                className="bg-white dark:bg-gray-800 rounded-2xl p-6 text-center shadow-lg hover:shadow-2xl transition-all duration-300"
                                initial={{ opacity: 0, scale: 0.8 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                                viewport={{ once: true }}
                                whileHover={{ y: -10 }}
                            >
                                <div
                                    className={`w-20 h-20 rounded-2xl bg-gradient-to-r ${assistant.color} flex items-center justify-center text-white mb-4 mx-auto`}
                                >
                                    {assistant.icon}
                                </div>
                                <h3 className="text-lg font-semibold mb-2">{assistant.title}</h3>
                                <p className="text-gray-600 dark:text-gray-300 text-sm">{assistant.description}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section> */}

            {/* Use Cases - Who We Work With */}
            <section className="py-20 bg-white dark:bg-gray-900">
                <div className="max-w-6xl mx-auto px-4">
                    <motion.div
                        className="text-center mb-16"
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        viewport={{ once: true }}
                    >
                        <h2 className="text-3xl md:text-4xl font-bold mb-4">Who We Work With</h2>
                    </motion.div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {useCases.map((useCase, index) => (
                            <motion.div
                                key={index}
                                className="bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-700 rounded-2xl p-6 hover:shadow-xl transition-all duration-300"
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                                viewport={{ once: true }}
                                whileHover={{ scale: 1.02 }}
                            >
                                <div
                                    className={`w-12 h-12 rounded-xl bg-gradient-to-r ${useCase.color} flex items-center justify-center text-white mb-4`}
                                >
                                    {useCase.icon}
                                </div>
                                <h3 className="text-xl font-semibold mb-2">{useCase.title}</h3>
                                <p className="text-gray-600 dark:text-gray-300">{useCase.description}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Testimonials */}
            {/* <section className="py-20 bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-gray-800 dark:to-gray-900">
                <div className="max-w-6xl mx-auto px-4">
                    <motion.div
                        className="text-center mb-16"
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        viewport={{ once: true }}
                    >
                        <h2 className="text-3xl md:text-4xl font-bold mb-4">Trusted by 500+ Clients & Interns</h2>
                    </motion.div>

                    <div className="grid md:grid-cols-3 gap-8">
                        {testimonials.map((testimonial, index) => (
                            <motion.div
                                key={index}
                                className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg"
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                                viewport={{ once: true }}
                            >
                                <div className="flex mb-4">
                                    {[...Array(testimonial.rating)].map((_, i) => (
                                        <span key={i} className="text-yellow-400 text-xl">
                                            ★
                                        </span>
                                    ))}
                                </div>
                                <p className="text-gray-600 dark:text-gray-300 mb-4 italic">"{testimonial.content}"</p>
                                <div>
                                    <p className="font-semibold">{testimonial.name}</p>
                                    <p className="text-sm text-gray-500">{testimonial.role}</p>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section> */}

            {/* Call to Action */}
            <section className="py-20 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600"></div>
                <div className="absolute inset-0 bg-black/20"></div>

                <div className="relative z-10 max-w-4xl mx-auto text-center px-4 text-white">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        viewport={{ once: true }}
                    >
                        <h2 className="text-3xl md:text-5xl font-bold mb-6">
                            Let's Build Your Future—Start Today with GG Private Limited
                        </h2>

                        <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
                            <motion.button
                                className="px-8 py-4 bg-white text-blue-600 rounded-full font-semibold text-lg hover:bg-gray-100 transition-all duration-300 flex items-center justify-center gap-2"
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                            >
                                💼 Apply for Internship
                            </motion.button>

                            <motion.button
                                className="px-8 py-4 border-2 border-white text-white rounded-full font-semibold text-lg hover:bg-white/10 transition-all duration-300 flex items-center justify-center gap-2"
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                            >
                                ✉️ Contact for Services
                            </motion.button>
                        </div>
                    </motion.div>
                </div>

                {/* Animated Background Elements */}
                <div className="absolute inset-0 overflow-hidden pointer-events-none">
                    {[...Array(20)].map((_, i) => (
                        <motion.div
                            key={i}
                            className="absolute w-2 h-2 bg-white/20 rounded-full"
                            style={{
                                left: `${Math.random() * 100}%`,
                                top: `${Math.random() * 100}%`,
                            }}
                            animate={{
                                y: [-20, -100],
                                opacity: [0, 1, 0],
                            }}
                            transition={{
                                duration: 3 + Math.random() * 2,
                                repeat: Number.POSITIVE_INFINITY,
                                delay: Math.random() * 2,
                            }}
                        />
                    ))}
                </div>
            </section>
        </div>
    )
}

export default Home
