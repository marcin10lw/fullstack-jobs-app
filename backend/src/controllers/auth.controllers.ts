import { Request } from "express";
import { prisma } from "../db/prisma";
import { asyncWrapper } from "../utils/asyncWrapper";
import { CreateUserInput } from "../schemas/user.schema";
import { createUser, getCurrentUserByEmail } from "../services/user.service";
import { StatusCodes } from "http-status-codes";
import AppError from "../utils/appError";
import { v4 as uuidv4 } from "uuid";
import { generateTokens } from "../utils/jwt";
import { addRefreshTokenToWhitelist } from "../services/auth.service";

export const registerController = asyncWrapper(
  async (req: Request<{}, {}, CreateUserInput>, res) => {
    const existingUser = await getCurrentUserByEmail(req.body.email);

    if (!!existingUser) {
      throw new AppError(
        "user with this email already exist",
        StatusCodes.BAD_REQUEST
      );
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

    res.status(StatusCodes.CREATED).json({ accessToken, refreshToken });
  }
);
