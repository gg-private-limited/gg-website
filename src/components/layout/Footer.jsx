import { Link } from "react-router-dom"
import { Facebook, Twitter, Linkedin, Instagram, Mail, Phone, MapPin } from "lucide-react"
import { COMPANY, NAV_LINKS } from "../../constants"

const Footer = () => {
    const currentYear = new Date().getFullYear()

    return (
        <footer style={{ backgroundColor: "var(--button-bg)", color: "var(--button-text)" }}>
            <div className="container-custom py-12">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {/* Company Info */}
                    <div>
                        <h3 className="text-xl font-bold mb-4 text-gradient">{COMPANY.name}</h3>
                        <p className="opacity-80 mb-4">{COMPANY.description}</p>
                        <div className="flex space-x-4">
                            <a
                                href={COMPANY.socialMedia.facebook}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="opacity-80 hover:opacity-100 transition-opacity"
                            >
                                <Facebook size={20} />
                            </a>
                            <a
                                href={COMPANY.socialMedia.twitter}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="opacity-80 hover:opacity-100 transition-opacity"
                            >
                                <Twitter size={20} />
                            </a>
                            <a
                                href={COMPANY.socialMedia.linkedin}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="opacity-80 hover:opacity-100 transition-opacity"
                            >
                                <Linkedin size={20} />
                            </a>
                            <a
                                href={COMPANY.socialMedia.instagram}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="opacity-80 hover:opacity-100 transition-opacity"
                            >
                                <Instagram size={20} />
                            </a>
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h3 className="text-xl font-bold mb-4">Quick Links</h3>
                        <ul className="space-y-2">
                            {NAV_LINKS.map((link) => (
                                <li key={link.name}>
                                    <Link to={link.path} className="opacity-80 hover:opacity-100 transition-opacity">
                                        {link.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Services */}
                    <div>
                        <h3 className="text-xl font-bold mb-4">Our Services</h3>
                        <ul className="space-y-2">
                            <li>
                                <Link to="/services" className="opacity-80 hover:opacity-100 transition-opacity">
                                    Web Development
                                </Link>
                            </li>
                            <li>
                                <Link to="/services" className="opacity-80 hover:opacity-100 transition-opacity">
                                    AI Solutions
                                </Link>
                            </li>
                            <li>
                                <Link to="/services" className="opacity-80 hover:opacity-100 transition-opacity">
                                    Custom Software
                                </Link>
                            </li>
                            <li>
                                <Link to="/services" className="opacity-80 hover:opacity-100 transition-opacity">
                                    Training Programs
                                </Link>
                            </li>
                            <li>
                                <Link to="/services" className="opacity-80 hover:opacity-100 transition-opacity">
                                    IT Consulting
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Contact Info */}
                    <div>
                        <h3 className="text-xl font-bold mb-4">Contact Us</h3>
                        <ul className="space-y-3">
                            <li className="flex items-start">
                                <MapPin size={20} className="mr-2 mt-1 flex-shrink-0" />
                                <span className="opacity-80">{COMPANY.address}</span>
                            </li>
                            <li className="flex items-center">
                                <Phone size={20} className="mr-2 flex-shrink-0" />
                                <span className="opacity-80">{COMPANY.phone}</span>
                            </li>
                            <li className="flex items-center">
                                <Mail size={20} className="mr-2 flex-shrink-0" />
                                <span className="opacity-80">{COMPANY.email}</span>
                            </li>
                        </ul>
                    </div>
                </div>

                <div className="border-t mt-12 pt-8 text-center opacity-60" style={{ borderColor: "rgba(255,255,255,0.1)" }}>
                    <p>
                        &copy; {currentYear} {COMPANY.name}. All rights reserved.
                    </p>
                </div>
            </div>
        </footer>
    )
}

export default Footer
