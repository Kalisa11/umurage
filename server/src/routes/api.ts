import { Router } from "express";
import { db } from "../index";
import { categories } from "../db/schema";
import { eq } from "drizzle-orm";

const router = Router();

// Get all categories
router.get("/categories", async (req, res) => {
  try {
    const allCategories = await db.select().from(categories);
    res.json(allCategories);
  } catch (error) {
    console.error("Error fetching categories:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Get a single category by ID
router.get("/categories/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const category = await db
      .select()
      .from(categories)
      .where(eq(categories.id, parseInt(id)));

    if (category.length === 0) {
      return res.status(404).json({ error: "Category not found" });
    }

    res.json(category[0]);
  } catch (error) {
    console.error("Error fetching category:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Create a new category
router.post("/categories", async (req, res) => {
  try {
    const { name, description } = req.body;

    if (!name || !description) {
      return res
        .status(400)
        .json({ error: "Name and description are required" });
    }

    const newCategory = await db
      .insert(categories)
      .values({
        name,
        description,
      })
      .returning();

    res.status(201).json(newCategory[0]);
  } catch (error) {
    console.error("Error creating category:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

export default router;
