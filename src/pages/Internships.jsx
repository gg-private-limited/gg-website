"use client"

import { motion } from "framer-motion"
import { Link } from "react-router-dom"
import { Users, Award, BookOpen, Briefcase } from "lucide-react"
import InternshipCard from "../components/InternshipCard"

const Internships = () => {
    const internships = [
        {
            title: "Web Development Internship",
            description:
                "Learn modern web development technologies like React, Node.js, and more while working on real-world projects.",
            duration: "3 months",
            location: "Remote / On-site",
            startDate: "June 1, 2023",
            applyLink: "/contact",
        },
        {
            title: "AI & Machine Learning Internship",
            description:
                "Gain hands-on experience with AI and machine learning technologies, working on cutting-edge projects.",
            duration: "4 months",
            location: "Remote / On-site",
            startDate: "July 15, 2023",
            applyLink: "/contact",
        },
        {
            title: "UI/UX Design Internship",
            description:
                "Develop your design skills and learn industry-standard tools and methodologies for creating exceptional user experiences.",
            duration: "3 months",
            location: "Remote / On-site",
            startDate: "June 15, 2023",
            applyLink: "/contact",
        },
        {
            title: "Mobile App Development Internship",
            description:
                "Learn to build cross-platform mobile applications using React Native and other modern technologies.",
            duration: "3 months",
            location: "Remote / On-site",
            startDate: "August 1, 2023",
            applyLink: "/contact",
        },
        {
            title: "Data Science Internship",
            description:
                "Dive into the world of data science, learning data analysis, visualization, and predictive modeling techniques.",
            duration: "4 months",
            location: "Remote / On-site",
            startDate: "July 1, 2023",
            applyLink: "/contact",
        },
        {
            title: "DevOps Internship",
            description: "Learn about CI/CD pipelines, containerization, and cloud infrastructure management.",
            duration: "3 months",
            location: "Remote / On-site",
            startDate: "August 15, 2023",
            applyLink: "/contact",
        },
    ]

    const benefits = [
        {
            icon: <BookOpen size={24} className="text-blue-600" />,
            title: "Hands-on Learning",
            description: "Work on real-world projects and gain practical experience that goes beyond theoretical knowledge.",
        },
        {
            icon: <Users size={24} className="text-blue-600" />,
            title: "Mentorship",
            description: "Receive guidance and support from experienced professionals in your field of interest.",
        },
        {
            icon: <Award size={24} className="text-blue-600" />,
            title: "Certification",
            description: "Earn a recognized certificate upon successful completion of the internship program.",
        },
        {
            icon: <Briefcase size={24} className="text-blue-600" />,
            title: "Job Opportunities",
            description:
                "Top-performing interns may be offered full-time positions at GG Private Limited or partner companies.",
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
                        <h1 className="heading-xl mb-6">Internships & Training</h1>
                        <p className="text-xl text-white/90">
                            Kickstart your career in the tech industry with our comprehensive internship and training programs. Gain
                            hands-on experience and learn from industry experts.
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* Internships Grid */}
            <section className="section-padding">
                <div className="container-custom">
                    <motion.div
                        className="text-center max-w-3xl mx-auto mb-16"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        viewport={{ once: true }}
                    >
                        <h2 className="heading-lg mb-4">Available Internships</h2>
                        <p className="text-gray-600 text-lg">
                            Explore our current internship opportunities and find the perfect match for your skills and interests.
                        </p>
                    </motion.div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {internships.map((internship, index) => (
                            <InternshipCard key={index} {...internship} delay={index * 0.1} />
                        ))}
                    </div>
                </div>
            </section>

            {/* Benefits Section */}
            <section className="section-padding bg-gray-50">
                <div className="container-custom">
                    <motion.div
                        className="text-center max-w-3xl mx-auto mb-16"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        viewport={{ once: true }}
                    >
                        <h2 className="heading-lg mb-4">Why Choose Our Programs</h2>
                        <p className="text-gray-600 text-lg">
                            Our internship and training programs offer numerous benefits to help you grow professionally.
                        </p>
                    </motion.div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {benefits.map((benefit, index) => (
                            <motion.div
                                key={index}
                                className="bg-white rounded-xl shadow-md p-6 flex"
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                                viewport={{ once: true }}
                            >
                                <div className="w-12 h-12 rounded-lg bg-blue-100 flex items-center justify-center mr-4 flex-shrink-0">
                                    {benefit.icon}
                                </div>
                                <div>
                                    <h3 className="text-xl font-bold mb-2">{benefit.title}</h3>
                                    <p className="text-gray-600">{benefit.description}</p>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Testimonials Section */}
            <section className="section-padding">
                <div className="container-custom">
                    <motion.div
                        className="text-center max-w-3xl mx-auto mb-16"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        viewport={{ once: true }}
                    >
                        <h2 className="heading-lg mb-4">Success Stories</h2>
                        <p className="text-gray-600 text-lg">
                            Hear from our past interns about their experiences and how our programs helped them in their careers.
                        </p>
                    </motion.div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                        <motion.div
                            className="bg-white rounded-xl shadow-md p-8"
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.5 }}
                            viewport={{ once: true }}
                        >
                            <div className="flex items-center mb-6">
                                <div className="w-16 h-16 rounded-full overflow-hidden mr-4">
                                    <img src="/placeholder.svg?height=64&width=64" alt="Intern" className="w-full h-full object-cover" />
                                </div>
                                <div>
                                    <h4 className="text-xl font-bold">Rahul Sharma</h4>
                                    <p className="text-gray-600">Web Development Intern, 2022</p>
                                    <p className="text-blue-600">Now: Frontend Developer at TechCorp</p>
                                </div>
                            </div>
                            <p className="text-gray-700 italic">
                                "The internship at GG Private Limited was a game-changer for my career. I gained hands-on experience
                                with modern web technologies and received excellent mentorship. The skills I acquired helped me land my
                                dream job right after the internship."
                            </p>
                        </motion.div>

                        <motion.div
                            className="bg-white rounded-xl shadow-md p-8"
                            initial={{ opacity: 0, x: 20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.5 }}
                            viewport={{ once: true }}
                        >
                            <div className="flex items-center mb-6">
                                <div className="w-16 h-16 rounded-full overflow-hidden mr-4">
                                    <img src="/placeholder.svg?height=64&width=64" alt="Intern" className="w-full h-full object-cover" />
                                </div>
                                <div>
                                    <h4 className="text-xl font-bold">Priya Patel</h4>
                                    <p className="text-gray-600">AI & ML Intern, 2022</p>
                                    <p className="text-blue-600">Now: Data Scientist at AI Innovations</p>
                                </div>
                            </div>
                            <p className="text-gray-700 italic">
                                "The AI & ML internship provided me with the perfect blend of theoretical knowledge and practical
                                application. Working on real-world projects with cutting-edge technologies prepared me for the
                                challenges of the industry. I'm grateful for the opportunity and the doors it opened for me."
                            </p>
                        </motion.div>
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
                        <h2 className="heading-lg mb-6">Ready to Start Your Journey?</h2>
                        <p className="text-xl mb-8 text-white/90">
                            Apply for our internship programs today and take the first step towards a successful career in tech.
                        </p>
                        <div className="flex flex-wrap justify-center gap-4">
                            <Link to="/contact" className="btn-primary bg-white text-blue-600 hover:bg-gray-100">
                                Apply Now
                            </Link>
                            <Link to="/about" className="btn-primary bg-transparent border-2 border-white hover:bg-white/10">
                                Learn More
                            </Link>
                        </div>
                    </motion.div>
                </div>
            </section>
        </main>
    )
}

export default Internships
