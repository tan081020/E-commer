import React, { useEffect, useState } from 'react'
import { FaAngleDoubleRight } from "react-icons/fa";
import { FaAngleDoubleLeft } from "react-icons/fa";
import image1  from "../assest/banner/img1.webp";
import image2  from "../assest/banner/img2.webp";
import image3  from "../assest/banner/img3.jpg";
import image4  from "../assest/banner/img4.jpg";
import image5  from "../assest/banner/img5.webp";

import  image1Mobile  from "../assest/banner/img1_mobile.jpg";
import  image2Mobile  from "../assest/banner/img2_mobile.webp";
import  image3Mobile  from "../assest/banner/img3_mobile.jpg";
import  image4Mobile  from "../assest/banner/img4_mobile.jpg";
import  image5Mobile  from "../assest/banner/img5_mobile.png";



const BannerProduct = () => {
    const desktopImage =[
        image1,
        image2,
        image3,
        image4,
        image5,
    ]
    const mobileImage =[
        image1Mobile,
        image2Mobile,
        image3Mobile,
        image4Mobile,
        image5Mobile,
    ]
    const [currentImage , setCurrentImage] = useState(0)
    const nextImage = ()=>{
        if(desktopImage.length - 1 > currentImage){
            setCurrentImage(preve => preve + 1)
        }
       
    }
    const preveImage = ()=>{
        if(desktopImage.length !=0){
            setCurrentImage(preve => preve - 1)
        }
       
    }
    useEffect(()=>{
        const interval = setInterval(()=>{
            if(desktopImage.length - 1 > currentImage){
                nextImage()
            }
            else{
                setCurrentImage(0)
            }
        },5000)
        return ()=> clearInterval(interval)
    },[currentImage])
  return (
   <div className=' container mx-auto px-4 rounded'>
         <div className=' h-56 md:h-72 w-full bg-slate-200 relative'>
            <div className=' absolute z-10 h-full w-full flex items-center '>
                <div className=' flex justify-between w-full text-2xl'>
                    <button onClick={preveImage} className=' bg-white shadow-md rounded-full p-1'><FaAngleDoubleLeft /></button>
                    <button  onClick={nextImage} className=' bg-white shadow-md rounded-full p-1'><FaAngleDoubleRight /></button>
                </div>

            </div>
            {/** desktop and tablet version */}
           <div className=' hidden md:flex w-full h-full overflow-hidden '>
                {
                    desktopImage.map((desk,index)=>{
                    return(
                        <div className=' w-full h-full min-w-full min-h-full transition-all' key={desk} style={{transform: `translateX(-${currentImage*100}%)`}}>
                            <img src={desk} className=' w-full h-full'></img>
                        </div>
                    )
                    })
                }
           </div>

            {/** mobile version */}
            <div className=' flex w-full h-full overflow-hidden md:hidden '>
                {
                    mobileImage.map((desk,index)=>{
                    return(
                        <div className=' w-full h-full min-w-full min-h-full transition-all' key={desk} style={{transform: `translateX(-${currentImage*100}%)`}}>
                            <img src={desk} className=' w-full h-full object-cover'></img>
                        </div>
                    )
                    })
                }
           </div>
           
         </div>
   </div>
  )
}

export default BannerProduct
