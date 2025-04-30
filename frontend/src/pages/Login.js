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




const Login = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [data, setData] = useState({
        email: "",
        password: ""
    })
    const navigate = useNavigate()
    const { fetchUserDetails } = useContext(Context)

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
        }
        if (ApiReturnData.error) {
            toast.error(ApiReturnData.message)
        }
    }

    return (

        // <section id='login' >
        //     <div className='mx-auto container p-4 '>

        //         <div className='bg-white p-5 w-full max-w-sm mx-auto'>
        //             <div className='w-20 h-20 mx-auto'>
        //                 <img src={loginIcon} alt='login icons' />
        //             </div>

        //             <form className='pt-6 flex flex-col gap-2' onSubmit={handleSubmit}>
        //                 <div className='grid'>
        //                     <label>Email : </label>
        //                     <div className='bg-slate-100 p-2'>
        //                         <input
        //                             type='email'
        //                             placeholder='enter email'
        //                             name='email'
        //                             value={data.email}
        //                             onChange={handleOnChange}
        //                             className='w-full h-full outline-none bg-transparent' />
        //                     </div>
        //                 </div>

        //                 <div>
        //                     <label>Password : </label>
        //                     <div className='bg-slate-100 p-2 flex'>
        //                         <input
        //                             type={showPassword ? "text" : "password"}
        //                             placeholder='enter password'
        //                             value={data.password}
        //                             name='password'
        //                             onChange={handleOnChange}
        //                             className='w-full h-full outline-none bg-transparent' />
        //                         <div className='cursor-pointer text-xl' onClick={() => setShowPassword((preve) => !preve)}>
        //                             <span>
        //                                 {
        //                                     showPassword ? (<FaEyeSlash />) : (<FaEye />)
        //                                 }
        //                             </span>
        //                         </div>
        //                     </div>
        //                     <Link to={'/forgot-password'} className='block w-fit ml-auto hover:underline hover:text-red-600'>
        //                         Forgot password ?
        //                     </Link>
        //                 </div>

        //                 <button className='bg-red-600 hover:bg-red-700 text-white px-6 py-2 w-full max-w-[150px] rounded-full hover:scale-110 transition-all mx-auto block mt-6'>Login</button>

        //             </form>

        //             <p className='my-5'>Don't have account ? <Link to={"/signup"} className=' text-red-600 hover:text-red-700 hover:underline'>Sign up</Link></p>
        //         </div>
        //     </div>
        // </section>


        <div className="fixed inset-0 h-full w-full lg:mt-16 bg-gradient-to-br from-gray-900 via-black to-gray-900">
            <div className="relative flex-1 flex justify-center items-center h-full w-full bg-gradient-to-tr from-blue-900/20 via-purple-900/10 to-cyan-900/15 p-8">
                {/* Background Enhancements */}
                <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/concrete-wall.png')] opacity-10" />
                <div className="absolute inset-0 bg-gradient-to-tr from-blue-900/20 via-purple-900/10 to-cyan-900/15" />

                {/* Main Content Container */}
                <div className="relative z-10 flex justify-center items-start gap-16 max-w-7xl w-full pt-0">

                    {/* Traditional Products Section */}
                    <div className="hidden lg:flex flex-col justify-center items-start text-white w-1/2 pr-16 space-y-0 relative">
                        <div className="absolute left-0 top-0 h-full w-1 bg-gradient-to-b from-cyan-500 via-blue-600 to-purple-600 rounded-full animate-gradient-pulse" />

                        <div className="space-y-10">
                            <h2 className="text-6xl font-bold leading-tight bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent drop-shadow-2xl">
                                Crafting Timeless<br />Traditions
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
                                            Masterful Artisanship
                                        </span><br />
                                        Forged through generations of skilled craftsmanship, each piece embodies centuries-old techniques perfected by our artisans.
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
                                            Sustainable Legacy
                                        </span><br />
                                        Using ethically sourced materials, we preserve both cultural heritage and natural ecosystems for future generations.
                                    </p>
                                </div>

                                <div className="pl-8 mt-12 animate-fade-in">
                                    <div className="flex items-center gap-4 text-blue-400">
                                        <div className="h-px w-24 bg-gradient-to-r from-blue-500 to-transparent" />
                                        <span className="font-mono text-sm tracking-widest opacity-80">SINCE 1998</span>
                                        <div className="h-px w-24 bg-gradient-to-l from-blue-500 to-transparent" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Login Form Section - Positioned Lower */}
                    <div className="relative bg-gradient-to-br from-gray-800/90 via-gray-900/90 to-black/90 backdrop-blur-2xl p-[2px] rounded-3xl shadow-2xl group w-full max-w-lg hover:shadow-blue-500/40 transition-all duration-500 mt-24">
                        <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-blue-500/40 via-purple-600/30 to-cyan-500/40 opacity-50 group-hover:opacity-70 blur-xl animate-pulse-slow" />
                        <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-blue-500/20 via-purple-600/10 to-cyan-500/20 opacity-30 group-hover:opacity-50 blur-md transition-opacity" />

                        <div className="relative bg-gray-900/95 backdrop-blur-sm rounded-[calc(1.5rem-2px)] p-8 space-y-10 border border-gray-800/50">
                            <div className="relative -mt-8 mb-0">
                                {/* Connecting line */}
                                <div className="absolute inset-x-0  h-px bg-gradient-to-r from-transparent via-blue-500 to-transparent" />

                                {/* Login header container */}
                                <div className="relative flex justify-center">
                                    <div className="px-8 py-4 bg-gray-900 border-2 border-blue-500/50 rounded-xl shadow-2xl shadow-blue-500/20 transform -translate-y-1/2 group">
                                        {/* Animated border elements */}
                                        <div className="absolute -inset-2 border-2 border-blue-500/30 rounded-xl animate-ping-slow" />
                                        <div className="absolute -inset-1 bg-gradient-to-br from-blue-500/20 to-cyan-500/10 rounded-xl opacity-50 group-hover:opacity-70 transition-opacity" />

                                        {/* Glowing text */}
                                        <h2 className="text-3xl font-bold text-transparent bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text animate-pulse-slow">
                                            LOG-IN
                                        </h2>

                                        {/* Corner brackets */}
                                        <div className="absolute left-0 top-0 w-3 h-3 border-l-2 border-t-2 border-cyan-400 opacity-50" />
                                        <div className="absolute right-0 top-0 w-3 h-3 border-r-2 border-t-2 border-blue-400 opacity-50" />
                                        <div className="absolute left-0 bottom-0 w-3 h-3 border-l-2 border-b-2 border-blue-400 opacity-50" />
                                        <div className="absolute right-0 bottom-0 w-3 h-3 border-r-2 border-b-2 border-cyan-400 opacity-50" />

                                        {/* Connecting line extensions */}
                                        <div className="absolute left-full top-1/2 w-16 h-px bg-gradient-to-r from-blue-500 to-transparent ml-4" />
                                        <div className="absolute right-full top-1/2 w-16 h-px bg-gradient-to-l from-blue-500 to-transparent mr-4" />
                                    </div>
                                </div>
                            </div>

                            <form className="space-y-8" onSubmit={handleSubmit}>
                                <div className="space-y-5">
                                    <div className="relative group">
                                        <input
                                            type="email"
                                            name="email"
                                            value={data.email}
                                            onChange={handleOnChange}
                                            className="w-full px-6 py-4 bg-gray-800 border-2 border-gray-700/80 rounded-2xl text-gray-100 placeholder-transparent focus:border-red-500 focus:ring-4 focus:ring-blue-500/20 transition-all peer"
                                            placeholder=" "
                                            required
                                        />
                                        <label className="absolute left-5 -top-3.5 px-3 bg-gray-800 text-gray-400/90 text-sm  tracking-wide transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-500 peer-placeholder-shown:top-5 peer-focus:-top-3.5 peer-focus:text-sm peer-focus:text-white">
                                            Email Address
                                        </label>
                                    </div>
                                </div>

                                <div className="space-y-5">
                                    <div className="relative group">
                                        <div className="relative">
                                            <input
                                                type={showPassword ? "text" : "password"}
                                                name="password"
                                                value={data.password}
                                                onChange={handleOnChange}
                                                className="w-full px-6 py-4 bg-gray-800 border-2 border-gray-700/80 rounded-2xl text-gray-100 placeholder-transparent focus:red-blue-500 focus:ring-4 focus:ring-blue-500/20 transition-all peer"
                                                placeholder=" "
                                                required
                                            />
                                            <label className="absolute left-5 -top-3.5 px-3 bg-gray-800 text-gray-400/90 text-sm tracking-wide transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-500 peer-placeholder-shown:top-5 peer-focus:-top-3.5 peer-focus:text-sm peer-focus:text-white">
                                                Password
                                            </label>
                                            <button
                                                type="button"
                                                onClick={() => setShowPassword(!showPassword)}
                                                className="absolute right-6 top-6 text-gray-500/80 hover:text-blue-400 transition-colors"
                                            >
                                                {showPassword ? <FaEyeSlash className="w-7 h-7" /> : <FaEye className="w-7 h-7" />}
                                            </button>
                                        </div>
                                    </div>
                                </div>

                                <button className="w-full py-4 px-8 bg-gradient-to-r from-blue-600 to-cyan-500 rounded-2xl font-bold text-gray-100 hover:shadow-xl hover:shadow-blue-500/30 transition-all transform hover:scale-[1.02] active:scale-95 group">
                                    <span className="relative z-10 tracking-wider">SECURE ACCESS</span>
                                    <div className="absolute inset-0 bg-gradient-to-r from-blue-500/40 to-cyan-400/30 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity" />
                                    <div className="absolute inset-0 rounded-2xl border-2 border-blue-400/20 opacity-0 group-hover:opacity-40" />
                                </button>

                                <div className="flex justify-between text-sm px-2">
                                    <Link
                                        to="/forgot-password"
                                        className="text-gray-500/90 hover:text-blue-400 transition-colors font-medium flex items-center gap-2"
                                    >
                                        <FiLock className="w-4 h-4" />
                                        Forget Credentials..?
                                    </Link>
                                    <Link
                                        to="/signup"
                                        className="text-gray-500/90 hover:text-cyan-400 transition-colors font-medium flex items-center gap-2"
                                    >
                                        Create Profile
                                        <FiArrowRight className="w-4 h-4" />
                                    </Link>
                                </div>
                            </form>
                        </div>

                        {/* <div className="absolute -bottom-16 -left-16 w-56 h-56 bg-blue-500/10 rounded-full blur-3xl" />
                        <div className="absolute -top-16 -right-16 w-56 h-56 bg-cyan-500/10 rounded-full blur-3xl" /> */}

                    </div>
                </div>
            </div>
        </div>

    )
}
export default Login