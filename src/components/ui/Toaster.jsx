"use client"

import { useState, useEffect } from "react"
import { createPortal } from "react-dom"
import { X, CheckCircle, AlertCircle, Info, AlertTriangle } from "lucide-react"

// Create a toast context
export const toast = {
    success: (message) => showToast({ type: "success", message }),
    error: (message) => showToast({ type: "error", message }),
    info: (message) => showToast({ type: "info", message }),
    warning: (message) => showToast({ type: "warning", message }),
}

// Global state for toasts
let toasts = []
let listeners = []

const showToast = (toast) => {
    const id = Date.now()
    const newToast = { id, ...toast }
    toasts = [...toasts, newToast]
    listeners.forEach((listener) => listener(toasts))

    // Auto dismiss after 5 seconds
    setTimeout(() => {
        dismissToast(id)
    }, 5000)
}

const dismissToast = (id) => {
    toasts = toasts.filter((toast) => toast.id !== id)
    listeners.forEach((listener) => listener(toasts))
}

export const Toaster = () => {
    const [currentToasts, setCurrentToasts] = useState(toasts)

    useEffect(() => {
        listeners.push(setCurrentToasts)
        return () => {
            listeners = listeners.filter((listener) => listener !== setCurrentToasts)
        }
    }, [])

    const icons = {
        success: <CheckCircle className="text-green-500" size={20} />,
        error: <AlertCircle className="text-red-500" size={20} />,
        info: <Info className="text-blue-500" size={20} />,
        warning: <AlertTriangle className="text-yellow-500" size={20} />,
    }

    return createPortal(
        <div className="fixed bottom-4 right-4 z-50 flex flex-col gap-2">
            {currentToasts.map((toast) => (
                <div
                    key={toast.id}
                    className="flex items-center p-4 rounded-lg shadow-lg max-w-md animate-slideIn"
                    style={{ backgroundColor: "var(--input-bg)" }}
                >
                    <div className="mr-3">{icons[toast.type]}</div>
                    <div className="flex-1" style={{ color: "var(--primary-text)" }}>
                        {toast.message}
                    </div>
                    <button
                        onClick={() => dismissToast(toast.id)}
                        className="ml-3 p-1 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700"
                    >
                        <X size={16} className="icon" />
                    </button>
                </div>
            ))}
        </div>,
        document.body,
    )
}

export default Toaster
