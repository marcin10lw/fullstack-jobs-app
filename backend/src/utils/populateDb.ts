import { prisma } from "../db/prisma";
import { data } from "./mockData";

export const populateDb = async () => {
  const userId = "3fe69419-c868-4c22-8f9e-3d4ca7d2e3c3";
  try {
    await prisma.job.createMany({
      // @ts-ignore
      data: data.map((job) => ({
        userId,
        createdAt: job.createdAt,
        company: job.company,
        jobLocation: job.jobLocation,
        jobStatus: job.jobStatus,
        jobType: job.jobType,
        position: job.position,
      })),
    });
  } catch (error) {
    console.log("ERROR POPULATING DB", error);
  }
};
