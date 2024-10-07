
const userModel = require('../../models/userModel')
const bcrypt = require('bcrypt');




async function userSignUpController(req,res) {
    try {
        const {email,password,name} = req.body

        const user = await userModel.findOne({email})
        
        if(user){
            throw new Error("email đã tồn tại");
            
        }

        if(!email){
            throw new Error("Vui lòng nhập email");
        }
        if(!password){
            throw new Error("Vui lòng nhập mật khẩu");
        }
        if(!name){
            throw new Error("Vui lòng nhập tên");
        }

        const salt = bcrypt.genSaltSync(10);
        const passwordHard = bcrypt.hashSync(password, salt);

        if(!passwordHard){
            throw new Error("mật khẩu chưa đủ mạnh");
        }

        const payLoad ={
            ...req.body,
            role:"GENERAL",
            password:passwordHard,
        }


        const userData = new userModel(payLoad)
        const saveUser = await userData.save()

        res.status(201).json({
            data:saveUser,
            message:"tạo tài khoản thành công",
            error:false,
            success:true,
        })
 
        
    } catch (error) {
        res.json({
            message: error.message || error,
            error: true,
            success: false,
        })
    }
}

module.exports = userSignUpController