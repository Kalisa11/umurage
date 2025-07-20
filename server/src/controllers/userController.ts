import { users } from "../db/schema";
import { db } from "../db";
import type { Request, Response } from "express";
import bcrypt from "bcrypt";

const UserController = {
  async createUser(req: Request, res: Response) {
    try {
      const {
        firstName,
        lastName,
        email,
        password,
        confirmPassword,
        bio,
        region,
        id,
        phone,
      } = req.body;

      if (
        !firstName ||
        !lastName ||
        !email ||
        !password ||
        !bio ||
        !region ||
        !id
      ) {
        return res.status(400).json({ message: "All fields are required" });
      }

      if (password !== confirmPassword) {
        return res.status(400).json({ message: "Passwords do not match" });
      }

      const hashedPassword = await bcrypt.hash(password, 10);
      const user = await db
        .insert(users)
        .values({
          id,
          firstName,
          lastName,
          email,
          password: hashedPassword,
          bio,
          region,
          phone,
        })
        .returning({
          id: users.id,
        });
      return res.status(201).json(user);
    } catch (error) {
      console.error("Error creating user:", error);
      return res
        .status(500)
        .json({ message: "Internal server error " + error });
    }
  },
};

export default UserController;
