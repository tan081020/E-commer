import React, { useContext } from 'react'
import scrollTop from '../helpers/scrollTop'
import disPlayINRCurrency from '../helpers/DisplayCurrency'
import Context from '../context'
import addToCart from '../helpers/addToCart'
import { Link } from 'react-router-dom'

const SearchVerticalCard = ({loading,data=[]}) => {
    const loadingList = new Array(13).fill(null)
    const{fetchUserAddToCart} = useContext(Context)


    const handleAddToCart = async (e,id) =>{
        await addToCart(e,id)
        fetchUserAddToCart()
    }


  return (
    <div className='grid grid-cols-[repeat(auto-fit,minmax(260px,300px))] justify-center md:justify-between  md:gap-4 overflow-x-scroll scrollbar-none transition-all '>

    {
          loading ? (
            loadingList.map((product,index)=>{
              return(
                  <div className=' w-full min-w-[280px]  md:min-w-[320px]  max-w-[280px] md:max-w-[320px]  bg-white rounded-sm shadow '>
                      <div className=' bg-slate-200 h-48 p-4 min-w-[280px] md:min-w-[145px] flex justify-center items-center animate-pulse'>
                          
                      </div>
                      <div className='p-4 grid gap-3'>
                          <h2 className=' font-medium text-base md:text-lg text-ellipsis line-clamp-1 text-black p-1 py-2 bg-slate-200 animate-pulse rounded-full'></h2>
                          <p className=' capitalize text-slate-500 p-1 bg-slate-200 animate-pulse rounded-full py-2'></p>
                          <div className='  gap-3'>
                              <p className=' text-red-600 font-medium p-1 bg-slate-200 animate-pulse rounded-full w-full  py-2'></p>
                              <p className=' text-slate-500 line-throughp-1 bg-slate-200 animate-pulse rounded-full w-full py-2'></p>
                          </div>
                          <button className=' text-sm  text-white px-3 animate-pulse  bg-slate-200  rounded-full py-2'></button>
                      </div>
                  </div>
              )
          })
          ):(
            data.map((product,index)=>{
              return(
                  <Link to={"/product/"+product?._id} className=' w-full min-w-[280px]  md:min-w-[300px]  max-w-[280px] md:max-w-[300px]  bg-white rounded-sm shadow ' onClick={scrollTop}>
                      <div className=' bg-slate-200 h-48 p-4 min-w-[280px] md:min-w-[145px] flex justify-center items-center'>
                          <img src={product.productImage[0]} className=' object-scale-down h-full hover:scale-110 transition-all mix-blend-multiply'></img>
                      </div>
                      <div className='p-4 grid gap-3'>
                          <h2 className=' font-medium text-base md:text-lg text-ellipsis line-clamp-1 text-black'>{product?.productName}</h2>
                          <p className=' capitalize text-slate-500'>{product?.category}</p>
                          <div className=' flex gap-3'>
                              <p className=' text-red-600 font-medium'>{disPlayINRCurrency(product?.sellingPrice)}</p>
                              <p className=' text-slate-500 line-through'>{disPlayINRCurrency(product?.price)}</p>
                          </div>
                          <button className=' text-sm bg-red-600 hover:bg-red-700 text-white px-3 py-0.5 rounded-full' onClick={(e)=>handleAddToCart(e,product?._id)}>Thêm vào giỏ hàng</button>
                      </div>
                  </Link>
              )
          })
          )
            
        }
    </div>
  )
}

export default SearchVerticalCard
