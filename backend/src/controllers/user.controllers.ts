import { StatusCodes } from "http-status-codes";
import { getCurrentUserById } from "../services/user.service";
import { AccessTokenPayloadUser } from "../types";
import AppError from "../utils/appError";
import { asyncWrapper } from "../utils/asyncWrapper";
import { PAYLOAD_USER_NAME } from "../constants";
import { Request, Response } from "express";

export const getCurrentUserController = asyncWrapper(async (req, res) => {
  const payloadUser = res.locals[PAYLOAD_USER_NAME] as AccessTokenPayloadUser;

  const user = await getCurrentUserById(payloadUser.userId);

  if (!user) {
    throw new AppError("user not found", StatusCodes.NOT_FOUND);
  }

  const { password, ...userWithoutPassword } = user;

  res.status(StatusCodes.OK).json({ user: userWithoutPassword });
});
