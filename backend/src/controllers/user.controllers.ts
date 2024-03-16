import { StatusCodes } from "http-status-codes";
import { PAYLOAD_USER_NAME } from "../constants";
import {
  getApplicationStats,
  getCurrentUserById,
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

  const { password, ...userWithoutPassword } = user;

  res.status(StatusCodes.OK).json({ user: userWithoutPassword });
});

export const getAppStatsController = asyncWrapper(async (req, res) => {
  const { usersAmt, jobsAmt } = await getApplicationStats();
  res.status(StatusCodes.OK).json({ users: usersAmt, jobs: jobsAmt });
});
