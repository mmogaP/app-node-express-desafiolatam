import Joi from "joi";

export const userCreateSchema = Joi.object({
  username: Joi.string().trim(),
  password: Joi.string().trim().required().min(6),
  email: Joi.string().trim().email().lowercase().required(),
});

export const userUpdateSchema = Joi.object({
  username: Joi.string().trim(),
  password: Joi.string().trim().min(6),
  email: Joi.string().trim().email().lowercase(),
});

export const userUpdateParamsSchema = Joi.object({
  uid: Joi.string().uuid({ version: "uuidv4" }).required(), // Acepta UUID v4
});
