"use client";
import React, { Component } from "react";
import { FaExclamationTriangle } from "react-icons/fa";

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.error("Error caught in ErrorBoundary:", error, errorInfo);
  }

  handleReload = () => {
    window.location.reload();
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className="flex flex-col  h-screen items-center justify-center  bg-gray-100 text-center">
          <FaExclamationTriangle className="text-red-500 text-6xl mb-6" />
          <h1 className="text-2xl font-bold text-gray-800 mb-4">
            نأسف بشأن هذا الخلل الفني
          </h1>
          <p className="text-lg text-gray-600 mb-8">
            يرجى إعادة تحميل الصفحة أو المحاولة لاحقاً.
          </p>
          <button
            onClick={this.handleReload}
            className="px-6 py-3 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-700 transition duration-300"
          >
            إعادة تحميل الصفحة
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
