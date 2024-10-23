import React, { useContext, useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import SummaryApi from '../common';
import scrollTop from '../helpers/scrollTop';
import disPlayINRCurrency from '../helpers/DisplayCurrency';
import addToCart from '../helpers/addToCart';
import Context from '../context';
import SearchVerticalCard from '../components/SearchVerticalCard';

function SearchProduct() {
    const [data,setData] = useState([])
    const [loading,setLoading] = useState(false)
    const query = useLocation()
    const{fetchUserAddToCart} = useContext(Context)
 

    const fetchProduct = async () => {
        setLoading(true)
        const responce = await fetch(SummaryApi.searchproduct.url + query.search)
        const dataResponce = await responce.json()
        setLoading(false)
        if(dataResponce.success){
            setData(dataResponce.data)
        }
    }
    
    const handleAddToCart = async (e,id) =>{
        await addToCart(e,id)
        fetchUserAddToCart()
    }

    useEffect(()=>{ 
        fetchProduct()
    },[query])    
  return (
    <div className=' container mx-auto p-4'>
      {
       loading && (
        <p className=' text-lg text-center'>dang tai...</p>
       )
      }
      <p className=' text-lg font-semibold my-3'>co {data.length} ket qua tim kem!</p>
      {
        data.length === 0 && !loading &&(
            <p className=' bg-white text-lg text-center p-4'>ko co ket qua tim kiem...</p>

        )
      }
      {
         data.length != 0 && !loading &&(
            <SearchVerticalCard loading={loading} data={data}></SearchVerticalCard>
        )
      }
    </div>
  )
}

export default SearchProduct
