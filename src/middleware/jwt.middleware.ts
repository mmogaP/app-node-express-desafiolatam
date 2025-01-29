import { NextFunction, Request, Response } from "express";
import jsonwebtoken from "jsonwebtoken";
import { RoleEnum } from "../models/user.model";

declare module "express-serve-static-core" {
  interface Request {
    email?: string;
    uid?: string;
    role?: RoleEnum;
  }
}

const secret = process.env.JWT_SECRET;

if (!secret) {
  throw new Error("JWT_SECRET must be provided");
}

export const verfiyToken = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // const token = req.headers?.authorization?.split(" ")[1];

  const token = req.cookies.token;

  if (!token) {
    return void res.status(401).json({ message: "Unauthorized" });
  }

  try {
    const { uid, email, role } = jsonwebtoken.verify(
      token,
      secret
    ) as jsonwebtoken.JwtPayload;

    req.email = email;
    req.uid = uid;
    req.role = role;

    return next();
  } catch (err) {
    console.log(err);

    if (err instanceof jsonwebtoken.TokenExpiredError) {
      return void res.status(401).json({ message: "Token expired" });
    }

    if (err instanceof jsonwebtoken.JsonWebTokenError) {
      return void res.status(401).json({ message: "Invalid token" });
    }

    res.status(500).json({ message: "JWT: Internal server error" });
  }
};

export const verifyAdminRole = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (req.role !== RoleEnum.ADMIN) {
    return void res.status(403).json({ message: "Access denied: Admins only" });
  }

  next();
};
