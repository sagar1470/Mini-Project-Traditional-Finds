async function userLogout(req, res){
    try {
        res.clearCookie("token");

        res.status(200).json({
            data : [],
            error: false,
            success : true,
            message: "user is logged out Successfully"
        })
    } catch (err) {
        res.status(400).json({
            message: err.message || err,
            error: true,
            success: false,
        }) 
    }
}

export default userLogout;