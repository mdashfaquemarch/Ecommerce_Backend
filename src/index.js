import dotenv from "dotenv"
import connectDB from "./DB/index.js"
import { app } from "./app.js"

// dotenv config

dotenv.config({
    path:"./.env"
})


connectDB()
.then(() => {
    app.listen(process.env.PORT||3000,() => {
        console.log(`⚙️ Server is running at port : ${process.env.PORT}`);
    })
}).catch((error) => {
    console.log("MONGO db connection failed !!! ", err);
})
