import { Request } from "express";
import { StatusCodes } from "http-status-codes";
import cloudinary from "cloudinary";
import { promises as fs } from "fs";

import { PAYLOAD_USER_NAME } from "../constants";
import {
  getApplicationStats,
  getCurrentUserByEmail,
  getCurrentUserById,
  updateUser,
} from "../services/user.service";
import { AccessTokenPayloadUser } from "../types";
import AppError from "../utils/appError";
import { asyncWrapper } from "../utils/asyncWrapper";
import { UpdateUserInput } from "../schemas/user.schema";

export const getCurrentUserController = asyncWrapper(async (req, res) => {
  const payloadUser = res.locals[PAYLOAD_USER_NAME] as AccessTokenPayloadUser;

  const user = await getCurrentUserById(payloadUser.userId);

  if (!user) {
    throw new AppError("user not found", StatusCodes.NOT_FOUND);
  }

  const { password, ...userWithoutPassword } = user;

  res.status(StatusCodes.OK).json({ user: userWithoutPassword });
});

export const updateUserController = asyncWrapper(
  async (req: Request<{}, {}, UpdateUserInput>, res) => {
    const newUser: UpdateUserInput & {
      avatar?: string;
      avatarPublicId?: string;
    } = {
      ...req.body,
    };

    const payloadUser = res.locals[PAYLOAD_USER_NAME] as AccessTokenPayloadUser;

    const existingUser = await getCurrentUserByEmail(req.body.email);

    if (!!existingUser && existingUser.id !== payloadUser.userId) {
      throw new AppError(
        "user with this email already exist",
        StatusCodes.BAD_REQUEST
      );
    }

    if (req.file) {
      const response = await cloudinary.v2.uploader.upload(req.file.path);
      await fs.unlink(req.file.path);
      newUser.avatar = response.secure_url;
      newUser.avatarPublicId = response.public_id;
    }

    const currentUser = await getCurrentUserById(payloadUser.userId);

    await updateUser(newUser, payloadUser.userId);

    if (req.file && currentUser?.avatarPublicId) {
      await cloudinary.v2.uploader.destroy(currentUser.avatarPublicId);
    }

    res.status(StatusCodes.OK).json({ msg: "user updated" });
  }
);

export const getAppStatsController = asyncWrapper(async (req, res) => {
  const { usersAmt, jobsAmt } = await getApplicationStats();
  res.status(StatusCodes.OK).json({ users: usersAmt, jobs: jobsAmt });
});

export const removeUserAvatarController = asyncWrapper(async (req, res) => {
  const { userId } = res.locals[PAYLOAD_USER_NAME] as AccessTokenPayloadUser;

  const user = await getCurrentUserById(userId);

  if (user && user.avatar && user.avatarPublicId) {
    throw new AppError("no avatar to remove", StatusCodes.BAD_REQUEST);
  }

  if (user && user.avatarPublicId) {
    await cloudinary.v2.uploader.destroy(user.avatarPublicId);
  }

  await updateUser(
    {
      ...user,
      avatar: null,
      avatarPublicId: null,
    },
    userId
  );

  res.status(StatusCodes.OK).json({ msg: "avatar removed" });
});
