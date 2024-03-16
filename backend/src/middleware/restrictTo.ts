import { NextFunction, Request, Response } from "express";
import { PAYLOAD_USER_NAME } from "../constants";
import { AccessTokenPayloadUser } from "../types";
import { User } from "@prisma/client";
import AppError from "../utils/appError";
import { StatusCodes } from "http-status-codes";

export const restrictTo =
  (...allowedRoles: User["role"][]) =>
  (req: Request, res: Response, next: NextFunction) => {
    const { role } = res.locals[PAYLOAD_USER_NAME] as AccessTokenPayloadUser;

    if (!allowedRoles.includes(role)) {
      throw new AppError("access denied", StatusCodes.FORBIDDEN);
    }

    next();
  };
