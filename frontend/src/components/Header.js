import React, { useState } from 'react'
import Logo1 from "../assest/Logo1.jpg"
import { TbSearch } from "react-icons/tb";
import { FaRegCircleUser } from "react-icons/fa6";
import { FaShoppingCart } from "react-icons/fa";
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux'
import SummaryApi from '../common';
import { toast } from 'react-toastify';
import { setUserDetails } from '../store/userSlice';
import ROLE from '../common/role';


const Header = () => {
  const user = useSelector(state => state?.user?.user)
  const dispatch = useDispatch();
  const [menuDisplay, setMenuDisplay] = useState(false);

  // console.log("user-header", user);


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
    <header className='h-16 shadow-md @apply bg-red-50'>
      <div className='h-full container mx-auto flex items-center px-4 justify-between'>
        <div className=''>
          <Link to="/">
            <div className='w-14 h-14 mx-auto'>
              {/* <Logo w={90} h={50} /> */}
              <img src={Logo1} alt='Logo 1' />
            </div>
          </Link>
        </div>


        <div className='hidden lg:flex items-center w-full justify-between max-w-sm border rounded-full focus-within:shadow pl-2'>
          <input className='w-full outline-none pl-2 ' type='text' placeholder='search items' />
          <div className='text-lg min-w-[50px] h-8 bg-red-600 flex items-center justify-center rounded-r-full text-white'>
            <TbSearch />
          </div>
        </div>

        <div className='flex items-center gap-7'>

          <div className='relative flex justify-center'>

            {
              user?._id && (
                <div className='text-3xl cursor-pointer' onClick={() => { setMenuDisplay(preve => !preve) }}>
                  {
                    user?.profilePic ? (
                      <img src={user?.profilePic} className='w-10 h-10 rounded-full' alt={user?.name} />
                    )
                      : (
                        <FaRegCircleUser />
                      )
                  }
                </div>
              )
            }{
              menuDisplay && (
                <div className='absolute bg-white bottom-0 top-11 h-fit p-4 shadow-lg rounded'>
                  <nav>
                    {
                      user?.role === ROLE.ADMIN && (
                        <Link to={"/admin-panel/all-product"} className='whitespace-nowrap hidden md:block hover:bg-slate-100 p-2' onClick={() => { setMenuDisplay(preve => !preve) }} >Admin Panel</Link>
                      )}
                  </nav>
                </div>

              )

            }

          </div>

          <div className='relative text-2xl'>
            <span> <FaShoppingCart /></span>
            <div className='bg-red-600 text-white w-5 h-5 rounded-full p-1 flex items-center justify-center absolute top-0 -right-3'>
              <p className='text-sm'>0</p>
            </div>
          </div>

          <div>
            {
              user?._id ? (
                <button onClick={handleLogout} className='px-3 py-1 rounded-full text-white bg-red-600 hover:bg-red-700'>Logout</button>
              ) :
                (
                  <Link to="/login">
                    <button className='px-3 py-1 rounded-full text-white bg-red-600 hover:bg-red-700'>Login</button>
                  </Link>
                )
            }
          </div>
        </div>

      </div>

    </header>
  )
}

export default Header