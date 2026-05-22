import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import {
  FaLock,
  FaUser,
  FaEye,
  FaEyeSlash,
  FaGraduationCap,
} from "react-icons/fa";
import { HiShieldCheck } from "react-icons/hi";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [focusedInput, setFocusedInput] = useState(null);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const response = await axios.post(
        // "http://localhost:8000/api/admin/login",
        "https://student-grading-backend.onrender.com/api/admin/login",
        {
          username,
          password,
        },
      );
      if (response.status === 200 && response.data.token) {
        localStorage.setItem("adminToken", response.data.token);
        toast.success("Login Successful!", { autoClose: 1000 });
        navigate("/dashboard");
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Invalid Credentials", {
        autoClose: 2000,
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex font-sans overflow-hidden">
      {/* Left Side - Branding Panel */}
      <div className="hidden lg:flex lg:w-1/2 relative bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-500">
        {/* Animated Background Shapes */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -left-40 w-80 h-80 bg-white/10 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute top-1/2 -right-20 w-96 h-96 bg-pink-400/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
          <div className="absolute bottom-10 left-20 w-72 h-72 bg-indigo-400/20 rounded-full blur-3xl animate-pulse delay-500"></div>
        </div>

        {/* Floating Elements */}
        <div className="absolute top-20 left-20 w-20 h-20 border-2 border-white/20 rounded-xl rotate-12 animate-bounce delay-100"></div>
        <div className="absolute bottom-32 right-32 w-16 h-16 border-2 border-white/20 rounded-full animate-bounce delay-300"></div>
        <div className="absolute top-1/3 right-20 w-12 h-12 bg-white/10 rounded-lg rotate-45 animate-bounce delay-500"></div>

        {/* Content */}
        <div className="relative z-10 flex flex-col justify-center items-center w-full px-12 text-white">
          <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-8 border border-white/20 shadow-2xl">
            <FaGraduationCap className="w-24 h-24 mx-auto mb-6 drop-shadow-lg" />
          </div>
          <h1 className="text-4xl font-bold mt-8 text-center tracking-tight">
            Student Grading
          </h1>
          <h2 className="text-2xl font-light mt-2 text-white/90">
            Management System
          </h2>
          <p className="mt-6 text-center text-white/70 max-w-sm leading-relaxed">
            Streamline your grading process with our powerful administrative
            tools. Manage students, courses, and grades efficiently.
          </p>

          {/* Feature Pills */}
          <div className="flex flex-wrap gap-3 mt-8 justify-center">
            <span className="px-4 py-2 bg-white/10 backdrop-blur rounded-full text-sm border border-white/20">
              📊 Analytics
            </span>
            <span className="px-4 py-2 bg-white/10 backdrop-blur rounded-full text-sm border border-white/20">
              🔒 Secure
            </span>
            <span className="px-4 py-2 bg-white/10 backdrop-blur rounded-full text-sm border border-white/20">
              ⚡ Fast
            </span>
          </div>
        </div>
      </div>

      {/* Right Side - Login Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 bg-gradient-to-br from-slate-50 to-slate-100">
        <div className="w-full max-w-md">
          {/* Mobile Logo */}
          <div className="lg:hidden text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-2xl shadow-lg mb-4">
              <FaGraduationCap className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-2xl font-bold text-gray-800">
              Student Grading System
            </h1>
          </div>

          {/* Login Card */}
          <div className="bg-white rounded-3xl shadow-xl p-8 border border-gray-100 relative overflow-hidden">
            {/* Card Decoration */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-indigo-100 to-purple-100 rounded-bl-full opacity-50"></div>

            <div className="relative z-10">
              {/* Header */}
              <div className="text-center mb-8">
                <div className="inline-flex items-center justify-center w-14 h-14 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl shadow-lg mb-4">
                  <HiShieldCheck className="w-7 h-7 text-white" />
                </div>
                <h2 className="text-2xl font-bold text-gray-800">
                  Welcome Back
                </h2>
                <p className="text-gray-500 mt-1">Sign in to Admin Portal</p>
              </div>

              {/* Form */}
              <form onSubmit={handleLogin} className="space-y-5">
                {/* Username Field */}
                <div className="relative">
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Username
                  </label>
                  <div
                    className={`relative rounded-xl transition-all duration-300 ${
                      focusedInput === "username"
                        ? "ring-2 ring-indigo-500 ring-offset-2"
                        : ""
                    }`}
                  >
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                      <FaUser
                        className={`h-4 w-4 transition-colors duration-300 ${
                          focusedInput === "username"
                            ? "text-indigo-500"
                            : "text-gray-400"
                        }`}
                      />
                    </div>
                    <input
                      id="username"
                      name="username"
                      type="text"
                      required
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      onFocus={() => setFocusedInput("username")}
                      onBlur={() => setFocusedInput(null)}
                      className="block w-full pl-11 pr-4 py-3.5 bg-gray-50 border border-gray-200 rounded-xl text-gray-800 placeholder-gray-400 focus:outline-none focus:bg-white transition-all duration-300"
                      placeholder="Enter your username"
                    />
                  </div>
                </div>

                {/* Password Field */}
                <div className="relative">
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Password
                  </label>
                  <div
                    className={`relative rounded-xl transition-all duration-300 ${
                      focusedInput === "password"
                        ? "ring-2 ring-indigo-500 ring-offset-2"
                        : ""
                    }`}
                  >
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                      <FaLock
                        className={`h-4 w-4 transition-colors duration-300 ${
                          focusedInput === "password"
                            ? "text-indigo-500"
                            : "text-gray-400"
                        }`}
                      />
                    </div>
                    <input
                      id="password"
                      name="password"
                      type={showPassword ? "text" : "password"}
                      required
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      onFocus={() => setFocusedInput("password")}
                      onBlur={() => setFocusedInput(null)}
                      className="block w-full pl-11 pr-12 py-3.5 bg-gray-50 border border-gray-200 rounded-xl text-gray-800 placeholder-gray-400 focus:outline-none focus:bg-white transition-all duration-300"
                      placeholder="Enter your password"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-400 hover:text-indigo-500 transition-colors"
                    >
                      {showPassword ? (
                        <FaEyeSlash className="h-4 w-4" />
                      ) : (
                        <FaEye className="h-4 w-4" />
                      )}
                    </button>
                  </div>
                </div>

                {/* Remember & Forgot */}
                <div className="flex items-center justify-between pt-1">
                  <label className="flex items-center cursor-pointer group">
                    <input
                      type="checkbox"
                      className="w-4 h-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500 cursor-pointer"
                    />
                    <span className="ml-2 text-sm text-gray-600 group-hover:text-gray-800 transition-colors">
                      Remember me
                    </span>
                  </label>
                  <button
                    type="button"
                    onClick={(e) => {
                      e.preventDefault();
                      toast.error(
                        "Password cannot be reset. Please contact Developer to reset it.",
                        {
                          position: "top-center",
                          autoClose: 2000,
                        },
                      );
                    }}
                    className="text-sm font-medium text-indigo-600 hover:text-purple-600 transition-colors"
                  >
                    Forgot password?
                  </button>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isLoading}
                  className={`w-full py-3.5 px-4 mt-2 rounded-xl text-white font-semibold shadow-lg transition-all duration-300 transform ${
                    isLoading
                      ? "bg-indigo-400 cursor-not-allowed"
                      : "bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 hover:shadow-xl hover:scale-[1.02] active:scale-[0.98]"
                  }`}
                >
                  {isLoading ? (
                    <span className="flex items-center justify-center">
                      <svg
                        className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        ></circle>
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        ></path>
                      </svg>
                      Signing in...
                    </span>
                  ) : (
                    <span className="flex items-center justify-center">
                      Sign In
                      <svg
                        className="w-5 h-5 ml-2"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M13 7l5 5m0 0l-5 5m5-5H6"
                        />
                      </svg>
                    </span>
                  )}
                </button>
              </form>

              {/* Footer */}
              <div className="mt-8 pt-6 border-t border-gray-100 text-center">
                <p className="text-xs text-gray-400">
                  &copy; {new Date().getFullYear()} official-ahmad. All rights reserved.
                </p>
              </div>
            </div>
          </div>

          {/* Security Badge */}
          <div className="mt-6 flex items-center justify-center gap-2 text-gray-400">
            <FaLock className="w-3 h-3" />
            <span className="text-xs">Secured with 256-bit encryption</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
