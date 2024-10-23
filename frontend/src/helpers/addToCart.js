import SummaryApi from "../common"
import {toast} from "react-toastify"
 
const addToCart = async (e,id)=>{
    e?.stopPropagation()
    e.preventDefault()
    const responese = await fetch(SummaryApi.addtocartproduct.url,{
        method : SummaryApi.addtocartproduct.method,
        credentials: 'include',
        headers : {
            "content-type" : "application/json"
        },
        body : JSON.stringify({productId:id})
    })

    const dataResponese = await responese.json()

    if(dataResponese.success){
        toast.success(dataResponese.message)
    }
    else{
        if(dataResponese.error){
            toast.error(dataResponese.message)
        } 
        return dataResponese
    }
    

}

export default addToCart 