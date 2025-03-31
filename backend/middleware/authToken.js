import jwt from "jsonwebtoken";


async function authToken(req, res, next){
    try {
        const token = req.cookies?.token
        console.log("token", token)

        if(!token){
            return res.status(200).json({
                message: "user is not logged in",
                error: true,
                success: false,
            })
        }

        jwt.verify(token, process.env.TOKEN_SECRET_KEY, function(err, decoded){
            console.log("err", err);
            console.log("decoded", decoded);

            if(err){
                console.log("error auth", err)
            }

            req.userId = decoded?.id

            next()
        })

    } catch (err) {
        res.status(400).json({
            message: err.message || err,
            error: true,
            success: false,
            data: [],
        })
    }
}
export default authToken;