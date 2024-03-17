import { Router } from "express";
import {
  getAppStatsController,
  getCurrentUserController,
  removeUserAvatarController,
  updateUserController,
} from "../controllers/user.controllers";
import { restrictTo } from "../middleware/restrictTo";
import { validate } from "../middleware/validate";
import { updateUserSchema } from "../schemas/user.schema";
import upload from "../middleware/multer";

const router = Router();

router.get("/current-user", getCurrentUserController);
router.get("/admin/app-stats", [restrictTo("admin")], getAppStatsController);
router.patch(
  "/update-user",
  [upload.single("avatar"), validate(updateUserSchema)],
  updateUserController
);
router.delete("/remove-avatar", removeUserAvatarController);

export default router;
