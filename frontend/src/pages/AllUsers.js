import React, { useEffect, useState } from 'react'
import SummaryApi from '../common'
import { toast } from 'react-toastify'
import moment from "moment"
import { BiSolidEditAlt } from "react-icons/bi";
import ChangeUserRole from '../components/ChangeUserRole';

const AllUsers = () => {
  const [allUser, setAllUser] = useState([])
  const [updateRole, setUpdateRole] = useState(false)
  const [updateUserDetails, setUpdateUserDetails] = useState({
    email : "",
    name : "",
    role : "",
    _id: "",
  })

  const fetchAllUser = async () => {
    const dataResponse = await fetch(SummaryApi.AllUser.url, {
      method: SummaryApi.AllUser.method,
      credentials: "include"
    })

    const ApiDataResponse = await dataResponse.json();
    console.log("apDataResponse : ", ApiDataResponse)

    if (ApiDataResponse.success) {
      setAllUser(ApiDataResponse.data)
    }
    if (ApiDataResponse.error) {
      toast.error(ApiDataResponse.message)
    }

  }

  useEffect(() => {
    fetchAllUser();
  }, [])


  return (
   <div className='bg-white pb-4'>
    <table className='w-full usertable '>
      <thead >
        <tr key={allUser._id} className='bg-black text-white'>
          <th>SN</th>
          <th>Name</th>
          <th>Email</th>
          <th>Role</th>
          <th>Created At</th>
          <th>Action</th>

        </tr>
      </thead>

      <tbody className="">
        {
          allUser.map((user, index) => {
            return (
              <tr key={user._id} >
                <td>{index + 1}</td>
                <td>{user?.name}</td>
                <td>{user?.email}</td>
                <td>{user?.role}</td>
                <td>{moment(user?.createdAt).fromNow()}</td>
                <td>
                  <button className='bg-green-100 p-2 cursor-pointer rounded-full hover:bg-green-500 hover:text-white' 
                  onClick={()=>{
                    setUpdateUserDetails(user)
                    setUpdateRole(true)
                    
                    }}>

                  <BiSolidEditAlt />
                  </button>
                </td>

              </tr>
            )
          })
        }
      </tbody>

    </table>

    
    {
      updateRole && (
        <ChangeUserRole onClose={()=>{setUpdateRole(false)}}
        name={updateUserDetails.name}
        email={updateUserDetails.email}
        role={updateUserDetails.role}
        userId={updateUserDetails._id}
        callfunc={fetchAllUser}
        />
      )
    }
    
    </div>
  ) 
}

export default AllUsers