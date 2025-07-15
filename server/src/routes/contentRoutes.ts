import { Router } from "express";
import ContentController from "../controllers/contentController";

const router = Router();

router.post("/story", ContentController.addStory);
router.get("/story", ContentController.getStories);
router.get("/story/featured", ContentController.getFeaturedStories);
router.get("/story/:id", ContentController.getStoryById);
router.post("/proverb", ContentController.addProverb);
router.get("/proverb", ContentController.getProverbs);
router.get("/proverb/:id", ContentController.getProverbById);

export default router;
