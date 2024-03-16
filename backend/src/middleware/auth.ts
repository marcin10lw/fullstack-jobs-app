import { StatusCodes } from "http-status-codes";
import { ACCESS_TOKEN_COOKIE_NAME } from "../constants";
import { getCurrentUserById } from "../services/user.service";
import AppError from "../utils/appError";
import { asyncWrapper } from "../utils/asyncWrapper";
import { verifyAccessToken } from "../utils/jwt";
import { AccessTokenPayload } from "../types";

export const authMiddleware = asyncWrapper(async (req, res, next) => {
  const accessToken = req.cookies[ACCESS_TOKEN_COOKIE_NAME];

  if (!accessToken) {
    throw new AppError("no access token provided", StatusCodes.UNAUTHORIZED);
  }

  const payload = verifyAccessToken<AccessTokenPayload>(accessToken);

  if (!payload) {
    throw new AppError(
      "invalid token or user doesn't exist",
      StatusCodes.UNAUTHORIZED
    );
  }

  const user = await getCurrentUserById(payload.userId);

  if (!user) {
    throw new AppError("Unauthorized", StatusCodes.UNAUTHORIZED);
  }

  res.locals.payloadUser = payload;

  return next();
});
