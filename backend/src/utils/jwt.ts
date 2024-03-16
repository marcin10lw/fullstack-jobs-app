import { User } from "@prisma/client";
import jwt, { SignOptions } from "jsonwebtoken";
import { AccessTokenPayloadUser, RefreshTokenPayload } from "../types";

export const generateAccessToken = (user: User, options: SignOptions = {}) => {
  const accessTokenKey = process.env.JWT_ACCESS_SECRET;

  if (!accessTokenKey) throw new Error("JWT_ACCESS_SECRET env is missing");

  const accessTokenPayload: AccessTokenPayloadUser = {
    userId: user.id,
    role: user.role,
  };

  return jwt.sign(accessTokenPayload, accessTokenKey, {
    ...(options && options),
    expiresIn: "15m",
  });
};

export const generateRefreshToken = (
  user: User,
  jti: any,
  options: SignOptions = {}
) => {
  const refreshTokenKey = process.env.JWT_REFRESH_SECRET;

  if (!refreshTokenKey) throw new Error("JWT_REFRESH_SECRET env is missing");

  const refreshTokenPayload: RefreshTokenPayload = {
    userId: user.id,
    jti,
  };

  return jwt.sign(refreshTokenPayload, refreshTokenKey, {
    ...(options && options),
    expiresIn: "24h",
  });
};

export const generateTokens = (user: User, jti: any) => {
  const accessToken = generateAccessToken(user);
  const refreshToken = generateRefreshToken(user, jti);

  return {
    accessToken,
    refreshToken,
  };
};

export const verifyAccessToken = <T>(token: string) => {
  const accessTokenKey = process.env.JWT_ACCESS_SECRET;

  if (!accessTokenKey) {
    throw new Error("missing access token key");
  }

  try {
    return jwt.verify(token, accessTokenKey) as T;
  } catch (error) {
    return null;
  }
};

export const verifyRefreshToken = (token: string) => {
  const refreshTokenKey = process.env.JWT_REFRESH_SECRET;

  if (!refreshTokenKey) {
    throw new Error("missing access token key");
  }

  return jwt.verify(token, refreshTokenKey) as RefreshTokenPayload;
};
