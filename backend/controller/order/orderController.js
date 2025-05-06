import orderProductModel from "../../models/orderProductModel.js"


const orderController = async(req, res)=>{
    try {

        const currentUserId = req?.userId

        const orderList = await orderProductModel.find( {userId : currentUserId} )
        
        res.status(200).json({
            data : orderList,   
            success : true,
            error: false,
            message : "Order List Fetched Successfully"

        })
    } catch (err) {
        res.json({
            message: err.message || err,
            success: false,
            error: true,
        })
        
    }
}
export default orderController