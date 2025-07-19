import { db } from "../db";
import { users } from "../db/schema";
import type { Request, Response } from "express";
import bcrypt from "bcrypt";
import { eq } from "drizzle-orm";

const AuthController = {
  async signup(req: Request, res: Response) {
    try {
      const {
        firstName,
        lastName,
        email,
        password,
        confirmPassword,
        region,
        phone,
      } = req.body;

      if (!firstName || !lastName || !email || !password || !confirmPassword) {
        return res.status(400).json({ message: "All fields are required" });
      }

      if (password !== confirmPassword) {
        return res.status(400).json({ message: "Passwords do not match" });
      }

      const hashedPassword = await bcrypt.hash(password, 10);

      const existingUser = await db
        .select()
        .from(users)
        .where(eq(users.email, email));

      if (existingUser.length > 0) {
        return res.status(400).json({ message: "User already exists" });
      }

      if (existingUser.length > 0) {
        return res.status(400).json({ message: "User already exists" });
      }

      const [user] = await db
        .insert(users)
        .values({
          firstName,
          lastName,
          email,
          password: hashedPassword,
          region,
          phone,
        })
        .returning();

      const userWithoutPassword = {
        id: user.id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        region: user.region,
        role: user.role,
      };
      return res.status(201).json({
        message: "User created successfully",
        user: userWithoutPassword,
      });
    } catch (error) {
      console.log(error);
      return res
        .status(500)
        .json({ message: "Internal server error", error: error });
    }
  },

  async login(req: Request, res: Response) {
    try {
      const { email, password } = req.body;

      if (!email || !password) {
        return res.status(400).json({ message: "All fields are required" });
      }

      const user = await db.select().from(users).where(eq(users.email, email));

      if (user.length === 0) {
        return res.status(400).json({ message: "User not found" });
      }

      const isPasswordValid = await bcrypt.compare(password, user[0].password);

      if (!isPasswordValid) {
        return res.status(400).json({ message: "Invalid password" });
      }

      const userWithoutPassword = {
        id: user[0].id,
        firstName: user[0].firstName,
        lastName: user[0].lastName,
        email: user[0].email,
        region: user[0].region,
        role: user[0].role,
      };

      req.session.id = userWithoutPassword.id;

      return res.status(200).json({
        message: "Login successful",
        user: userWithoutPassword,
      });
    } catch (error) {
      console.log(error);
      return res
        .status(500)
        .json({ message: "Internal server error", error: error });
    }
  },

  async logout(req: Request, res: Response) {
    try {
      req.session.destroy((err) => {
        if (err) {
          return res
            .status(500)
            .json({ message: "Internal server error", error: err });
        }
      });
      return res.status(200).json({ message: "Logout successful" });
    } catch (error) {
      console.log(error);
      return res
        .status(500)
        .json({ message: "Internal server error", error: error });
    }
  },

  async getCurrentUser(req: Request, res: Response) {
    try {
      const { id } = req.params;
      if (!id) {
        return res.status(401).json({ message: "Not authenticated" });
      }

      const user = await db.select().from(users).where(eq(users.id, id));

      if (user.length === 0) {
        return res.status(401).json({ message: "User not found" });
      }

      const userWithoutPassword = {
        id: user[0].id,
        firstName: user[0].firstName,
        lastName: user[0].lastName,
        email: user[0].email,
        region: user[0].region,
        role: user[0].role,
        phone: user[0].phone,
        avatar: user[0].avatar,
        bio: user[0].bio,
      };

      return res.status(200).json({ user: userWithoutPassword });
    } catch (error) {
      console.log(error);
      return res
        .status(500)
        .json({ message: "Internal server error", error: error });
    }
  },

  async updateUser(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const { firstName, lastName, phone, region, bio, avatar } = req.body;

      const user = await db.select().from(users).where(eq(users.id, id));

      if (user.length === 0) {
        return res.status(400).json({ message: "User not found" });
      }

      const [updatedUser] = await db
        .update(users)
        .set({ firstName, lastName, phone, region, bio, avatar })
        .where(eq(users.id, id))
        .returning();

      return res.status(200).json({
        message: "User updated successfully",
        user: updatedUser,
      });
    } catch (error) {
      console.log(error);
      return res
        .status(500)
        .json({ message: "Failed to update user", error: error });
    }
  },
};

export default AuthController;
