import { StatusCodes } from "http-status-codes";
import { ACCESS_TOKEN_COOKIE_NAME, PAYLOAD_USER_NAME } from "../constants";
import { getCurrentUserById } from "../services/user.service";
import AppError from "../utils/appError";
import { asyncWrapper } from "../utils/asyncWrapper";
import { verifyAccessToken } from "../utils/jwt";
import { AccessTokenPayloadUser } from "../types";

export const authMiddleware = asyncWrapper(async (req, res, next) => {
  const accessToken = req.cookies[ACCESS_TOKEN_COOKIE_NAME];

  if (!accessToken) {
    throw new AppError("no access token provided", StatusCodes.UNAUTHORIZED);
  }

  const payload = verifyAccessToken<AccessTokenPayloadUser>(accessToken);

  if (!payload) {
    throw new AppError("not logged in", StatusCodes.UNAUTHORIZED);
  }

  const user = await getCurrentUserById(payload.userId);

  if (!user) {
    throw new AppError("Unauthorized", StatusCodes.UNAUTHORIZED);
  }

  res.locals[PAYLOAD_USER_NAME] = payload;

  return next();
});
