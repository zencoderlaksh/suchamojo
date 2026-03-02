import React from "react";

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, info) {
    console.error("UI crash caught by ErrorBoundary:", error, info);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-white px-6 py-10 text-slate-900">
          <h1 className="text-2xl font-bold">Something crashed while rendering.</h1>
          <p className="mt-3 text-sm text-slate-700">
            Open browser console for details, then share the first red error line.
          </p>
          <pre className="mt-5 overflow-auto rounded-lg bg-slate-100 p-4 text-xs text-red-700">
            {String(this.state.error)}
          </pre>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
