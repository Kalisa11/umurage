import { Router } from "express";
import SubmissionController from "../controllers/submissionController";

const router = Router();

router.get("/", SubmissionController.getAllApprovedSubmissions);
router.get("/:id", SubmissionController.getSubmissionById);
router.get(
  "/category/:categoryId",
  SubmissionController.getSubmissionsByCategory
);

export default router;