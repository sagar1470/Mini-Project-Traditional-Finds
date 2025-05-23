import mongoose from "mongoose";


const orderSchema = new mongoose.Schema({
    productDetails : {
        type : Array,
        default : []
    },
    email : {
        type : String,
        default : ""
    },
    userId : {
        type : String,
        default : ""
    },
    customerName : {
        type : String,
        default : ""
    },
    paymentDetails : {
        paymentId : {
            type : String,
            default : ""
        },
        payment_method_type : [],
        payment_status : {
            type : String,
            default : ""
        }
    },
    shipping_options : [],
    totalAmount : {
        type : Number,
        default : 0
    }
},{
    timestamps : true
})

const orderProductModel = mongoose.model('order',orderSchema)

export default orderProductModel;