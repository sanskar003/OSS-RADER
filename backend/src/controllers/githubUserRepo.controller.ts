import { getGithubUserRepo } from "../services/githubUserRepo.services";
import { Request, Response, NextFunction } from "express";
import { AppErrors } from "../utils/AppErrors";

export const githubUserRepoController = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const { githubId } = req.body;

  try {
    const userrepo = await getGithubUserRepo(githubId);
    return res.json(userrepo);
  } catch (error) {
    return next(new AppErrors("Failed to fetch github userrepo", 500));
  }
};
