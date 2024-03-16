import { prisma } from "../db/prisma";

export const getSingleJob = (id: string, userId: string) => {
  return prisma.job.findFirst({
    where: { id, userId },
  });
};
