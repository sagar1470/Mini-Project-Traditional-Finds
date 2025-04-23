import productModel from "../../models/productModel.js";


const getCategoryProduct = async(req, res)=>{
    try {
        const productCategory = await productModel.distinct("category")

        console.log("category", productCategory);
        
        // array to store one product from each category
        const productByCategory = []

        for(const category of productCategory){
            const product = await productModel.findOne({category})

            if(product){
                productByCategory.push(product)
            }
        }

        res.status(201).json({
            message : "category product",
            success : true,
            error : false,
            data : productByCategory,
        })

    } catch (err) {
        res.status(400).json({
            message : err.message || err,
            error : true,
            success : false
        })
    }
}
export default getCategoryProduct;