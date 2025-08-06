import React, { useState, useEffect } from "react";
import "./App.css";
import { BrowserRouter, Routes, Route, Link, Navigate } from "react-router-dom";
import axios from "axios";

const BACKEND_URL =
  process.env.REACT_APP_BACKEND_URL || "http://localhost:5000";
const API = `${BACKEND_URL}/api`;

// Home Component
const Home = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100">
      {/* Header */}
      <header className="bg-white shadow-md">
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center">
              <h1 className="text-2xl font-bold text-emerald-600">TalentHub</h1>
            </div>
            <div className="flex space-x-4">
              <Link
                to="/"
                className="text-gray-700 hover:text-emerald-600 px-3 py-2 rounded-md"
              >
                Home
              </Link>
              <Link
                to="/register"
                className="bg-emerald-600 text-white px-4 py-2 rounded-md hover:bg-emerald-700"
              >
                Apply Now
              </Link>
              <Link
                to="/login"
                className="text-gray-700 hover:text-emerald-600 px-3 py-2 rounded-md"
              >
                Login
              </Link>
            </div>
          </div>
        </nav>
      </header>

      {/* Hero Section */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center">
          <h2 className="text-4xl font-extrabold text-gray-900 sm:text-5xl md:text-6xl">
            Join Our <span className="text-emerald-600">Team</span>
          </h2>
          <p className="mt-3 max-w-md mx-auto text-base text-gray-500 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl">
            Connect with opportunities as an intern or volunteer. Make a
            difference while gaining valuable experience.
          </p>
          <div className="mt-5 max-w-md mx-auto sm:flex sm:justify-center md:mt-8">
            <div className="rounded-md shadow">
              <Link
                to="/register"
                className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-emerald-600 hover:bg-emerald-700 md:py-4 md:text-lg md:px-10"
              >
                Get Started
              </Link>
            </div>
          </div>
        </div>

        {/* Features Section */}
        <div className="mt-20">
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <div className="w-12 h-12 mx-auto bg-emerald-100 rounded-lg flex items-center justify-center">
                <svg
                  className="w-6 h-6 text-emerald-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z"
                  />
                </svg>
              </div>
              <h3 className="mt-4 text-lg font-medium text-gray-900">
                Internship Opportunities
              </h3>
              <p className="mt-2 text-sm text-gray-500">
                Gain hands-on experience and develop professional skills
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <div className="w-12 h-12 mx-auto bg-orange-100 rounded-lg flex items-center justify-center">
                <svg
                  className="w-6 h-6 text-orange-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                  />
                </svg>
              </div>
              <h3 className="mt-4 text-lg font-medium text-gray-900">
                Volunteer Programs
              </h3>
              <p className="mt-2 text-sm text-gray-500">
                Make a positive impact in your community
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <div className="w-12 h-12 mx-auto bg-amber-100 rounded-lg flex items-center justify-center">
                <svg
                  className="w-6 h-6 text-amber-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 10V3L4 14h7v7l9-11h-7z"
                  />
                </svg>
              </div>
              <h3 className="mt-4 text-lg font-medium text-gray-900">
                Track Your Status
              </h3>
              <p className="mt-2 text-sm text-gray-500">
                Login anytime to check your application status
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

// Registration Form Component
const Register = () => {
  const [formData, setFormData] = useState({
    full_name: "",
    email: "",
    phone_number: "",
    role: "",
    skills_interests: "",
    availability: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState("");
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};

    if (!formData.full_name.trim())
      newErrors.full_name = "Full name is required";
    if (!formData.email.trim()) newErrors.email = "Email is required";
    if (!formData.phone_number.trim())
      newErrors.phone_number = "Phone number is required";
    if (!formData.role) newErrors.role = "Role selection is required";
    if (!formData.skills_interests.trim())
      newErrors.skills_interests = "Skills/Interests are required";
    if (!formData.availability.trim())
      newErrors.availability = "Availability is required";

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (formData.email && !emailRegex.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }

    // Phone validation (basic)
    const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/;
    if (
      formData.phone_number &&
      !phoneRegex.test(formData.phone_number.replace(/[-\s\(\)]/g, ""))
    ) {
      newErrors.phone_number = "Please enter a valid phone number";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    // Clear error when user starts typing
    if (errors[e.target.name]) {
      setErrors({
        ...errors,
        [e.target.name]: "",
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    setMessage("");

    try {
      await axios.post(`${API}/applications`, formData);
      setMessage(
        "Application submitted successfully! You can now login with your email to check your status."
      );
      setFormData({
        full_name: "",
        email: "",
        phone_number: "",
        role: "",
        skills_interests: "",
        availability: "",
      });
    } catch (error) {
      setMessage(
        error.response?.data?.detail || "Error submitting application"
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100">
      {/* Header */}
      <header className="bg-white shadow-md">
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <Link to="/" className="text-2xl font-bold text-emerald-600">
              TalentHub
            </Link>
            <div className="flex space-x-4">
              <Link
                to="/"
                className="text-gray-700 hover:text-emerald-600 px-3 py-2 rounded-md"
              >
                Home
              </Link>
              <Link
                to="/login"
                className="text-gray-700 hover:text-emerald-600 px-3 py-2 rounded-md"
              >
                Login
              </Link>
            </div>
          </div>
        </nav>
      </header>

      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-white rounded-lg shadow-xl p-8">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900">Apply Now</h2>
            <p className="mt-2 text-sm text-gray-600">
              Join our team as an intern or volunteer
            </p>
          </div>

          {message && (
            <div
              className={`mb-6 p-4 rounded-md ${
                message.includes("success")
                  ? "bg-green-50 text-green-800 border border-green-200"
                  : "bg-red-50 text-red-800 border border-red-200"
              }`}
            >
              {message}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label
                htmlFor="full_name"
                className="block text-sm font-medium text-gray-700"
              >
                Full Name *
              </label>
              <input
                type="text"
                id="full_name"
                name="full_name"
                value={formData.full_name}
                onChange={handleChange}
                className={`mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-emerald-500 focus:border-emerald-500 ${
                  errors.full_name ? "border-red-300" : "border-gray-300"
                }`}
                placeholder="Enter your full name"
              />
              {errors.full_name && (
                <p className="mt-1 text-sm text-red-600">{errors.full_name}</p>
              )}
            </div>

            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                Email *
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className={`mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-emerald-500 focus:border-emerald-500 ${
                  errors.email ? "border-red-300" : "border-gray-300"
                }`}
                placeholder="Enter your email"
              />
              {errors.email && (
                <p className="mt-1 text-sm text-red-600">{errors.email}</p>
              )}
            </div>

            <div>
              <label
                htmlFor="phone_number"
                className="block text-sm font-medium text-gray-700"
              >
                Phone Number *
              </label>
              <input
                type="tel"
                id="phone_number"
                name="phone_number"
                value={formData.phone_number}
                onChange={handleChange}
                className={`mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-emerald-500 focus:border-emerald-500 ${
                  errors.phone_number ? "border-red-300" : "border-gray-300"
                }`}
                placeholder="Enter your phone number"
              />
              {errors.phone_number && (
                <p className="mt-1 text-sm text-red-600">
                  {errors.phone_number}
                </p>
              )}
            </div>

            <div>
              <label
                htmlFor="role"
                className="block text-sm font-medium text-gray-700"
              >
                Role *
              </label>
              <select
                id="role"
                name="role"
                value={formData.role}
                onChange={handleChange}
                className={`mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-emerald-500 focus:border-emerald-500 ${
                  errors.role ? "border-red-300" : "border-gray-300"
                }`}
              >
                <option value="">Select a role</option>
                <option value="intern">Intern</option>
                <option value="volunteer">Volunteer</option>
              </select>
              {errors.role && (
                <p className="mt-1 text-sm text-red-600">{errors.role}</p>
              )}
            </div>

            <div>
              <label
                htmlFor="skills_interests"
                className="block text-sm font-medium text-gray-700"
              >
                Skills/Interests *
              </label>
              <textarea
                id="skills_interests"
                name="skills_interests"
                rows={4}
                value={formData.skills_interests}
                onChange={handleChange}
                className={`mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-emerald-500 focus:border-emerald-500 ${
                  errors.skills_interests ? "border-red-300" : "border-gray-300"
                }`}
                placeholder="Describe your skills and interests"
              />
              {errors.skills_interests && (
                <p className="mt-1 text-sm text-red-600">
                  {errors.skills_interests}
                </p>
              )}
            </div>

            <div>
              <label
                htmlFor="availability"
                className="block text-sm font-medium text-gray-700"
              >
                Availability *
              </label>
              <select
                id="availability"
                name="availability"
                value={formData.availability}
                onChange={handleChange}
                className={`mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-emerald-500 focus:border-emerald-500 ${
                  errors.availability ? "border-red-300" : "border-gray-300"
                }`}
              >
                <option value="">Select availability</option>
                <option value="full-time">Full-time</option>
                <option value="part-time">Part-time</option>
                <option value="weekends">Weekends only</option>
                <option value="flexible">Flexible</option>
              </select>
              {errors.availability && (
                <p className="mt-1 text-sm text-red-600">
                  {errors.availability}
                </p>
              )}
            </div>

            <div>
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-emerald-600 hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500 disabled:bg-gray-400 disabled:cursor-not-allowed"
              >
                {isSubmitting ? "Submitting..." : "Submit Application"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

// Unified Login Component
const UnifiedLogin = () => {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    email: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [loginType, setLoginType] = useState("applicant"); // 'admin' or 'applicant'

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    setError(""); // Clear error when user starts typing
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      let loginData;

      if (loginType === "admin") {
        if (!formData.username || !formData.password) {
          setError("Please enter both username and password");
          setIsLoading(false);
          return;
        }
        loginData = {
          username: formData.username,
          password: formData.password,
        };
      } else {
        if (!formData.email) {
          setError("Please enter your email address");
          setIsLoading(false);
          return;
        }
        loginData = {
          email: formData.email,
        };
      }

      const response = await axios.post(`${API}/login`, loginData);

      // Store token and user info
      if (response.data.user_type === "admin") {
        localStorage.setItem("admin_token", response.data.token);
      } else {
        localStorage.setItem("applicant_token", response.data.token);
        localStorage.setItem(
          "applicant_info",
          JSON.stringify(response.data.user_info)
        );
      }

      // Redirect based on user type
      window.location.href = response.data.redirect_path;
    } catch (error) {
      setError(error.response?.data?.detail || "Login failed");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100 flex items-center justify-center">
      <div className="max-w-md w-full space-y-8">
        <div className="bg-white rounded-lg shadow-xl p-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-gray-900">Login</h2>
            <p className="mt-2 text-sm text-gray-600">
              Access your account or check your application status
            </p>
          </div>

          {/* Login Type Toggle */}
          <div className="mt-6 flex justify-center">
            <div className="flex bg-gray-100 rounded-lg p-1">
              <button
                type="button"
                onClick={() => setLoginType("applicant")}
                className={`px-4 py-2 text-sm font-medium rounded-md transition-colors ${
                  loginType === "applicant"
                    ? "bg-emerald-600 text-white shadow-sm"
                    : "text-gray-700 hover:text-emerald-600"
                }`}
              >
                Applicant
              </button>
              <button
                type="button"
                onClick={() => setLoginType("admin")}
                className={`px-4 py-2 text-sm font-medium rounded-md transition-colors ${
                  loginType === "admin"
                    ? "bg-slate-600 text-white shadow-sm"
                    : "text-gray-700 hover:text-slate-600"
                }`}
              >
                Admin
              </button>
            </div>
          </div>

          {error && (
            <div className="mt-4 p-4 bg-red-50 text-red-800 rounded-md border border-red-200">
              {error}
            </div>
          )}

          <form className="mt-8 space-y-6" onSubmit={handleLogin}>
            {loginType === "admin" ? (
              <>
                <div>
                  <label
                    htmlFor="username"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Username
                  </label>
                  <input
                    id="username"
                    name="username"
                    type="text"
                    required
                    value={formData.username}
                    onChange={handleInputChange}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-slate-500 focus:border-slate-500"
                    placeholder="Enter admin username"
                  />
                </div>

                <div>
                  <label
                    htmlFor="password"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Password
                  </label>
                  <input
                    id="password"
                    name="password"
                    type="password"
                    required
                    value={formData.password}
                    onChange={handleInputChange}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-slate-500 focus:border-slate-500"
                    placeholder="Enter admin password"
                  />
                </div>
              </>
            ) : (
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700"
                >
                  Email Address
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  value={formData.email}
                  onChange={handleInputChange}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-emerald-500 focus:border-emerald-500"
                  placeholder="Enter your email"
                />
              </div>
            )}

            <button
              type="submit"
              disabled={isLoading}
              className={`w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:bg-gray-400 ${
                loginType === "admin"
                  ? "bg-slate-600 hover:bg-slate-700 focus:ring-slate-500"
                  : "bg-emerald-600 hover:bg-emerald-700 focus:ring-emerald-500"
              }`}
            >
              {isLoading
                ? "Signing in..."
                : `Sign in as ${loginType === "admin" ? "Admin" : "Applicant"}`}
            </button>
          </form>

          <div className="mt-6 text-center space-y-2">
            {loginType === "applicant" && (
              <Link
                to="/register"
                className="text-emerald-600 hover:text-emerald-500 text-sm block"
              >
                Don't have an application? Apply now →
              </Link>
            )}
            <Link
              to="/"
              className="text-gray-500 hover:text-gray-700 text-sm block"
            >
              ← Back to Home
            </Link>
          </div>

          {/* Help text */}
          <div className="mt-4 p-3 bg-gray-50 rounded-md">
            <p className="text-xs text-gray-600">
              {loginType === "admin"
                ? "Admin login requires username and password"
                : "Enter the email you used to submit your application"}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

// Applicant Status Dashboard
const ApplicantStatus = () => {
  const [application, setApplication] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  const getStatusColor = (status) => {
    switch (status) {
      case "approved":
        return "bg-green-100 text-green-800 border-green-200";
      case "rejected":
        return "bg-red-100 text-red-800 border-red-200";
      case "under_review":
        return "bg-amber-100 text-amber-800 border-amber-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case "approved":
        return "✅";
      case "rejected":
        return "❌";
      case "under_review":
        return "🔍";
      default:
        return "⏳";
    }
  };

  const loadStatus = async () => {
    try {
      const applicantInfo = JSON.parse(localStorage.getItem("applicant_info"));
      if (!applicantInfo) {
        window.location.href = "/login";
        return;
      }

      const response = await axios.get(
        `${API}/applicant/status/${applicantInfo.id}`
      );
      setApplication(response.data);
    } catch (error) {
      setError("Error loading application status");
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem("applicant_token");
    localStorage.removeItem("applicant_info");
    window.location.href = "/";
  };

  React.useEffect(() => {
    const token = localStorage.getItem("applicant_token");
    if (!token) {
      window.location.href = "/login";
      return;
    }
    loadStatus();
  }, []);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading your status...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100">
      {/* Header */}
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <Link to="/" className="text-2xl font-bold text-emerald-600">
              TalentHub
            </Link>
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-500">
                Welcome, {application?.full_name}
              </span>
              <button
                onClick={logout}
                className="bg-gray-600 text-white px-4 py-2 rounded-md hover:bg-gray-700"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {error && (
          <div className="mb-6 p-4 bg-red-50 text-red-800 rounded-md border border-red-200">
            {error}
          </div>
        )}

        {application && (
          <div className="bg-white shadow rounded-lg p-8">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-gray-900">
                Application Status
              </h2>
              <div
                className={`mt-4 inline-flex items-center px-4 py-2 rounded-full border ${getStatusColor(
                  application.status
                )}`}
              >
                <span className="mr-2 text-lg">
                  {getStatusIcon(application.status)}
                </span>
                <span className="font-semibold capitalize">
                  {application.status.replace("_", " ")}
                </span>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-900">
                  Application Details
                </h3>

                <div>
                  <label className="block text-sm font-medium text-gray-500">
                    Full Name
                  </label>
                  <p className="mt-1 text-sm text-gray-900">
                    {application.full_name}
                  </p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-500">
                    Email
                  </label>
                  <p className="mt-1 text-sm text-gray-900">
                    {application.email}
                  </p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-500">
                    Phone
                  </label>
                  <p className="mt-1 text-sm text-gray-900">
                    {application.phone_number}
                  </p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-500">
                    Role
                  </label>
                  <span
                    className={`mt-1 inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                      application.role === "intern"
                        ? "bg-emerald-100 text-emerald-800"
                        : "bg-orange-100 text-orange-800"
                    }`}
                  >
                    {application.role}
                  </span>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-500">
                    Availability
                  </label>
                  <p className="mt-1 text-sm text-gray-900">
                    {application.availability}
                  </p>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-900">
                  Timeline
                </h3>

                <div>
                  <label className="block text-sm font-medium text-gray-500">
                    Applied On
                  </label>
                  <p className="mt-1 text-sm text-gray-900">
                    {new Date(application.created_at).toLocaleDateString(
                      "en-US",
                      {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      }
                    )}
                  </p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-500">
                    Last Updated
                  </label>
                  <p className="mt-1 text-sm text-gray-900">
                    {new Date(application.updated_at).toLocaleDateString(
                      "en-US",
                      {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      }
                    )}
                  </p>
                </div>

                <div className="mt-6">
                  <label className="block text-sm font-medium text-gray-500">
                    Skills & Interests
                  </label>
                  <div className="mt-1 p-3 bg-gray-50 rounded-md">
                    <p className="text-sm text-gray-900">
                      {application.skills_interests}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-8 text-center">
              <p className="text-sm text-gray-500">
                We'll notify you via email when there are updates to your
                application status.
              </p>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

// Navigation Component for Admin
const Navigation = () => {
  const logout = () => {
    localStorage.removeItem("admin_token");
    window.location.href = "/";
  };

  return (
    <nav className="bg-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          <Link to="/" className="text-2xl font-bold text-emerald-600">
            TalentHub Admin
          </Link>
          <div className="flex items-center space-x-4">
            <span className="text-sm text-gray-500">Admin Dashboard</span>
            <button
              onClick={logout}
              className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700"
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

// Admin Dashboard Component
const AdminDashboard = () => {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");

  const fetchApplications = async () => {
    try {
      const response = await axios.get(`${API}/admin/applications`);
      setApplications(response.data);
    } catch (error) {
      setMessage("❌ Error loading applications");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const updateApplicationStatus = async (id, newStatus) => {
    try {
      await axios.put(`${API}/applications/${id}/status`, {
        status: newStatus,
      });

      // Update local state
      setApplications(
        applications.map((app) =>
          app.id === id ? { ...app, status: newStatus } : app
        )
      );

      setMessage("✅ Status updated successfully");
      setTimeout(() => setMessage(""), 3000);
    } catch (error) {
      setMessage("❌ Error updating status");
      console.error(error);
    }
  };

  const deleteApplication = async (id) => {
    if (!window.confirm("Are you sure you want to delete this application?")) {
      return;
    }

    try {
      await axios.delete(`${API}/applications/${id}`);
      setApplications(applications.filter((app) => app.id !== id));
      setMessage("✅ Application deleted successfully");
      setTimeout(() => setMessage(""), 3000);
    } catch (error) {
      setMessage("❌ Error deleting application");
      console.error(error);
    }
  };

  const getStatusBadge = (status) => {
    const statusStyles = {
      pending: "bg-yellow-100 text-yellow-800",
      under_review: "bg-blue-100 text-blue-800",
      approved: "bg-green-100 text-green-800",
      rejected: "bg-red-100 text-red-800",
    };

    const statusLabels = {
      pending: "Pending",
      under_review: "Under Review",
      approved: "Approved",
      rejected: "Rejected",
    };

    return (
      <span
        className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
          statusStyles[status] || "bg-gray-100 text-gray-800"
        }`}
      >
        {statusLabels[status] || status}
      </span>
    );
  };

  const getStatusCounts = () => {
    const counts = applications.reduce((acc, app) => {
      acc[app.status] = (acc[app.status] || 0) + 1;
      return acc;
    }, {});
    return counts;
  };

  useEffect(() => {
    const token = localStorage.getItem("admin_token");
    if (!token) {
      window.location.href = "/login";
      return;
    }
    fetchApplications();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navigation />
        <div className="container mx-auto px-4 py-12 text-center">
          <div className="text-xl">Loading applications...</div>
        </div>
      </div>
    );
  }

  const statusCounts = getStatusCounts();

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      <div className="container mx-auto px-4 py-12">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800">Admin Dashboard</h1>
          <div className="text-sm text-gray-600">
            Total Applications: {applications.length}
          </div>
        </div>

        {/* Status Summary Cards */}
        <div className="grid md:grid-cols-4 gap-4 mb-8">
          <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-200">
            <div className="text-2xl font-bold text-yellow-800">
              {statusCounts["pending"] || 0}
            </div>
            <div className="text-sm text-yellow-600">Pending</div>
          </div>
          <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
            <div className="text-2xl font-bold text-blue-800">
              {statusCounts["under_review"] || 0}
            </div>
            <div className="text-sm text-blue-600">Under Review</div>
          </div>
          <div className="bg-green-50 p-4 rounded-lg border border-green-200">
            <div className="text-2xl font-bold text-green-800">
              {statusCounts["approved"] || 0}
            </div>
            <div className="text-sm text-green-600">Approved</div>
          </div>
          <div className="bg-red-50 p-4 rounded-lg border border-red-200">
            <div className="text-2xl font-bold text-red-800">
              {statusCounts["rejected"] || 0}
            </div>
            <div className="text-sm text-red-600">Rejected</div>
          </div>
        </div>

        {message && (
          <div
            className={`mb-6 p-4 rounded-lg ${
              message.includes("✅")
                ? "bg-green-50 text-green-800"
                : "bg-red-50 text-red-800"
            }`}
          >
            {message}
          </div>
        )}

        {applications.length === 0 ? (
          <div className="bg-white p-8 rounded-lg shadow-md text-center">
            <p className="text-gray-600">No applications submitted yet.</p>
          </div>
        ) : (
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Candidate
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Contact
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Role
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Skills
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Availability
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {applications.map((app) => (
                    <tr key={app.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">
                          {app.full_name}
                        </div>
                        <div className="text-xs text-gray-500">
                          Applied:{" "}
                          {new Date(app.created_at).toLocaleDateString()}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">{app.email}</div>
                        <div className="text-sm text-gray-500">
                          {app.phone_number}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span
                          className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                            app.role === "intern"
                              ? "bg-blue-100 text-blue-800"
                              : "bg-green-100 text-green-800"
                          }`}
                        >
                          {app.role.charAt(0).toUpperCase() + app.role.slice(1)}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-900">
                        <div
                          className="max-w-xs truncate"
                          title={app.skills_interests}
                        >
                          {app.skills_interests}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {app.availability}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {getStatusBadge(app.status || "Pending")}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <div className="flex space-x-2">
                          <select
                            value={app.status || "pending"}
                            onChange={(e) =>
                              updateApplicationStatus(app.id, e.target.value)
                            }
                            className="text-xs border border-gray-300 rounded px-2 py-1 focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                          >
                            <option value="pending">Pending</option>
                            <option value="under_review">Under Review</option>
                            <option value="approved">Approved</option>
                            <option value="rejected">Rejected</option>
                          </select>
                          <button
                            onClick={() => deleteApplication(app.id)}
                            className="text-red-600 hover:text-red-900 transition-colors text-xs px-2 py-1 border border-red-300 rounded hover:bg-red-50"
                          >
                            Delete
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

// Main App Component
function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<UnifiedLogin />} />
          <Route path="/status" element={<ApplicantStatus />} />
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
