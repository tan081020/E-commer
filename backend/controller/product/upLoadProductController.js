const uploadProductPermission = require("../../helpers/permission")
const productModel = require("../../models/productModel")

async function upLoadProductController(req,res) {
    try {

        const sessionUserID = req.userId

        if(!uploadProductPermission(sessionUserID)){
            throw new Error("bạn ko có quyền thêm sản phẩm"); 
        }

        const uploadProduct = new productModel(req.body)
        const ProductSave = await uploadProduct.save()

        res.status(201).json({
            message: 'Thêm sản phẩm thành công',
            success: true,
            error: false,
            data: ProductSave,
        })
    } catch (error) {
        res.status(400).json({
            message: error.message || error,
            error: true,
            success: false,
        })
    }
}

module.exports = upLoadProductController
