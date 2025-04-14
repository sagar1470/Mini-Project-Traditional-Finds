import uploadProductPermission from "../../helper/permission.js"
import productModel from "../../models/productModel.js"

async function updateProductController(req, res){
    try {

        if(!uploadProductPermission(req.userId))
            {
                throw new Error("Permission denied!")
            }
        
        const { _id, ...resBody } = req.body
        
        const updateProduct  = await productModel.findByIdAndUpdate(_id, resBody)

        res.status(201).json({
            message : "Product Update Successfully",
            success : true,
            error: false,
            data : updateProduct
        })

        
    } catch (err) {
        res.status(400).json({
            message : err.message || err,
            error : true,
            success : false
        })
        
    }
}

export default updateProductController
