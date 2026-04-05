import { Request, Response, NextFunction } from "express";
import { AppErrors } from "../utils/AppErrors";
import { getGithubTopLanguage } from "../services/githubTopLanguage.services";

export const githubTopLanguageController = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const { githubId } = req.body;

  try {
    let languages = await getGithubTopLanguage(githubId);
   return res.status(200).json({
      topLanguage: languages[0]?.language || null,
      languages,
    });

  } catch (error) {
    console.error("🔥 REAL ERROR:", error);
    return next(new AppErrors("Failed to fetch github top languages", 500));
  }
};
