import  userModel from "../../models/userModel.js"

async function updateUser(req, res){
    try {
        const sessionUser = req.userId

        const {userId, email, name, role}  = req.body

        const payload = {
            ...( email && {email : email}),
            ...(name && {name : name}),
            ...(role && {role : role}),
        }
        

        const user = await userModel.findById(sessionUser)

        console.log("user.role", user.role)


        const updateUsers = await userModel.findByIdAndUpdate(userId, payload)

        res.status(200).json({
            message: "user updated Successfully",
            data: updateUsers,
            success : true,
            error : false
        })


    } catch (err) {
        res.status(400).json({
            message : err.message || err,
            error: true,
            success : false,
        })
    }
}
export default updateUser;