import { Router } from "express";
import {
  getAllUsers,
  createUser,
  updateUser,
} from "../controllers/user.controller";

const userRouter = Router();

userRouter.get("/", getAllUsers);
userRouter.post("/", createUser);
userRouter.put("/:uid", updateUser);

export { userRouter };
