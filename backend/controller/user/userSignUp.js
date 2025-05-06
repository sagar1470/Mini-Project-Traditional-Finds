import userModel from "../../models/userModel.js";
import bcrypt  from "bcryptjs"

async function userSignUpController(req, res){
    try {
        const {name, password, email } = req.body;

        const user = await userModel.findOne({email});
        if(user){
           throw new Error("User with the same email already exist")
        }
        console.log("req.body", req.body);

        if(!email){
            throw new Error("Please provide email");
        }
        if(!password){
            throw new Error("Please provide password");
        }
        if(!name){
            throw new Error("Please provide name");
        }
        
        const salt = bcrypt.genSaltSync(10);
        const hashPassword = bcrypt.hashSync(password, salt);

        if(!hashPassword){
            throw new Error("Something wrong in generating hashPassword");
        }
        
        const payload = {
            ...req.body,
            role: "GENERAL",
            password: hashPassword
        }
        // const userData = userModel({
        //     name,
        //     email,
        //     password : hashPassword,  
        // })
        const userData = new userModel(payload)
        const saveUser = await userData.save();

        res.status(201).json({
            data : saveUser,
            success : true,
            error : false,
            message: "User created Successfully"
        });
        
    } catch (err) {
        
        res.json({
            message : err.message || err,
            error : true,
            success : false,
        })  
    }
}
export default userSignUpController;

// import userModel from "../../models/userModel.js";
// import bcrypt from "bcryptjs";

// async function userSignUpController(req, res) {
//     try {
//         const { name, password, email } = req.body;

//         // Basic validations
//         const nameRegex = /^[A-Za-z\s]+$/;
//         const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

//         if (!email) {
//             throw new Error("Please provide email");
//         }
//         if (!emailRegex.test(email)) {
//             throw new Error("Invalid email format");
//         }
//         if (!password) {
//             throw new Error("Please provide password");
//         }
//         if (!name) {
//             throw new Error("Please provide name");
//         }
//         if (!nameRegex.test(name)) {
//             throw new Error("Name must only contain alphabets and spaces");
//         }

//         const user = await userModel.findOne({ email });
//         if (user) {
//             throw new Error("User with the same email already exists");
//         }

//         console.log("req.body", req.body);

//         const salt = bcrypt.genSaltSync(10);
//         const hashPassword = bcrypt.hashSync(password, salt);

//         if (!hashPassword) {
//             throw new Error("Something went wrong in generating hashPassword");
//         }

//         const payload = {
//             ...req.body,
//             role: "GENERAL",
//             password: hashPassword
//         };

//         const userData = new userModel(payload);
//         const saveUser = await userData.save();

//         res.status(201).json({
//             data: saveUser,
//             success: true,
//             error: false,
//             message: "User created Successfully"
//         });

//     } catch (err) {
//         res.json({
//             message: err.message || err,
//             error: true,
//             success: false,
//         });
//     }
// }

// export default userSignUpController;