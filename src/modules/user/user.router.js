import express from "express"
import { Register ,Login, VerifyEmail,getprofile,logout} from "./user.controller.js"
import { LoginValidation, registerValidation } from "./user.validation.js"
import validation from "../../middelware/validation.js"
import Auth from "../../middelware/Auth.js"
const userRouter = express.Router()
userRouter.post("/Register",validation(registerValidation),Register)
userRouter.post("/Login",validation(LoginValidation),Login)
userRouter.get("/verify/:token",VerifyEmail)
userRouter.get("/profile/:nickname",getprofile)
userRouter.get("/logout",Auth,logout)

export default userRouter