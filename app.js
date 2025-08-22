import express from  "express"
import dotenv from "dotenv"
import ConnectDB from "./database/dbConection.js"
import { GlobalHandling } from "./src/utils/globalMiddelwareHandling.js"
import { AppError } from "./src/utils/CreateError.js"
import userRouter from "./src/modules/user/user.router.js"
import messageRouter from "./src/modules/message/message.router.js"
dotenv.config()
const  app =express()
const port = process.env.PORT ||4000
app.use(express.json())
ConnectDB()
app.use(`${process.env.BASEURL}/users`,userRouter)
app.use(`${process.env.BASEURL}/messages`,messageRouter)


app.use((req, res, next) => {
  next(new AppError("Invalid URL: " + req.originalUrl, 404));
});
app.use(GlobalHandling)
app.listen(port,(err)=>{
    if (err) {
        console.log(err);
        
    }else{
        console.log("server is running in port"+port);
        
    }
})