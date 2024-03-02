import { User } from "@prisma/client";
import { prisma } from "../db/prisma";
import { prismaExclude } from "../utils/exclude";
import bcrypt from "bcryptjs";

type UserCreate = Pick<
  User,
  "name" | "lastName" | "email" | "location" | "password" | "role"
>;
export const createUser = async (user: UserCreate) => {
  user.password = bcrypt.hashSync(user.password, 12);
  await prisma.user.create({
    data: user,
  });
};

export const getCurrentUser = async (id: string) => {
  const currentUser = await prisma.user.findFirst({
    where: {
      id,
    },
    select: prismaExclude("User", ["password"]),
  });

  return currentUser;
};

export const getApplicationStats = async () => {
  const usersAmt = await prisma.user.count();
  const jobsAmt = await prisma.job.count();

  return { usersAmt, jobsAmt };
};
