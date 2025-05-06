import addToCart from "../../models/productCart.js"

const DisplayingAddedCartProduct = async (req, res)=>{
    try {

        const currentUser = req.userId

        const allProduct = await addToCart.find({
            userId : currentUser
        }).populate("productId")

        res.json({
            data: allProduct,
            success: true,
            error: false,
        })
    } catch (err) {
        res.json({
            messsage : err.message || err,
            error: true,
            success: false
        })
    }
}

export default DisplayingAddedCartProduct