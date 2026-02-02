import { NextFunction, Request, Response } from "express";
import { getTrendingRepo } from "../services/trendingRepo.services";
import { AppError } from "../utils/appError";

export const trendingRepoController = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const respose = await getTrendingRepo();
    res.json(respose);
  } catch (error) {
    next(new AppError("Failed to fetch treding repo", 502));
  }
};
