import { Router } from "express";

import { JOB_ID_ROUTE_PARAM } from "../constants";
import {
  addJobController,
  deleteJobController,
  getAllJobsController,
  getSingleJobController,
  getStatsController,
  updateJobController,
  updateJobDescriptionController,
} from "../controllers/job.controller";
import { validate } from "../middleware/validate";
import { validateIdParam } from "../middleware/validateIdParam";
import { createJobSchema } from "../schemas/job.schema";

const router = Router();

router
  .route("/")
  .get(getAllJobsController)
  .post(validate(createJobSchema), addJobController);

router.route("/stats").get(getStatsController);

router
  .route(`/:${JOB_ID_ROUTE_PARAM}`)
  .get(validateIdParam, getSingleJobController)
  .patch(validateIdParam, validate(createJobSchema), updateJobController)
  .delete(validateIdParam, deleteJobController);

router.put(
  `/update-description/:${JOB_ID_ROUTE_PARAM}`,
  updateJobDescriptionController
);

export default router;
