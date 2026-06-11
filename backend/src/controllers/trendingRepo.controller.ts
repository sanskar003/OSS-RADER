import { NextFunction, Request, Response } from "express";
import { getTrendingRepo } from "../services/trendingRepo.services";
import { AppErrors } from "../utils/AppErrors";

export const trendingRepoController = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const repos = await getTrendingRepo();

    return res.status(200).json({
      success: true,
      repos,
    });
  } catch (error) {
    return next(
      new AppErrors("Failed to fetch trending repos", 502)
    );
  }
};