import { Component, type ErrorInfo, type ReactNode } from "react"
import { QueryErrorResetBoundary } from "@tanstack/react-query"
import { QueryErrorState } from "@/components/QueryStates/QueryErrorState"

interface QueryErrorBoundaryProps {
  children: ReactNode
  fallback?: ReactNode
  message?: string
  retryLabel?: string
  ariaLabel?: string
  onRetry?: () => void
}

interface ErrorBoundaryInnerProps extends QueryErrorBoundaryProps {
  onReset: () => void
}

interface QueryErrorBoundaryState {
  hasError: boolean
  error: Error | null
}

class ErrorBoundaryInner extends Component<ErrorBoundaryInnerProps, QueryErrorBoundaryState> {
  state: QueryErrorBoundaryState = { hasError: false, error: null }

  static getDerivedStateFromError(error: Error): QueryErrorBoundaryState {
    return { hasError: true, error }
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("Query error:", error, errorInfo)
  }

  handleRetry = () => {
    this.props.onRetry?.()
    this.props.onReset()
    this.setState({ hasError: false, error: null })
  }

  render() {
    if (this.state.hasError && this.state.error) {
      if (this.props.fallback) {
        return this.props.fallback
      }
      const message =
        this.props.message ??
        (this.state.error instanceof Error ? this.state.error.message : "Something went wrong")
      return (
        <QueryErrorState
          message={message}
          retryLabel={this.props.retryLabel ?? "Retry"}
          ariaLabel={this.props.ariaLabel ?? "Error"}
          onRetry={this.handleRetry}
        />
      )
    }
    return this.props.children
  }
}

export const QueryErrorBoundary = (props: QueryErrorBoundaryProps) => (
  <QueryErrorResetBoundary>
    {({ reset }) => (
      <ErrorBoundaryInner {...props} onReset={reset}>
        {props.children}
      </ErrorBoundaryInner>
    )}
  </QueryErrorResetBoundary>
)
