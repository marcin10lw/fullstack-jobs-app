import { NextFunction, Request, Response } from "express";
import { AccessTokenPayloadUser } from "../types";
import { PAYLOAD_USER_NAME } from "../constants";
import { getCurrentUserById } from "../services/user.service";
import AppError from "../utils/appError";
import { StatusCodes } from "http-status-codes";
import { asyncWrapper } from "../utils/asyncWrapper";

export const ensureEmailVerified = asyncWrapper(async (req, res, next) => {
  const { userId } = res.locals[PAYLOAD_USER_NAME] as AccessTokenPayloadUser;

  const user = await getCurrentUserById(userId);

  if (!user?.verified) {
    throw new AppError("email not verified", StatusCodes.FORBIDDEN);
  }

  next();
});
