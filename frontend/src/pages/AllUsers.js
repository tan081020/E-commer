import React, { useEffect, useState } from 'react'
import SummaryApi from '../common'
import { toast } from 'react-toastify'
import moment from "moment";
import { FaEdit } from "react-icons/fa";
import ChangeUserRole from '../components/ChangeUserRole';

const AllUsers = () => {
    const [allUsers,setAllUsers] = useState([])
    const [openUpdateRole,setopenUpdateRole] = useState(false)
    const [updateUserDetail,setUpdateUserDetail] = useState({
        email : '',
        name : '',
        role : '',
        _id :'',

    })


    const fetchAllUsers = async()=>{
        const fetchData = await fetch(SummaryApi.all_users.url,{
            method : SummaryApi.all_users.method,
            credentials : 'include'
        })

        
        const dataResponse = await fetchData.json()
        
        if(dataResponse.success){
            setAllUsers(dataResponse.data)
        }
        if(dataResponse.error){
            toast.error(dataResponse.message)
        }
        
    }
    useEffect(()=>{
        fetchAllUsers()
    },[]) 
  return (
    <div className=' bg-white pb-4'>
        <table className='w-full userTable'>
            <thead>
                <tr className=' bg-black text-white'>
                    <th>Sr.</th>
                    <th>name</th>
                    <th>email</th>
                    <th>role</th>
                    <th>createDate</th>
                    <th>Action</th>

                </tr>

            </thead>
            <tbody>
                {
                    allUsers.map((user,i) =>{
                        return(
                            <tr>
                                <td>{i+1}</td>
                                <td>{user?.name}</td>
                                <td>{user?.email}</td>
                                <td>{user?.role}</td>
                                <td>{moment(user?.createdAt).format('LL')}</td>
                                <td>
                                    <button className='bg-green-100 p-2 rounded-full hover:bg-green-500 hover:text-white' 
                                    onClick={()=>{
                                        setUpdateUserDetail(user)
                                        setopenUpdateRole(true)
                                    }}
                                    
                                    ><FaEdit /></button>
                                </td>
                            </tr>
                        )
                    })
                }
            </tbody>
        </table>
        {
            openUpdateRole && (
                <ChangeUserRole
                 onclose={()=>setopenUpdateRole(false)}
                 name={updateUserDetail.name} 
                 email={updateUserDetail.email} 
                 role={updateUserDetail.role}
                 userId={updateUserDetail._id}
                 callFunc = {fetchAllUsers}
                 ></ChangeUserRole>
            )
        }
    </div>
  )
}

export default AllUsers
