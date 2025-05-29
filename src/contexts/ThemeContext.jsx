"use client"

import { createContext, useContext, useEffect, useState } from "react"

const ThemeContext = createContext()

export const useTheme = () => useContext(ThemeContext)

export const ThemeProvider = ({ children }) => {
    const [theme, setTheme] = useState(() => {
        const savedTheme = localStorage.getItem("theme")
        return savedTheme || (window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light")
    })

    const toggleTheme = () => {
        setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"))
    }

    useEffect(() => {
        localStorage.setItem("theme", theme)

        if (theme === "dark") {
            document.documentElement.classList.add("dark")
        } else {
            document.documentElement.classList.remove("dark")
        }
    }, [theme])

    return <ThemeContext.Provider value={{ theme, toggleTheme }}>{children}</ThemeContext.Provider>
}
