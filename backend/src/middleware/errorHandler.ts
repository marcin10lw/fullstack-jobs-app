import { NextFunction, Request, Response } from "express";
import { StatusCodes } from "http-status-codes";

export const errorHandlerMiddleware = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  let customError = {
    message: err.message || "Something  went wrong, please try again later",
    statusCode: err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR,
  };

  res.status(customError.statusCode).json({ msg: customError.message });
};
