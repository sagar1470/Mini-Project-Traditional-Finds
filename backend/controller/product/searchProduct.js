import productModel from "../../models/productModel.js";

const SearchProduct = async (req, res) => { 
    try {
         
        const query = req.query.q

        const regex = new RegExp(query, 'i', 'g')

        const product = await productModel.find({
            "$or": [
                { productName: regex },
                { productDescription: regex },
                { productCategory: regex },
                { sellerName: regex },
                { shopName: regex },
            ]
        })
        res.status(200).json({
            success: true,
            message: "Product fetched successfully",
            data: product,
            error: false,
        })
    } catch (err) {
        res.status(500).json({
            success: false,
            message: err.message || err,
            error: true,
        })
    }
}
export default SearchProduct;
