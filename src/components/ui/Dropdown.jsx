"use client"

import { useState, useRef, useEffect } from "react"
import { ChevronDown } from "lucide-react"

const Dropdown = ({ trigger, items, align = "right" }) => {
    const [isOpen, setIsOpen] = useState(false)
    const dropdownRef = useRef(null)

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsOpen(false)
            }
        }

        document.addEventListener("mousedown", handleClickOutside)
        return () => {
            document.removeEventListener("mousedown", handleClickOutside)
        }
    }, [])

    const toggleDropdown = () => setIsOpen(!isOpen)

    const alignmentClasses = {
        left: "left-0",
        right: "right-0",
    }

    return (
        <div className="relative" ref={dropdownRef}>
            <div onClick={toggleDropdown} className="cursor-pointer flex items-center">
                {trigger}
                <ChevronDown size={16} className={`ml-1 transition-transform ${isOpen ? "rotate-180" : ""}`} />
            </div>

            {isOpen && (
                <div
                    className={`absolute ${alignmentClasses[align]} mt-2 py-2 w-48 rounded-md shadow-lg z-10`}
                    style={{ backgroundColor: "var(--input-bg)", borderColor: "var(--border-color)" }}
                >
                    <div className="py-1">
                        {items.map((item, index) => (
                            <div
                                key={index}
                                className="px-4 py-2 text-sm cursor-pointer flex items-center hover:bg-opacity-10 hover:bg-gray-500"
                                style={{ color: "var(--primary-text)" }}
                                onClick={() => {
                                    item.onClick()
                                    setIsOpen(false)
                                }}
                            >
                                {item.icon && <span className="mr-2">{item.icon}</span>}
                                {item.label}
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    )
}

export default Dropdown
