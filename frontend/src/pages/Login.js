import React, { useContext, useState } from 'react'
import loginIcon from '../assest/signin.gif'
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa6";
import { Link, useNavigate } from 'react-router-dom';
import SummaryApi from '../common';
import { toast } from 'react-toastify';
import Context from '../context';
import '../App.css'
import { FiLock } from "react-icons/fi";
import { FiArrowRight } from "react-icons/fi";
import { FiLogIn } from "react-icons/fi";
import { FaCloudUploadAlt } from "react-icons/fa";
import { FiEdit3 } from "react-icons/fi";





const Login = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [data, setData] = useState({
        email: "",
        password: ""
    })
    const navigate = useNavigate()
    const { fetchUserDetails, fetchUserAddToCart } = useContext(Context)

    // const { fetchUserDetails, fetchUserAddToCart } = useContext(Context)

    const handleOnChange = (e) => {
        const { name, value } = e.target

        setData((preve) => {
            return {
                ...preve,
                [name]: value
            }
        })
    }
    const handleSubmit = async (e) => {
        e.preventDefault() //page didnt refresh while submit

        const dataResponse = await fetch(SummaryApi.SignIn.url, {
            method: SummaryApi.SignIn.method,
            credentials: "include",
            headers: {
                "content-type": "application/json"
            },
            body: JSON.stringify(data)
        })

        const ApiReturnData = await dataResponse.json();

        if (ApiReturnData.success) {
            toast.success(ApiReturnData.message);
            navigate("/");
            fetchUserDetails();
            fetchUserAddToCart();
        }
        if (ApiReturnData.error) {
            toast.error(ApiReturnData.message)
        }
    }

    return (

       

  <section id='signin' className="fixed inset-0 h-screen w-full 
 overflow-auto flex items-center justify-center p-4">
  <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/dark-stripes.png')] opacity-20" />
  <div className="absolute inset-0 bg-gradient-radial from-blue-500/10 to-transparent animate-pulse" />
    {/* Main Container */}
    <div className="relative bg-white rounded-2xl shadow-xl max-w-lg w-full border border-gray-100">
        {/* Profile Upload Section */}
        <div className="flex justify-center -mt-16 mb-8">
            <div className="relative w-32 h-32 group">
                <label className="relative w-full h-full bg-gray-100 rounded-full flex items-center justify-center cursor-pointer overflow-hidden transition-transform duration-300 hover:bg-gray-200">
                    <input
                        type="file"
                        className="hidden"
                        accept="image/*"
                       
                    />
                    {data.profilePic ? (
                        <img
                            src={data.profilePic}
                            className="w-full h-full object-cover rounded-full"
                            alt="Profile Preview"
                        />
                    ) : (
                        <div className="flex flex-col items-center text-center p-4">
                            <FaCloudUploadAlt className="w-8 h-8 text-gray-500 mb-2" />
                            <span className="text-xs text-gray-600">
                                Upload Photo<br />
                                <span className="text-[0.7rem] text-gray-500">PNG, JPG</span>
                            </span>
                        </div>
                    )}
                    <div className="absolute bottom-0 right-0 bg-blue-600 rounded-full p-1.5">
                        <FiEdit3 className="w-5 h-5 text-white" />
                    </div>
                </label>
            </div>
        </div>

        {/* Form Container */}
        <div className="px-8 pb-8 space-y-6">
            <h2 className="text-3xl font-bold text-gray-900 text-center mb-6">
                Create Account
            </h2>

            <form className="space-y-6" onSubmit={handleSubmit}>
                {/* Email Input */}
                <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">Email Address</label>
                    <input
                        type="email"
                        name="email"
                        value={data.email}
                        onChange={handleOnChange}
                        className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        placeholder="you@example.com"
                        required
                    />
                </div>

                {/* Password Input */}
                <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">Password</label>
                    <div className="relative">
                        <input
                            type={showPassword ? "text" : "password"}
                            name="password"
                            value={data.password}
                            onChange={handleOnChange}
                            className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 pr-12"
                            placeholder="••••••••"
                            required
                        />
                        <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-3 top-3 text-gray-400 hover:text-blue-500"
                        >
                            {showPassword ? <FaEyeSlash className="w-5 h-5" /> : <FaEye className="w-5 h-5" />}
                        </button>
                    </div>
                </div>

                {/* Submit Button */}
                <button
                    type="submit"
                    className="w-full py-3 px-6 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors shadow-sm"
                >
                    Sign in
                </button>

                {/* Links */}
                <div className="flex flex-col sm:flex-row justify-between items-center gap-4 pt-4">
                    <Link
                        to="/signup"
                        className="text-blue-600 hover:text-blue-700 text-sm flex items-center gap-1"
                    >
                        Create account? 
                        <FiArrowRight className="w-4 h-4" />
                    </Link>
                    <Link
                        to="/forgot-password"
                        className="text-gray-600 hover:text-gray-800 text-sm"
                    >
                        Forgot password?
                    </Link>
                </div>
            </form>
        </div>
    </div>
</section>

    )
}
export default Login