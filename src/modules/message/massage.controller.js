import { msgModel } from "../../../database/model/mesageModel.js";
import CatchError from "../../utils/CatchAyncError.js";
import { AppError } from "../../utils/CreateError.js";

const createMessage = CatchError(async (req, res, next) => {
  const { message } = req.body;
  const { recivedID } = req.params;
  if (!recivedID) return next(new AppError("user not founded", 403));
  await msgModel.create({ message, recivedID });
  res.status(200).json({ message: "Think you for message" });

});
const getMessage = CatchError(async (req, res, next) => {
  const messages = await msgModel.find({recivedID:req.userId})
  if (messages.length === 0) return next(new AppError("no massage yet", 403));
  res.status(200).json( messages);
});

const deleteMessage = CatchError(async (req, res, next) => {
 const { id } = req.params;
  const message = await msgModel.findById(id);

  if (!message){return next(new AppError("message not founded", 403));} 
   if (message.recivedID.toString() !== req.userId) {
    return next(new AppError("Not authorized to delete this message", 403));
  }
   await msgModel.findByIdAndDelete(id)
  res.status(200).json({message:"message deleted succesfully"});

});

export {createMessage,getMessage,deleteMessage}
