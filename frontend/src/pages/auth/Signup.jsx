import React, { useState } from 'react'
import { FaGoogle, FaUserPlus, FaShieldAlt, FaUserCheck, FaEye, FaEyeSlash } from 'react-icons/fa'
import { Link } from 'react-router-dom'
import { signupUser, googleLogin } from '../../apis/auth'
import toast from 'react-hot-toast'
import { API_URL } from '../../config'

const Signup = () => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (password !== confirmPassword) {
      toast.error('Passwords do not match')
      return
    }
    try {
        const body = {
            name: name,
            email:email,
            password:password,
            confirmPassword:confirmPassword
        }
      const response = await signupUser(body)
      toast.success(response.message)
    } catch (error) {
      toast.error(error)
    }
  }

  const handleGoogleLogin = async (e) => {
    e.preventDefault()
    try {
      window.location.href = `${API_URL}/api/v1/auth/google`
    } catch (error) {
      toast.error(error)
    }
  }

  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      {/* Left Column - Features */}
      <div className="w-full md:w-1/2 bg-gradient-to-br from-[#F57C05] to-[#ff9a3c] p-12 flex items-center justify-center">
        <div className="max-w-lg space-y-12 text-white">
          <div className="text-center space-y-4">
            <h2 className="text-4xl font-bold">Join Mind Notes AI Today</h2>
            <p className="text-lg opacity-90">Start your journey to smarter note-taking</p>
          </div>
          
          <div className="space-y-8">
            <div className="transform hover:scale-105 transition-transform duration-300 bg-white/10 rounded-xl p-6">
              <div className="flex items-start space-x-4">
                <div className="bg-white/20 p-3 rounded-lg">
                  <FaUserPlus className="w-8 h-8 flex-shrink-0" />
                </div>
                <div>
                  <h3 className="font-semibold text-xl">Create Your Account</h3>
                  <p className="mt-2 opacity-90">Join our community of learners and start creating AI-powered notes instantly.</p>
                </div>
              </div>
            </div>

            <div className="transform hover:scale-105 transition-transform duration-300 bg-white/10 rounded-xl p-6">
              <div className="flex items-start space-x-4">
                <div className="bg-white/20 p-3 rounded-lg">
                  <FaShieldAlt className="w-8 h-8 flex-shrink-0" />
                </div>
                <div>
                  <h3 className="font-semibold text-xl">Secure & Private</h3>
                  <p className="mt-2 opacity-90">Your data is protected with industry-standard security measures.</p>
                </div>
              </div>
            </div>

            <div className="transform hover:scale-105 transition-transform duration-300 bg-white/10 rounded-xl p-6">
              <div className="flex items-start space-x-4">
                <div className="bg-white/20 p-3 rounded-lg">
                  <FaUserCheck className="w-8 h-8 flex-shrink-0" />
                </div>
                <div>
                  <h3 className="font-semibold text-xl">Personalized Experience</h3>
                  <p className="mt-2 opacity-90">Get tailored note suggestions and learning paths based on your preferences.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Right Column - Signup Form */}
      <div className="w-full md:w-1/2 flex items-center justify-center p-8 bg-white">
        <div className="max-w-md w-full space-y-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-gray-900">Create Account</h2>
            <p className="mt-2 text-sm text-gray-600">
              Already have an account?{' '}
              <Link to="/login" className="font-medium text-[#F57C05] hover:text-[#d66a04]">
                Sign in here
              </Link>
            </p>
          </div>
          
          <form className="mt-8 space-y-6">
            <div className="space-y-4">
              <div>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Full Name"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-[#F57C05] focus:border-[#F57C05]"
                />
              </div>
              <div>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Email address"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-[#F57C05] focus:border-[#F57C05]"
                />
              </div>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Password"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-[#F57C05] focus:border-[#F57C05]"
                />
                <button
                  type="button"
                  className="absolute right-3 top-3"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <FaEyeSlash className="w-5 h-5 text-gray-500" /> : <FaEye className="w-5 h-5 text-gray-500" />}
                </button>
              </div>
              <div className="relative">
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Confirm Password"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-[#F57C05] focus:border-[#F57C05]"
                />
                <button
                  type="button"
                  className="absolute right-3 top-3"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                >
                  {showConfirmPassword ? <FaEyeSlash className="w-5 h-5 text-gray-500" /> : <FaEye className="w-5 h-5 text-gray-500" />}
                </button>
              </div>
            </div>

            <div className="space-y-4">
              <button
                type="submit"
                className="w-full py-3 px-4 border border-transparent rounded-lg text-white bg-[#F57C05] hover:bg-[#d66a04] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#F57C05]"
                onClick={handleSubmit}
              >
                Create Account
              </button>
              
              <button
                type="button"
                className="w-full py-3 px-4 border border-gray-300 rounded-lg text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#F57C05] flex items-center justify-center"
                onClick={handleGoogleLogin}
              >
                <FaGoogle className="w-5 h-5 mr-2 text-[#F57C05]" />
                Sign up with Google
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Signup