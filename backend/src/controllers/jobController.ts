import { Job } from "@prisma/client";
import { Request } from "express";
import { StatusCodes } from "http-status-codes";

import { JOB_ID_ROUTE_PARAM, PAYLOAD_USER_NAME } from "../constants";
import { prisma } from "../db/prisma";
import { CreateJobInput, UpdateJobInput } from "../schemas/job.schema";
import { createJob, getSingleJob, updateJob } from "../services/job.service";
import { AccessTokenPayloadUser } from "../types";
import { asyncWrapper } from "../utils/asyncWrapper";

type SortOptions = "newest" | "oldest" | "a-z" | "z-a";

interface JobsQueryParams {
  search?: string;
  jobStatus?: Job["jobStatus"] | "all";
  jobType?: Job["jobType"] | "all";
  sort?: SortOptions;
  page?: string;
}

const getOrderByOptions = (sort: SortOptions | undefined) => {
  const sortOptions: { [key in SortOptions]: any } = {
    newest: "desc",
    oldest: "asc",
    "a-z": "asc",
    "z-a": "desc",
  };

  const orderByOptions = {
    createdAt:
      sort === "newest" || sort === "oldest"
        ? sortOptions[sort]
        : !!sort
        ? undefined
        : "desc",
    position: sort === "a-z" || sort === "z-a" ? sortOptions[sort] : undefined,
  };

  return orderByOptions;
};

const getQueryObject = (queryParams: JobsQueryParams) => {
  const { search, jobStatus, jobType } = queryParams;
  const queryObject: Record<string, any> = {};

  if (search && typeof search === "string") {
    queryObject.OR = [
      {
        company: {
          contains: search,
          mode: "insensitive",
        },
      },
      {
        position: {
          contains: search,
          mode: "insensitive",
        },
      },
    ];
  }

  if (jobStatus && jobStatus !== "all") {
    queryObject.jobStatus = jobStatus;
  }

  if (jobType && jobType !== "all") {
    queryObject.jobType = jobType;
  }

  return queryObject;
};

export const getAllJobsController = asyncWrapper(
  async (req: Request<{}, {}, {}, JobsQueryParams>, res) => {
    const queryObject = getQueryObject(req.query);

    const { userId } = res.locals[PAYLOAD_USER_NAME] as AccessTokenPayloadUser;

    const limit = 10;
    const page = Number(req.query.page) || 1;
    const skip = limit * (page - 1);

    const jobs = await prisma.job.findMany({
      take: limit,
      skip,
      where: {
        userId,
        OR: queryObject.OR,
        jobStatus: {
          equals: queryObject.jobStatus,
        },
        jobType: {
          equals: queryObject.jobType,
        },
      },
      orderBy: getOrderByOptions(req.query.sort),
    });
    const totalJobs = await prisma.job.count({
      where: {
        userId,
        OR: queryObject.OR,
        jobStatus: {
          equals: queryObject.jobStatus,
        },
        jobType: {
          equals: queryObject.jobType,
        },
      },
    });
    const numOfPages = Math.ceil(totalJobs / limit);

    res
      .status(StatusCodes.OK)
      .json({ totalJobs, numOfPages, currentPage: page, jobs });
  }
);

export const getSingleJobController = asyncWrapper(async (req, res) => {
  const jobId = req.params[JOB_ID_ROUTE_PARAM];
  const { userId } = res.locals[PAYLOAD_USER_NAME] as AccessTokenPayloadUser;

  const job = await getSingleJob(jobId, userId);

  res.status(StatusCodes.OK).json({ job });
});

export const addJobController = asyncWrapper(
  async (req: Request<{}, {}, CreateJobInput>, res) => {
    const { userId } = res.locals[PAYLOAD_USER_NAME] as AccessTokenPayloadUser;

    const job = createJob(req.body, userId);

    res.status(StatusCodes.CREATED).json({ job });
  }
);

export const updateJobController = asyncWrapper(
  async (req: Request<Record<string, any>, {}, UpdateJobInput>, res) => {
    const jobId = req.params[JOB_ID_ROUTE_PARAM];
    const { userId } = res.locals[PAYLOAD_USER_NAME] as AccessTokenPayloadUser;

    const job = await updateJob(req.body, jobId, userId);

    res.status(StatusCodes.OK).json({ job });
  }
);
