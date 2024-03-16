import { Router } from "express";
import {
  getAppStatsController,
  getCurrentUserController,
  updateUserController,
} from "../controllers/user.controllers";
import { authMiddleware } from "../middleware/auth";
import { restrictTo } from "../middleware/restrictTo";
import { validate } from "../middleware/validate";
import { updateUserSchema } from "../schemas/user.schema";
import upload from "../middleware/multer";

const router = Router();

router.get("/current-user", authMiddleware, getCurrentUserController);
router.get(
  "/admin/app-stats",
  [authMiddleware, restrictTo("admin")],
  getAppStatsController
);
router.patch(
  "/update-user",
  [authMiddleware, upload.single("avatar"), validate(updateUserSchema)],
  updateUserController
);

export default router;
