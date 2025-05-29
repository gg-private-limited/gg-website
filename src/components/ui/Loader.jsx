const Loader = ({ fullScreen = false, size = "medium", text = "Loading..." }) => {
    const sizeClasses = {
        small: "w-5 h-5 border-2",
        medium: "w-8 h-8 border-3",
        large: "w-12 h-12 border-4",
    }

    const loader = (
        <div className="flex flex-col items-center justify-center">
            <div
                className={`${sizeClasses[size]} rounded-full animate-spin`}
                style={{
                    borderColor: "var(--border-color)",
                    borderTopColor: "var(--gradient-start)",
                }}
            ></div>
            {text && (
                <p className="mt-2" style={{ color: "var(--secondary-text)" }}>
                    {text}
                </p>
            )}
        </div>
    )

    if (fullScreen) {
        return (
            <div
                className="fixed inset-0 flex items-center justify-center z-50"
                style={{ backgroundColor: "var(--bg-color)" }}
            >
                {loader}
            </div>
        )
    }

    return loader
}

export default Loader
