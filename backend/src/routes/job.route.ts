import { Router } from "express";
import {
  addJobController,
  getAllJobsController,
  getSingleJobController,
} from "../controllers/jobController";
import { createJobSchema } from "../schemas/job.schema";
import { validate } from "../middleware/validate";

const router = Router();

router
  .route("/")
  .get(getAllJobsController)
  .post(validate(createJobSchema), addJobController);
router.route("/stats").get();
router.route("/:id").get(getSingleJobController).patch().delete();

export default router;
