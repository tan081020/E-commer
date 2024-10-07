import React, { useState } from 'react'
import ROLE from '../common/role'
import { FaWindowClose } from "react-icons/fa";
import SummaryApi from '../common';
import { toast } from 'react-toastify';

const ChangeUserRole = ({
    name,
    email,
    role,
    userId, 
    onclose,
    callFunc
}) => {
    const [usersRole,setUsersRole] = useState(role)
    const handleOnChangeRole = (e)=>{
        setUsersRole(e.target.value)        
    }
    const updateRole =async() =>{
        const fetchResponse = await fetch(SummaryApi.update_user.url,{
            method : SummaryApi.update_user.method,
            credentials : 'include',
            headers : {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                userId : userId,
                role : usersRole
            })
        })
        console.log(fetchResponse);
        
        const responseData = await fetchResponse.json()

        if(responseData.success){
                toast.success(responseData.message)
                onclose()
                callFunc()
            }
        if(responseData.error){
                toast.error(responseData.message)
            }
        
    }
   
    
  return (
    <div className=' fixed top-0 bottom-0 right-0 left-0 w-full h-full z-10 flex justify-between items-center bg-slate-200 bg-opacity-50 '>
        <div className='mx-auto bg-white shadow-md p-4 w-full max-w-sm'>
            <div className=' flex justify-center items-center pb-3'>

                <h1 className='pb-4 text-lg font-medium'>Change User Role</h1>

                <div className='pb-4 w-fit ml-auto text-2xl hover:text-red-600 cursor-pointer'onClick={onclose}> 
                        <FaWindowClose />
                </div>
            </div>
               
           

            <p>name: {name}</p>
            <p>email: {email}</p>
            <div className='flex justify-between my-3 items-center'>
                <p>role: {role}</p>
                <select className=' border px-4 py-1' value={usersRole} onChange={handleOnChangeRole}>
                {
                    Object.values(ROLE).map((role)=>{
                        return(
                            <option value={role} key={role}>{role}</option>
                        )
                    })
                }
                
                </select>
            </div>
                <button className='w-fit mx-auto block border py-1 px-3 rounded-full bg-red-600 text-white hover:bg-red-700' onClick={updateRole}> Change Role</button>
        </div>
    </div>
  )
}

export default ChangeUserRole
