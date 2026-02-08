import { NextFunction, Request, Response } from "express";
import { getTrendingRepo } from "../services/trendingRepo.services";
import { AppErrors } from "../utils/AppErrors";

export const trendingRepoController = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const respose = await getTrendingRepo();
    return res.json(respose);
  } catch (error) {
    return next(new AppErrors("Failed to fetch treding repo", 502));
  }
};
