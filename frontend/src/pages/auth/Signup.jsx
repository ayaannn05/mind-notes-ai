import { useState } from "react";
import {
  FaGoogle,
  FaUserPlus,
  FaShieldAlt,
  FaUserCheck,
  FaEye,
  FaEyeSlash,
  FaCheckCircle,
  FaArrowRight,
  FaRocket,
  FaBrain,
  FaLock,
} from "react-icons/fa";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { signupUser } from "../../apis/auth";
import toast from "react-hot-toast";
import { API_URL } from "../../config";
import useDocumentTitle from "../../hooks/useDocumentTitle";

const Signup = () => {
  useDocumentTitle("Sign Up");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [focusedInput, setFocusedInput] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }
    setIsLoading(true);
    try {
      const body = {
        name: name,
        email: email,
        password: password,
        confirmPassword: confirmPassword,
      };
      const response = await signupUser(body);
      toast.success(response.message);
    } catch (error) {
      toast.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleLogin = async (e) => {
    e.preventDefault();
    try {
      window.location.href = `${API_URL}/api/v1/auth/google`;
    } catch (error) {
      toast.error(error);
    }
  };

  const features = [
    {
      icon: <FaBrain className="w-6 h-6" />,
      title: "AI-Powered Learning",
      description:
        "Join our community of learners and start creating AI-powered notes instantly with cutting-edge technology.",
      gradient: "from-blue-500 to-indigo-500",
    },
    {
      icon: <FaShieldAlt className="w-6 h-6" />,
      title: "Secure & Private",
      description:
        "Your data is protected with bank-level encryption and industry-standard security measures.",
      gradient: "from-green-500 to-emerald-500",
    },
    {
      icon: <FaRocket className="w-6 h-6" />,
      title: "Instant Access",
      description:
        "Get tailored note suggestions, learning paths, and smart study tools based on your preferences.",
      gradient: "from-orange-500 to-red-500",
    },
  ];

  // Password strength indicator
  const getPasswordStrength = (pass) => {
    if (!pass) return { strength: 0, label: "", color: "" };
    if (pass.length < 6)
      return { strength: 25, label: "Weak", color: "bg-red-500" };
    if (pass.length < 10)
      return { strength: 50, label: "Fair", color: "bg-yellow-500" };
    if (pass.length < 12)
      return { strength: 75, label: "Good", color: "bg-blue-500" };
    return { strength: 100, label: "Strong", color: "bg-green-500" };
  };

  const passwordStrength = getPasswordStrength(password);

  return (
    <div className="min-h-screen flex flex-col lg:flex-row relative overflow-hidden">
      {/* Animated Background Blobs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-[#2269EB]/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-[#F57C05]/20 rounded-full blur-3xl animate-pulse delay-1000" />
      </div>

      {/* Left Column - Features */}
      <motion.div
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6 }}
        className="hidden lg:flex w-full lg:w-1/2 bg-gradient-to-br from-[#2269EB] via-[#3B82F6] to-[#60A5FA] p-12 items-center justify-center relative overflow-hidden"
      >
        {/* Decorative Elements */}
        <div className="absolute top-0 left-0 w-full h-full">
          <div className="absolute top-20 left-20 w-64 h-64 bg-white/5 rounded-full blur-3xl" />
          <div className="absolute bottom-20 right-20 w-96 h-96 bg-white/5 rounded-full blur-3xl" />
        </div>

        <div className="max-w-xl space-y-12 text-white relative z-10">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="space-y-6"
          >
            <div className="inline-block">
              <h1 className="text-5xl font-bold mb-2">Start Your Journey 🚀</h1>
              <div className="h-1.5 w-24 bg-white rounded-full" />
            </div>
            <p className="text-xl text-white/90 leading-relaxed">
              Join thousands of learners using{" "}
              <span className="font-semibold">Mind Notes AI</span> to transform
              their study experience
            </p>
          </motion.div>

          {/* Features List */}
          <div className="space-y-6">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 + index * 0.1, duration: 0.5 }}
                className="group relative"
              >
                <div className="absolute inset-0 bg-white/10 rounded-2xl blur-xl group-hover:bg-white/20 transition-all duration-300" />
                <div className="relative bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20 hover:bg-white/15 transition-all duration-300 hover:scale-105 hover:shadow-2xl">
                  <div className="flex items-start space-x-4">
                    <div
                      className={`bg-gradient-to-br ${feature.gradient} p-3 rounded-xl shadow-lg flex-shrink-0`}
                    >
                      {feature.icon}
                    </div>
                    <div className="flex-1">
                      <h3 className="font-bold text-lg mb-2">
                        {feature.title}
                      </h3>
                      <p className="text-white/80 text-sm leading-relaxed">
                        {feature.description}
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Right Column - Signup Form */}
      <motion.div
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full lg:w-1/2 flex items-center justify-center p-6 sm:p-8 lg:p-12 bg-white relative z-10"
      >
        <div className="max-w-md w-full space-y-8">
          {/* Mobile Logo/Title */}
          <div className="lg:hidden text-center mb-8">
            <h2 className="text-3xl font-bold bg-gradient-to-r from-[#2269EB] to-[#60A5FA] bg-clip-text text-transparent">
              Mind Notes AI
            </h2>
          </div>

          {/* Header */}
          <div className="text-center space-y-2">
            <h2 className="text-4xl font-bold text-gray-900">Create Account</h2>
            <p className="text-gray-600">
              Already have an account?{" "}
              <Link
                to="/login"
                className="font-semibold text-[#2269EB] hover:text-[#1557D0] transition-colors inline-flex items-center gap-1 group"
              >
                Sign in here
                <FaArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
              </Link>
            </p>
          </div>

          {/* Google Signup */}
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            type="button"
            className="w-full py-4 px-6 border-2 border-gray-200 rounded-xl text-gray-700 bg-white hover:bg-gray-50 hover:border-gray-300 focus:outline-none focus:ring-4 focus:ring-[#2269EB]/20 transition-all duration-300 flex items-center justify-center gap-3 font-semibold shadow-sm hover:shadow-md group"
            onClick={handleGoogleLogin}
          >
            <FaGoogle className="w-5 h-5 text-[#F57C05] group-hover:scale-110 transition-transform" />
            Continue with Google
          </motion.button>

          {/* Divider */}
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-200" />
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-4 bg-white text-gray-500 font-medium">
                Or sign up with email
              </span>
            </div>
          </div>

          {/* Signup Form */}
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Name Input */}
            <div className="space-y-2">
              <label
                htmlFor="name"
                className="text-sm font-semibold text-gray-700 block"
              >
                Full Name
              </label>
              <div className="relative">
                <input
                  id="name"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  onFocus={() => setFocusedInput("name")}
                  onBlur={() => setFocusedInput(null)}
                  placeholder="John Doe"
                  required
                  className={`w-full px-4 py-3.5 border-2 rounded-xl focus:outline-none transition-all duration-300 ${
                    focusedInput === "name"
                      ? "border-[#2269EB] ring-4 ring-[#2269EB]/10"
                      : "border-gray-200 hover:border-gray-300"
                  }`}
                />
              </div>
            </div>

            {/* Email Input */}
            <div className="space-y-2">
              <label
                htmlFor="email"
                className="text-sm font-semibold text-gray-700 block"
              >
                Email Address
              </label>
              <div className="relative">
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  onFocus={() => setFocusedInput("email")}
                  onBlur={() => setFocusedInput(null)}
                  placeholder="you@example.com"
                  required
                  className={`w-full px-4 py-3.5 border-2 rounded-xl focus:outline-none transition-all duration-300 ${
                    focusedInput === "email"
                      ? "border-[#2269EB] ring-4 ring-[#2269EB]/10"
                      : "border-gray-200 hover:border-gray-300"
                  }`}
                />
              </div>
            </div>

            {/* Password Input */}
            <div className="space-y-2">
              <label
                htmlFor="password"
                className="text-sm font-semibold text-gray-700 block"
              >
                Password
              </label>
              <div className="relative">
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  onFocus={() => setFocusedInput("password")}
                  onBlur={() => setFocusedInput(null)}
                  placeholder="Create a strong password"
                  required
                  className={`w-full px-4 py-3.5 pr-12 border-2 rounded-xl focus:outline-none transition-all duration-300 ${
                    focusedInput === "password"
                      ? "border-[#2269EB] ring-4 ring-[#2269EB]/10"
                      : "border-gray-200 hover:border-gray-300"
                  }`}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                >
                  {showPassword ? (
                    <FaEyeSlash className="w-5 h-5" />
                  ) : (
                    <FaEye className="w-5 h-5" />
                  )}
                </button>
              </div>

              {/* Password Strength Indicator */}
              {password && (
                <div className="space-y-1">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-gray-500">Password strength</span>
                    <span
                      className={`font-semibold ${
                        passwordStrength.strength === 100
                          ? "text-green-600"
                          : passwordStrength.strength >= 75
                          ? "text-blue-600"
                          : passwordStrength.strength >= 50
                          ? "text-yellow-600"
                          : "text-red-600"
                      }`}
                    >
                      {passwordStrength.label}
                    </span>
                  </div>
                  <div className="w-full h-1.5 bg-gray-200 rounded-full overflow-hidden">
                    <div
                      className={`h-full ${passwordStrength.color} transition-all duration-300`}
                      style={{ width: `${passwordStrength.strength}%` }}
                    />
                  </div>
                </div>
              )}
            </div>

            {/* Confirm Password Input */}
            <div className="space-y-2">
              <label
                htmlFor="confirmPassword"
                className="text-sm font-semibold text-gray-700 block"
              >
                Confirm Password
              </label>
              <div className="relative">
                <input
                  id="confirmPassword"
                  type={showConfirmPassword ? "text" : "password"}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  onFocus={() => setFocusedInput("confirmPassword")}
                  onBlur={() => setFocusedInput(null)}
                  placeholder="Confirm your password"
                  required
                  className={`w-full px-4 py-3.5 pr-12 border-2 rounded-xl focus:outline-none transition-all duration-300 ${
                    focusedInput === "confirmPassword"
                      ? "border-[#2269EB] ring-4 ring-[#2269EB]/10"
                      : "border-gray-200 hover:border-gray-300"
                  }`}
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                >
                  {showConfirmPassword ? (
                    <FaEyeSlash className="w-5 h-5" />
                  ) : (
                    <FaEye className="w-5 h-5" />
                  )}
                </button>
              </div>
              {confirmPassword && password !== confirmPassword && (
                <p className="text-xs text-red-600 flex items-center gap-1">
                  <span>⚠</span> Passwords do not match
                </p>
              )}
            </div>

            {/* Terms Agreement */}
            <div className="flex items-start gap-2 pt-2">
              <input
                type="checkbox"
                id="terms"
                required
                className="mt-1 w-4 h-4 text-[#2269EB] border-gray-300 rounded focus:ring-[#2269EB]/20"
              />
              <label htmlFor="terms" className="text-sm text-gray-600">
                I agree to the{" "}
                <Link
                  to="/terms"
                  className="text-[#2269EB] hover:underline font-medium"
                >
                  Terms of Service
                </Link>{" "}
                and{" "}
                <Link
                  to="/privacy"
                  className="text-[#2269EB] hover:underline font-medium"
                >
                  Privacy Policy
                </Link>
              </label>
            </div>

            {/* Submit Button */}
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              disabled={isLoading || password !== confirmPassword}
              className="w-full py-4 px-6 bg-gradient-to-r from-[#2269EB] to-[#3B82F6] text-white font-semibold rounded-xl hover:shadow-xl hover:shadow-[#2269EB]/30 focus:outline-none focus:ring-4 focus:ring-[#2269EB]/30 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 group"
            >
              {isLoading ? (
                <>
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Creating account...
                </>
              ) : (
                <>
                  Create Account
                  <FaArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </>
              )}
            </motion.button>
          </form>

          {/* Trust Badge */}
          <div className="pt-6 border-t border-gray-100">
            <div className="flex items-center justify-center gap-6 text-sm text-gray-500">
              <div className="flex items-center gap-2">
                <FaLock className="w-4 h-4 text-green-500" />
                <span>SSL Encrypted</span>
              </div>
              <div className="flex items-center gap-2">
                <FaCheckCircle className="w-4 h-4 text-green-500" />
                <span>GDPR Compliant</span>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Signup;
