import React, { useContext, useState } from "react";
import Logo from "./Logo";
import { FaSearch } from "react-icons/fa";
import { FaUserCircle } from "react-icons/fa";
import { FaCartArrowDown } from "react-icons/fa";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import SummaryApi from "../common";
import { toast } from 'react-toastify';
import { setUserDetails } from '../stores/userSlice';
import ROLE from "../common/role";
import Context from "../context";



const Header = () => {
    const user = useSelector(state => state?.user?.user)
    const dispatch = useDispatch()
    const [menuDisplay, setMenuDisplay] = useState(false)
    const context = useContext(Context)
    const navigate = useNavigate()
    const searchInput = useLocation()
    const [search,setSearch] = useState(searchInput.search.split("=")[1])

    const handleLogout = async () => {
        const fetchdata = await fetch(SummaryApi.logout_user.url, {
            method: SummaryApi.logout_user.method,
            credentials: "include"
        })
        const data = await fetchdata.json()

        if (data.success) {
            toast.success(data.message)
            dispatch(setUserDetails(null))
        }
        if (data.error) {
            toast.error(data.message)
        }
    }
    const handleSearch = (e)=>{
        const {value} = e.target
      
        
        setSearch(value)
        if(value){
            navigate(`/search?q=${value}`)
        }else{
            navigate('/search')

        }   
    }
    return (
        <header className="h-16 shadow-md bg-white fixed w-full z-40">
            <div className="h-full container mx-auto flex items-center px-4 justify-between">
                <div className="">
                    <Link to={"/"}>
                        <Logo w={90} h={50} />
                    </Link>
                </div>

                <div className=" hidden lg:flex items-center w-full justify-between max-w-sm border rounded-full focus-within:shadow pl-1">
                    <input type="text" placeholder="Tìm kiếm sản phẩm" className="w-full outline-none " onChange={handleSearch} value={search}></input>
                    <div onClick={handleSearch} className="text-lg min-w-[50px] h-8 bg-red-600 flex items-center justify-center rounded-r-full text-white ">
                        <FaSearch />
                    </div>
                </div>

                <div className="flex items-center gap-7">

                    <div className=" relative flex justify-center " >
                        {
                            user?._id && (
                                <div className="text-3xl cursor-pointer relative flex justify-center" onClick={() => setMenuDisplay(preve => !preve)}>
                                    {
                                        user?.profilePic ? (
                                            <img src={user?.profilePic} className="w-10 h-10 rounded-full" alt={user?.name}></img>
                                        ) : (
                                            <FaUserCircle />
                                        )
                                    }

                                </div>
                            )
                        }

                        {
                            menuDisplay && (
                                <div className="absolute bg-white bottom-0 top-11 h-fit p-2 shadow-lg rounded-hidden" >
                                    <nav>
                                        {
                                            user?.role === ROLE.ADMIN && (
                                                <Link to={"/admin-panel/all-products"} className=" whitespace-nowrap hidden md:block hover:bg-slate-200" onClick={() => setMenuDisplay(preve => !preve)}>Admin</Link>
                                            )
                                        }
                                    </nav>
                                </div>
                            )
                        }


                    </div>
                    {
                        user?._id && (
                            <Link to={"/cart"} className="text-2xl relative">
                                <span>
                                    <FaCartArrowDown />
                                </span>
                                <div className="bg-red-600 text-white w-5 h-5 rounded-full p-1 flex items-center justify-center absolute -top-2 -right-3 ">
                                    <p className="text-xs">
                                        {context?.cartProductCount}
                                    </p>
                                </div>
                            </Link>
                        )
                    }


                    <div>
                        {
                            user?._id ? (
                                <button onClick={handleLogout} className="px-3 py-1 rounded-full text-white bg-red-600 hover:bg-red-700">Đăng xuất</button>
                            ) : (
                                <Link to={"Login"} className="px-3 py-1 rounded-full text-white bg-red-600 hover:bg-red-700">Đăng Nhập</Link>
                            )
                        }
                    </div>
                </div>
            </div>


        </header>
    )
}

export default Header