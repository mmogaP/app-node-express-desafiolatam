import jwt from "jsonwebtoken";

const secret = process.env.JWT_SECRET || "secret";

export const generateAccessToken = (
  email: string,
  uid: string,
  expiresIn = "1h"
) => {
  return jwt.sign({ email, uid }, secret, {
    expiresIn,
  });
};

export const verifyAccessToken = (token: string) => {
  return jwt.verify(token, secret) as jwt.JwtPayload;
};