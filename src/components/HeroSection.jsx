"use client"

import { useEffect, useRef, useState } from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import { Link } from "react-router-dom"
import { ChevronRight, Play, Sparkles, Zap, Globe, Users } from "lucide-react"
import * as THREE from "three"

const HeroSection = () => {
    const containerRef = useRef(null)
    const canvasRef = useRef(null)
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
    const { scrollY } = useScroll()
    const y = useTransform(scrollY, [0, 500], [0, 150])

    useEffect(() => {
        if (!canvasRef.current) return

        // Three.js scene setup
        const scene = new THREE.Scene()
        const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)
        const renderer = new THREE.WebGLRenderer({
            canvas: canvasRef.current,
            alpha: true,
            antialias: true,
        })

        renderer.setSize(window.innerWidth, window.innerHeight)
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

        // Create animated particles
        const particlesGeometry = new THREE.BufferGeometry()
        const particlesCount = 3000
        const posArray = new Float32Array(particlesCount * 3)
        const colorArray = new Float32Array(particlesCount * 3)

        for (let i = 0; i < particlesCount * 3; i += 3) {
            posArray[i] = (Math.random() - 0.5) * 20
            posArray[i + 1] = (Math.random() - 0.5) * 20
            posArray[i + 2] = (Math.random() - 0.5) * 20

            // Color gradient from blue to purple
            const t = Math.random()
            colorArray[i] = 0.2 + t * 0.6 // R
            colorArray[i + 1] = 0.4 + t * 0.4 // G
            colorArray[i + 2] = 0.8 + t * 0.2 // B
        }

        particlesGeometry.setAttribute("position", new THREE.BufferAttribute(posArray, 3))
        particlesGeometry.setAttribute("color", new THREE.BufferAttribute(colorArray, 3))

        const particlesMaterial = new THREE.PointsMaterial({
            size: 0.03,
            vertexColors: true,
            transparent: true,
            opacity: 0.8,
            blending: THREE.AdditiveBlending,
        })

        const particlesMesh = new THREE.Points(particlesGeometry, particlesMaterial)
        scene.add(particlesMesh)

        // Create floating geometric shapes
        const geometries = [
            new THREE.OctahedronGeometry(0.3),
            new THREE.TetrahedronGeometry(0.4),
            new THREE.IcosahedronGeometry(0.25),
        ]

        const shapes = []
        for (let i = 0; i < 15; i++) {
            const geometry = geometries[Math.floor(Math.random() * geometries.length)]
            const material = new THREE.MeshBasicMaterial({
                color: new THREE.Color().setHSL(0.6 + Math.random() * 0.2, 0.7, 0.6),
                transparent: true,
                opacity: 0.3,
                wireframe: true,
            })
            const mesh = new THREE.Mesh(geometry, material)

            mesh.position.set((Math.random() - 0.5) * 15, (Math.random() - 0.5) * 15, (Math.random() - 0.5) * 15)

            mesh.rotation.set(Math.random() * Math.PI, Math.random() * Math.PI, Math.random() * Math.PI)

            shapes.push(mesh)
            scene.add(mesh)
        }

        camera.position.z = 8

        // Animation loop
        let animationId
        const animate = () => {
            animationId = requestAnimationFrame(animate)

            // Rotate particles
            particlesMesh.rotation.x += 0.0003
            particlesMesh.rotation.y += 0.0005

            // Animate shapes
            shapes.forEach((shape, index) => {
                shape.rotation.x += 0.01 + index * 0.001
                shape.rotation.y += 0.008 + index * 0.001
                shape.position.y += Math.sin(Date.now() * 0.001 + index) * 0.001
            })

            // Mouse interaction
            camera.position.x += (mousePosition.x * 0.5 - camera.position.x) * 0.05
            camera.position.y += (-mousePosition.y * 0.5 - camera.position.y) * 0.05
            camera.lookAt(scene.position)

            renderer.render(scene, camera)
        }

        animate()

        // Handle resize
        const handleResize = () => {
            camera.aspect = window.innerWidth / window.innerHeight
            camera.updateProjectionMatrix()
            renderer.setSize(window.innerWidth, window.innerHeight)
        }

        window.addEventListener("resize", handleResize)

        return () => {
            window.removeEventListener("resize", handleResize)
            cancelAnimationFrame(animationId)
            renderer.dispose()
        }
    }, [mousePosition])

    useEffect(() => {
        const handleMouseMove = (e) => {
            setMousePosition({
                x: (e.clientX / window.innerWidth) * 2 - 1,
                y: -(e.clientY / window.innerHeight) * 2 + 1,
            })
        }

        window.addEventListener("mousemove", handleMouseMove)
        return () => window.removeEventListener("mousemove", handleMouseMove)
    }, [])

    const stats = [
        { number: "500+", label: "Projects Delivered", icon: <Zap className="w-5 h-5" /> },
        { number: "150+", label: "Happy Clients", icon: <Users className="w-5 h-5" /> },
        { number: "25+", label: "Countries Served", icon: <Globe className="w-5 h-5" /> },
    ]

    return (
        <section ref={containerRef} className="relative min-h-screen flex items-center justify-center overflow-hidden mt-16">
            {/* 3D Background */}
            <canvas
                ref={canvasRef}
                className="absolute inset-0 w-full h-full"
                style={{ background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)" }}
            />

            {/* Gradient Overlays */}
            <div className="absolute inset-0 bg-gradient-to-br from-blue-900/20 via-purple-900/30 to-pink-900/20" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />

            {/* Floating Elements */}
            <motion.div
                className="absolute top-20 left-10 w-20 h-20 rounded-full bg-gradient-to-r from-blue-400 to-purple-500 opacity-20 blur-xl"
                animate={{
                    y: [0, -20, 0],
                    scale: [1, 1.1, 1],
                }}
                transition={{
                    duration: 4,
                    repeat: Number.POSITIVE_INFINITY,
                    ease: "easeInOut",
                }}
            />

            <motion.div
                className="absolute bottom-32 right-16 w-32 h-32 rounded-full bg-gradient-to-r from-pink-400 to-red-500 opacity-15 blur-2xl"
                animate={{
                    y: [0, 30, 0],
                    scale: [1, 0.8, 1],
                }}
                transition={{
                    duration: 6,
                    repeat: Number.POSITIVE_INFINITY,
                    ease: "easeInOut",
                }}
            />

            {/* Main Content */}
            <motion.div className="relative z-10 text-center text-white px-4 max-w-6xl mx-auto" style={{ y }}>
                {/* Badge */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 mb-8"
                >
                    <Sparkles className="w-4 h-4 text-yellow-400" />
                    <span className="text-sm font-medium">Transforming Ideas into Digital Reality</span>
                </motion.div>

                {/* Main Heading */}
                <motion.h1
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="text-5xl md:text-7xl lg:text-8xl font-bold mb-6 leading-tight"
                >
                    <span className="block bg-gradient-to-r from-white via-blue-100 to-purple-200 bg-clip-text text-transparent">
                        Innovative
                    </span>
                    <span className="block bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                        IT Solutions
                    </span>
                </motion.h1>

                {/* Subtitle */}
                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.4 }}
                    className="text-xl md:text-2xl text-white/90 mb-12 max-w-3xl mx-auto leading-relaxed"
                >
                    Empowering businesses with cutting-edge technology solutions, AI-driven innovations, and world-class
                    development services that drive growth and success.
                </motion.p>

                {/* CTA Buttons */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.6 }}
                    className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16"
                >
                    <Link
                        to="/services"
                        className="group relative px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full font-semibold text-lg transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-blue-500/25"
                    >
                        <span className="relative z-10 flex items-center gap-2">
                            Explore Services
                            <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                        </span>
                        <div className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-700 to-purple-700 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </Link>

                    <button className="group flex items-center gap-3 px-8 py-4 rounded-full border-2 border-white/30 backdrop-blur-md hover:bg-white/10 transition-all duration-300">
                        <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center group-hover:scale-110 transition-transform">
                            <Play className="w-5 h-5 ml-1" />
                        </div>
                        <span className="font-semibold">Watch Demo</span>
                    </button>
                </motion.div>

                {/* Stats */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.8 }}
                    className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-2xl mx-auto"
                >
                    {stats.map((stat, index) => (
                        <motion.div
                            key={index}
                            className="text-center"
                            whileHover={{ scale: 1.05 }}
                            transition={{ type: "spring", stiffness: 300 }}
                        >
                            <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-white/10 backdrop-blur-md mb-3">
                                {stat.icon}
                            </div>
                            <div className="text-3xl font-bold mb-1">{stat.number}</div>
                            <div className="text-white/70 text-sm">{stat.label}</div>
                        </motion.div>
                    ))}
                </motion.div>
            </motion.div>

            {/* Scroll Indicator */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.5 }}
                className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
            >
                <motion.div
                    animate={{ y: [0, 10, 0] }}
                    transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
                    className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center"
                >
                    <motion.div
                        animate={{ y: [0, 12, 0] }}
                        transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
                        className="w-1 h-3 bg-white/60 rounded-full mt-2"
                    />
                </motion.div>
            </motion.div>
        </section>
    )
}

export default HeroSection
