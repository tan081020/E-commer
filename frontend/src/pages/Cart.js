import React, { useContext, useEffect, useState } from 'react'
import SummaryApi from '../common'
import Context from '../context'
import disPlayINRCurrency from '../helpers/DisplayCurrency'
import { toast } from "react-toastify";
import { MdDeleteForever } from "react-icons/md";

const Cart = () => {
  const[data,setData]= useState([])
  const[loading,setLoading] = useState(false)
  const context = useContext(Context)
  const loadingCart = new Array(context.cartProductCount).fill(null)

  const fetchData = async () => {
    setLoading(true)
    const responce = await fetch(SummaryApi.addtocartviewproduct.url,{
      method: SummaryApi.addtocartviewproduct.method,
      credentials:"include",
      headers:{
        "content-type" : "application/json"
      },
    })
    setLoading(false)
    const responceData = await responce.json()
    console.log("responceData",responceData);
    
    if (responceData.success) {
      setData(responceData.data)
    }
  }
  useEffect(()=>{
    fetchData()
  },[])

  const increaseQty = async(id,qty)=>{
    
      const responce = await fetch(SummaryApi.updateaddtocart.url,{
        method: SummaryApi.updateaddtocart.method,
        credentials:"include",
        headers:{
          "content-type" : "application/json"
        },
        body : JSON.stringify({
          _id :id,
          quantity: qty + 1
        })
      })
      const dataResponce = await responce.json()

      if(dataResponce.success){
        fetchData()
      }
    
   
  }
  const decraseQty = async(id,qty)=>{
    if(qty >= 2){
    const responce = await fetch(SummaryApi.updateaddtocart.url,{
      method: SummaryApi.updateaddtocart.method,
      credentials:"include",
      headers:{
        "content-type" : "application/json"
      },
      body : JSON.stringify({
        _id :id,
        quantity: qty - 1
      })
    })
    const dataResponce = await responce.json()

    if(dataResponce.success){
      fetchData()
    }
  }
  else{
    toast.error("ko the giam")
  }
    
  
}
const DeleteProduct = async (id)=>{
  const responce = await fetch(SummaryApi.deleteaddtocart.url,{
    method: SummaryApi.deleteaddtocart.method,
    credentials:"include",
    headers:{
      "content-type": "application/json"
    },
    body:JSON.stringify({
      _id:id,
    })
  })
  const dataResponce = await responce.json()  

  if(dataResponce.success){
    fetchData()
    context.fetchUserAddToCart()
  }
  
}

const totalQly = data.reduce((qly,product)=>{
  const quantity = product.quantity
  return  qly + quantity
},0)

console.log("data",data);

const totalPrice = data.reduce((price,product)=>{
  const sellPrice = product?.productId?.sellingPrice * product.quantity
  return  price + sellPrice
},0)



  return (
    <div className=' container mx-auto'>
      <div className=' text-center text-lg my-3'>
        {
          data.length === 0 && !loading && (
            <p className=' bg-white py-5'>nodata</p>
          )
        }
      </div>
      <div className=' flex flex-col lg:flex-row gap-10 lg:justify-between p-4'>
        {/** vieu prduct */}
          <div className=' w-full max-w-3xl'> 
          {
            loading ? (
              loadingCart.map((el,index)=>{
                return(
                  <div key={el+'add cart'} className='w-full bg-slate-200 h-32 my-1 border border-slate-300 animate-pulse rounded'></div>
                )
              })
            ):(
                data.map((product,index)=>{
                  return(
                    <div key={product?._id+'add cart'} className='w-full bg-white h-32 my-1 border border-slate-300 rounded grid grid-cols-[128px,1fr]'>
                      <div className=' w-32 h-32 bg-slate-200'>
                            <img src={product?.productId?.productImage[0]} className=' w-full h-full object-scale-down mix-blend-multiply'></img>
                      </div>
                      <div className=' px-4 py-2 relative'>
                        {/** xoa san pham */}
                          <div onClick={()=>DeleteProduct(product?._id)} className='text-xl absolute right-0 text-red-600 rounded-full p-2 hover:bg-red-600 hover:text-white cursor-pointer'>
                                <MdDeleteForever />
                          </div>
                          <h2 className=' text-lg lg:text-xl text-ellipsis line-clamp-1'>{product?.productId?.productName}</h2>
                          <p className=' capitalize text-slate-500'>{product?.productId?.category}</p>
                          <div className=' flex items-center justify-between'>
                              <p className=' text-red-600 font-medium text-lg'>{disPlayINRCurrency(product?.productId?.sellingPrice)}</p>
                              <p className=' text-slate-600 font-semibold text-lg'>{disPlayINRCurrency(product?.productId?.sellingPrice * product.quantity)}</p>
                          </div>
                          <div className=' flex items-center gap-3 mt-2'>
                              <button className=' p-1 border border-red-600 text-red-600 w-6 h-6 flex justify-center items-center rounded hover:bg-red-600 hover:text-white' onClick={()=>decraseQty(product?._id,product?.quantity)}>-</button>
                              <span>{product?.quantity}</span>
                              <button className=' p-1 border border-red-600 text-red-600 w-6 h-6 flex justify-center items-center rounded hover:bg-red-600 hover:text-white' onClick={()=>increaseQty(product?._id,product?.quantity)}>+</button>
                          </div>
                      </div>
                    </div>
                  )
                })
            )
          }
          </div>

        {/** tong san pham */}
        <div className=' mt-5 lg:mt-0 w-full max-w-sm'>
          {
            loading ?(
              <div  className=' h-36 bg-slate-200 border-slate-300 animate-pulse'>

              </div>
            ):(
              <div className=' h-36 bg-slate-200'>
                  <h2 className=' text-white bg-red-600 px-4 py-1'>Tổng tiền</h2>
                  <div className=' flex items-center justify-between px-4 gap-2 font-medium text-lg text-slate-600'>
                    <p>Số lượng</p>
                    <p>{totalQly}</p>
                  </div>
                  <div className=' flex items-center justify-between px-4 gap-2 font-medium text-lg text-slate-600'>
                    <p>Tổng tiền</p>
                    <p>{disPlayINRCurrency(totalPrice)}</p>
                  </div>
                  <button className=' bg-blue-600 p-4 text-white w-full'>Thanh toán</button>
              </div>
            )
          }
        </div>

      </div>
      
     
    </div>

  )
}

export default Cart
