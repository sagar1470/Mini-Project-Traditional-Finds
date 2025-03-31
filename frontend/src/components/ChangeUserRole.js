import React, { useState } from 'react'
import ROLE from '../common/role'
import { MdOutlineClose } from "react-icons/md";
import SummaryApi from '../common';
import { toast } from 'react-toastify';

const ChangeUserRole = ({
    name,
    email,
    role,
    userId,
    onClose,
    callfunc
}) => {
    const [userRole, setUserRole] = useState(role)

    const handleOnChangeSelect =  (e)=>{
             setUserRole(e.target.value);

             console.log(e.target.value)
    }

    const updateUserRole = async()=>{
         const fetchResponse = await fetch(SummaryApi.updateUser.url,{
            method : SummaryApi.updateUser.method,
            credentials: "include",
            headers : {
                "content-type" : "application/json"
            },
            body : JSON.stringify({
                userId : userId,
                role : userRole
            })
         })

         const responseData = await fetchResponse.json()
         if(responseData.success){
            toast.success(responseData.message)
            onClose()
            callfunc()
         }
         console.log("response data : ",responseData);
    }

    return (
        <div className='fixed w-full h-full top-0 right-0 bottom-0 left-0 z-10 flex justify-between items-center bg-slate-200 bg-opacity-40 '>
            <div className='mx-auto bg-white shadow-md p-4 max-w-sm w-full'>

                  <button className='block ml-auto' onClick={onClose}>
                  <MdOutlineClose />
                  </button>

                <h1 className='pb-4 text-lg font-medium'>Change user role</h1>
                <p>Name : {name}</p>
                <p>Email : {email}</p>

                <div className='flex items-center justify-between my-4'>
                <p>Role</p>
                <select className='border px-4 py-1' value={userRole} onChange={handleOnChangeSelect}>

                    {
                        Object.values(ROLE).map((role) => {
                            return (
                                <option value={role} key={role}>{role}</option>
                            )
                        })
                    }

                </select>
                </div>
                
                <button className='w-fit mx-auto block border px-3 py-1 rounded-full bg-red-600 text-white hover:bg-red-700' onClick={updateUserRole}>Change Role</button>
            </div>
        </div>
    )
}

export default ChangeUserRole