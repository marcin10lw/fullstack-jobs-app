import { User } from "@prisma/client";
import jwt, { SignOptions } from "jsonwebtoken";

export const generateAccessToken = (user: User, options: SignOptions = {}) => {
  const accessTokenKey = process.env.JWT_ACCESS_SECRET;

  if (!accessTokenKey) throw new Error("JWT_ACCESS_SECRET env is missing");

  return jwt.sign({ userId: user.id, role: user.role }, accessTokenKey, {
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

  return jwt.sign({ userId: user.id, jti }, refreshTokenKey, {
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
