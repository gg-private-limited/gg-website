"use client"

import { motion } from "framer-motion"
import { Users, Clock, Globe, CheckCircle } from "lucide-react"

const About = () => {
    const team = [
        {
            name: "Kiran Nikam",
            role: "CEO & Founder",
            image: "https://res.cloudinary.com/dtyyhhrtx/image/upload/v1734503011/kiranProfile_mgw9sr.png", 
            bio: "As the visionary behind GG Private Limited, Kiran Nikam brings a deep passion for innovation and technology. With expertise in full-stack development, leadership, and strategic planning, he founded the company to deliver future-ready digital solutions and empower businesses with scalable tech.",
        },
        // {
        //     name: "Ananya Singh",
        //     role: "CTO",
        //     image: "/placeholder.svg?height=300&width=300",
        //     bio: "Ananya leads our technical team with her expertise in AI, machine learning, and software architecture. She ensures our solutions are cutting-edge and scalable.",
        // },
        // {
        //     name: "Vikram Mehta",
        //     role: "Head of Training",
        //     image: "/placeholder.svg?height=300&width=300",
        //     bio: "Vikram oversees our internship and training programs, bringing his passion for education and extensive industry experience to nurture the next generation of tech professionals.",
        // },
        // {
        //     name: "Priya Sharma",
        //     role: "Lead Developer",
        //     image: "/placeholder.svg?height=300&width=300",
        //     bio: "Priya leads our development team, specializing in web and mobile applications. Her technical expertise and problem-solving skills drive our project success.",
        // },
    ]

    const values = [
        {
            icon: <CheckCircle size={24} className="text-blue-600" />,
            title: "Excellence",
            description: "We strive for excellence in everything we do, from code quality to client communication.",
        },
        {
            icon: <Users size={24} className="text-blue-600" />,
            title: "Collaboration",
            description: "We believe in the power of teamwork and collaboration to achieve the best results.",
        },
        {
            icon: <Clock size={24} className="text-blue-600" />,
            title: "Timeliness",
            description: "We respect deadlines and deliver our projects on time, every time.",
        },
        {
            icon: <Globe size={24} className="text-blue-600" />,
            title: "Innovation",
            description: "We embrace new technologies and innovative approaches to solve complex problems.",
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
                        <h1 className="heading-xl mb-6">About Us</h1>
                        <p className="text-xl text-white/90">
                            Learn about our company, our mission, and the team behind GG Private Limited.
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* Our Story */}
            <section className="section-padding">
                <div className="container-custom">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.5 }}
                            viewport={{ once: true }}
                        >
                            <h2 className="heading-lg mb-6">Our Story</h2>
                            <p className="text-gray-600 mb-4">
                                Founded in 2015, GG Private Limited started as a small web development agency with a team of just three
                                developers. Over the years, we've grown into a full-service IT company offering a wide range of services
                                including web development, AI solutions, custom software, and comprehensive training programs.
                            </p>
                            <p className="text-gray-600 mb-4">
                                Our journey has been marked by a commitment to excellence, innovation, and a passion for nurturing tech
                                talent. We believe in the power of technology to transform businesses and create opportunities for
                                individuals.
                            </p>
                            <p className="text-gray-600">
                                Today, we're proud to have served over 100 clients across various industries and trained more than 200
                                professionals who are now making their mark in the tech industry.
                            </p>
                        </motion.div>

                        <motion.div
                            className="flex justify-center"
                            initial={{ opacity: 0, x: 20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.5 }}
                            viewport={{ once: true }}
                        >
                            <img src="/placeholder.svg?height=400&width=500" alt="Our Office" className="rounded-lg shadow-lg" />
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Mission & Vision */}
            <section className="section-padding bg-gray-50">
                <div className="container-custom">
                    <motion.div
                        className="text-center max-w-3xl mx-auto mb-16"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        viewport={{ once: true }}
                    >
                        <h2 className="heading-lg mb-4">Mission & Vision</h2>
                        <p className="text-gray-600 text-lg">
                            Our mission and vision guide everything we do at GG Private Limited.
                        </p>
                    </motion.div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <motion.div
                            className="bg-white rounded-xl shadow-md p-8"
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5 }}
                            viewport={{ once: true }}
                        >
                            <h3 className="text-2xl font-bold mb-4 text-blue-600">Our Mission</h3>
                            <p className="text-gray-600">
                                To provide innovative IT solutions that help businesses thrive in the digital era and to nurture tech
                                talent through comprehensive training programs that prepare individuals for successful careers in the
                                industry.
                            </p>
                        </motion.div>

                        <motion.div
                            className="bg-white rounded-xl shadow-md p-8"
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.1 }}
                            viewport={{ once: true }}
                        >
                            <h3 className="text-2xl font-bold mb-4 text-purple-600">Our Vision</h3>
                            <p className="text-gray-600">
                                To be a leading IT company known for its technical excellence, innovative solutions, and commitment to
                                developing the next generation of tech professionals who will shape the future of the industry.
                            </p>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Our Values */}
            <section className="section-padding">
                <div className="container-custom">
                    <motion.div
                        className="text-center max-w-3xl mx-auto mb-16"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        viewport={{ once: true }}
                    >
                        <h2 className="heading-lg mb-4">Our Values</h2>
                        <p className="text-gray-600 text-lg">
                            These core values define our culture and guide our actions at GG Private Limited.
                        </p>
                    </motion.div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {values.map((value, index) => (
                            <motion.div
                                key={index}
                                className="bg-white rounded-xl shadow-md p-6 text-center"
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                                viewport={{ once: true }}
                            >
                                <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center mx-auto mb-4">
                                    {value.icon}
                                </div>
                                <h3 className="text-xl font-bold mb-2">{value.title}</h3>
                                <p className="text-gray-600">{value.description}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Our Team */}
            <section className="section-padding bg-gray-50">
                <div className="container-custom">
                    <motion.div
                        className="text-center max-w-3xl mx-auto mb-16"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        viewport={{ once: true }}
                    >
                        <h2 className="heading-lg mb-4">Meet Our Team</h2>
                        <p className="text-gray-600 text-lg">
                            The talented individuals behind GG Private Limited who make everything possible.
                        </p>
                    </motion.div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {team.map((member, index) => (
                            <motion.div
                                key={index}
                                className="bg-white rounded-xl shadow-md overflow-hidden"
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                                viewport={{ once: true }}
                            >
                                <img src={member.image || "/placeholder.svg"} alt={member.name} className="w-full h-64 object-cover" />
                                <div className="p-6">
                                    <h3 className="text-xl font-bold mb-1">{member.name}</h3>
                                    <p className="text-blue-600 font-medium mb-4">{member.role}</p>
                                    <p className="text-gray-600">{member.bio}</p>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="section-padding bg-blue-600 text-white">
                <div className="container-custom text-center">
                    <motion.div
                        className="max-w-3xl mx-auto"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        viewport={{ once: true }}
                    >
                        <h2 className="heading-lg mb-6">Join Our Team</h2>
                        <p className="text-xl mb-8 text-white/90">
                            We're always looking for talented individuals to join our team. Check out our current openings or send us
                            your resume.
                        </p>
                        <div className="flex flex-wrap justify-center gap-4">
                            <a href="/contact" className="btn-primary bg-white text-blue-600 hover:bg-gray-100">
                                View Openings
                            </a>
                            <a href="/contact" className="btn-primary bg-transparent border-2 border-white hover:bg-white/10">
                                Contact Us
                            </a>
                        </div>
                    </motion.div>
                </div>
            </section>
        </main>
    )
}

export default About
