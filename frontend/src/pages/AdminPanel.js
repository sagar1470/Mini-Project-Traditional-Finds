import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { FaRegCircleUser } from "react-icons/fa6";
import { Link, Outlet, useNavigate } from 'react-router-dom';
import ROLE from '../common/role';
import SummaryApi from '../common';
import { toast } from 'react-toastify';
import { setUserDetails } from '../store/userSlice';
import { HiUsers, HiBriefcase, HiLogout, HiShieldCheck } from 'react-icons/hi';


const AdminPanel = () => {
  const user = useSelector(state => state?.user?.user)
  const navigate = useNavigate()
  const dispatch = useDispatch();


  useEffect(() => {
    if (user?.role !== ROLE.ADMIN) {
      navigate("/");
    }
  })

  const handleLogout = async () => {
    const fetchData = await fetch(SummaryApi.logout.url, {
      method: SummaryApi.logout.method,
      credentials: "include"
    })

    const ApiReturnData = await fetchData.json();
    console.log("ApiReturnData", ApiReturnData);

    if (ApiReturnData.success) {
      toast.success(ApiReturnData.message);
      dispatch(setUserDetails())
    }
    if (ApiReturnData.error) {
      toast.error(ApiReturnData.message);
    }
  }
  return (
    // <div className='min-h-[calc(100vh-100px)] md:flex hidden '>

    //   <aside className='bg-white min-h-full w-full max-w-60 customeShadow'>

    //     <div className='h-40 flex justify-center flex-col items-center mt-3 border-b-2'>
    //       <div className='text-4xl cursor-pointer pl-2 ' >
    //         {
    //           user?.profilePic ? (
    //             <img src={user?.profilePic} className='w-20 h-20 rounded-full' alt={user?.name} />
    //           )
    //             : (
    //               <FaRegCircleUser />
    //             )
    //         }
    //       </div>

    //       <p className='capitalize text-lg font-semibold pr-1'>{user?.name}</p>
    //       <p className='text-sm pr-1 opacity-85'>{user?.role}</p>

    //     </div>

    //     {/* {navigation} */}
    //     <div>
    //       <nav className='grid p-4 opacity-100'>
    //         <Link to={"all-users"} className='px-2 py-1 hover:bg-slate-100'>All Users</Link>
    //         <Link to={"all-product"} className='px-2 py-1 hover:bg-slate-100'>All Product</Link>
    //         <button onClick={handleLogout} className='px-3 py-1 rounded-full text-white bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-800'>Logout</button>

    //       </nav>
    //     </div>
    //   </aside>

    //   <main className='w-full h-full p-2'>
    //     <Outlet/>
    //   </main>
    // </div>


    <div className='min-h-[calc(100vh-100px)] md:flex hidden bg-gradient-to-b from-gray-50 to-gray-100  mt-20'>
      <aside className='bg-gradient-to-b from-slate-800 to-slate-900 min-h-full w-full max-w-64 shadow-xl border-r border-slate-700/50'>
        {/* User Profile Section */}
        <div className='h-48 flex flex-col items-center justify-center border-b border-slate-700/50 pb-6'>
          <div className='relative group mb-4'>
            <div className='w-20 h-20 rounded-full bg-slate-700 flex items-center justify-center overflow-hidden border-2 border-slate-600/50 hover:border-blue-400 transition-all'>
              {user?.profilePic ? (
                <img
                  src={user?.profilePic}
                  className='w-full h-full object-cover transform group-hover:scale-105 transition-transform'
                  alt={user?.name}
                />
              ) : (
                <FaRegCircleUser className='w-10 h-10 text-slate-400' />
              )}
            </div>
            <div className='absolute -bottom-2 right-0 bg-blue-500 rounded-full p-1 border-2 border-slate-800'>
              <HiShieldCheck className='w-4 h-4 text-white' />
            </div>
          </div>

          <p className='text-lg font-semibold text-white mb-1'>{user?.name}</p>
          <p className='text-sm text-slate-400 font-medium'>{user?.role}</p>
        </div>

        {/* Navigation */}
        <nav className='p-4 space-y-2'>
          <Link
            to="all-users"
            className='flex items-center px-4 py-3 rounded-lg text-slate-300 hover:bg-slate-700/50 hover:text-white transition-all group'
          >
            <HiUsers className='w-5 h-5 mr-3 text-slate-400 group-hover:text-blue-400' />
            <span className='font-medium'>All Users</span>
          </Link>

          <Link
            to="all-product"
            className='flex items-center px-4 py-3 rounded-lg text-slate-300 hover:bg-slate-700/50 hover:text-white transition-all group'
          >
            <HiBriefcase className='w-5 h-5 mr-3 text-slate-400 group-hover:text-blue-400' />
            <span className='font-medium'>All Products</span>
          </Link>
        </nav>

        {/* Logout Button */}
        <div className='absolute  w-max-full p-4 border-t border-slate-700/50'>
          <button
            onClick={handleLogout}
            className='w-full flex items-center justify-center px-4 py-3 rounded-lg bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 text-white font-medium transition-all'
          >
            <HiLogout className='w-5 h-5 mr-2' />
            Logout
          </button>
        </div>
      </aside>

      <main className='flex-1 h-full p-6 bg-slate-50'>
        <Outlet />
      </main>
    </div>



  )
}

export default AdminPanel