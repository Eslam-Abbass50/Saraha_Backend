import bcrypt from "bcrypt";
import userModel from "../../../database/model/userModel.js";
import CatchError from "../../utils/CatchAyncError.js";
import { AppError } from "../../utils/CreateError.js";
import jwt from "jsonwebtoken";
import SendEmail from "../../emails/sendEmails.js";

const Register = CatchError(async (req, res, next) => {
  const { name, email, age, password, repassword } = req.body;

  // check if email exists
  const user = await userModel.findOne({ email });
  if (user) return next(new AppError("Your email is already in use", 403));

  // check repassword
  if (password !== repassword) {
    return next(new AppError("Passwords do not match", 400));
  }

  // hash password
  const hash = await bcrypt.hash(password, Number(process.env.ROUND));

  // create new user
  const newUser = await userModel.create({
    name,
    email,
    age,
    password: hash,
  });
  SendEmail({ email });
  res.status(201).json({ message: "Created", newUser });
});
const Login = CatchError(async (req, res, next) => {
  const { email, password } = req.body;
  const user = await userModel.findOne({ email });
  if (!user || !(await bcrypt.compare(password, user.password)))
    return next(new AppError("password or email not invalid", 403));
  if (!user.confirmEmail)
    return next(new AppError("plez confirm email and try to login again", 403));
  const token = jwt.sign(
    { userId: user._id, email: user.email },
    process.env.SECRET_KEY
  );
  user.token = token;
  await user.save();
  res.status(200).json({ message: "login", token });
});

const VerifyEmail = CatchError(async (req, res, next) => {
  const { token } = req.params;

  if (!token) return next(new AppError("Token required", 401));

  let decoded;
  try {
    decoded = jwt.verify(token, process.env.SECRET_KEY2);
  } catch (err) {
    return next(new AppError("Please register again", 401));
  }
  await userModel.findOneAndUpdate(
    { email: decoded.email },
    { confirmEmail: true }
  );
  res.status(200).json({ message: "congratulation you can login now " });
});
const getprofile = CatchError(async (req, res, next) => {
  const { nickname } = req.params;
  const user = await userModel.findOne({ nickname });
  if (!user) return next(new AppError("Profile not found", 404));
  res.status(200).json({
    profile: {
      id: user._id,
      name: user.name,
      nickname: user.nickname,
    },
  });
});
const logout = CatchError(async (req, res, next) => {
  const user = await userModel.findById(req.userId);

  if (!user) return next(new AppError("User not found", 404));

  user.token = null; // مسح التوكين
  await user.save();

  res.status(200).json({ message: "Logged out successfully" });
});


export { Register, Login, VerifyEmail, getprofile,logout };
