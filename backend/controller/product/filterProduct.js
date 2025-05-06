const filterProduct = async (req, res) => { 
    try {
         const categoryList = req.body?.category || []

         const product = await productModel.find({
            category : {
                "$in" : categoryList
            }
        })
       
        res.status(200).json({ 
            message: "Product fetched successfully",
            success: true,
            data: product,
            error: false,
         }) 

    }catch (err) {
        res.status(500).json({ 
            message: err.message || err,
            success: false,
            error: err,
         })
        
    }
}
export default filterProduct;