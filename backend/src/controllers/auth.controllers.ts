import { Request } from "express";
import { prisma } from "../db/prisma";
import { asyncWrapper } from "../utils/asyncWrapper";
import { CreateUserInput } from "../schemas/user.schema";
import { createUser } from "../services/user.service";
import { StatusCodes } from "http-status-codes";

export const registerController = asyncWrapper(
  async (req: Request<{}, {}, CreateUserInput>, res) => {
    const isFirstUser = (await prisma.user.count()) === 0;
    const role = isFirstUser ? "admin" : "user";

    await createUser({
      ...req.body,
      role,
    });

    res.status(StatusCodes.CREATED).json({ msg: "user created successfully" });
  }
);
