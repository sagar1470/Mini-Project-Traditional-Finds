import orderRequestModel from '../../models/orderRequestModel.js'
import userModel from '../../models/userModel.js'

const allOrderRequestController = async (req, res) =>{
    try {

        const currentUser =  req?.userId
    
        const user = await userModel.findById(currentUser)

        if(user.role !== 'ADMIN' && user.role !== 'SELLER'){

            return res.status(500).json({
                message: 'not acess'
            })
        }


        const AllUserOrder = await orderRequestModel.find().sort({ createdAt: -1 }) 

        res.status(200).json({
            message: "All User's Order successfully fetched",
            success: true,
            error: false,
            data: AllUserOrder,
        })

        

    } catch (err) {
        res.status(500).json({
            message: err.message || err,
            success: false,
            error: true
        })
        
    }

}
export default allOrderRequestController;