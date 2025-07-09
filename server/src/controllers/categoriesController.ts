import { eq } from "drizzle-orm";
import { db } from "../db";
import { categories } from "../db/schema";
import type { Request, Response } from "express";

const CategoryController = {
  async getAllCategories(req: Request, res: Response) {
    try {
      const categoriesData = await db.select().from(categories);
      return res.status(200).json(categoriesData);
    } catch (error) {
      console.error("Error fetching categories:", error);
      return res
        .status(500)
        .json({ message: "Error fetching categories, " + error });
    }
  },

  async addCategory(req: Request, res: Response) {
    try {
      const { name, description } = req.body;

      if (!name || !description) {
        return res
          .status(400)
          .json({ error: "Name and description are required" });
      }

      const [newCategory] = await db
        .insert(categories)
        .values({
          name,
          description,
        })
        .returning();

      res.status(201).json(newCategory);
    } catch (error) {
      console.error("Error creating category:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  },

  async getCategoryById(req: Request, res: Response) {
    const { id } = req.params;
    const category = await db
      .select()
      .from(categories)
      .where(eq(categories.id, Number(id)));
    return res.status(200).json(category[0]);
  },
};

export default CategoryController;
