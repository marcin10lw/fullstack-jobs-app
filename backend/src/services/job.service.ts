import { prisma } from "../db/prisma";
import { CreateJobInput } from "../schemas/job.schema";

export const getSingleJob = (id: string, userId: string) => {
  return prisma.job.findFirst({
    where: { id, userId },
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
