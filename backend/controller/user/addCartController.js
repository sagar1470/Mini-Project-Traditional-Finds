import addToCart from "../../models/productCart.js"

const addCartController = async (req,res) =>{
try {
    const { productId } = req?.body
    const currentUser = req?.userId
    
    
    const isProductAvailable = await addToCart.findOne({ productId });
    

    if(isProductAvailable){
        return res.json({
            message: "Already Exits in cart",
            success: false,
            error: true,
        })
    }

    const payload = {
         productId: productId,
         quantity: 1,
         userId: currentUser,
        }

    const addProduct = new addToCart(payload)
    const savedProduct = await addProduct.save()
    
    res.json({
        data: savedProduct,
        message: "Product added to cart",
        success: true,
        error: false,

    })
     
} catch (err) {
    res.status(500).json({
        message : err.message || err,
        error : true,
        success : false,
    })
    
}
}
export default addCartController