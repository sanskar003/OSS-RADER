import { getGithubProfile } from "../services/githubProfile.services";
import { Request, Response, NextFunction } from "express";
import { AppErrors } from "../utils/AppErrors";

export const githubProfileController = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {

  try {
    if (!req.user?.userId) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized"
      })
    }
    const userId = req.user.userId;

    const profile = await getGithubProfile(userId);
    return res.status(200).json({
      success: true,
      profile
    });
  }catch (error: any) {
    console.error("GitHub profile error:", error);

    return next(
        new AppErrors(
            error.message || "Failed to fetch github profile",
            500
        )
    );
}
};
