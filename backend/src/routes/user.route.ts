import { Router } from "express";

const router = Router();

router.get("/current-user");
router.get("/admin/app-stats");
router.patch("/update-user");

export default router;
