import { Router } from "express";
import { authMiddleware } from "../middleware/auth";
import { getCurrentUserController } from "../controllers/user.controllers";

const router = Router();

router.get("/current-user", authMiddleware, getCurrentUserController);
router.get("/admin/app-stats");
router.patch("/update-user");

export default router;
