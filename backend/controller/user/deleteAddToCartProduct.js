import addToCart from "../../models/productCart.js"

const deleteAddToCartProduct = async (req, res) => {    
    try {
        const currentUserId = req.userId
        const addToCartProductId = req.body._id

        const deleteProduct = await addToCart.deleteOne({ _id: addToCartProductId })

        res.json({
            success: true,
            message: "product deleted successfully",
            data: deleteProduct,
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
export default deleteAddToCartProduct;