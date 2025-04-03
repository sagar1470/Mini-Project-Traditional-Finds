import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { FaRegCircleUser } from "react-icons/fa6";
import { Link, Outlet, useNavigate } from 'react-router-dom';
import ROLE from '../common/role';


const AdminPanel = () => {
  const user = useSelector(state => state?.user?.user)
  const navigate = useNavigate()


useEffect(()=>{
  if(user?.role !== ROLE.ADMIN){
    navigate("/");
  }
})
  
  return (
    <div className='min-h-[calc(100vh-100px)] md:flex hidden '>

      <aside className='bg-white min-h-full w-full max-w-60 customeShadow'>

        <div className='h-40 flex justify-center flex-col items-center mt-3 border-b-2'>
          <div className='text-4xl cursor-pointer pl-2 ' >
            {
              user?.profilePic ? (
                <img src={user?.profilePic} className='w-20 h-20 rounded-full' alt={user?.name} />
              )
                : (
                  <FaRegCircleUser />
                )
            }
          </div>

          <p className='capitalize text-lg font-semibold pr-1'>{user?.name}</p>
          <p className='text-sm pr-1 opacity-85'>{user?.role}</p>

        </div>

        {/* {navigation} */}
        <div>
          <nav className='grid p-4 opacity-100'>
            <Link to={"all-users"} className='px-2 py-1 hover:bg-slate-100'>All Users</Link>
            <Link to={"all-product"} className='px-2 py-1 hover:bg-slate-100'>All Product</Link>
          </nav>
        </div>
      </aside>

      <main className='w-full h-full p-2'>
        <Outlet/>
      </main>
    </div>
  )
}

export default AdminPanel