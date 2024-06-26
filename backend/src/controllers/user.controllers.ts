import bcryptjs from "bcryptjs";
import { Request } from "express";
import { promises as fs, readFileSync } from "fs";
import { StatusCodes } from "http-status-codes";

import { PAYLOAD_USER_NAME, SUPABASE_AVATAR_BUCKET_NAME } from "../constants";
import { supabase } from "../db/supabase";
import { ChangePasswordInput, UpdateUserInput } from "../schemas/user.schema";
import {
  getApplicationStats,
  getCurrentUserByEmail,
  getCurrentUserById,
  updateUser,
} from "../services/user.service";
import { AccessTokenPayloadUser } from "../types";
import AppError from "../utils/appError";
import { asyncWrapper } from "../utils/asyncWrapper";

export const getCurrentUserController = asyncWrapper(async (req, res) => {
  const payloadUser = res.locals[PAYLOAD_USER_NAME] as AccessTokenPayloadUser;

  const user = await getCurrentUserById(payloadUser.userId);

  if (!user) {
    throw new AppError("user not found", StatusCodes.NOT_FOUND);
  }

  const {
    password,
    verificationCode,
    verificationCodeExpiresAt,
    ...userWithoutPassword
  } = user;

  res.status(StatusCodes.OK).json({ user: userWithoutPassword });
});

export const updateUserController = asyncWrapper(
  async (req: Request<{}, {}, UpdateUserInput>, res) => {
    const payloadUser = res.locals[PAYLOAD_USER_NAME] as AccessTokenPayloadUser;

    const existingUser = await getCurrentUserByEmail(req.body.email);

    if (!!existingUser && existingUser.id !== payloadUser.userId) {
      throw new AppError(
        "user with this email already exist",
        StatusCodes.BAD_REQUEST
      );
    }

    await updateUser(req.body, payloadUser.userId);

    res.status(StatusCodes.OK).json({ msg: "user updated" });
  }
);

export const getAppStatsController = asyncWrapper(async (req, res) => {
  const { usersAmt, jobsAmt } = await getApplicationStats();
  res.status(StatusCodes.OK).json({ users: usersAmt, jobs: jobsAmt });
});

export const updateAvatarController = asyncWrapper(async (req, res) => {
  const { userId } = res.locals[PAYLOAD_USER_NAME] as AccessTokenPayloadUser;
  const uploadedFile = req.file;

  if (!uploadedFile) {
    throw new AppError("file data missing", StatusCodes.BAD_REQUEST);
  }

  if (!uploadedFile.mimetype.startsWith("image/")) {
    throw new AppError("file must be an image", StatusCodes.BAD_REQUEST);
  }

  if (uploadedFile.size > 524288) {
    throw new AppError("file max size is 0.5 MB", StatusCodes.BAD_REQUEST);
  }

  const storedFile = readFileSync(uploadedFile.path);

  const { data: savedFileData, error: savedFileError } = await supabase.storage
    .from(SUPABASE_AVATAR_BUCKET_NAME)
    .upload(uploadedFile.filename, storedFile, {
      contentType: uploadedFile.mimetype,
    });

  await fs.unlink(uploadedFile.path);

  if (savedFileError) {
    throw new AppError(
      savedFileError.message,
      StatusCodes.INTERNAL_SERVER_ERROR
    );
  }

  const {
    data: { publicUrl },
  } = supabase.storage
    .from(SUPABASE_AVATAR_BUCKET_NAME)
    .getPublicUrl(savedFileData.path);

  const currentUser = await getCurrentUserById(userId);

  await updateUser(
    {
      avatar: publicUrl,
      avatarPublicId: savedFileData.path,
    },
    userId
  );

  if (uploadedFile && currentUser?.avatarPublicId) {
    await supabase.storage
      .from(SUPABASE_AVATAR_BUCKET_NAME)
      .remove([currentUser.avatarPublicId]);
  }

  res.status(200).json({ msg: "avatar was changed" });
});

export const removeUserAvatarController = asyncWrapper(async (req, res) => {
  const { userId } = res.locals[PAYLOAD_USER_NAME] as AccessTokenPayloadUser;

  const user = await getCurrentUserById(userId);

  if (user && !user.avatar && !user.avatarPublicId) {
    throw new AppError("no avatar to remove", StatusCodes.BAD_REQUEST);
  }

  if (user && user.avatarPublicId) {
    await supabase.storage
      .from(SUPABASE_AVATAR_BUCKET_NAME)
      .remove([user.avatarPublicId]);
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

export const changePasswordController = asyncWrapper(
  async (req: Request<{}, {}, ChangePasswordInput>, res) => {
    const { userId } = res.locals[PAYLOAD_USER_NAME] as AccessTokenPayloadUser;
    const { currentPassword, newPassword } = req.body;

    const user = await getCurrentUserById(userId);

    const passwordsMatch = await bcryptjs.compare(
      currentPassword,
      user!.password
    );

    if (!passwordsMatch) {
      throw new AppError("invalid credentials", StatusCodes.BAD_REQUEST);
    }

    const newPasswordHashed = bcryptjs.hashSync(newPassword, 12);

    await updateUser(
      {
        password: newPasswordHashed,
      },
      userId
    );

    res.status(StatusCodes.OK).json({ msg: "password changed" });
  }
);
