"use client"

import { useRef, useEffect } from "react"
import * as THREE from "three"
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls"

const GlobeModel = () => {
    const mountRef = useRef(null)

    useEffect(() => {
        // Scene setup
        const scene = new THREE.Scene()

        // Camera setup
        const camera = new THREE.PerspectiveCamera(75, 1, 0.1, 1000)
        camera.position.z = 2

        // Renderer setup - check if mountRef is available
        if (!mountRef.current) return

        const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })
        renderer.setSize(300, 300)
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
        mountRef.current.appendChild(renderer.domElement)

        // Controls
        const controls = new OrbitControls(camera, renderer.domElement)
        controls.enableDamping = true
        controls.dampingFactor = 0.05
        controls.enableZoom = false
        controls.autoRotate = true
        controls.autoRotateSpeed = 1

        // Earth geometry
        const geometry = new THREE.SphereGeometry(1, 64, 64)

        // Earth material with basic blue color
        const material = new THREE.MeshPhongMaterial({
            color: 0x0070f3,
            emissive: 0x112244,
            specular: 0xffffff,
            shininess: 100,
        })

        // Create mesh
        const globe = new THREE.Mesh(geometry, material)
        scene.add(globe)

        // Add ambient light
        const ambientLight = new THREE.AmbientLight(0xffffff, 0.2)
        scene.add(ambientLight)

        // Add directional light
        const directionalLight = new THREE.DirectionalLight(0xffffff, 1)
        directionalLight.position.set(5, 3, 5)
        scene.add(directionalLight)

        // Animation
        let animationFrameId

        const animate = () => {
            animationFrameId = requestAnimationFrame(animate)
            controls.update()
            renderer.render(scene, camera)
        }

        animate()

        // Handle resize
        const handleResize = () => {
            renderer.setSize(300, 300)
        }

        window.addEventListener("resize", handleResize)

        // Cleanup
        return () => {
            window.removeEventListener("resize", handleResize)
            cancelAnimationFrame(animationFrameId)

            if (mountRef.current && renderer.domElement) {
                mountRef.current.removeChild(renderer.domElement)
            }

            // Dispose of Three.js resources
            scene.clear()
            geometry.dispose()
            material.dispose()
            renderer.dispose()
        }
    }, [])

    return <div ref={mountRef} className="w-[300px] h-[300px] mx-auto" />
}

export default GlobeModel
