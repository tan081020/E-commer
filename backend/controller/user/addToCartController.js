const addToCartModel = require("../../models/cartProduct")

const addToCartController = async (req,res) => {
    try {
        const {productId} = req?.body
        const currentUser = req.userId

        const isProductAvariable = await addToCartModel.findOne({ productId })

        console.log("isProductAvariable",isProductAvariable);
        
        if(isProductAvariable){
            res.json({
                message: 'san pham da ton tai trong gio hang',
                success : false,
                error: true,
            })
        }      
        else{

            const payload = {
                    productId : productId,
                    quantity : 1,
                    userId : currentUser
        
                } 
        
                const newAddToCart = new addToCartModel(payload)
    
              
                
    
                const saveproduct = await newAddToCart.save()
        
                
                res.json({
                    data: saveproduct,
                    message : 'them san pham thanh cong',
                    success: true,
                    error: false,
                })
        }
        

 
    } catch (error) {
        res.status(400).json({
            message: error.message || error,
            error: true,
            success: false,
        }) 
    } 
}
module.exports = addToCartController
 