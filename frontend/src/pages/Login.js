import React, { useContext, useState } from 'react'
import loginicon from '../assest/signin.gif'
import { RiEyeFill } from "react-icons/ri";
import { RiEyeCloseLine } from "react-icons/ri";
import { Link, useNavigate } from 'react-router-dom';
import SummaryApi from '../common';
import { toast } from 'react-toastify';
import Context from '../context';

const Login = () => {
    const [showPassword,setShowPassword] = useState(false)
    const [data,setdata] = useState({
        email : "",
        password : ""
    })
    const navigate = useNavigate()
   
    const {fetchUserDeatails,fetchUserAddToCart} = useContext(Context)
    
    const handleOnChanger = (e)=>{
        const {name,value} = e.target
        setdata((preve)=>{
            return {
                ...preve,
                [name]:value

            }
        })
    }

    const handleOnSubmit = async(e)=>{
        e.preventDefault()

        
        const dataResponse = await fetch(SummaryApi.signIn.url,{
            method : SummaryApi.signIn.method,
            credentials : 'include',
            headers :{
                "content-type" : "application/json"
            },
            body : JSON.stringify(data)
        })

        const dataApi = await dataResponse.json()
        if(dataApi.success){
            toast.success(dataApi.message)
            navigate('/')
            fetchUserDeatails()
            fetchUserAddToCart()
            
        }
        if(dataApi.error){
            toast.error(dataApi.message)
        }  
    }

    
    
  return (
   <section id='login'>
        <div className='ms-auto container p-4'>

            <div className='bg-white p-5 w-full max-w-sm mx-auto'>
                    <div className='w-20 h-20 mx-auto'>
                        <img src={loginicon} alt='login icon'></img>
                    </div>

                    <form className='pt-6 flex flex-col gap-2' onSubmit={handleOnSubmit}>
                        <div className='grid'>
                            <label>Email : </label>
                            <div className='bg-slate-100 p-2'>
                                <input 
                                type='email' 
                                placeholder='nhập Email' 
                                name='email'
                                value={data.email}
                                onChange={handleOnChanger}
                                className='w-full h-full outline-none bg-transparent'
                                
                                />
                            </div>
                        </div>

                        <div>
                            <label>Mật Khẩu : </label>
                            <div className='bg-slate-100 p-2 flex'>
                                <input 
                                type={showPassword ? 'text': 'password'} 
                                placeholder='nhập Mật khẩu' 
                                name='password'
                                value={data.password}
                                onChange={handleOnChanger}
                                className='w-full h-full outline-none bg-transparent'
                                
                                />
                                <div className='cursor-pointer text-xl' onClick={()=>setShowPassword((preve)=>!preve)}>
                                    <span>
                                        {
                                            showPassword ? (
                                                
                                                <RiEyeFill />
                                            )
                                            :(
                                                <RiEyeCloseLine />
                                            )
                                        }
                                        
                                        
                                    </span>
                                </div>
                            </div>
                            <Link className='block w-fit ml-auto hover:underline hover:text-red-500' to={'/forgot-password'}>Quên mật khẩu ?</Link>
                        </div>
                        <button className='bg-red-600 hover:bg-red-700 text-white px-6 py-2 w-full max-w-[150-px] rounded-full hover:scale-90 transition-all mt-6'>Đăng Nhập</button>
                    </form>

                    <p className='my-5'>
                        Bạn chưa có tài khoản ?
                        <Link className='hover:text-red-700 hover:underline text-red-600' to={'/sign-up'}>Đăng kí</Link>
                    </p>
            </div>
        </div>
   </section>
  )
}

export default Login
