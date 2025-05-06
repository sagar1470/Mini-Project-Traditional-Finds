import React, { useContext, useEffect, useState } from 'react'
import Logo1 from "../assest/Logo1.jpg"
import { TbSearch } from "react-icons/tb";
import { FaRegCircleUser } from "react-icons/fa6";
import { FaShoppingCart } from "react-icons/fa";
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux'
import SummaryApi from '../common';
import { toast } from 'react-toastify';
import { setUserDetails } from '../store/userSlice';
import ROLE from '../common/role';
import { LiaFlagUsaSolid } from "react-icons/lia";
import { BrowserRouter as Router, useLocation } from 'react-router-dom';
import { HiLogout, HiLogin } from 'react-icons/hi'
import { FiShield } from "react-icons/fi";
import Context from '../context';



const Header = () => {
  const user = useSelector(state => state?.user?.user)
  const dispatch = useDispatch();
  const [menuDisplay, setMenuDisplay] = useState(false);

  const [isVisible, setIsVisible] = useState(false);
  const [isAtTop, setIsAtTop] = useState(true);
  const location = useLocation();
  const searchInput = useLocation()

  const Urlsearch = new URLSearchParams(searchInput?.search)
  const searchQuery = Urlsearch.getAll("q")
  const [search, setSearch] = useState(searchQuery)

  //  const [search, setSearch] = useState(searchInput?.search?.split("=")[1])


  const context = useContext(Context)

  const navigate = useNavigate()

  // console.log("user-header", user);


  const handleLogout = async () => {
    const fetchData = await fetch(SummaryApi.logout.url, {
      method: SummaryApi.logout.method,
      credentials: "include"
    })

    const ApiReturnData = await fetchData.json();


    if (ApiReturnData.success) {
      toast.success(ApiReturnData.message);
      dispatch(setUserDetails())
      navigate("/")
    }
    if (ApiReturnData.error) {
      toast.error(ApiReturnData.message);
    }
  }
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const atTop = currentScrollY < 10;

      // Only apply scroll behavior on homepage
      if (location.pathname === "/") {
        setIsAtTop(atTop);
        setIsVisible(!atTop);
      }
    };

    // Always show navbar on non-homepage routes
    if (location.pathname !== "/") {
      setIsVisible(true);
      setIsAtTop(false);
      return;
    }

    // Initial check for homepage
    handleScroll();

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [location.pathname]); // Trigger useEffect when pathname changes


  const handleSearch = (e)=>{
    const { value } = e.target
    setSearch(value)

    if(value){
      navigate(`/search?q=${value}`)
    }else{
      navigate("/search")
    }
  }

  return (
    // <nav className={`fixed @apply top-0 left-0 w-full z-50 transition-all duration-500 ${showNavbar ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-10"}`}>
    //   <div className="bg-white/80 backdrop-blur-md shadow-md  rounded-b-2xl">
    //     {/* your navbar content */}

    //     <h1 className="text-2xl font-bold text-stone-800">MyBrand</h1>
    //   </div>
    // </nav>

    <nav className={`fixed @apply top-0 shadow-md left-0 w-full z-50 transition-transform duration-300 ${isVisible ? "translate-y-0" : "-translate-y-full"
      }`}>
      <div className={`bg-white/90 backdrop-blur-md border-b transition-all ${isAtTop ? "border-transparent" : "border-gray-200"
        }`}>
        <div className="">
          <div className="flex items-center justify-between h-16">
            {/* Your Navbar Content */}

            <header className='h-16 fixed w-full z-50 bg-white/30 backdrop-blur-md shadow-md text-gray-800
'>
              <div className='h-full container mx-auto flex items-center px-4 justify-between'>
                {/* Logo & Admin Panel */}
                <div className='flex items-center gap-6'>
                  <Link to="/" className='hover:scale-105 transition-transform'>
                    <div className='w-14 h-14 mix-blend-multiply'>
                      <img src={Logo1} alt='Logo' className='w-full h-full object-contain' />
                    </div>
                  </Link>

                  {/* Admin Panel Button */}
                  {user?.role === ROLE.ADMIN && (
                    <Link
                      to="/admin-panel/all-product"
                      className="hidden md:flex items-center bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 px-4 py-2 rounded-full shadow-lg hover:shadow-xl transition-all group"
                    >
                      <FiShield className="w-5 h-5 text-white mr-2" />
                      <span className="text-white font-medium text-sm">Admin Dashboard</span>
                      <span className="ml-2 bg-white/20 px-2 py-1 rounded-full text-xs text-white/90">ADMIN</span>
                    </Link>
                  )}
                </div>

                {/* Search Bar */}
                <div className="hidden md:flex items-center w-full max-w-md bg-white border border-gray-200 rounded-full px-3 py-1.5 shadow-sm hover:shadow-md transition-shadow duration-300">
                  <input
                    type="text"
                    onChange={handleSearch}
                    value={search} 
                    placeholder="Search products..."
                    className="w-full bg-transparent outline-none px-3 py-1 text-sm placeholder-gray-500"
                  />
                  <button className="min-w-[42px] h-8 bg-gradient-to-r from-orange-500 to-amber-600 hover:from-orange-600 hover:to-amber-700 text-white rounded-full flex items-center justify-center transition-all duration-300">
                    <TbSearch className="text-lg" />
                  </button>
                </div>

                {/* Right Side Controls */}
                <div className='flex items-center md:gap-6 gap-3'>
                  {/* Language Selector */}
                  <div className="relative hidden group lg:flex items-cente mix-blend-multiply">
                    <button className="flex items-center px-3 py-2 rounded-md bg-white shadow-sm hover:bg-orange-400 hover:shadow-md transition-all">
                      {/* UK Flag */}
                      <span className="text-2xl mr-2"><LiaFlagUsaSolid /></span>

                      {/* Language Text */}
                      <span className="text-base font-semibold text-gray-700 group-hover:text-blue-600 transition-colors">
                        ENG
                      </span>

                      {/* Down Arrow */}
                      <svg
                        className="w-5 h-5 ml-2 text-gray-500 group-hover:text-blue-600 transition-colors"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M19 9l-7 7-7-7"
                        />
                      </svg>
                    </button>

                    {/* Dropdown Menu */}
                    <div className="absolute hidden group-hover:block top-full right-0 w-44 bg-white border border-gray-200 shadow-xl rounded-md mt-2 z-50">
                      <div className="py-2">
                        <button className="w-full flex items-center px-4 py-2 text-left text-gray-700 hover:bg-blue-50">
                          <span className="text-xl mr-3">u🇳</span> English
                        </button>
                        <button className="w-full flex items-center px-4 py-2 text-left text-gray-700 hover:bg-blue-50">
                          <span className="text-xl mr-3">🇳🇵</span> नेपाली
                        </button>
                        {/* <button className="w-full flex items-center px-4 py-2 text-left text-gray-700 hover:bg-blue-50">
                  <span className="text-xl mr-3">🇮🇳</span> हिन्दी
                </button> */}
                      </div>
                    </div>
                  </div>

                  {/* User Profile */}
                  <div className='relative'>
                    {user?._id && (
                      <div
                        className='cursor-pointer hover:scale-110 transition-transform'
                        onClick={() => setMenuDisplay(prev => !prev)}
                      >
                        {user?.profilePic ? (
                          <img
                            src={user.profilePic}
                            className='w-10 h-10 rounded-full border-2 border-white shadow-md'
                            alt={user.name}
                          />
                        ) : (
                          <div className='w-10 h-10 rounded-full bg-gradient-to-r from-blue-500 to-cyan-500 flex items-center justify-center text-white'>
                            <FaRegCircleUser className="text-xl" />
                          </div>
                        )}
                      </div>
                    )}

                    {/* Profile Dropdown */}
                    {/* {menuDisplay && (
          <div className='absolute right-0 mt-2 w-48 bg-white/95 backdrop-blur-md rounded-xl shadow-xl border border-gray-200 overflow-hidden'>
            <div className='p-2'>
              {user?.role === ROLE.ADMIN && (
                <Link 
                  to="/admin-panel/all-product"
                  className='flex items-center px-4 py-2.5 hover:bg-gray-50 rounded-lg transition-colors'
                >
                  <FiShield className="mr-2 text-purple-600" />
                  <span className="text-gray-700">Admin Panel</span>
                </Link>
              )}
            </div>
          </div> */}
                    {/* )} */}
                  </div>

                  {/* Cart */}
                  <Link to={"/cart-product"} className="flex items-center space-x-2 hover:bg-amber-50 px-3 py-1.5 rounded-xl transition-colors cursor-pointer group relative">
                    <div className="relative">
                      <FaShoppingCart className="w-6 h-6 text-gray-900 group-hover:text-amber-600 transition-colors" />
                      {
                        user?._id && (
                          <div className="absolute -top-1 -right-2 bg-amber-600 text-white text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center shadow-sm border border-white">
                            {context?.cartProductCount}
                          </div>
                        )
                      }

                    </div>
                    <div className="hidden md:flex flex-col -space-y-1">
                      <span className="text-xs text-gray-500 group-hover:text-gray-700">0 items</span>
                      <span className="text-sm font-medium text-gray-900 group-hover:text-amber-600">Cart</span>
                    </div>
                  </Link>

                  {/* Login/Logout */}
                  <div>
                    {user?._id ? (
                      <button
                        onClick={handleLogout}
                        className='flex items-center px-4 py-2 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white shadow-md hover:shadow-lg transition-all'
                      >
                        <HiLogout className='w-5 h-5 mr-1.5' />
                        <span className="text-sm font-medium">Logout</span>
                      </button>
                    ) : (
                      <Link to="/login">
                        <button className='flex items-center px-4 py-2 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white shadow-md hover:shadow-lg transition-all'>
                          <HiLogin className='w-5 h-5 mr-1.5' />
                          <span className="text-sm font-medium">Login</span>
                        </button>
                      </Link>
                    )}
                  </div>
                </div>
              </div>
            </header>





          </div>
        </div>
      </div>
    </nav>


  )
}

export default Header