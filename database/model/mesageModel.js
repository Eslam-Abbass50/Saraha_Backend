import mongoose from "mongoose";

const messageShecma = new mongoose.Schema({
  message: {
    type: String,
    required: [true, "message is required"],
   
  },
 recivedID:{
    type:mongoose.SchemaTypes.ObjectId,
    required: true,
 }
},{ timestamps: true });
 export const msgModel = mongoose.model("message",messageShecma)
