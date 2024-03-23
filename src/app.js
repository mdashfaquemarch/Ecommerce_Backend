import express from 'express'
import cors from "cors"
import cookieParser from 'cookie-parser';


const app = express();



// middleware
app.use(cors({
    origin:process.env.CORS_ORIGIN,
    Credential:true
}))


app.use(express.json({limit:"16kb"}));
app.use(express.urlencoded({extended:true,limit:"16kb"}));
app.use(express.static("public"));
app.use(cookieParser())










// importing routes

import userRoute from './routes/user.route.js'
import productRoute from './routes/product.route.js'
import orderRoute from "./routes/order.route.js"


// using routes

app.use("/api/v1/user", userRoute);
app.use("/api/v1/product", productRoute);
app.use("/api/v1/order", orderRoute);



export {app};