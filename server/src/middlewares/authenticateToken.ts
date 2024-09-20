import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

const authenticateToken = (req: Request, res: Response, next: NextFunction) => {
  const JWT_SECRET = process.env.JWT_SECRET || "your_jwt_secret_key";
  const token = req.cookies.token;
  if (!token) return res.sendStatus(401);

  jwt.verify(token, JWT_SECRET, (err: jwt.VerifyErrors | null, admin: any) => {
    if (err) return res.sendStatus(403);
    req.admin = admin;
    next();
  });
};

export default authenticateToken;
