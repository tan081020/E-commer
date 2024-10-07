const productModel = require("../../models/productModel")

const getCategoryProductController = async (req,res) => {
    try {
        const productCategory = await productModel.distinct('category')

        const productbycategory = []

        for (const category of productCategory) {
            
            const product = await productModel.findOne({category})

            if (product) {
                productbycategory.push(product)
            }
        }

        res.status(200).json({
            message: 'Loại sản phẩm',
            data:productbycategory,
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

module.exports = getCategoryProductController

