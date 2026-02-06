import { Request, Response, NextFunction } from "express";
import { AppErrors } from "../utils/AppErrors";

export const errorHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  console.log("Error :", err.message);

  if (err instanceof AppErrors) {
    return res.status(err.statusCode).json({
      status: "error",
      message: err.message,
    });
  }

  return res.status(500).json({
    status: "error",
    message: "Internal Server Error",
  });
};
