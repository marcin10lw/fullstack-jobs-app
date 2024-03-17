import { Router } from "express";
import {
  addJobController,
  getAllJobsController,
  getSingleJobController,
} from "../controllers/jobController";

const router = Router();

router.route("/").get(getAllJobsController).post(addJobController);
router.route("/stats").get();
router.route("/:id").get(getSingleJobController).patch().delete();

export default router;
