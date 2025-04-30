import React, { useState } from 'react'
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa6";
import { Link, useNavigate } from 'react-router-dom';
import loginIcons from '../assest/signin.gif'
import imageTobase64 from '../helpers/imageTobase64';
import SummaryApi from '../common';
import { toast } from 'react-toastify';
import '../App.css'
import { FiLogIn } from "react-icons/fi";
import { FaCloudUploadAlt } from "react-icons/fa";
import { FiEdit3 } from "react-icons/fi";

const Signup = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [data, setData] = useState({
    email: "",
    password: "",
    name: "",
    confirmPassword: "",
    profilePic: "",
  })
  const naviagate = useNavigate();

  const handleOnChange = (e) => {
    const { name, value } = e.target

    setData((preve) => {
      return {
        ...preve,
        [name]: value
      }
    })
  }

  const handleUploadPic = async (e) => {
    const file = e.target.files[0]

    const imagePic = await imageTobase64(file)
    console.log("imagePic", imagePic);

    setData((preve) => {
      return {
        ...preve,
        profilePic: imagePic,
      }
    })
  }

  const handleSubmit = async (e) => {

    e.preventDefault() //page didnt refresh while submit
    if (data.password === data.confirmPassword) {

      const dataResponse = await fetch(SummaryApi.Signup.url,
        {
          method: SummaryApi.Signup.method,
          headers: {
            "content-type": "application/json"
          },
          body: JSON.stringify(data)
        })

      const ApiRetrunData = await dataResponse.json();

      if (ApiRetrunData.success) {
        toast.success(ApiRetrunData.message);
        naviagate("/login")
      }

      if (ApiRetrunData.error) {
        toast.error(ApiRetrunData.message);
      }
      // console.log("ApiRetrunData", ApiRetrunData);
    }

    else {
      toast.error(" ⚠️Please ensure that both passwords match exactly.");
      // console.log("Password and conformPassword doesn't match...")
    }
  }


  return (

    // <section id='signup'>
    //   <div className='mx-auto container p-4'>

    //     <div className='bg-white p-5 w-full max-w-sm mx-auto'>

    //       <div className='w-20 h-20 mx-auto relative overflow-hidden rounded-full'>
    //         <div>
    //           <img src={data.profilePic || loginIcons} alt='login icons' />
    //         </div>
    //         <form>
    //           <label>
    //             <div className='text-xs bg-opacity-50 bg-slate-200 pb-4 pt-2 cursor-pointer text-center absolute bottom-0 w-full'>
    //               Upload  Photo
    //             </div>
    //             <input type='file' className='hidden' onChange={handleUploadPic} />
    //           </label>
    //         </form>
    //       </div>
    //       <form className='pt-6 flex flex-col gap-2' onSubmit={handleSubmit} >
    //         <div className='grid'>
    //           <label>Name : </label>
    //           <div className='bg-slate-100 p-2'>
    //             <input
    //               type='text'
    //               placeholder='enter your name'
    //               name='name'
    //               value={data.name}
    //               onChange={handleOnChange}
    //               required
    //               className='w-full h-full outline-none bg-transparent' />
    //           </div>
    //         </div>
    //         <div className='grid'>
    //           <label>Email : </label>
    //           <div className='bg-slate-100 p-2'>
    //             <input
    //               type='email'
    //               placeholder='enter email'
    //               name='email'
    //               value={data.email}
    //               onChange={handleOnChange}
    //               required
    //               className='w-full h-full outline-none bg-transparent' />
    //           </div>
    //         </div>

    //         <div>
    //           <label>Password : </label>
    //           <div className='bg-slate-100 p-2 flex'>
    //             <input
    //               type={showPassword ? "text" : "password"}
    //               placeholder='enter password'
    //               value={data.password}
    //               name='password'
    //               onChange={handleOnChange}
    //               required
    //               className='w-full h-full outline-none bg-transparent' />
    //             <div className='cursor-pointer text-xl' onClick={() => setShowPassword((preve) => !preve)}>
    //               <span>
    //                 {
    //                   showPassword ? (<FaEyeSlash />) : (<FaEye />)
    //                 }
    //               </span>
    //             </div>
    //           </div>
    //         </div>

    //         <div>
    //           <label>Confirm Password : </label>
    //           <div className='bg-slate-100 p-2 flex'>
    //             <input
    //               type={showConfirmPassword ? "text" : "password"}
    //               placeholder='enter confirm password'
    //               value={data.confirmPassword}
    //               name='confirmPassword'
    //               onChange={handleOnChange}
    //               required
    //               className='w-full h-full outline-none bg-transparent' />

    //             <div className='cursor-pointer text-xl' onClick={() => setShowConfirmPassword((preve) => !preve)} >
    //               <span>
    //                 {
    //                   showConfirmPassword ? (<FaEyeSlash />) : (<FaEye />)
    //                 }
    //               </span>
    //             </div>
    //           </div>
    //         </div>

    //         <button className='bg-red-600 hover:bg-red-700 text-white px-6 py-2 w-full max-w-[150px] rounded-full hover:scale-110 transition-all mx-auto block mt-6'>Sign Up</button>

    //       </form>

    //       <p className='my-5'>Already have account ? <Link to={"/login"} className=' text-red-600 hover:text-red-700 hover:underline'>Login</Link></p>
    //     </div>


    //   </div>
    // </section>


    <section id='signup' className="fixed inset-0 h-screen w-full bg-gradient-to-br from-gray-900 via-black to-gray-900 overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/dark-stripes.png')] opacity-20" />
      <div className="absolute inset-0 bg-gradient-radial from-blue-500/10 to-transparent animate-pulse" />

      <div className="relative flex justify-center items-center min-h-screen p-4">
        {/* Main Container */}
        <div className="flex justify-center items-center max-w-7xl w-full gap-12">
          {/* Left Side - Promotional Content */}
          <div className="hidden lg:flex flex-col justify-center items-start text-white w-1/2 pr-16 space-y-12 relative">
            <div className="absolute left-0 top-0 h-full w-1 bg-gradient-to-b from-cyan-500 via-blue-600 to-purple-600 rounded-full animate-gradient-pulse" />
            
            <h2 className="text-6xl font-bold leading-tight bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent drop-shadow-2xl">
              Join the Legacy
            </h2>
            
            <div className="space-y-10 relative">
              <div className="absolute -left-20 top-10 opacity-20">
                <svg className="w-48 h-48 text-cyan-500" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
                </svg>
              </div>

              <div className="pl-8 relative">
                <div className="absolute left-0 top-2 h-3/4 w-1 bg-cyan-500/30 rounded-full" />
                <p className="text-2xl leading-relaxed font-light text-gray-200">
                  <span className="font-medium bg-gradient-to-r from-cyan-300 to-blue-400 bg-clip-text text-transparent">
                    Exclusive Access
                  </span><br />
                  Unlock premium features and join a community of passionate gamers and collectors.
                </p>
              </div>

              <div className="pl-8 flex items-center gap-6">
                <div className="flex-1 h-px bg-gradient-to-r from-cyan-500/30 to-transparent" />
                <svg className="w-10 h-10 text-cyan-400 animate-spin-slow" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 10l-2 1m0 0l-2-1m2 1v2.5M20 7l-2 1m2-1l-2-1m2 1v2.5M14 4l-2-1-2 1M4 7l2-1M4 7l2 1M4 7v2.5M12 21l-2-1m2 1l2-1m-2 1v-2.5M6 18l-2-1v-2.5M18 18l2-1v-2.5" />
                </svg>
                <div className="flex-1 h-px bg-gradient-to-l from-blue-500/30 to-transparent" />
              </div>

              <div className="pl-8 relative">
                <div className="absolute left-0 top-2 h-3/4 w-1 bg-blue-500/30 rounded-full" />
                <p className="text-2xl leading-relaxed font-light text-gray-200">
                  <span className="font-medium bg-gradient-to-r from-blue-300 to-cyan-400 bg-clip-text text-transparent">
                    Secure Profile
                  </span><br />
                  Military-grade encryption protects your data and gaming assets.
                </p>
              </div>
            </div>
          </div>

          {/* Right Side - Signup Form */}
          <div className="relative bg-gradient-to-br from-gray-800/90 via-gray-900/90 to-black/90 backdrop-blur-2xl p-[2px] rounded-3xl shadow-2xl group w-full max-w-lg hover:shadow-blue-500/40 transition-all duration-500">
            <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-blue-500/40 via-purple-600/30 to-cyan-500/40 opacity-50 group-hover:opacity-70 blur-xl animate-pulse-slow" />
            <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-blue-500/20 via-purple-600/10 to-cyan-500/20 opacity-30 group-hover:opacity-50 blur-md transition-opacity" />
            
            <div className="relative bg-gray-900/95 backdrop-blur-sm rounded-[calc(1.5rem-2px)] p-8 space-y-8 border border-gray-800/50">
              {/* Profile Upload Section */}
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
                    </div>
                  </div>
                </div>

                {/* Submit Button */}
                <button className="w-full py-4 px-8 bg-gradient-to-r from-blue-600 to-cyan-500 rounded-xl font-bold text-gray-100 hover:shadow-lg hover:shadow-blue-500/30 transition-all transform hover:scale-[1.02] active:scale-95 group">
                  <span className="relative z-10">CREATE ACCOUNT</span>
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-cyan-400 rounded-xl opacity-0 group-hover:opacity-20 transition-opacity" />
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

            {/* Decorative Glows */}
            <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl" />
            <div className="absolute -top-20 -right-20 w-64 h-64 bg-cyan-500/10 rounded-full blur-3xl" />
          </div>
        </div>
      </div>
    </section>
  )
}



  


export default Signup