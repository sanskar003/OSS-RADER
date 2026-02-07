import { getGithubProfile } from "../services/githubProfile.services";
import { Request, Response, NextFunction } from "express";
import { AppErrors } from "../utils/AppErrors";

export const githubProfileController = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const { accessToken } = req.body;

  if (!accessToken) {
    return next(new AppErrors("Access token not found", 400));
  }

  try {
    const profile = await getGithubProfile(accessToken);
    return res.json(profile);
  } catch (error) {
    return next(new AppErrors("Github request failed", 500));
  }
};
