import { Router } from "express";
import { verifyToken } from "../middlewares/authMiddleware";
import { getProtectedData } from "../controllers/protectedController";

const router = Router();

router.get("/", verifyToken, getProtectedData);

export default router;
