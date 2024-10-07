const uploadProductPermission = require("../../helpers/permission");
const productModel = require("../../models/productModel");

async function updataProductController(req,res) {
    try {
        if(!uploadProductPermission(req.userId)){
            throw new Error("bạn ko có quyền thêm sản phẩm"); 
        }
        const {_id, ...resBody} = req.body
        
        const updataProduct = await productModel.findByIdAndUpdate(_id,resBody)

        res.json({
            message: 'chỉnh sửa sản phẩm thành công',
            data:updataProduct, 
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

module.exports = updataProductController




