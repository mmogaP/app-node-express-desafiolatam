import { Router } from "express";
import { authMiddleware } from "../middlewares/authMiddleware";
import { getProtectedData } from "../controllers/protectedController";

const router = Router();

router.get("/", authMiddleware, getProtectedData);

export default router;
