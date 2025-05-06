import mongoose from 'mongoose'

const addToCartSchema = mongoose.Schema({
    productId : {
        ref : 'Product',
        type: String,
    },
    quantity: Number,
    userId : String,
},
{timestamps : true})

const addToCart = mongoose.model("addToCart", addToCartSchema)

export default addToCart;