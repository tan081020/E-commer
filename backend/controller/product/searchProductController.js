const productModel = require("../../models/productModel");

const searchProductController = async (req,res) => {
    try {
        const query = req.query.q
    
        const regexp = new RegExp(query,'i','g')
      
        const product = await productModel.find({
            "$or" :[
                {
                    productName : regexp
                },
                {
                    category : regexp
                }
            ]
        })

    
        
        res.json({
            data: product,
            message: "search",
            success: true,
            error: false,
        })
        
    } catch (error) {
        res.json({
            message: error.message || error,
            error: true,
            success: false,
        })
    }
}

module.exports = searchProductController

