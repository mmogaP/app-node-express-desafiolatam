import { Request, Response } from "express";
import { User } from "../models/user.model";
import { UserAttributes } from "../interfaces/user.interface";
import { userCreateSchema, userUpdateParamsSchema, userUpdateSchema,  } from "../schemas/auth.schema";

export const getAllUsers = async (req: Request, res: Response): Promise<void> => {
  try {
    const users = await User.findAll();
    res.json(users);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const createUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const { error, value } = userCreateSchema.validate(req.body);

    if (error) {
      res.status(400).json(error);
      return;
    }

    const { username, password, email } = value as UserAttributes;

    const user = await User.create({ username, password, email });
    res.json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const updateUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const { error: paramsError, value: paramsValue } =
      userUpdateParamsSchema.validate(req.params);

    if (paramsError) {
      res.status(400).json(paramsError);
      return;
    }

    const { uid } = paramsValue as { uid: number };

    const { error, value } = userUpdateSchema.validate(req.body);

    if (error) {
      res.status(400).json(error);
      return;
    }

    const { username, password, email } = value as UserAttributes;

    const user = await User.findByPk(uid);

    if (!user) {
      res.status(404).json({ message: "User not found" });
      return;
    }

    user.username = username || user.username;
    user.password = password || user.password;
    user.email = email || user.email;

    await user.save();
    res.json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};
