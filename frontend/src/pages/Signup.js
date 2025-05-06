import React, { useState } from 'react'
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa6";
import { Link, useNavigate } from 'react-router-dom';
import imageTobase64 from '../helpers/imageTobase64';
import SummaryApi from '../common';
import { toast } from 'react-toastify';
import { FiLogIn, FiEdit3 } from "react-icons/fi";
import { FaCloudUploadAlt } from "react-icons/fa";

const Signup = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [validationErrors, setValidationErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [data, setData] = useState({
    email: "",
    password: "",
    name: "",
    confirmPassword: "",
    profilePic: "",
  });

  const navigate = useNavigate();

  const validateFields = () => {
    const errors = {};
    const emailRegex = /^[a-zA-Z0-9]*\d+[a-zA-Z]*@gmail\.com$/i;
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    const nameRegex = /^[a-zA-Z\s]+$/;

    // Name validation
    if (!data.name.trim()) {
      errors.name = 'Name is required';
    } else if (!nameRegex.test(data.name.trim())) {
      errors.name = 'Name should only contain letters and spaces';
    }

   // Email validation
  if (!data.email.trim()) {
    errors.email = 'Email is required';
  } else if (!emailRegex.test(data.email.trim())) {
    errors.email = 'Gmail address must contain at least one number before @ (e.g., user123@gmail.com)';
  }
  
    

    // Password validation
    if (!data.password) {
      errors.password = 'Password is required';
    } else if (!passwordRegex.test(data.password)) {
      errors.password = 'Password must contain:\n';
      if (data.password.length < 8) errors.password += '- Minimum 8 characters\n';
      if (!/[a-z]/.test(data.password)) errors.password += '- At least one lowercase letter\n';
      if (!/[A-Z]/.test(data.password)) errors.password += '- At least one uppercase letter\n';
      if (!/\d/.test(data.password)) errors.password += '- At least one number\n';
      if (!/[@$!%*?&]/.test(data.password)) errors.password += '- At least one special character (@$!%*?&)';
    }

    // Confirm password validation
    if (!data.confirmPassword) {
      errors.confirmPassword = 'Confirm Password is required';
    } else if (data.password !== data.confirmPassword) {
      errors.confirmPassword = 'Passwords do not match';
    }

    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    if (!validateFields()) {
      setIsSubmitting(false);
      return;
    }

    try {
      const response = await fetch(SummaryApi.Signup.url, {
        method: SummaryApi.Signup.method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data)
      });

      const responseData = await response.json();

      if (responseData.success) {
        toast.success(responseData.message);
        navigate("/login");
      } else {
        toast.error(responseData.message);
      }
    } catch (error) {
      toast.error("Failed to create account");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setData(prev => ({ ...prev, [name]: value }));
    setValidationErrors(prev => ({ ...prev, [name]: '' }));
  };

  const handleUploadPic = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    
    if (file.size > 10 * 1024 * 1024) {
      toast.error("File size exceeds 10MB limit");
      return;
    }
    
    const imagePic = await imageTobase64(file);
    setData(prev => ({ ...prev, profilePic: imagePic }));
  };

  return (
    <section id='signup' className="fixed inset-0 h-screen w-full bg-gradient-to-br from-gray-50 via-white to-gray-100 overflow-hidden">
      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/dark-stripes.png')] opacity-20" />
      <div className="absolute inset-0 bg-gradient-radial from-blue-500/10 to-transparent animate-pulse" />

      <div className="relative flex justify-center items-center min-h-screen p-4">
        <div className="flex justify-center items-center max-w-7xl w-full gap-12">
          
          <div className="relative bg-gradient-to-br from-white via-white to-white backdrop-blur-2xl p-[2px] rounded-3xl shadow-2xl group w-full max-w-lg hover:shadow-blue-500/40 transition-all duration-500">
            <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-blue-500/40 via-purple-600/30 to-cyan-500/40 opacity-50 group-hover:opacity-70 blur-xl animate-pulse-slow" />
            <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-blue-500/20 via-purple-600/10 to-cyan-500/20 opacity-30 group-hover:opacity-50 blur-md transition-opacity" />
            
            <div className="relative bg-gray-900/95 backdrop-blur-sm rounded-[calc(1.5rem-2px)] p-8 space-y-8 border border-gray-800/50">
              <div className="flex justify-center -mt-20 mb-8">
                <div className="relative w-32 h-32 group">
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-full p-1 animate-float opacity-80 group-hover:opacity-100 transition-opacity">
                    <div className="absolute inset-0 rounded-full border-2 border-blue-500/30 animate-ping-slow" />
                  </div>
                  
                  <label className="relative w-full h-full bg-gray-900 rounded-full flex items-center justify-center cursor-pointer overflow-hidden transition-transform duration-300 group-hover:scale-105">
                    <input 
                      type="file" 
                      className="hidden" 
                      onChange={handleUploadPic} 
                      accept="image/*"
                    />
                    {data.profilePic ? (
                      <img 
                        src={data.profilePic} 
                        className="w-full h-full object-cover rounded-full group-hover:opacity-90 transition-opacity"
                        alt="Profile Preview"
                      />
                    ) : (
                      <div className="flex flex-col items-center text-center p-4">
                        <FaCloudUploadAlt className="w-12 h-12 text-gray-400 group-hover:text-blue-400 mb-2 transition-colors animate-bounce-slow" />
                        <span className="text-xs text-gray-400 group-hover:text-blue-300 transition-colors">
                          Click to Upload<br />
                          <span className="text-[0.7rem] text-gray-500">PNG, JPG (max 10MB)</span>
                        </span>
                      </div>
                    )}
                    <div className="absolute inset-0 bg-gradient-to-b from-black/30 to-transparent rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
                  </label>
                  
                  <div className="absolute -bottom-2 -right-2 bg-blue-500/80 rounded-full p-1.5 backdrop-blur-sm animate-pulse">
                    <FiEdit3 className="w-5 h-5 text-white" />
                  </div>
                </div>
              </div>

              <form className="space-y-8" onSubmit={handleSubmit}>
                {/* Name Input */}
                <div className="space-y-4">
                  <div className="relative group">
                    <input
                      type="text"
                      name="name"
                      value={data.name}
                      onChange={handleOnChange}
                      className="w-full px-6 py-4 bg-gray-800 border-2 border-gray-700 rounded-xl text-gray-100 placeholder-transparent focus:border-blue-500 focus:ring-2 focus:ring-blue-500/30 transition-all peer"
                      placeholder=" "
                      required
                    />
                    <label className="absolute left-4 -top-3 px-2 bg-gray-800 text-gray-400 text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-500 peer-placeholder-shown:top-4 peer-focus:-top-3 peer-focus:text-sm peer-focus:text-white">
                      Full Name
                    </label>
                    {validationErrors.name && (
                      <p className="text-red-400 text-sm mt-2 ml-2">{validationErrors.name}</p>
                    )}
                  </div>
                </div>

                {/* Email Input */}
                <div className="space-y-4">
                  <div className="relative group">
                    <input
                      type="email"
                      name="email"
                      value={data.email}
                      onChange={handleOnChange}
                      className="w-full px-6 py-4 bg-gray-800 border-2 border-gray-700 rounded-xl text-gray-100 placeholder-transparent focus:border-blue-500 focus:ring-2 focus:ring-blue-500/30 transition-all peer"
                      placeholder=" "
                      required
                    />
                    <label className="absolute left-4 -top-3 px-2 bg-gray-800 text-gray-400 text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-500 peer-placeholder-shown:top-4 peer-focus:-top-3 peer-focus:text-sm peer-focus:text-white">
                      Email Address
                    </label>
                    {validationErrors.email && (
                      <p className="text-red-400 text-sm mt-2 ml-2">{validationErrors.email}</p>
                    )}
                  </div>
                </div>

                {/* Password Inputs */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div className="relative group">
                      <div className="relative">
                        <input
                          type={showPassword ? "text" : "password"}
                          name="password"
                          value={data.password}
                          onChange={handleOnChange}
                          className="w-full px-6 py-4 bg-gray-800 border-2 border-gray-700 rounded-xl text-gray-100 placeholder-transparent focus:border-blue-500 focus:ring-2 focus:ring-blue-500/30 transition-all peer"
                          placeholder=" "
                          required
                        />
                        <label className="absolute left-4 -top-3 px-2 bg-gray-800 text-gray-400 text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-500 peer-placeholder-shown:top-4 peer-focus:-top-3 peer-focus:text-sm peer-focus:text-white">
                          Password
                        </label>
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute right-4 top-4 text-gray-500 hover:text-blue-400 transition-colors"
                        >
                          {showPassword ? <FaEyeSlash className="w-6 h-6" /> : <FaEye className="w-6 h-6" />}
                        </button>
                      </div>
                      {validationErrors.password && (
                        <div className="text-red-400 text-sm mt-2 ml-2 whitespace-pre-line">
                          {validationErrors.password}
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="relative group">
                      <div className="relative">
                        <input
                          type={showConfirmPassword ? "text" : "password"}
                          name="confirmPassword"
                          value={data.confirmPassword}
                          onChange={handleOnChange}
                          className="w-full px-6 py-4 bg-gray-800 border-2 border-gray-700 rounded-xl text-gray-100 placeholder-transparent focus:border-blue-500 focus:ring-2 focus:ring-blue-500/30 transition-all peer"
                          placeholder=" "
                          required
                        />
                        <label className="absolute left-4 -top-3 px-2 bg-gray-800 text-gray-400 text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-500 peer-placeholder-shown:top-4 peer-focus:-top-3 peer-focus:text-sm peer-focus:text-white">
                          Confirm Password
                        </label>
                        <button
                          type="button"
                          onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                          className="absolute right-4 top-4 text-gray-500 hover:text-blue-400 transition-colors"
                        >
                          {showConfirmPassword ? <FaEyeSlash className="w-6 h-6" /> : <FaEye className="w-6 h-6" />}
                        </button>
                      </div>
                      {validationErrors.confirmPassword && (
                        <p className="text-red-400 text-sm mt-2 ml-2">{validationErrors.confirmPassword}</p>
                      )}
                    </div>
                  </div>
                </div>

                {/* Submit Button */}
                <button 
                  type="submit" 
                  disabled={isSubmitting}
                  className="w-full py-4 px-8 bg-gradient-to-r from-blue-600 to-cyan-500 rounded-xl font-bold text-gray-100 hover:shadow-lg hover:shadow-blue-500/30 transition-all transform hover:scale-[1.02] active:scale-95 group disabled:opacity-70 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? (
                    <span className="animate-pulse">Creating Account...</span>
                  ) : (
                    <span className="relative z-10">CREATE ACCOUNT</span>
                  )}
                </button>

                {/* Login Link */}
                <div className="text-center pt-6">
                  <Link
                    to="/login"
                    className="text-gray-500 hover:text-cyan-400 transition-colors font-medium flex items-center justify-center gap-2"
                  >
                    <FiLogIn className="w-5 h-5" />
                    Existing User? Login Here
                  </Link>
                </div>
              </form>
            </div>

            <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl" />
            <div className="absolute -top-20 -right-20 w-64 h-64 bg-cyan-500/10 rounded-full blur-3xl" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Signup;