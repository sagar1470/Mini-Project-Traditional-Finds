import mongoose from 'mongoose'

const productSchema = mongoose.Schema({
    productName: String,
    sellerName: String,
    category: String,
    productImage: [],
    description: String,
    price: Number,
    sellingPrice: Number,
    shopName: String,
},
 {timestamps : true})

const productModel = mongoose.model("Product", productSchema);

export default productModel;