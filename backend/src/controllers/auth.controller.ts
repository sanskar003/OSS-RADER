import { Request, Response, NextFunction } from "express";
import { AppErrors } from "../utils/AppErrors";

export const githubAuthController = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const clientId = process.env.GITHUB_CLIENT_ID;
    if (!clientId) {
      return res.status(500).json({
        success: false,
        message: "GitHub Client ID missing",
      });
    }

    const githubUrl =
      `https://github.com/login/oauth/authorize` +
      `?client_id=${clientId}` +
      `&scope=read:user user:email`;

    return res.redirect(githubUrl);
  } catch (error: any) {
    return next(
      new AppErrors(error.message || "Redirecting falied", 304),
    );
  }
};
