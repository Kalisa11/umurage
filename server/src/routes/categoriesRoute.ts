import { Router } from "express";
import CategoryController from "../controllers/categoriesController";

const router = Router();

router.get("/", CategoryController.getAllCategories);
router.post("/", CategoryController.addCategory);
router.get("/:id", CategoryController.getCategoryById);

export default router;