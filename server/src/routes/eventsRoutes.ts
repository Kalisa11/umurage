import { Router } from "express";
import EventController from "../controllers/eventsController";

const router = Router();

router.get("/", EventController.getAllEvents);
router.get("/:id", EventController.getEventById);
router.post("/", EventController.createEvent);

export default router;