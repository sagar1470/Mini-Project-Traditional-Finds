import userModel from "../../models/userModel.js";

async function userDetailsController(req, res){
    try {
        
        const user = await userModel.findById(req.userId)

        res.status(200).json({
            data : user,
            error: false,
            success : true,
            message: "user details"
        })

       


    } catch (err) {
        res.status(500).json({
            message : err.message || err,
            error: true,
            success : false,
        })
        
    }
}

export default userDetailsController;