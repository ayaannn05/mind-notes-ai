"use client";
import { useContext, useState, useEffect } from "react";
import { FaRegNoteSticky } from "react-icons/fa6";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/authContext";
import { logoutUser } from "../../apis/auth";
import toast from "react-hot-toast";

export const Navbar7 = () => {
    const { user } = useContext(AuthContext);
    const [showDropdown, setShowDropdown] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    
    const logout = async () => {
        try {
            await logoutUser();
            window.location.href = "/login";
        } catch (error) {
            toast.error(error);
        }
    };

    const handleClickOutside = (event) => {
        if (event.target.closest('.dropdown')) {
            return;
        }
        setShowDropdown(false);
    };

    useEffect(() => {
        document.addEventListener('click', handleClickOutside);
        return () => {
            document.removeEventListener('click', handleClickOutside);
        };
    }, []);

    return (
        <nav className="relative z-[999] w-full bg-white border-b border-gray-200">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16 sm:h-20">
                    {/* Logo */}
                    <Link to="/" className="flex items-center gap-2 hover:opacity-90 transition-opacity">
                        <FaRegNoteSticky className="text-[#F57C05] h-6 w-6 sm:h-7 sm:w-7" />
                        <span className="font-bold text-lg sm:text-xl hidden sm:inline-block">
                            <span className="text-black">MIND NOTES</span>
                            <span className="text-[#F57C05]"> AI</span>
                        </span>
                    </Link>

                    {/* Mobile menu button */}
                    <div className="sm:hidden">
                        <button
                            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                            className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none"
                        >
                            <span className="sr-only">Open main menu</span>
                            <svg
                                className={`${isMobileMenuOpen ? 'hidden' : 'block'} h-6 w-6`}
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                            </svg>
                            <svg
                                className={`${isMobileMenuOpen ? 'block' : 'hidden'} h-6 w-6`}
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                    </div>

                    {/* Desktop menu */}
                    <div className="hidden sm:flex items-center gap-4">
                        {user ? (
                            <div className="relative dropdown">
                                <div 
                                    className="flex items-center gap-2 cursor-pointer" 
                                    onClick={() => setShowDropdown(!showDropdown)}
                                >
                                    <div className="w-8 h-8 rounded-full bg-[#F57C05] text-white flex items-center justify-center">
                                        {user.data.data.name?.charAt(0)}
                                    </div>
                                    <span className="font-medium">{user.data.data.name}</span>
                                </div>
                                
                                {showDropdown && (
                                    <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 border border-gray-200">
                                        <Link 
                                            to="/dashboard" 
                                            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                        >
                                            Profile
                                        </Link>
                                        <button 
                                            onClick={logout}
                                            className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                        >
                                            Logout
                                        </button>
                                    </div>
                                )}
                            </div>
                        ) : (
                            <Link
                                to={'/login'}
                                className="rounded-md px-6 py-2 transition-all hover:shadow-md font-semibold bg-[#2269EB] text-white"
                            >
                                Login
                            </Link>
                        )}
                    </div>
                </div>
            </div>

            {/* Mobile menu */}
            <div className={`${isMobileMenuOpen ? 'block' : 'hidden'} sm:hidden`}>
                <div className="px-2 pt-2 pb-3 space-y-1">
                    {user ? (
                        <div className="space-y-2">
                            <div className="flex items-center gap-2 px-3 py-2">
                                <div className="w-8 h-8 rounded-full bg-[#F57C05] text-white flex items-center justify-center">
                                    {user.data.data.name?.charAt(0)}
                                </div>
                                <span className="font-medium">{user.data.data.name}</span>
                            </div>
                            <Link 
                                to="/dashboard" 
                                className="block px-3 py-2 text-base font-medium text-gray-700 hover:bg-gray-100 rounded-md"
                            >
                                Profile
                            </Link>
                            <button 
                                onClick={logout}
                                className="block w-full text-left px-3 py-2 text-base font-medium text-gray-700 hover:bg-gray-100 rounded-md"
                            >
                                Logout
                            </button>
                        </div>
                    ) : (
                        <Link
                            to={'/login'}
                            className="block w-full text-center rounded-md px-6 py-2 transition-all hover:shadow-md font-semibold bg-[#2269EB] text-white"
                        >
                            Login
                        </Link>
                    )}
                </div>
            </div>
        </nav>
    );
};

export default Navbar7;