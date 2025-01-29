import { Request, Response } from "express";
import { User } from "../models/user.model";
import { UserAttributes } from "../interfaces/user.interface";
import {
  userCreateSchema,
  userUpdateParamsSchema,
  userUpdateSchema,
} from "../schemas/auth.schema";
import jsonwebtoken from "jsonwebtoken";

const secret = process.env.JWT_SECRET;

if (!secret) {
  throw new Error("JWT_SECRET is not defined");
}

export const createUser = async (
  req: Request,
  res: Response
): Promise<void> => {
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

export const updateUser = async (
  req: Request,
  res: Response
): Promise<void> => {
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

export const loginUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ where: { email: email.toLowerCase() } });

    // console.log({ user });
    if (!user) {
      return void res.status(404).json({ message: "User not found" });
    }

    const isValidPassword = await user.validatePassword(password);

    if (!isValidPassword) {
      return void res.status(400).json({ message: "Invalid password" });
    }

    const token = jsonwebtoken.sign(
      { uid: user.uid, email: user.email, role: user.role },
      secret,
      {
        expiresIn: "1h",
        // algorithm: "",
      }
    );

    res.cookie("token", token, {
      httpOnly: true,
      secure: false, // set to true if in production
      sameSite: "lax", // Protege contra CSRF
      maxAge: 3600000, // 1 hour in milliseconds
    });

    return void res.status(200).json({ msg: "login ok", user, token });
  } catch (error) {
    console.log(error);
    return void res.status(500).json({ message: "Internal server error" });
  }
};
