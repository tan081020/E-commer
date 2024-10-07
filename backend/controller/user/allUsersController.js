const userModel = require("../../models/userModel");

async function allUsersController(req,res) {
    try {
        console.log('userId all user',req.userId);
        const allUsers = await userModel.find()


        res.json({
            message : "all user",
            data: allUsers,
            success : true,
            error : false
        })
        
    } catch (error) {
        res.json({
            message: error.message || error,
            error: true,
            success: false,
        })
    }
}
module.exports = allUsersController