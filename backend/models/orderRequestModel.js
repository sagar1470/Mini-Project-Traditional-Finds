import mongoose from "mongoose"

const orderRequestSchema = new mongoose.Schema({
    BuyerName:{
      type: String
    },

    BuyerEmail: {
        type: String
    },

    userId: {
      type: String
    },

    address: {
      type: String
    },

    orderQty: {
      type: Number
    },
    
    TotalPrice: {
      type: Number
    },
    
    phone_no: {
       type: Number
    },

    BuyerCity: {
      type: String,
      default: "",
    },

    orderDetails: {
      type: Array,
      default: []
    }

}, {timestamps: true})

const orderRequestModel = mongoose.model("orderRequest", orderRequestSchema);

export default orderRequestModel 