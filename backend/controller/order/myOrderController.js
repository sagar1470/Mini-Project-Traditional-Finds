import orderRequestModel from '../../models/orderRequestModel.js'

const myOrderController = async (req, res) =>{
    try {

        const currentUser =  req?.userId

        const userOrder = await orderRequestModel.find({ userId : currentUser })

        res.status(200).json({
            message: "user's Order successfully fetched",
            success: true,
            error: false,
            data: userOrder,
        })

        

    } catch (err) {
        res.status(500).json({
            message: err.message || err,
            success: false,
            error: true
        })
        
    }

}
export default myOrderController;