"use client"

import { useState, useEffect } from "react"
import { Link, useLocation, useNavigate } from "react-router-dom"
import { Menu, X, Sun, Moon, User, LogOut } from "lucide-react"
import { useTheme } from "../../contexts/ThemeContext"
import { useAuth } from "../../contexts/AuthContext"
import { NAV_LINKS, USER_NAV_LINKS, COMPANY } from "../../constants"
import Button from "../ui/Button"
import Dropdown from "../ui/Dropdown"

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false)
    const [scrolled, setScrolled] = useState(false)
    const location = useLocation()
    const navigate = useNavigate()
    const { theme, toggleTheme } = useTheme()
    const { user, logout } = useAuth()

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 50) {
                setScrolled(true)
            } else {
                setScrolled(false)
            }
        }

        window.addEventListener("scroll", handleScroll)
        return () => window.removeEventListener("scroll", handleScroll)
    }, [])

    const handleLogout = async () => {
        await logout()
        navigate("/")
    }

    return (
        <nav
            className={`fixed w-full z-50 transition-all duration-300 ${scrolled ? "py-2 shadow-md" : "py-4"}`}
            style={{ backgroundColor: "var(--input-bg)" }}
        >
            <div className="container-custom flex justify-between items-center">
                <Link to="/" className="flex items-center">
                    <span className="text-2xl font-bold text-gradient">{COMPANY.name}</span>
                </Link>

                {/* Desktop Navigation */}
                <div className="hidden md:flex items-center space-x-8">
                    <div className="flex space-x-6">
                        {NAV_LINKS.map((link) => (
                            <Link
                                key={link.name}
                                to={link.path}
                                className={`font-medium transition-colors hover:text-link-color ${location.pathname === link.path ? "text-gradient font-semibold" : ""
                                    }`}
                                style={{ color: location.pathname === link.path ? "" : "var(--primary-text)" }}
                            >
                                {link.name}
                            </Link>
                        ))}
                    </div>

                    <div className="flex items-center space-x-4">
                        <button
                            onClick={toggleTheme}
                            className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
                            aria-label={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
                        >
                            {theme === "dark" ? <Sun className="icon" size={20} /> : <Moon className="icon" size={20} />}
                        </button>

                        {user ? (
                            <Dropdown
                                trigger={
                                    <div className="flex items-center space-x-2 cursor-pointer">
                                        <div className="w-8 h-8 rounded-full bg-gradient flex items-center justify-center text-white">
                                            {user.name ? user.name.charAt(0).toUpperCase() : <User size={16} />}
                                        </div>
                                        <span className="font-medium">{user.name || "User"}</span>
                                    </div>
                                }
                                items={[
                                    ...USER_NAV_LINKS.map((link) => ({
                                        label: link.name,
                                        onClick: () => navigate(link.path),
                                    })),
                                    {
                                        label: "Logout",
                                        icon: <LogOut size={16} />,
                                        onClick: handleLogout,
                                    },
                                ]}
                            />
                        ) : (
                            <div className="flex space-x-2">
                                <Button variant="outline" size="sm" onClick={() => navigate("/login")}>
                                    Login
                                </Button>
                                <Button size="sm" onClick={() => navigate("/register")}>
                                    Sign Up
                                </Button>
                            </div>
                        )}
                    </div>
                </div>

                {/* Mobile Navigation Toggle */}
                <div className="flex items-center space-x-4 md:hidden">
                    <button
                        onClick={toggleTheme}
                        className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
                        aria-label={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
                    >
                        {theme === "dark" ? <Sun className="icon" size={20} /> : <Moon className="icon" size={20} />}
                    </button>

                    <button className="text-gray-700 focus:outline-none" onClick={() => setIsOpen(!isOpen)}>
                        {isOpen ? <X className="icon" size={24} /> : <Menu className="icon" size={24} />}
                    </button>
                </div>
            </div>

            {/* Mobile Navigation Menu */}
            {isOpen && (
                <div
                    className="md:hidden absolute top-full left-0 w-full shadow-md py-4 px-6 space-y-4"
                    style={{ backgroundColor: "var(--input-bg)" }}
                >
                    {NAV_LINKS.map((link) => (
                        <Link
                            key={link.name}
                            to={link.path}
                            className={`block font-medium transition-colors hover:text-link-color ${location.pathname === link.path ? "text-gradient font-semibold" : ""
                                }`}
                            style={{ color: location.pathname === link.path ? "" : "var(--primary-text)" }}
                            onClick={() => setIsOpen(false)}
                        >
                            {link.name}
                        </Link>
                    ))}

                    <div className="pt-4 border-t" style={{ borderColor: "var(--border-color)" }}>
                        {user ? (
                            <>
                                <div className="flex items-center space-x-2 mb-4">
                                    <div className="w-8 h-8 rounded-full bg-gradient flex items-center justify-center text-white">
                                        {user.name ? user.name.charAt(0).toUpperCase() : <User size={16} />}
                                    </div>
                                    <span className="font-medium">{user.name || "User"}</span>
                                </div>

                                {USER_NAV_LINKS.map((link) => (
                                    <Link
                                        key={link.name}
                                        to={link.path}
                                        className="block py-2 font-medium transition-colors hover:text-link-color"
                                        style={{ color: "var(--primary-text)" }}
                                        onClick={() => setIsOpen(false)}
                                    >
                                        {link.name}
                                    </Link>
                                ))}

                                <button
                                    onClick={() => {
                                        handleLogout()
                                        setIsOpen(false)
                                    }}
                                    className="flex items-center space-x-2 py-2 w-full text-left font-medium text-red-500"
                                >
                                    <LogOut size={16} />
                                    <span>Logout</span>
                                </button>
                            </>
                        ) : (
                            <div className="flex flex-col space-y-2">
                                <Button
                                    variant="outline"
                                    onClick={() => {
                                        navigate("/login")
                                        setIsOpen(false)
                                    }}
                                >
                                    Login
                                </Button>
                                <Button
                                    onClick={() => {
                                        navigate("/register")
                                        setIsOpen(false)
                                    }}
                                >
                                    Sign Up
                                </Button>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </nav>
    )
}

export default Navbar
