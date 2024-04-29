import { prisma } from "../db/prisma";
import { hashToken } from "../utils/hashToken";

export const addRefreshTokenToWhitelist = ({
  jti,
  refreshToken,
  userId,
}: {
  jti: string;
  refreshToken: string;
  userId: string;
}) => {
  return prisma.refreshToken.create({
    data: {
      id: jti,
      hashedToken: hashToken(refreshToken),
      userId,
    },
  });
};

export const findRefreshTokenById = (tokenId: string) => {
  return prisma.refreshToken.findFirst({
    where: {
      id: tokenId,
    },
  });
};

export const softDeleteRefreshToken = (tokenId: string) => {
  return prisma.refreshToken.update({
    where: {
      id: tokenId,
    },
    data: {
      revoked: true,
    },
  });
};

export const deleteRefreshTokens = (userId: string) => {
  return prisma.refreshToken.deleteMany({
    where: {
      userId,
    },
  });
};

export const revokeTokens = (userId: string) => {
  return prisma.refreshToken.updateMany({
    where: {
      userId,
    },
    data: {
      revoked: true,
    },
  });
};
