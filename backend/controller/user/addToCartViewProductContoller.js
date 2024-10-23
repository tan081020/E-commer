const addToCartModel = require("../../models/cartProduct")

const addToCartViewProductContoller = async (req,res) => {
    try {
        const currentUers = req.userId

        const allProduct = await addToCartModel.find({ userId : currentUers }).populate("productId")
        
        res.json({
            data: allProduct,
            message: "ok",
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
module.exports = addToCartViewProductContoller