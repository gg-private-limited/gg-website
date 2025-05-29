"use client"

import { motion } from "framer-motion"
import { Code, Cpu, Database, Server, Globe, Shield, Users, Briefcase, Lightbulb, BarChart } from "lucide-react"
import ServiceCard from "../components/ServiceCard"

const Services = () => {
    const services = [
        {
            icon: <Code size={24} className="text-blue-600" />,
            title: "Web Development",
            description:
                "Custom web applications built with React, Vue, Angular, and other modern frameworks to meet your business needs.",
        },
        {
            icon: <Cpu size={24} className="text-blue-600" />,
            title: "AI Solutions",
            description:
                "Leverage the power of artificial intelligence and machine learning to automate processes and gain valuable insights.",
        },
        {
            icon: <Database size={24} className="text-blue-600" />,
            title: "Database Management",
            description:
                "Efficient database design, implementation, and optimization to ensure your data is secure and accessible.",
        },
        {
            icon: <Server size={24} className="text-blue-600" />,
            title: "Cloud Services",
            description:
                "Migrate your infrastructure to the cloud and optimize your cloud resources for better performance and cost-efficiency.",
        },
        {
            icon: <Globe size={24} className="text-blue-600" />,
            title: "E-commerce Solutions",
            description:
                "Build and optimize online stores with secure payment gateways, inventory management, and customer analytics.",
        },
        {
            icon: <Shield size={24} className="text-blue-600" />,
            title: "Cybersecurity",
            description:
                "Protect your business from cyber threats with our comprehensive security assessments and solutions.",
        },
        {
            icon: <Users size={24} className="text-blue-600" />,
            title: "Training Programs",
            description:
                "Comprehensive training programs to upskill your team or kickstart your career in various IT domains.",
        },
        {
            icon: <Briefcase size={24} className="text-blue-600" />,
            title: "IT Consulting",
            description: "Strategic IT consulting to help you make informed decisions about your technology investments.",
        },
        {
            icon: <Lightbulb size={24} className="text-blue-600" />,
            title: "Product Innovation",
            description: "Turn your ideas into reality with our product development and innovation services.",
        },
        {
            icon: <BarChart size={24} className="text-blue-600" />,
            title: "Data Analytics",
            description:
                "Extract meaningful insights from your data to drive business growth and make data-driven decisions.",
        },
    ]

    const processSteps = [
        {
            number: "01",
            title: "Discovery",
            description: "We start by understanding your business needs, goals, and challenges through in-depth discussions.",
        },
        {
            number: "02",
            title: "Planning",
            description: "Our team creates a detailed project plan with timelines, milestones, and resource allocation.",
        },
        {
            number: "03",
            title: "Development",
            description:
                "We develop your solution using agile methodologies, ensuring regular updates and feedback integration.",
        },
        {
            number: "04",
            title: "Testing",
            description: "Rigorous testing is conducted to ensure the solution meets all requirements and quality standards.",
        },
        {
            number: "05",
            title: "Deployment",
            description: "We deploy your solution and provide training to ensure a smooth transition.",
        },
        {
            number: "06",
            title: "Support",
            description: "Our team provides ongoing support and maintenance to keep your solution running smoothly.",
        },
    ]

    return (
        <main>
            {/* Hero Section */}
            <section className="pt-32 pb-20 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
                <div className="container-custom">
                    <motion.div
                        className="max-w-3xl"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                    >
                        <h1 className="heading-xl mb-6">Our Services</h1>
                        <p className="text-xl text-white/90">
                            We provide a comprehensive range of IT services to help businesses thrive in the digital era. From web
                            development to AI solutions, we've got you covered.
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* Services Grid */}
            <section className="section-padding">
                <div className="container-custom">
                    <motion.div
                        className="text-center max-w-3xl mx-auto mb-16"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        viewport={{ once: true }}
                    >
                        <h2 className="heading-lg mb-4">What We Offer</h2>
                        <p className="text-gray-600 text-lg">
                            Our comprehensive range of services is designed to meet all your IT needs, from development to training
                            and everything in between.
                        </p>
                    </motion.div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {services.map((service, index) => (
                            <ServiceCard
                                key={index}
                                icon={service.icon}
                                title={service.title}
                                description={service.description}
                                delay={index * 0.1}
                            />
                        ))}
                    </div>
                </div>
            </section>

            {/* Our Process */}
            <section className="section-padding bg-gray-50">
                <div className="container-custom">
                    <motion.div
                        className="text-center max-w-3xl mx-auto mb-16"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        viewport={{ once: true }}
                    >
                        <h2 className="heading-lg mb-4">Our Process</h2>
                        <p className="text-gray-600 text-lg">
                            We follow a structured approach to ensure the successful delivery of every project.
                        </p>
                    </motion.div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {processSteps.map((step, index) => (
                            <motion.div
                                key={index}
                                className="bg-white rounded-xl shadow-md p-6"
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                                viewport={{ once: true }}
                            >
                                <div className="text-4xl font-bold text-blue-600 mb-4">{step.number}</div>
                                <h3 className="text-xl font-bold mb-3">{step.title}</h3>
                                <p className="text-gray-600">{step.description}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="section-padding bg-blue-600 text-white">
                <div className="container-custom">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.5 }}
                            viewport={{ once: true }}
                        >
                            <h2 className="heading-lg mb-6">Ready to Get Started?</h2>
                            <p className="text-xl mb-8 text-white/90">
                                Contact us today to discuss your project requirements and how our services can help your business grow.
                            </p>
                            <a href="/contact" className="btn-primary bg-white text-blue-600 hover:bg-gray-100">
                                Contact Us
                            </a>
                        </motion.div>

                        <motion.div
                            className="hidden lg:block"
                            initial={{ opacity: 0, x: 20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.5 }}
                            viewport={{ once: true }}
                        >
                            <img src="/placeholder.svg?height=400&width=500" alt="IT Services" className="rounded-lg shadow-lg" />
                        </motion.div>
                    </div>
                </div>
            </section>
        </main>
    )
}

export default Services
