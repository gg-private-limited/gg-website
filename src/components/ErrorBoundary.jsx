import { Component } from "react"

class ErrorBoundary extends Component {
    constructor(props) {
        super(props)
        this.state = { hasError: false }
    }

    static getDerivedStateFromError(error) {
        // Update state so the next render will show the fallback UI
        return { hasError: true }
    }

    componentDidCatch(error, errorInfo) {
        // You can log the error to an error reporting service
        console.error("Error caught by ErrorBoundary:", error, errorInfo)
    }

    render() {
        if (this.state.hasError) {
            // You can render any custom fallback UI
            return (
                this.props.fallback || (
                    <div className="p-6 bg-red-50 rounded-lg text-center">
                        <h3 className="text-lg font-medium text-red-800 mb-2">Something went wrong</h3>
                        <p className="text-red-600">We couldn't load this component. Please try refreshing the page.</p>
                    </div>
                )
            )
        }

        return this.props.children
    }
}

export default ErrorBoundary
