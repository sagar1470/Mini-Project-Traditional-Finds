import mongoose from "mongoose";


 async function connectDB()
 {
    try {
      await mongoose.connect("mongodb://127.0.0.1:27017/Ecommerce-Data")
      
    } catch (error) {
        console.log(error);
        
    }
 }

export default connectDB;