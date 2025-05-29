const Loader = () => {
    return (
        <div className="fixed inset-0 flex items-center justify-center bg-white z-50">
            <div className="relative w-24 h-24">
                <div className="absolute top-0 left-0 w-full h-full border-4 border-blue-200 rounded-full"></div>
                <div className="absolute top-0 left-0 w-full h-full border-4 border-transparent border-t-blue-600 rounded-full animate-spin"></div>
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-blue-600 font-bold">
                    GG
                </div>
            </div>
        </div>
    )
}

export default Loader
