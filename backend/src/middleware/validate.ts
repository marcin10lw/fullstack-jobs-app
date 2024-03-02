import { NextFunction, Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { AnyZodObject, ZodError } from "zod";

export const validate =
  (schema: AnyZodObject) =>
  (req: Request, res: Response, next: NextFunction) => {
    try {
      schema.parse({
        params: req.params,
        query: req.query,
        body: req.body,
      });
      next();
    } catch (error) {
      if (error instanceof ZodError) {
        return res
          .status(StatusCodes.BAD_REQUEST)
          .json({ error: error.errors });
      }

      next(error);
    }
  };
