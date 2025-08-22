import Joi from "joi";

const registerValidation = Joi.object({
  name: Joi.string()
    .min(3)
    .max(20)
    .required()
    .messages({
      "string.empty": "Name is required",
      "string.min": "Name must be at least 3 characters",
      "string.max": "Name must be at most 20 characters"
    }),
  email: Joi.string()
    .email()
    .required()
    .messages({
      "string.email": "Email must be valid",
      "string.empty": "Email is required"
    }),
  password: Joi.string()
    .pattern(/^[A-Z][A-Za-z0-9]{7,}$/)
    .required()
    .messages({
      "string.pattern.base": "Password must start with a capital letter and be at least 8 characters long, containing letters and numbers",
      "string.empty": "Password is required"
    }),
  repassword: Joi.any()
    .valid(Joi.ref("password"))
    .required()
    .messages({
      "any.only": "Passwords do not match",
      "any.required": "Please confirm your password"
    }),
  age: Joi.number()
    .integer()
    .min(18)
    .max(60)
    .required()
    .messages({
      "number.base": "Age must be a number",
      "number.min": "Age must be at least 10",
      "number.max": "Age must be at most 120",
      "any.required": "Age is required"
    })
});
const LoginValidation = Joi.object({
  email: Joi.string()
    .email()
    .required(),
  password: Joi.string()
    .required()
   

});

export {registerValidation,LoginValidation} 
