import { Router } from "express";
import { validate } from "../middleware/validate";
import { createUserSchema, loginUserSchema } from "../schemas/user.schema";
import {
  loginController,
  logoutController,
  refreshTokenController,
  registerController,
  verifyEmailController,
} from "../controllers/auth.controllers";
import { verifyEmailSchema } from "../schemas/auth.schema";
import { authMiddleware } from "../middleware/auth";

const router = Router();

router.post("/register", validate(createUserSchema), registerController);
router.post("/login", validate(loginUserSchema), loginController);
router.post("/refreshToken", refreshTokenController);
router.post("/logout", logoutController);
router.post(
  "/verify-email",
  authMiddleware,
  validate(verifyEmailSchema),
  verifyEmailController
);

export default router;
