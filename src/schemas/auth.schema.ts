import Joi from "joi";

export const authLoginSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().trim().min(6).required(),
});

export const authRegisterSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().trim().min(6).required(),
});