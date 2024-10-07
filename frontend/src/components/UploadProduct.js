import React, { useState } from 'react'
import { FaWindowClose } from "react-icons/fa";
import productCategory from '../helpers/productCatagory';
import { FaUpload } from "react-icons/fa";
import uploadImage from '../helpers/uploadImages';
import DisplayImage from './DisplayImage';
import { FaDeleteLeft } from "react-icons/fa6";
import { Form } from 'react-router-dom';
import SummaryApi from '../common';
import { toast } from "react-toastify";

const UploadProduct = ({
    onClose,
    fetchData
  }) => {
    const [data,setData] = useState({
      productName: "",
      brandName :"",
      category : "",
      productImage : [],
      decription : "",
      price : "",
      sellingPrice : "",
    })
    const [openfullScreenImage,setOpenFullScreenImage] = useState(false)
    const [fullScreenImage,setFullScreenImage] = useState("")
    const handleOnChange = (e)=>{
      const {name,value} = e.target
      setData((preve)=>{
        return {
          ...preve,
          [name] : value
        }
      })  
    }
    const handleUploadProduct = async (e)=>{

      const file = e.target.files[0]
      const uploadProductCloudinary = await uploadImage(file)

      setData((preve)=>{
        return {
          ...preve,
          productImage :[...preve.productImage,uploadProductCloudinary.url]
        }
      })  
    }
    const handleDeleteProductImage = async function (index) {
      const newProductImage = [...data.productImage]
      newProductImage.splice(index,1)

      setData((preve)=>{
        return{
          ...preve,
          productImage : [newProductImage]
        }
      })
    }

    {/** upload product */}

    const handleSubmit = async (e) => {
      e.preventDefault()
      const responce = await fetch(SummaryApi.upload_product.url,{
        method: SummaryApi.upload_product.method,
        credentials:'include',
        headers:{
          'content-type' : 'application/json'
        },
        body: JSON.stringify(data)

      })
      const dataResponce = await responce.json()

      if(dataResponce.success){
        toast.success(dataResponce?.message)
        onClose()
        fetchData()
      }
      else{
        if(dataResponce.error);
        {
          toast.error(dataResponce.message)
        }
    }
      
    }
  return (
    <div className=' fixed w-full h-full bg-slate-200 bg-opacity-50 top-0 right-0 bottom-0 left-0 flex justify-center items-center'>
       <div className=' bg-white p-4 rounded w-full max-w-2xl h-full max-h-[80%] overflow-hidden'>
          <div className=' flex justify-center items-center pb-3'>
              <h2 className=' font-bold text-lg'>Thêm sản phẩm</h2>
              <div className=' w-fit ml-auto text-2xl hover:text-red-600 cursor-pointer' onClick={onClose}>
                  <FaWindowClose />
              </div>
          </div>

          <form className=" grid p-4 gap-2 overflow-y-scroll h-full pb-5" onSubmit={handleSubmit} >
            <label htmlFor='productName'>Tên sản phẩm: </label>
            <input
              type='text' 
              id='productName'
              name='productName'
              placeholder='Nhập tên sản phẩm' 
              value={data.productName} 
              onChange={handleOnChange}
              className=' p-2 bg-slate-100 border rounded'
              required 
              ></input>
              
            <label htmlFor='brandName' className=' mt-3'>Tên thương hiệu: </label>
            <input
              type='text' 
              id='brandName'
              name='brandName'
              placeholder='Nhập tên thương hiệu' 
              value={data.brandName} 
              onChange={handleOnChange}
              className=' p-2 bg-slate-100 border rounded'
              required
              ></input>


            <label htmlFor='category' className=' mt-3'>Tên loại: </label>
            <select required value={data.category} name='category' onChange={handleOnChange} className=' p-2 bg-slate-100 border rounded'>
            <option value="" >chọn loại</option>

              {
                productCategory.map((category,index) =>{
                      return (
                        <option value={category.value} key={category.value + index} >{category.lable}</option>
                      )
                })
              }
            </select>
            <label htmlFor='productImage' className=' mt-3'>Hình ảnh: </label>
            <label htmlFor='uploadImageInput'>
                <div className='p-2 bg-slate-100 border rounded h-32 w-full flex justify-center items-center cursor-pointer'>
                      <div className=' text-slate-500 flex justify-center items-center flex-col gap-2'>
                        <span className='text-4xl'><FaUpload /></span>
                        <p className='text-sm'>Tải ảnh lên</p>
                        <input type='file' id='uploadImageInput' className=' hidden' onChange={handleUploadProduct}></input>
                      </div>
                </div>
            </label>
            <div>
              {
                data?.productImage[0] ? (
                  <div className=' flex items-center gap-2'>
                    {
                      data.productImage.map((img,index) => {
                        return(
                          <div className=' relative group'>
                               <img 
                                  src={img} 
                                  alt={img}
                                  width={80} 
                                  height={80} 
                                  className=' bg-slate-100 border cursor-pointer' 
                                  onClick={()=>{
                                    setOpenFullScreenImage(true)
                                    setFullScreenImage(img)
                                }}></img>
                                <div className=' absolute bottom-0 right-0 p-1 text-white bg-red-600 rounded-full hidden group-hover:block cursor-pointer' onClick={()=>handleDeleteProductImage(index)}>
                                  <FaDeleteLeft />
                                </div>
                          </div>
                         
                        )
                      })
                    }
                  </div>
                ) :(
                  <p className='text-red-500 text-xs'>* vui lòng đăng ảnh</p>
                )
              }
              
            </div>
            <label htmlFor='price' className=' mt-3'>Giá cả: </label>
            <input
              type='number' 
              id='price'
              name='price'
              placeholder='Nhập giá cả' 
              value={data.price} 
              onChange={handleOnChange}
              className=' p-2 bg-slate-100 border rounded'
              required
              ></input>

            <label htmlFor='sellingPrice' className=' mt-3'>Giảm giá: </label>
            <input
              type='number' 
              id='sellingPrice'
              name='sellingPrice'
              placeholder='Nhập giảm giá' 
              value={data.sellingPrice} 
              onChange={handleOnChange}
              className=' p-2 bg-slate-100 border rounded'
              required
              ></input>

            <label htmlFor='decription' className=' mt-3'>Mô tả sản phẩm: </label>
            <textarea 
              className=' h-28 bg-slate-100 border resize-none p-1' 
              placeholder='nhập mô tả sản phẩm' 
              rows={3} onChange={handleOnChange} 
              name='decription'
              value={data.decription}
              >
            </textarea>

              

            <button className=' px-3 py-2 bg-red-600 text-white mb-10 hover:bg-red-800'>Thêm sản phẩm</button>
          </form>

              
       </div>

              

       {/** display img fullscreen */}
       {
        openfullScreenImage && (
          <DisplayImage onClose={()=>setOpenFullScreenImage(false)} imgUrl={fullScreenImage}></DisplayImage>

        )
       }
       
    </div>
  )
}

export default UploadProduct
