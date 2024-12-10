import { NextFunction, Request, Response } from "express";
import { HttpError } from "../utils/httpError.util";
import logger from "../utils/logger.util";

export const httpErrorHandle = (
  error: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.log(error);
  logger.error(`${req.url} ${req.method} ${error.message}`);
  if (error instanceof HttpError) {
    res.status(error.code).json({ error: error.message });
  } else res.status(500).json({ error: "Error de servidor" });
};