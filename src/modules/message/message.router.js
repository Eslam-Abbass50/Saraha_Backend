import express from "express";
import { createMessage, deleteMessage, getMessage } from "./massage.controller.js";
import Auth from './../../middelware/Auth.js';
const messageRouter = express.Router();
messageRouter.get("/",Auth, getMessage);
messageRouter.post("/:recivedID",createMessage);
messageRouter.delete("/:id",Auth, deleteMessage);
export default messageRouter;
