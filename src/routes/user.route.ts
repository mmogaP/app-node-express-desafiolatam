import { Router } from "express";
import { getAllUsers } from "../controllers/user.controller";
import { verfiyToken, verifyAdminRole } from "../middleware/jwt.middleware";

const userRouter = Router();

userRouter.get("/", verfiyToken, getAllUsers);

export { userRouter };
