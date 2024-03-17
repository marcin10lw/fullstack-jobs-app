import { Router } from "express";

import {
  addJobController,
  deleteJobController,
  getAllJobsController,
  getSingleJobController,
  updateJobController,
} from "../controllers/jobController";
import { createJobSchema } from "../schemas/job.schema";
import { validate } from "../middleware/validate";
import { validateIdParam } from "../middleware/validateIdParam";
import { JOB_ID_ROUTE_PARAM } from "../constants";

const router = Router();

router
  .route("/")
  .get(getAllJobsController)
  .post(validate(createJobSchema), addJobController);

router.route("/stats").get();

router
  .route(`/:${JOB_ID_ROUTE_PARAM}`)
  .get(validateIdParam, getSingleJobController)
  .patch(validateIdParam, validate(createJobSchema), updateJobController)
  .delete(validateIdParam, deleteJobController);

export default router;
