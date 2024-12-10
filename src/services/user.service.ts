import bcrypt from "bcryptjs";

import { UserModel } from "../models/user.model";
import { HttpError } from "../utils/httpError.util";

const getAllUsers = async () => {
  return await UserModel.findAll();
};

const getUser = async () => {};

// const getUserByEmail = async(email: string) => {
//   const users = await getAllUsers();

// }

const getUserByEmail = async (email: string) => {
  const user = UserModel.findOneByEmail(email);
  return user;
};

const createUserWithEmailAndPassword = async (
  email: string,
  password: string
) => {
  const user = await UserModel.findOneByEmail(email);

  if (user) {
    throw new HttpError("Email already exists", 400);
  }

  const salt = await bcrypt.genSalt(10);
  const passwordHashed = await bcrypt.hash(password, salt);

  const newUser = await UserModel.create(email, passwordHashed);

  return newUser;
};

export const userService = {
  getAllUsers,
  getUser,
  createUserWithEmailAndPassword,
  getUserByEmail,
};