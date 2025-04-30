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

    const handleOnChangeSelect = (e) => {
        setUserRole(e.target.value);

        console.log(e.target.value)
    }

    const updateUserRole = async () => {
        const fetchResponse = await fetch(SummaryApi.updateUser.url, {
            method: SummaryApi.updateUser.method,
            credentials: "include",
            headers: {
                "content-type": "application/json"
            },
            body: JSON.stringify({
                userId: userId,
                role: userRole
            })
        })

        const responseData = await fetchResponse.json()
        if (responseData.success) {
            toast.success(responseData.message)
            onClose()
            callfunc()
        }
        console.log("response data : ", responseData);
    }

    return (
        // <div className='fixed w-full h-full top-0 right-0 bottom-0 left-0 z-10 flex justify-between items-center bg-slate-200 bg-opacity-40 '>
        //     <div className='mx-auto bg-white shadow-md p-4 max-w-sm w-full'>

        //           <button className='block ml-auto' onClick={onClose}>
        //           <MdOutlineClose />
        //           </button>

        //         <h1 className='pb-4 text-lg font-medium'>Change user role</h1>
        //         <p>Name : {name}</p>
        //         <p>Email : {email}</p>

        //         <div className='flex items-center justify-between my-4'>
        //         <p>Role</p>
        //         <select className='border px-4 py-1' value={userRole} onChange={handleOnChangeSelect}>

        //             {
        //                 Object.values(ROLE).map((role) => {
        //                     return (
        //                         <option value={role} key={role}>{role}</option>
        //                     )
        //                 })
        //             }

        //         </select>
        //         </div>

        //         <button className='w-fit mx-auto block border px-3 py-1 rounded-full bg-red-600 text-white hover:bg-red-700' onClick={updateUserRole}>Change Role</button>
        //     </div>
        // </div>


        <div className='fixed inset-0 z-10 flex justify-center items-center bg-slate-200/40 backdrop-blur-sm'>
            <div className='bg-white rounded-3xl shadow-2xl p-6 max-w-sm w-full relative'>

                <button
                    className='absolute top-4 right-4 text-gray-500 hover:text-red-500 transition'
                    onClick={onClose}
                >
                    <MdOutlineClose className='text-2xl' />
                </button>

                <h1 className='pb-4 text-2xl font-semibold text-gray-800 text-center'>Change User Role</h1>

                <div className='space-y-2 text-gray-700 mb-6'>
                    <p><span className='font-semibold'>Name:</span> {name}</p>
                    <p><span className='font-semibold'>Email:</span> {email}</p>
                </div>

                <div className='flex items-center justify-between bg-gray-50 p-3 rounded-xl mb-6 shadow-inner'>
                    <p className='text-gray-600 font-medium'>Role</p>
                    <select
                        className='border rounded-xl px-4 py-2 bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-red-400'
                        value={userRole}
                        onChange={handleOnChangeSelect}
                    >
                        {Object.values(ROLE).map((role) => (
                            <option value={role} key={role}>
                                {role}
                            </option>
                        ))}
                    </select>
                </div>

                <button
                    onClick={updateUserRole}
                    className='w-full bg-red-600 hover:bg-red-700 transition text-white py-2 rounded-full text-lg font-semibold shadow-md'
                >
                    Change Role
                </button>

            </div>
        </div>

    )
}

export default ChangeUserRole