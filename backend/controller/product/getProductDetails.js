import productModel from "../../models/productModel.js"
const getProductDetails = async (req, res)=>{
    try {
        const { productId } = req.body


        const product = await productModel.findById(productId)
        res.status(201).json({
            data : product,
            message : "success",
            success : true,
            error: false
        })


    } catch (err) {
        res.status(400).json({
            message : err?.message || err,
            error : true,
            success : false
        })
     
    }
}

export default getProductDetails