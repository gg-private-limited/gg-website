import { forwardRef } from "react"

const Input = forwardRef(({ label, error, className = "", ...props }, ref) => {
    return (
        <div className="mb-4">
            {label && (
                <label className="block mb-1 font-medium" style={{ color: "var(--primary-text)" }}>
                    {label}
                </label>
            )}
            <input ref={ref} className={`input-field w-full ${error ? "border-red-500" : ""} ${className}`} {...props} />
            {error && <p className="mt-1 text-sm text-red-500">{error}</p>}
        </div>
    )
})

Input.displayName = "Input"

export default Input
