import { StatusCodes } from "http-status-codes";

import { asyncWrapper } from "../utils/asyncWrapper";
import { getSingleJob } from "../services/job.service";
import AppError from "../utils/appError";
import { AccessTokenPayloadUser } from "../types";
import { JOB_ID_ROUTE_PARAM, PAYLOAD_USER_NAME } from "../constants";

export const validateIdParam = asyncWrapper(async (req, res, next) => {
  const jobId = req.params[JOB_ID_ROUTE_PARAM];
  const { userId, role } = res.locals[
    PAYLOAD_USER_NAME
  ] as AccessTokenPayloadUser;

  const job = await getSingleJob(jobId, userId);

  if (!job) {
    throw new AppError("job not found", StatusCodes.NOT_FOUND);
  }

  if (job.userId !== userId && role !== "admin") {
    throw new AppError(
      "not authorized to access this resource",
      StatusCodes.FORBIDDEN
    );
  }

  res.locals.job = job;

  next();
});
