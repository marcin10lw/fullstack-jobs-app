import { NextFunction, Request, Response } from "express";

export const asyncWrapper =
  (
    callback: (req: Request, res: Response, next: NextFunction) => Promise<void>
  ) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      await callback(req, res, next);
    } catch (error) {
      next(error);
    }
  };
