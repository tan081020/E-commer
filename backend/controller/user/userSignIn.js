const bcrypt = require('bcrypt');
const userModel = require('../../models/userModel');
const jwt = require('jsonwebtoken');

async function userSignInController(req,res) {
    try {
        const {email,password} = req.body

        if(!email){
            throw new Error("Vui lòng nhập email");
        }
        if(!password){
            throw new Error("Vui lòng nhập mật khẩu");
        }
        
        
        const user = await userModel.findOne({email})

        console.log(user);
        
        if(!user){
            throw new Error("Email không chính xác");
        }


        const checkPassword = bcrypt.compareSync(password, user.password); // true

        console.log("checkPassword",checkPassword);
 
        if(checkPassword){
            const tokenData ={
                _id : user._id,
                email : user.email
            }
            // goi token duy tri dang nhap
            const token = await jwt.sign(tokenData, process.env.TOKEN_SECRET_KEY, { expiresIn: 60 * 60 * 8 });

            const tokenOption ={
                httpOnly : true,
                secure : true
            }

            res.cookie("token",token,tokenOption).json({
                
                message:"đăng nhập thành công",
                data : token,
                success:true,
                error:false,
            })

        }else{
            throw new Error("sai mật khẩu, vui lòng kiểm tra lại");
            
        
        }
    


    } 
    catch (error) {
        res.json({
            message: error.message || error,
            error: true,
            success: false,
        })
    }
}
module.exports = userSignInController
