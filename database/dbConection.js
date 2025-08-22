import mongoose from "mongoose"



const ConnectDB = ()=>{
    mongoose.connect(process.env.Connection_URL).then(
        console.log("DB connected ")
        
    ).catch((err)=>{
         console.log("failed connected db  "+err)
    })
}




export default ConnectDB