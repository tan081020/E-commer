// const { default: SignUp } = require("../pages/SignUp")

const backendDomin = "http://localhost:8080"

const SummaryApi ={
    signUp :{
        url : `${backendDomin}/api/signup`,
        method : "post"
    },
    signIn :{
        url : `${backendDomin}/api/signin`,
        method : "post"
    },
    current_user :{
        url : `${backendDomin}/api/user-details`,
        method : "get"
    }
    ,logout_user :{
        url : `${backendDomin}/api/userlogout`,
        method : "get"
    },
    all_users :{
        url : `${backendDomin}/api/all-users`,
        method : "get"
    },
    update_user :{
        url : `${backendDomin}/api/update-user`,
        method : "post"
    },
    upload_product :{
        url : `${backendDomin}/api/upload-product`,
        method : "post"
    },
    all_product :{
        url : `${backendDomin}/api/get-product`,
        method : "get"
    },
    updata_product :{
        url : `${backendDomin}/api/updata-product`,
        method : "post"
    },
    category_product :{
        url : `${backendDomin}/api/get-categoryproduct`,
        method : "get"
    },
    category_wise_product :{
        url : `${backendDomin}/api/category-product`,
        method : "post"
    },
    product_details :{
        url : `${backendDomin}/api/product_details`,
        method : "post"
    },
    addtocartproduct :{
        url : `${backendDomin}/api/addtocart`,
        method : "post"
    },
    countaddtocartproduct :{
        url : `${backendDomin}/api/countaddtocart`,
        method : "get"
    },
    addtocartviewproduct :{
        url : `${backendDomin}/api/addtocartviewproduct`,
        method : "get"
    },
    updateaddtocart :{
        url : `${backendDomin}/api/updateaddtocart`,
        method : "post"
    },
    deleteaddtocart :{
        url : `${backendDomin}/api/deleteaddtocart`,
        method : "post"
    },
    searchproduct :{
        url : `${backendDomin}/api/search`,
        method : "get"
    },


}

export default SummaryApi