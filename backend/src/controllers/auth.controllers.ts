import bcryptjs from "bcryptjs";
import { CookieOptions, Request } from "express";
import { v4 as uuidv4 } from "uuid";

import { StatusCodes } from "http-status-codes";
import {
  ACCESS_TOKEN_COOKIE_NAME,
  PAYLOAD_USER_NAME,
  REFRESH_TOKEN_COOKIE_NAME,
} from "../constants";
import { prisma } from "../db/prisma";
import { CreateUserInput, LoginUserInput } from "../schemas/user.schema";
import {
  addRefreshTokenToWhitelist,
  deleteRefreshToken,
  findRefreshTokenById,
} from "../services/auth.service";
import {
  createUser,
  getCurrentUserByEmail,
  getCurrentUserById,
  updateUser,
} from "../services/user.service";
import AppError from "../utils/appError";
import { asyncWrapper } from "../utils/asyncWrapper";
import { hashToken } from "../utils/hashToken";
import { generateTokens, verifyRefreshToken } from "../utils/jwt";
import { VerifyEmailInput } from "../schemas/auth.schema";
import { AccessTokenPayloadUser } from "../types";

const accessTokenCookieOptions: CookieOptions = {
  expires: new Date(Date.now() + 15 * 60 * 1000),
  maxAge: 15 * 60 * 1000,
  httpOnly: true,
  sameSite: "lax",
};

const refreshTokenCookieOptions: CookieOptions = {
  expires: new Date(Date.now() + 24 * 60 * 60 * 1000),
  maxAge: 24 * 60 * 60 * 1000,
  httpOnly: true,
  sameSite: "lax",
};

if (process.env.NODE_ENV === "production") {
  accessTokenCookieOptions.secure = true;
  refreshTokenCookieOptions.secure = true;
}

export const registerController = asyncWrapper(
  async (req: Request<{}, {}, CreateUserInput>, res) => {
    const existingUser = await getCurrentUserByEmail(req.body.email);

    if (!!existingUser) {
      throw new AppError("Email already in use", StatusCodes.BAD_REQUEST);
    }

    const isFirstUser = (await prisma.user.count()) === 0;
    const role = isFirstUser ? "admin" : "user";

    const newUser = await createUser({
      ...req.body,
      role,
    });

    const jti = uuidv4();
    const { accessToken, refreshToken } = generateTokens(newUser, jti);
    await addRefreshTokenToWhitelist({ jti, refreshToken, userId: newUser.id });

    res.cookie(ACCESS_TOKEN_COOKIE_NAME, accessToken, accessTokenCookieOptions);
    res.cookie(
      REFRESH_TOKEN_COOKIE_NAME,
      refreshToken,
      refreshTokenCookieOptions
    );

    res.status(StatusCodes.CREATED).json({ accessToken, refreshToken });
  }
);

export const loginController = asyncWrapper(
  async (req: Request<{}, {}, LoginUserInput>, res) => {
    const user = await getCurrentUserByEmail(req.body.email);

    if (!user) {
      throw new AppError("invalid credentials", StatusCodes.BAD_REQUEST);
    }

    const passwordsMatch = await bcryptjs.compare(
      req.body.password,
      user.password
    );

    if (!passwordsMatch) {
      throw new AppError("invalid credentials", StatusCodes.BAD_REQUEST);
    }

    const jti = uuidv4();
    const { accessToken, refreshToken } = generateTokens(user, jti);
    await addRefreshTokenToWhitelist({ jti, refreshToken, userId: user.id });

    res.cookie(ACCESS_TOKEN_COOKIE_NAME, accessToken, accessTokenCookieOptions);
    res.cookie(
      REFRESH_TOKEN_COOKIE_NAME,
      refreshToken,
      refreshTokenCookieOptions
    );

    res.status(StatusCodes.OK).json({ accessToken, refreshToken });
  }
);

export const refreshTokenController = asyncWrapper(async (req, res) => {
  const refreshToken = req.cookies[REFRESH_TOKEN_COOKIE_NAME];

  if (!refreshToken) {
    throw new AppError("missing refresh token", StatusCodes.UNAUTHORIZED);
  }

  const payload = verifyRefreshToken(refreshToken);
  const dbRefreshToken = await findRefreshTokenById(payload.jti);

  if (!dbRefreshToken || dbRefreshToken.revoked) {
    throw new AppError("Unauthorized", StatusCodes.UNAUTHORIZED);
  }

  const hashedToken = hashToken(refreshToken);
  if (hashedToken !== dbRefreshToken.hashedToken) {
    throw new AppError("Unauthorized", StatusCodes.UNAUTHORIZED);
  }

  const user = await getCurrentUserById(payload.userId);
  if (!user) {
    throw new AppError("Unauthorized", StatusCodes.UNAUTHORIZED);
  }

  await deleteRefreshToken(dbRefreshToken.id);
  const jti = uuidv4();
  const { accessToken, refreshToken: newRefreshToken } = generateTokens(
    user,
    jti
  );
  await addRefreshTokenToWhitelist({
    jti,
    refreshToken: newRefreshToken,
    userId: user.id,
  });

  res.cookie(ACCESS_TOKEN_COOKIE_NAME, accessToken, accessTokenCookieOptions);
  res.cookie(
    REFRESH_TOKEN_COOKIE_NAME,
    newRefreshToken,
    refreshTokenCookieOptions
  );

  res.status(StatusCodes.OK).json({ accessToken, refreshToken });
});

export const logoutController = asyncWrapper(async (req, res) => {
  res.cookie(ACCESS_TOKEN_COOKIE_NAME, "", {
    httpOnly: true,
    expires: new Date(Date.now()),
  });
  res.cookie(REFRESH_TOKEN_COOKIE_NAME, "", {
    httpOnly: true,
    expires: new Date(Date.now()),
  });

  res.status(StatusCodes.OK).json({ msg: "user logged out" });
});

export const verifyEmailController = asyncWrapper(
  async (req: Request<{}, {}, VerifyEmailInput>, res) => {
    const { userId } = res.locals[PAYLOAD_USER_NAME] as AccessTokenPayloadUser;
    const { verificationCode } = req.body;

    const user = await getCurrentUserById(userId);

    if (!user) throw new AppError("Unauthorized", StatusCodes.UNAUTHORIZED);

    if (
      user.verified ||
      !user.verificationCode ||
      !user.verificationCodeExpiresAt
    ) {
      throw new AppError("Email already verified", StatusCodes.BAD_REQUEST);
    }

    if (user.verificationCodeExpiresAt < new Date()) {
      await updateUser(
        {
          verificationCode: null,
          verificationCodeExpiresAt: null,
        },
        userId
      );
      throw new AppError("Verification code expired", StatusCodes.BAD_REQUEST);
    }

    if (user.verificationCode !== verificationCode) {
      throw new AppError(
        "Incorrect verification code",
        StatusCodes.BAD_REQUEST
      );
    }

    await updateUser(
      {
        verified: true,
        verificationCode: null,
        verificationCodeExpiresAt: null,
      },
      userId
    );

    res.status(StatusCodes.OK).json({ msg: "Email verified successfully" });
  }
);
