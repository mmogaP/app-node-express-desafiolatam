import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import pool from "../db";
import dotenv from "dotenv";

dotenv.config();

export const register = async (req: Request, res: Response): Promise<void> => {
  const { username, password } = req.body;

  // Validar campos requeridos
  if (!username || !password) {
    res.status(400).json({ error: "Username and password are required." });
    return;
  }

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    await pool.query("INSERT INTO users (username, password) VALUES ($1, $2)", [
      username,
      hashedPassword,
    ]);
    res.status(201).json({ message: "Usuario registrado exitosamente." });
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({ error: error.message });
    }
  }
};

export const login = async (req: Request, res: Response): Promise<void> => {
  const { username, password } = req.body;

  try {
    const result = await pool.query("SELECT * FROM users WHERE username = $1", [
      username,
    ]);

    if (result.rows.length === 0) {
      res.status(404).json({ error: "Usuario no encontrado." });
      return;
    }

    const user = result.rows[0];
    const validPassword = await bcrypt.compare(password, user.password);

    if (!validPassword) {
      res.status(401).json({ error: "Credenciales inválidas." });
      return;
    }

    const token = jwt.sign({ email: username }, process.env.JWT_SECRET || "secret", {
      expiresIn: "1h",
    });

    res.json({ token });
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({ error: error.message });
    }
  }
};
