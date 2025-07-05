import { Component, ErrorInfo, ReactNode } from 'react';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
  errorInfo: ErrorInfo | null;
}

class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null,
    errorInfo: null
  };

  public static getDerivedStateFromError(error: Error): Partial<State> {
    // Update state so the next render will show the fallback UI
    return { 
      hasError: true,
      error
    };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    // Log error to an error reporting service
    if (typeof window !== 'undefined') {
      // Only log in browser environment
      console.error('ErrorBoundary caught an error:', error, errorInfo);
      
      // You can add error reporting service here (e.g., Sentry, LogRocket)
      // if (process.env.NODE_ENV === 'production') {
      //   reportErrorToService(error, errorInfo);
      // }
    }
    
    this.setState({ errorInfo });
  }

  private handleReset = () => {
    this.setState({
      hasError: false,
      error: null,
      errorInfo: null
    });
  };

  private renderErrorDetails() {
    if (!this.state.error) return null;
    
    // Don't show full error stack in production
    if (process.env.NODE_ENV === 'production') {
      return (
        <p className="text-red-700 dark:text-red-300 text-sm mt-1">
          {this.state.error.message || 'An unexpected error occurred. Please try again later.'}
        </p>
      );
    }
    
    // Show detailed error in development
    return (
      <div className="mt-2 text-xs">
        <p className="font-mono text-red-700 dark:text-red-300 mb-1">
          {this.state.error.message}
        </p>
        <details className="mt-2">
          <summary className="text-red-600 dark:text-red-400 cursor-pointer text-xs">
            Show error details
          </summary>
          <pre className="mt-1 p-2 bg-red-50 dark:bg-red-900/30 rounded overflow-auto text-xs">
            {this.state.error.stack || 'No stack trace available'}
          </pre>
        </details>
      </div>
    );
  }

  public render() {
    if (this.state.hasError) {
      // Use provided fallback or render default error UI
      return this.props.fallback || (
        <div className="p-4 bg-red-50 dark:bg-red-900/20 rounded-lg my-4">
          <div className="flex items-start justify-between">
            <div>
              <h3 className="text-red-800 dark:text-red-200 font-medium">
                Something went wrong
              </h3>
              {this.renderErrorDetails()}
            </div>
            <button
              onClick={this.handleReset}
              className="ml-4 px-3 py-1 text-xs bg-red-100 hover:bg-red-200 dark:bg-red-900/30 dark:hover:bg-red-900/50 text-red-700 dark:text-red-200 rounded transition-colors"
              aria-label="Retry"
            >
              Retry
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
