import { Request, Response, Router } from "express";
import { authMiddleware } from "../middleware/auth";
import {
  getAppStatsController,
  getCurrentUserController,
} from "../controllers/user.controllers";
import { restrictTo } from "../middleware/restrictTo";

const router = Router();

router.get("/current-user", authMiddleware, getCurrentUserController);
router.get(
  "/admin/app-stats",
  [authMiddleware, restrictTo("admin")],
  getAppStatsController
);
router.patch("/update-user");

export default router;
