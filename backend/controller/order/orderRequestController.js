import orderRequestModel from "../../models/orderRequestModel.js" 

const orderRequestController = async (req, res)=>{
  try {
    
    const currentUser = req.userId;
    
    const { data, orderDetails } = req?.body

    console.log("data", data)
    console.log("data", data.totalQty)
    console.log("data", data.totalPrice)

    const orderRequest = {
        BuyerName : data.name,
        BuyerEmail : data.email,
        userId : currentUser,
        address : data.address,
        orderQty: data.totalQty,
        TotalPrice : data.totalPrice,
        phone_no : data.phone_no,
        BuyerCity : data.city,
        orderDetails : orderDetails
    }

    const order = new orderRequestModel(orderRequest)
    const saveOrderDetails = await order.save()

    
    res.status(200).json({
        message: "Data store successfully",
        success : true,
        error: false,
        data: saveOrderDetails
        
    })
    
  } catch (err) {
   res.status(500).json({
     message: err.message || err,
     success: false,
     error: true,
   }) 
    
  }

}

export default orderRequestController;