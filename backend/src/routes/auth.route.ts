import { Router } from "express";
import { validate } from "../middleware/validate";
import { createUserSchema, loginUserSchema } from "../schemas/user.schema";
import {
  loginController,
  refreshTokenController,
  registerController,
} from "../controllers/auth.controllers";

const router = Router();

router.post("/register", validate(createUserSchema), registerController);
router.post("/login", validate(loginUserSchema), loginController);
router.post("/refreshToken", refreshTokenController);
router.get("/logout");

export default router;
