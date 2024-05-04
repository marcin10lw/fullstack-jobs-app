import { Router } from "express";
import {
  changePasswordController,
  getAppStatsController,
  getCurrentUserController,
  removeUserAvatarController,
  updateAvatarController,
  updateUserController,
} from "../controllers/user.controllers";
import { restrictTo } from "../middleware/restrictTo";
import { validate } from "../middleware/validate";
import { changePasswordSchema, updateUserSchema } from "../schemas/user.schema";
import upload from "../middleware/multer";
import { ensureEmailVerified } from "../middleware/ensureUserVerified";
import { authMiddleware } from "../middleware/auth";

const router = Router();

router.use(authMiddleware);

router.get("/current-user", getCurrentUserController);

router.use(ensureEmailVerified);

router.get("/admin/app-stats", [restrictTo("admin")], getAppStatsController);
router.patch(
  "/update-user",
  [validate(updateUserSchema)],
  updateUserController
);
router.post("/change-avatar", upload.single("avatar"), updateAvatarController);
router.delete("/remove-avatar", removeUserAvatarController);
router.post(
  "/change-password",
  [validate(changePasswordSchema)],
  changePasswordController
);

export default router;
