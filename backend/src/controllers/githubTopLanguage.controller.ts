import { Request, Response, NextFunction } from "express";
import { AppErrors } from "../utils/AppErrors";
import { getGithubTopLanguage } from "../services/githubTopLanguage.services";

export const githubTopLanguageController = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const userId = req.user?.userId;

    if (!userId) {
      return next(new AppErrors("Unauthorized", 401));
    }

  try {
    let languages = await getGithubTopLanguage(userId);
   return res.status(200).json({
      success: true,
      topLanguage: languages[0]?.language || null,
      languages,
    });

  } catch (error) {
    console.error("🔥 REAL ERROR:", error);
    return next(new AppErrors("Failed to fetch github top languages", 500));
  }
};
