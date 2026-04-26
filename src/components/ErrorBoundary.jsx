import { Component } from 'react';

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    this.setState({ errorInfo });
    console.error('ErrorBoundary caught:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-dark-50 dark:bg-dark-950 p-6">
          <div className="card max-w-lg w-full text-center">
            <div className="text-6xl mb-4">💥</div>
            <h1 className="text-2xl font-bold text-dark-900 dark:text-white mb-2 font-display">
              Something went wrong
            </h1>
            <p className="text-dark-500 dark:text-dark-400 mb-6">
              An unexpected error occurred. Please try refreshing the page.
            </p>
            {this.state.error && (
              <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl p-4 mb-6 text-left">
                <p className="text-red-700 dark:text-red-400 text-sm font-mono">
                  {this.state.error.toString()}
                </p>
              </div>
            )}
            <button
              onClick={() => window.location.reload()}
              className="btn-primary"
            >
              🔄 Reload Page
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
