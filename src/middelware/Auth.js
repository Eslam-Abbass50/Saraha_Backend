import jwt from "jsonwebtoken";
import { AppError } from "../utils/CreateError.js";

const Auth = async (req, res, next) => {
  const token = req.header("token");
  if (!token) return next(new AppError("Token required", 401));

  let decoded;
  try {
    decoded = jwt.verify(token, process.env.SECRET_KEY);
  } catch (err) {
    return next(new AppError("Invalid token", 401));
  }

  req.userId = decoded.userId;
  next();
};

export default Auth;
