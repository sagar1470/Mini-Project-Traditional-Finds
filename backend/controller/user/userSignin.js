import userModel from "../../models/userModel.js";
import bcrypt from "bcryptjs/dist/bcrypt.js";
import jwt from "jsonwebtoken";
async function userSignInController(req, res) {
    try {

        const { email, password } = req.body;

        if (!email) {
            throw new Error("Please provide email");
        }
        if (!password) {
            throw new Error("Please provide password");
        }

        const user = await userModel.findOne({ email });
        if (!user) {
            throw new Error("User not found");
        }

        const checkPassword = await bcrypt.compare(password, user.password);

        if (checkPassword) {
            const tokenData = {
                id: user._id,
                username: user.name,
                email: user.email,
            }

            const token = await jwt.sign(tokenData, process.env.TOKEN_SECRET_KEY,
                { expiresIn: "1d" });

            const tokenOption = {
                httpOnly: true,
                secure: true
            }

            res.cookie("token", token, tokenOption).json({
                data: token,
                success: true,
                error: false,
                message: "Login Successfully"
            });
        }
        else {
            throw new Error("Provided password is incorrect");
             }

    } catch (err) {
        res.json({
            message: err.message || err,
            error: true,
            success: false,
        })
    }
}

export default userSignInController;