const addToCartModel = require("../../models/cartProduct")

const deleteAddToCart = async (req,res) => {
    try {
       const currentUserId = req.userId
       const addToCartProductId = req?.body?._id
       
       const deleteProduct = await addToCartModel.deleteOne({_id:addToCartProductId})

       res.json({
        data:deleteProduct,
        message:"xoa thanh cong",
        success: true,
        error: false,
       })

    } catch (error) {
        res.status(400).json({
            message: error.message || error,
            error: true,
            success: false,
        }) 
    } 
}
module.exports = deleteAddToCart