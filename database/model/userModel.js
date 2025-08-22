import mongoose from "mongoose";
const userShecma = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Name is required"], // لازم يكون موجود
    minlength: [3, "Name must be at least 3 chars"], // طول أدنى
    maxlength: [20, "Name must be less than 20 chars"], // طول أقصى
    trim: true,
  },

  email: {
    type: String,
    required: [true, "Email is required"], // لازم يكون موجود
    unique: true, // لازم يكون فريد في الـ DB
    lowercase: true, // يتحول لحروف صغيرة قبل التخزين
    trim: true, // يشيل المسافات الفاضية
  },
  password:{
    type:String,
      required: [true, "password is required"], 
  },
  age: {
    type: Number,
    min: [18, "Age must be >= 18"],
    max: [60, "Age must be <= 60"],
  },
 confirmEmail:{
    type:Boolean,
    default:false
 },
   token: { type: String } 
},{ timestamps: true });
 export default mongoose.model("user",userShecma)
