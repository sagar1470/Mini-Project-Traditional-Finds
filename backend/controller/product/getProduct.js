import productModel from "../../models/productModel.js"

const getProductController = async(req, res)=>{
    try {
        const allProduct = await productModel.find()

        res.status(201).json({
            message : "All Product",
            sucess : true,
            error : false,
            data : allProduct
        })
    } catch (err) {
        res.status(400).json({
            message : err.message || err,
            error : true,
            success : false,
        })
    }
}

export default getProductController;