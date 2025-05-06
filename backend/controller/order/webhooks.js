
import stripe from '../../config/stripe.js';
import orderProductModel from "../../models/orderProductModel.js";

const endpointSecret = 'whsec_94b89a0e4ad2f2dea38d1a87c80a261c1218a2a64555149e82203d0f6b54daa6';


async function getLIneItems(lineItems){
    let ProductItems = []

    if(lineItems?.data?.length){
        for(const item of lineItems.data){
            const product = await stripe.products.retrieve(item.price.product)
            const productId = product.metadata.productId

            const productData = {
                productId : productId,
                name : product.name,
                price : item.price.unit_amount / 100,
                quantity : item.quantity,
                image : product.images
            }
            ProductItems.push(productData)
        }
    }

    return ProductItems
}


 
const webhooks = async (request, response) => {
        const sig = request.headers['stripe-signature'];
    
        const payloadString = JSON.stringify(request.body);
    
        const header = stripe.webhooks.generateTestHeaderString({
            payload: payloadString,
            secret: endpointSecret,
        });
    
        let event;
    
        try {
            event = stripe.webhooks.constructEvent(payloadString, header, endpointSecret);
        } catch (err) {
            response.status(400).send(`Webhook Error: ${err.message}`);
            return;
        }
    
       response.status(200).send();

       // Handle the event
        switch (event.type) {
           case 'checkout.session.completed':
             const session = event.data.object;
            //  console.log("session", session)

             const lineItems = await stripe.checkout.sessions.listLineItems(session.id)
            // console.log("lineItems", lineItems) 

            console.log("totalAmount", session.amount_total)
           console.log("name....", session.metadata.userName);


             const productDetails = await getLIneItems(lineItems)
       
             const orderDetails = {
                productDetails : productDetails,
                email : session.customer_email,
                customerName : session.metadata.userName,
                userId : session.metadata.userId,
                paymentDetails : {
                   paymentId : session.payment_intent,
                   payment_method_type : session.payment_method_types,
                   payment_status : session.payment_status,
               },
               shipping_options : session.shipping_options.map(s => {
                   return{  
                       ...s,
                       shipping_amount : s.shipping_amount / 100
                   }
               }),
            
               totalAmount : session.amount_total / 100
             }
       
           const order = new orderProductModel(orderDetails)
           const saveOrder = await order.save()
       
        //    if(saveOrder?._id){
        //        const deleteCartItem = await addToCartModel.deleteMany({ userId : session.metadata.userId })
        //    }
           break;
       
           // ... handle other event types
           default:
             console.log(`Unhandled event type ${event.type}`);
         }
}
export default webhooks
