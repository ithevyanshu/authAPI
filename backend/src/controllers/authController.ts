import { createAccessToken, verifyPassword } from "../utils/token";
import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";

const prisma = new PrismaClient();

const loginController = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  try {
    const user = await prisma.user.findUnique({
      where: {
        email: email,
      },
    });
    if (!user) {
      return res.status(400).json("Invalid email or password");
    }
    const passwordMatch = await verifyPassword(password, user.password);
    if (!passwordMatch) {
      return res.status(400).json("Invalid password");
    }
    const accessToken = createAccessToken({
      userId: user.id,
      email: user.email,
    });
    res.json(accessToken);
  } catch (error) {
    res.status(500).json("Internal Server Error");
  }
};

const registerController = async (req: Request, res: Response) => {
  const user = req.body;
  try {
    const emailExists = await prisma.user.findUnique({
      where: {
        email: user.email,
      },
    });
    if (emailExists) {
      return res.status(400).json("Email already exists");
    }
    await prisma.user.create({
      data: {
        email: user.email,
        username: user.username,
        password: user.password,
        name: user.name,
      },
    });
    res.json(user);
  } catch (error) {
    res.status(500).json("Internal Server Error");
  }
};

export { loginController, registerController };