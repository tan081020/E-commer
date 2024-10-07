import React, { useState } from 'react'
import loginicon from '../assest/signin.gif'
import { RiEyeFill } from "react-icons/ri";
import { RiEyeCloseLine } from "react-icons/ri";
import { Link,useNavigate } from 'react-router-dom';
import imageToBase64 from '../helpers/ImageToBase64';
import SummaryApi from '../common';
import { toast } from 'react-toastify';

const SignUp = () => {
    const [showPassword,setShowPassword] = useState(false)
    const [showConfirmPassword,setShowConfirmPassword] = useState(false)

    const [data,setdata] = useState({
        email : "",
        password : "",
        name:"",
        confirmPassword:"",
        profilePic:"",
    })

    const navigate = useNavigate() 
    const handleOnChanger = (e)=>{
        const {name,value} = e.target
        setdata((preve)=>{
            return {
                ...preve,
                [name]:value

            }
        })
    }

    const handleUploadPic =async(e)=>{
        const file = e.target.files[0]

        const imagepic = await imageToBase64(file)
        setdata((preve)=>{
            return{
                ...preve,
                profilePic:imagepic,
            }
        })
         

    }

    const handleOnSubmit = async(e)=>{
        e.preventDefault()

        if(data.password === data.confirmPassword){

            const dataResponse = await fetch(SummaryApi.signUp.url,{
                method : SummaryApi.signUp.method,
                headers :{
                    "content-type" : "application/json"
                },
                body : JSON.stringify(data)
            })
    
            const dataApi = await dataResponse.json()
            if(dataApi.success){
                toast.success(dataApi.message)
                navigate('/login')
            }
            if(dataApi.error){
                toast.error(dataApi.message)
            }  
            
            
        }else{
            console.log("mat khau chua trung khop");
            
        }

    }
  return (
    <section id='signup'>
        <div className='ms-auto container p-4'>

            <div className='bg-white p-5 w-full max-w-sm mx-auto'>
                    <div className='w-20 h-20 mx-auto relative overflow-hidden rounded-full'>
                        <div>
                            <img src={data.profilePic || loginicon} alt='login icon'></img>
                        </div>
                        <form>
                            <label>
                                <div className='text-xs bg-opacity-80 bg-slate-200 pb-3 pt-2 cursor-pointer text-center absolute bottom-0 w-full'>
                                    Thêm ảnh
                                </div>
                                <input type='file' className=' hidden' onChange={handleUploadPic}/>
                            </label>
                            
                        </form>
                    </div>

                    <form className='pt-6 flex flex-col gap-2' onSubmit={handleOnSubmit}>
                        <div className='grid'>
                                <label>Họ và tên : </label>
                                <div className='bg-slate-100 p-2'>
                                    <input 
                                    type='text' 
                                    placeholder='nhập tên của bạn' 
                                    name='name'
                                    value={data.name}
                                    onChange={handleOnChanger}
                                    required
                                    className='w-full h-full outline-none bg-transparent'
                                    
                                    />
                                </div>
                            </div>
                        <div className='grid'>
                            <label>Email : </label>
                            <div className='bg-slate-100 p-2'>
                                <input 
                                type='email' 
                                placeholder='nhập Email' 
                                name='email'
                                value={data.email}
                                onChange={handleOnChanger}
                                required
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
                                required
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
                        </div>
                        <div>
                            <label>Nhập lại mật khẩu : </label>
                            <div className='bg-slate-100 p-2 flex'>
                                <input 
                                type={showConfirmPassword ? 'text': 'password'} 
                                placeholder='nhập lại Mật khẩu' 
                                name='confirmPassword'
                                value={data.confirmPassword}
                                onChange={handleOnChanger}
                                required
                                className='w-full h-full outline-none bg-transparent'
                                
                                />
                                <div className='cursor-pointer text-xl' onClick={()=>setShowConfirmPassword((preve)=>!preve)}>
                                    <span>
                                        {
                                            showConfirmPassword ? (
                                                
                                                <RiEyeFill />
                                            )
                                            :(
                                                <RiEyeCloseLine />
                                            )
                                        }
                                        
                                        
                                    </span>
                                </div>
                            </div>
                        </div>
                        <button className='bg-red-600 hover:bg-red-700 text-white px-6 py-2 w-full max-w-[150-px] rounded-full hover:scale-90 transition-all mt-6'>Đăng kí</button>
                    </form>

                    <p className='my-5'>
                        Bạn đã có tài khoản ?
                        <Link className='hover:text-red-700 hover:underline text-red-600' to={'/login'}>   Trở lại đăng nhập</Link>
                    </p>
            </div>
        </div>
   </section>
  )
}

export default SignUp
