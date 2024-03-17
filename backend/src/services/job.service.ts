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
