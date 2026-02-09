import { getGithubProfile } from "../services/githubProfile.services";
import { Request, Response, NextFunction } from "express";
import { AppErrors } from "../utils/AppErrors";

export const githubProfileController = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const { accessToken } = req.body;

  try {
    const profile = await getGithubProfile(accessToken);
    return res.json(profile);
  } catch (error) {
    return next(new AppErrors("Failed to fetch github user profile", 500));
  }
};
