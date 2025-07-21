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
router.post("/art", ContentController.addArt);
router.get("/art", ContentController.getArt);
router.get("/art/:id", ContentController.getArtById);
router.post("/music", ContentController.addMusic);
router.get("/music", ContentController.getMusic);
router.get("/music/:id", ContentController.getMusicById);
router.get("/contributor/:id", ContentController.getContributorContent);
router.get("/featured", ContentController.getFeaturedContent);
router.get("/pending", ContentController.getPendingContent);
router.put("/approve/:id", ContentController.approveContent);
router.put("/reject/:id", ContentController.rejectContent);
router.get("/approved", ContentController.getApprovedContent);
router.post("/report/:id", ContentController.reportContent);
router.get("/reports", ContentController.getReports);

export default router;
