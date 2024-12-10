import { Router } from "express";
import { userController } from "../controllers/user.controller";
import { authMiddleware } from "../middlewares/authMiddleware";

const router = Router();

// path: http:localhost:3000/api/v1/users

// leer los usuarios
router.get("/", authMiddleware, userController.getUsers);

// leer un único usuario por id
router.get("/:id", userController.getUser);

// eliminar un usuario por id
router.delete("/:id", userController.deleteUser);

// actualizar un usuario por id
router.put("/:id", userController.updateUser);

export default router;