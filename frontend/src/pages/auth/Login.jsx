import React,{useState} from 'react'
import { FaGoogle, FaShareAlt, FaRocket, FaMagic } from 'react-icons/fa'
import { Link } from 'react-router-dom'
import {loginUser,googleLogin} from '../../apis/auth';
import toast from 'react-hot-toast';
import {API_URL} from '../../config';
const Login = () => {
  const [email,setEmail] = useState('');
  const [password,setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try{
      const response = await loginUser(email,password);
      toast.success(response.status);
      if(response.status === 'success'){
        window.location.href = '/dashboard';
      }
    }catch(error){
      toast.error(error);
    }
  }
  const handleGoogleLogin  = async (e) => {
    e.preventDefault();
    try{
      // const response = await googleLogin();
      // window.open(`${API_URL}/api/v1/auth/google`,'_self');
      window.location.href = `${API_URL}/api/v1/auth/google`;
      // toast.success(response.status);
    }catch(error){
      toast.error(error);
    }
  }
  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      {/* Left Column - Features */}
      <div className="w-full md:w-1/2 bg-gradient-to-br from-[#F57C05] to-[#ff9a3c] p-12 flex items-center justify-center">
        <div className="max-w-lg space-y-12 text-white">
          <div className="text-center space-y-4">
            <h2 className="text-4xl font-bold">Welcome to Mind Notes AI</h2>
            <p className="text-lg opacity-90">Your AI-powered learning companion</p>
          </div>
          
          <div className="space-y-8">
            <div className="transform hover:scale-105 transition-transform duration-300 bg-white/10 rounded-xl p-6">
              <div className="flex items-start space-x-4">
                <div className="bg-white/20 p-3 rounded-lg">
                  <FaMagic className="w-8 h-8 flex-shrink-0" />
                </div>
                <div>
                  <h3 className="font-semibold text-xl">AI-Powered Note Generation</h3>
                  <p className="mt-2 opacity-90">Transform any content into smart study materials instantly with our advanced AI technology.</p>
                </div>
              </div>
            </div>

            <div className="transform hover:scale-105 transition-transform duration-300 bg-white/10 rounded-xl p-6">
              <div className="flex items-start space-x-4">
                <div className="bg-white/20 p-3 rounded-lg">
                  <FaRocket className="w-8 h-8 flex-shrink-0" />
                </div>
                <div>
                  <h3 className="font-semibold text-xl">Smart Learning Tools</h3>
                  <p className="mt-2 opacity-90">Personalized flashcards, quizzes, and study plans that adapt to your learning style.</p>
                </div>
              </div>
            </div>

            <div className="transform hover:scale-105 transition-transform duration-300 bg-white/10 rounded-xl p-6">
              <div className="flex items-start space-x-4">
                <div className="bg-white/20 p-3 rounded-lg">
                  <FaShareAlt className="w-8 h-8 flex-shrink-0" />
                </div>
                <div>
                  <h3 className="font-semibold text-xl">Seamless Collaboration</h3>
                  <p className="mt-2 opacity-90">Share and collaborate with peers while keeping your study materials organized.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Right Column - Login Form */}
      <div className="w-full md:w-1/2 flex items-center justify-center p-8 bg-white">
        <div className="max-w-md w-full space-y-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-gray-900">Sign in</h2>
            <p className="mt-2 text-sm text-gray-600">
              Don't have an account yet?{' '}
              <Link to="/signup" className="font-medium text-[#F57C05] hover:text-[#d66a04]">
                Sign up here
              </Link>
            </p>
          </div>
          
          <form className="mt-8 space-y-6">
            <div className="space-y-4">
              <div>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter email address"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-[#F57C05] focus:border-[#F57C05]"
                />
              </div>
              <div>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter password"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-[#F57C05] focus:border-[#F57C05]"
                />
                <div className="text-right mt-2">
                  <Link to="/forgot-password" className="text-sm text-[#F57C05] hover:text-[#d66a04]">
                    Forgot password?
                  </Link>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <button
                type="submit"
                className="w-full py-3 px-4 border border-transparent rounded-lg text-white bg-[#F57C05] hover:bg-[#d66a04] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#F57C05]"
                onClick={handleSubmit}
              >
                Sign in
              </button>
              
              <button
                type="button"
                className="w-full py-3 px-4 border border-gray-300 rounded-lg text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#F57C05] flex items-center justify-center"
                onClick={handleGoogleLogin}
              >
                <FaGoogle className="w-5 h-5 mr-2 text-[#F57C05]" />
                Sign in with Google
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Login