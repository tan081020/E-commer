const express = require('express')

const router = express.Router()

const userSignUpController = require('../controller/user/userSignUp')
const userSignInController = require('../controller/user/userSignIn')
const userDetailController = require('../controller/user/userDetailController')
const authToken = require('../middleware/authToken')
const userLogoutController = require('../controller/user/userLogoutContonller')
const allUsersController = require('../controller/user/allUsersController')
const updateUsersController = require('../controller/user/updataUsersController')
const upLoadProductController = require('../controller/product/upLoadProductController')
const getProductController = require('../controller/product/getProductController')
const updataProductController = require('../controller/product/updataProductController')
const getCategoryProductController = require('../controller/product/getCategoryProductOneController')
const getCategoryWiseProductController = require('../controller/product/getCategoryWiseProductController')
const getProductDetailController = require('../controller/product/getProductDetailController')



router.post("/signup",userSignUpController)
router.post("/signin",userSignInController)
router.get("/user-details",authToken,userDetailController)
router.get("/userlogout",userLogoutController)

// admin panel
router.get("/all-users",authToken,allUsersController)
router.post("/update-user",authToken,updateUsersController)

// product
router.post("/upload-product",authToken,upLoadProductController)
router.get("/get-product",getProductController)
router.post("/updata-product",authToken,updataProductController)
router.get("/get-categoryproduct",getCategoryProductController)
router.post("/category-product",getCategoryWiseProductController)
router.post("/product_details",getProductDetailController)











module.exports = router