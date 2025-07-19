import { Router } from "express";
import AuthController from "../controllers/authController";

const router = Router();

router.post("/signup", AuthController.signup);
router.post("/login", AuthController.login);
router.post("/logout", AuthController.logout);
router.get("/profile/:id", AuthController.getCurrentUser);
router.put("/profile/:id", AuthController.updateUser);

export default router;
