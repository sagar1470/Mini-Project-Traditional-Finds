import express from "express";
import cors from "cors";
import dotnev from "dotenv";
import connectDB from "./config/db.js";
import router from "./routes/index.js"
import cookieParser from "cookie-parser";


dotnev.config();
await connectDB()
.then(()=>{
    console.log("MongoDB connected successfully...")
 }) 

 .catch((err)=>{
  console.log("MongoDB Error", err);
 })

const app = express()

app.use(cors({
    origin : process.env.FRONTEND_URL,
    credentials : true
}))

app.use(express.json({ limit: "10mb" })); //Increase JSON payload size
app.use(express.urlencoded({ extended: true, limit: "10mb" })); //For form data
app.use(cookieParser())
app.use("/api", router)



const PORT = 8000 || process.env.PORT

app.listen(PORT, (()=>{
    console.log("Server is listening...")
   
}))
