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

  const newUser = await prisma.user.create({
    data: user,
  });

  return newUser;
};

type UpdatedUser = Partial<User>;

export const updateUser = async (newUser: UpdatedUser, userId: string) => {
  const oldUser = await prisma.user.update({
    data: newUser,
    where: {
      id: userId,
    },
  });

  return oldUser;
};

export const getCurrentUserById = async (userId: string) => {
  const currentUser = await prisma.user.findFirst({
    where: {
      id: userId,
    },
  });

  return currentUser;
};

export const getCurrentUserByEmail = async (email: string) => {
  const currentUser = await prisma.user.findFirst({
    where: {
      email,
    },
  });

  return currentUser;
};

export const getApplicationStats = async () => {
  const usersAmt = await prisma.user.count();
  const jobsAmt = await prisma.job.count();

  return { usersAmt, jobsAmt };
};
