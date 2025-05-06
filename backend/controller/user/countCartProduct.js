import addToCart from "../../models/productCart.js"

const countCartProduct = async (req, res) => {
    try {
        const userId = req.userId

        const count = await addToCart.countDocuments({ userId : userId})

        res.json({
            data : {
                count : count
            },
            message: "Total cart product count",
            error: false,
            success: true,

        })

    } catch (err) {
        res.json({
            message: err.message || err,
            error: true,
            success: false,
            
        })
        
    }
}

export default countCartProduct