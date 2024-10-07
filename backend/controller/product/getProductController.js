const productModel = require("../../models/productModel")


async function getProductController(req,res) {
    try {
        const getProduct = await productModel.find().sort({createAt:-1})

        res.json({
            message: 'lấy tất cả sản phẩm thành công',
            success: true,
            error: false,
            data:getProduct
        })
        
    } catch (error) {
        res.status(400).json({
            message: error.message || error,
            error: true,
            success: false,
        })
    }
}

module.exports = getProductController