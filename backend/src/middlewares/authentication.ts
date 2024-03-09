import { Request, Response, NextFunction } from "express";
import jwt, { JwtPayload, Secret } from "jsonwebtoken";

export const authentication = async (req: any, res: any, next: any) => {
  const token = req.headers['authorization'];
  if (!token) {
    return res.status(401).json({ error: "Unauthorized" });
  }
  try {
    const decoded = jwt.verify(
      token as string,
      process.env.ACCESS_TOKEN_SECRET as Secret
    );
    req.user = decoded;
    next();
  } catch (error) {
    res.status(401).json({ error: "Unauthorized" });
  }
};

export const adminAuthentication = async (req: any, res: any, next: any) => {
  const token = req.headers['authorization'];
  if (!token) {
    return res.status(401).json({ error: "Unauthorized" });
  }
  try {
    const decoded = jwt.verify(
      token as string,
      process.env.ACCESS_TOKEN_SECRET as Secret
    ) as JwtPayload;
    if (decoded.role !== "admin") {
      return res.status(401).json({ error: "Unauthorized" });
    }
    req.user = decoded;
    next();
  } catch (error) {
    res.status(401).json({ error: "Unauthorized" });
  }
};
