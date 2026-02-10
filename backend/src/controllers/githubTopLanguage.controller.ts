import { Request, Response, NextFunction } from "express";
import { AppErrors } from "../utils/AppErrors";
import { getGithubTopLanguage } from "../services/githubTopLanguage.services";

export const githubTopLanguageController = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const { accessToken } = req.body;

  try {
    let languages = await getGithubTopLanguage(accessToken);
    return res.json(languages);
  } catch (error) {
    return next(new AppErrors("Failed to fetch github top languages", 500));
  }
};
