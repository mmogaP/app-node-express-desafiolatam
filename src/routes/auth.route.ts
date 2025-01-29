import { Router } from "express";
import {
  createUser,
  updateUser,
  loginUser,
} from "../controllers/auth.controller";

const authRouter = Router();

authRouter.post("/register", createUser);
authRouter.post("/login", loginUser);
authRouter.put("/:uid", updateUser);

export { authRouter };
