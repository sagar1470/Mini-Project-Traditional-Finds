import addToCart from "../../models/productCart.js"


const UpdateAddToCart = async (req, res) => {
    try {
        const currentUser = req.userId
        const addToCartProductId = req?.body?._id

        const qty = req.body.quantity

        const updateCartProduct = await addToCart.updateOne({_id: addToCartProductId}, 
            { 
                ...(qty && {quantity : qty})
            }) 

        res.json({
            success: true,
            message: "quantity increased successfully",
            data: updateCartProduct,
            error: false
        })

    } catch (err) {
        res.status(500).json({
            success: false,
            message: err.message || err,
            error: err.message
        })
        
    }
}
export default UpdateAddToCart;