import { Router } from "express";
import {
  getAllJobsController,
  getSingleJobController,
} from "../controllers/jobController";

const router = Router();

router.route("/").get(getAllJobsController).post();
router.route("/stats").get();
router.route("/:id").get(getSingleJobController).patch().delete();

export default router;
