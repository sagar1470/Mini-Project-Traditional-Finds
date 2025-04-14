import userModel from "../../models/userModel.js"

async  function allUser(req, res){
    try {
         console.log("userId", req.userId);
        
         const allUser = await userModel.find();

         res.status(200).json({
            message: "All user",
            data: allUser,
            success : true,
            error : false,
         })

    } catch (err) {
        res.status(400).json({
            message : err.message || err,
            error: true,
            success : false,
        })
    }
}

export default allUser;