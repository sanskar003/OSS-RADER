import { getGithubUserRepo } from "../services/githubUserRepo.services";
import { Request, Response, NextFunction } from "express";
import { AppErrors } from "../utils/AppErrors";

export const githubUserRepoController = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  
  if (!req.user?.userId) {
    return res.status(401).json({
      success: false,
      message: "Unauthorized"
    })
  }
  const userId = req.user?.userId

  try {
    const userrepo = await getGithubUserRepo(userId);
    return res.status(200).json({
      success: true,
      userrepo
    });
  } catch (error) {
    return next(new AppErrors("Failed to fetch github userrepo", 500));
  }
};
