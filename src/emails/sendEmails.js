import nodemailer from "nodemailer";
import { html } from "./templetConfirmation.js";
import jwt from "jsonwebtoken";

const SendEmail = async (option) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.MYEMAIL,
      pass: process.env.pass,
    },
  });
  const token = jwt.sign({ email: option.email }, process.env.SECRET_KEY2, {
    expiresIn: "1h",
  });
  const info = await transporter.sendMail({
    from: " noteappmearn26@gmail.com",
    to: option.email,
    subject: "Hello ✔",
    html: html(token), // HTML body
  });
};
export default SendEmail;
