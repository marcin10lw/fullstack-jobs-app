import { Job } from "@prisma/client";
import { Request } from "express";
import { StatusCodes } from "http-status-codes";
import { PAYLOAD_USER_NAME } from "../constants";
import { prisma } from "../db/prisma";
import { getSingleJob } from "../services/job.service";
import { AccessTokenPayloadUser } from "../types";
import { asyncWrapper } from "../utils/asyncWrapper";
import AppError from "../utils/appError";

type SortOptions = "newest" | "oldest" | "a-z" | "z-a";

interface JobsQueryParams {
  search?: string;
  jobStatus?: Job["jobStatus"] | "all";
  jobType?: Job["jobType"] | "all";
  sort?: SortOptions;
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
  async (
    req: Request<{}, {}, { cursor: string | null }, JobsQueryParams>,
    res
  ) => {
    const queryObject = getQueryObject(req.query);

    const { userId } = res.locals[PAYLOAD_USER_NAME] as AccessTokenPayloadUser;

    const cursor = req.body.cursor;

    const limit = 10;
    const jobs = await prisma.job.findMany({
      take: limit,
      skip: cursor ? 1 : undefined,
      cursor: cursor ? { id: cursor } : undefined,
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

    let nextCursor: string | undefined = undefined;

    if (jobs.length > limit) {
      const lastJob = jobs.pop();
      nextCursor = lastJob?.id;
    }

    res.status(StatusCodes.OK).json({ jobs, nextCursor });
  }
);

export const getSingleJobController = asyncWrapper(async (req, res) => {
  const { id } = req.params;
  const { userId, role } = res.locals[
    PAYLOAD_USER_NAME
  ] as AccessTokenPayloadUser;

  const job = await getSingleJob(id, userId);

  if (!job) {
    throw new AppError("job not found", StatusCodes.NOT_FOUND);
  }

  if (job.userId !== userId && role !== "admin") {
    throw new AppError(
      "not authorized to access this resource",
      StatusCodes.FORBIDDEN
    );
  }

  res.status(StatusCodes.OK).json({ job });
});
