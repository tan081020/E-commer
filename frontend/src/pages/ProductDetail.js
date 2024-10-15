import React, { useCallback, useEffect, useState } from 'react'
import { useParams } from "react-router-dom";
import SummaryApi from '../common'
import { FaStar } from "react-icons/fa";
import { FaStarHalf } from "react-icons/fa";
import disPlayINRCurrency from '../helpers/DisplayCurrency';
import VerticalCardProduct from '../components/VerticalCardProduct';
const ProductDetail = () => {
    const [data,setData] = useState({
      productName: "",
      brandName :"",
      category : "",
      productImage : [],
      decription : "",
      price : "",
      sellingPrice : "",
    })
    const params = useParams()

    const [loading,setLoading] = useState(true)
    const productImageList = new Array(4).fill(null)
    const [activeImage,setActiveImage] = useState("")

    const[zoomImageCoordinate,setZoomImageCoordinate]= useState({
      x:0,
      y:0,
    })

    const[zoomTmage,setzoomTmage] = useState(false)

    const fetchProductDetail = async () => {
      setLoading(true)
      const response = await fetch(SummaryApi.product_details.url,{
        method: SummaryApi.product_details.method,
        headers :{
          "content-type" : "application/json"
        },
        body : JSON.stringify({
          productId : params?.id
        })
      })
      setLoading(false)
      const dataResponce = await response.json()
     
      setData(dataResponce?.data)
      setActiveImage(dataResponce?.data?.productImage[0])
    }
    useEffect(()=>{
      fetchProductDetail()
    },[])

    const handleMouseEnterProduct = (imageUrl) =>{
      setActiveImage(imageUrl)

    }
    const handleZoomImage = useCallback( (e)=>{
      setzoomTmage(true)
      const {left,top,width,height} = e.target.getBoundingClientRect()
      const x =(e.clientX - left)/width
      const y = (e.clientY - top)/height
      setZoomImageCoordinate({
        x,
        y
      })
      
    },[zoomImageCoordinate])
    const handleLeaveZoomImage = ()=>{
      setzoomTmage(false)
    }
  return (
    <div className=' container mx-auto p-4'>

      <div className=' min-h-[200px] flex flex-col lg:flex-row gap-4'>
        {/** product imgae */}
        <div className=' h-96 flex flex-col lg:flex-row-reverse gap-4'>

          <div className=' h-[300px] w-[300px] lg:h-96 lg:w-96 bg-slate-200 relative'>
            <img src={activeImage} className=' h-full w-full object-scale-down mix-blend-multiply' onMouseMove={handleZoomImage} onMouseLeave={handleLeaveZoomImage}></img>

              {/** product zoom */}
              {
                zoomTmage && (
                  <div className=' hidden lg:block absolute min-w-[500px] overflow-hidden min-h-[400px] bg-slate-300 p-1 -right-[510px] top-0'>
                    <div
                      className='min-w-[500px] min-h-[400px] w-full h-full  mix-blend-multiply scale-150'
                      style={{
                        backgroundImage :`url(${activeImage})`,
                        backgroundRepeat: `no-repeat`,
                        backgroundPosition:`${zoomImageCoordinate.x*100}%${zoomImageCoordinate.y*100}%`
      
                      }}
                    >
                    </div>
                </div>
                )
              }
         
          </div>

          <div className=' h-full'>
            {
              loading ?(
                <div className=' flex gap-2 lg:flex-col overflow-scroll scrollbar-none h-full'>
                  {
                    productImageList.map((el,index)=>{
                      return(
                        <div className=' h-20 w-20 bg-slate-200 rounded animate-pulse' key={"loading image"}>
                        </div>
                      )
                    })
                  }
                </div>

              ):(
                <div className=' flex gap-2 lg:flex-col overflow-scroll scrollbar-none h-full'>
                  {
                    data?.productImage?.map((imageUrl,index)=>{
                      return(
                        <div className=' h-20 w-20 bg-slate-200 rounded p-1' key={imageUrl}>
                          <img src={imageUrl} className=' w-full h-full object-scale-down mix-blend-multiply cursor-pointer' onMouseEnter={()=>handleMouseEnterProduct(imageUrl)} onClick={()=>handleMouseEnterProduct(imageUrl)}></img>

                        </div>
                      )
                    })
                  }
                </div>
              )
            }
          </div>
        </div>
        {/** product details */}
       {
        loading ?(
          <div className=' grid gap-1 w-full'>
              <p className=' bg-slate-200 animate-pulse h-6 lg:h-8 w-full rounded-full inline-block'></p>
              <h2 className=' font-medium text-2xl lg:text-4xl h-6 lg:h-8 bg-slate-200 animate-pulse'></h2>
              <p className=' capitalize text-slate-400 bg-slate-200 min-w-[100px] animate-pulse h-6 lg:h-8'></p>

              <div className=' text-red-600 bg-slate-200 h-6 lg:h-8 animate-pulse flex items-center gap-1 w-full'>
              
              </div>
              <div className=' flex items-center gap-2 text-2xl lg:text-3xl font-medium my-1 h-6 lg:h-8 animate-pulse w-full'>
                <p className='text-red-600 bg-slate-200 w-full'></p>
                <p className=' text-slate-400 line-through bg-slate-200 w-full'></p>
              </div>
              <div className='flex items-center gap-3 my-2 w-full'>
                <button className=' h-6 lg:h-8 bg-slate-200 rounded animate-pulse w-full'></button>
                <button className=' h-6 lg:h-8 bg-slate-200 rounded animate-pulse w-full'></button>
              </div>
              <div className='w-full'>
                <p className=' text-slate-600 font-medium my-1 h-6 lg:h-8 bg-slate-200 rounded animate-pulse w-full'></p>
                <p className=' h-10 bg-slate-200 rounded animate-pulse lg:h-12 '></p>
              </div>
          </div>
        ):(
          <div className=' flex flex-col gap-1'>
          <p className=' bg-red-200 text-red-600 px-2 rounded-full inline-block w-fit'>{data?.brandName}</p>
          <h2 className=' font-medium text-2xl lg:text-4xl'>{data?.productName}</h2>
          <p className=' capitalize text-slate-400'>{data?.category}</p>
          <div className=' text-red-600 flex items-center gap-1'>
            <FaStar />
            <FaStar />
            <FaStar />
            <FaStar />
            <FaStarHalf />
          </div>
          <div className=' flex items-center gap-2 text-2xl lg:text-3xl font-medium my-1'>
            <p className='text-red-600'>{disPlayINRCurrency(data.sellingPrice)}</p>
            <p className=' text-slate-400 line-through'>{disPlayINRCurrency(data.price)}</p>
          </div>
          <div className='flex items-center gap-3 my-2'>
            <button className=' border-2 border-red-600 rounded px-3 py-1 min-w-[120px] text-red-600 font-medium hover:bg-red-600 hover:text-white'>Mua</button>
            <button className=' border-2 border-red-600 rounded px-3 py-1 min-w-[120px] font-medium text-white bg-red-600 hover:text-red-600 hover:bg-white'>Thêm vào giỏ hàng</button>
          </div>
          <div>
            <p className=' text-slate-600 font-medium my-1'>Mô tả sản phẩm : </p>
            <p>{data.decription}</p>
          </div>
      </div>
        )
       }
      </div>


      <VerticalCardProduct category={data.category} heading={"Sản phẩm gợi ý"}></VerticalCardProduct>

    </div>
  )
}

export default ProductDetail
