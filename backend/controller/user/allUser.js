import userModel from "../../models/userModel.js"

async  function allUser(req, res){
    try {
     
         const allUser = await userModel.find();

         res.status(200).json({
            message: "All user",
            data: allUser,
            success : true,
            error : false,
         })

    } catch (err) {
        res.status(500).json({
            message : err.message || err,
            error: true,
            success : false,
        })
    }
}

export default allUser;