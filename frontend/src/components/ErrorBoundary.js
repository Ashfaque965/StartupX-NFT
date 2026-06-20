import React from "react";

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error("Error caught by boundary:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={styles.container}>
          <div style={styles.content}>
            <h1 style={styles.title}>Oops! Something went wrong</h1>
            <p style={styles.message}>
              We've encountered an error. Please try refreshing the page.
            </p>
            <p style={styles.error}>{this.state.error?.message}</p>
            <button
              style={styles.button}
              onClick={() => window.location.reload()}
            >
              Refresh Page
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

const styles = {
  container: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    minHeight: "100vh",
    background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
  },
  content: {
    textAlign: "center",
    background: "white",
    borderRadius: "12px",
    padding: "40px",
    boxShadow: "0 20px 60px rgba(0, 0, 0, 0.3)",
    maxWidth: "500px",
  },
  title: {
    fontSize: "28px",
    fontWeight: "bold",
    marginBottom: "16px",
    color: "#333",
  },
  message: {
    fontSize: "16px",
    color: "#666",
    marginBottom: "12px",
  },
  error: {
    fontSize: "13px",
    color: "#999",
    fontFamily: "monospace",
    padding: "12px",
    background: "#f5f5f5",
    borderRadius: "6px",
    marginBottom: "20px",
    textAlign: "left",
  },
  button: {
    padding: "12px 24px",
    background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
    color: "white",
    border: "none",
    borderRadius: "6px",
    fontSize: "16px",
    fontWeight: "bold",
    cursor: "pointer",
    transition: "transform 0.2s",
  },
};

export default ErrorBoundary;
