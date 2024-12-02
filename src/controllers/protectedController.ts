import { Request, Response } from "express";

export const getProtectedData = (req: Request, res: Response): void => {
  const email = req.email;
  res.json({
    message: "Acceso autorizado a datos protegidos.",
    email,
  });
};
