import axios from 'axios'
import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { API_URL } from '../../config'
import { FaSpinner, FaCheckCircle, FaTimesCircle, FaEnvelope } from 'react-icons/fa'

const VerifyEmail = () => {
    const { token } = useParams()
    const [message, setMessage] = useState('')
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        const verifyEmail = async () => {
            setLoading(true)
            try {
                const { data } = await axios.get(`${API_URL}/api/v1/auth/verify-email/${token}`)
                setMessage(data.message)
            } catch (error) {
                setError(error.response.data.message)
            }
            setLoading(false)
        }
        verifyEmail()
    }, [token])

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
            <div className="w-full max-w-md p-8 m-4 bg-white rounded-2xl shadow-lg transform transition-all duration-500 ease-in-out">
                {loading ? (
                    <div className="flex flex-col items-center space-y-4 animate-pulse">
                        <FaSpinner className="w-16 h-16 text-[#FA8B23] animate-spin" />
                        <p className="text-lg text-gray-600">Verifying your email...</p>
                    </div>
                ) : message ? (
                    <div className="flex flex-col items-center space-y-6 animate-fadeIn">
                        <FaCheckCircle className="w-16 h-16 text-[#FA8B23]" />
                        <h2 className="text-2xl font-bold text-gray-800">Email Verified!</h2>
                        <p className="text-center text-gray-600">{message}</p>
                        <Link 
                            to="/login" 
                            className="w-full py-3 px-4 text-center text-white bg-[#FA8B23] rounded-lg hover:bg-[#e67d1f] transform transition-all duration-300 hover:scale-105"
                        >
                            Proceed to Login
                        </Link>
                    </div>
                ) : error ? (
                    <div className="flex flex-col items-center space-y-6 animate-fadeIn">
                        <FaTimesCircle className="w-16 h-16 text-red-500" />
                        <h2 className="text-2xl font-bold text-gray-800">Verification Failed</h2>
                        <p className="text-center text-gray-600">{error}</p>
                        <button 
                            onClick={() => window.location.reload()} 
                            className="flex items-center justify-center w-full py-3 px-4 text-white bg-[#FA8B23] rounded-lg hover:bg-[#e67d1f] transform transition-all duration-300 hover:scale-105"
                        >
                            <FaEnvelope className="mr-2" />
                            Resend Verification Email
                        </button>
                        <Link 
                            to="/login" 
                            className="text-[#FA8B23] hover:text-[#e67d1f] underline"
                        >
                            Back to Login
                        </Link>
                    </div>
                ) : null}
            </div>
        </div>
    )
}

export default VerifyEmail