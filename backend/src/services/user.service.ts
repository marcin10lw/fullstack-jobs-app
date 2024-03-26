import { User } from "@prisma/client";
import { prisma } from "../db/prisma";
import bcrypt from "bcryptjs";
import { getVerificationCodeData } from "../utils/verificationCode";
import { sendEmail } from "../utils/email";

export const sendVerificationEmail = async (
  email: User["email"],
  verificationCode: string
) => {
  await sendEmail({
    to: email,
    subject: "Verify email",
    text: "Verify email bruh",
    html: `Your verification code: <b>${verificationCode}</b>`,
  });
};

type UserCreate = Pick<
  User,
  "name" | "lastName" | "email" | "location" | "password" | "role"
>;

export const createUser = async (user: UserCreate) => {
  user.password = bcrypt.hashSync(user.password, 12);
  const { verificationCode, verificationCodeExpiresAt } =
    getVerificationCodeData();

  await sendVerificationEmail(user.email, verificationCode);

  const newUser = await prisma.user.create({
    data: {
      ...user,
      verificationCode,
      verificationCodeExpiresAt,
    },
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
