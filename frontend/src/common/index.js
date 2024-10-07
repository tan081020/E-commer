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
    }

}

export default SummaryApi