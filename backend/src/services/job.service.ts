import { prisma } from "../db/prisma";
import { CreateJobInput, UpdateJobInput } from "../schemas/job.schema";

export const getSingleJob = (jobId: string, userId: string) => {
  return prisma.job.findFirst({
    where: { id: jobId, userId },
  });
};

export const createJob = async (job: CreateJobInput, userId: string) => {
  return await prisma.job.create({
    data: {
      userId,
      ...job,
    },
  });
};

export const updateJob = async (
  job: UpdateJobInput,
  jobId: string,
  userId: string
) => {
  return await prisma.job.update({
    where: { id: jobId, userId },
    data: job,
  });
};

export const deleteJob = async (jobId: string, userId: string) => {
  return await prisma.job.delete({
    where: { id: jobId, userId },
  });
};

export const getJobStats = async (userId: string) => {
  const stats = await prisma.job.groupBy({
    by: ["jobStatus"],
    _count: {
      jobStatus: true,
    },
    where: {
      userId,
    },
  });

  const monthlyApplications = (await prisma.$queryRaw`
  SELECT
    TO_CHAR("createdAt", 'Mon YY') AS date,
    COUNT("id") AS count
  FROM "Job"
  WHERE "userId" = ${userId}
  GROUP BY TO_CHAR("createdAt", 'Mon YY')
  ORDER BY TO_DATE(TO_CHAR("createdAt", 'Mon YY'), 'Mon YY') DESC
  LIMIT 6
`) as { date: string; count: number }[];

  return { stats, monthlyApplications };
};

export const updateJobDescription = async (
  jobId: string,
  userId: string,
  jobDescription: string
) => {
  return await prisma.job.update({
    where: { id: jobId, userId },
    data: {
      jobDescription,
    },
  });
};
