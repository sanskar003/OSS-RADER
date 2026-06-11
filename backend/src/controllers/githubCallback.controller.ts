import { Request, Response, NextFunction } from "express";
import { AppErrors } from "../utils/AppErrors";
import { handleGithubCallback } from "../services/githubCallback.services";

export const githubCallbackController = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
  const code = req.query.code as string;
  if (!code) {
      return res.status(400).json({
        success: false,
        message: "Authorization code missing",
      });
    }

    const {user, token} = await handleGithubCallback(code);

    //SET COOKIES 
    res.cookie("token", token, {
      httpOnly: true,
      secure: true, // true in production (HTTPS)
      sameSite: "none",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    })

    return res.redirect("https://bookish-train-v6rq5gpj7xr93x7g6-3000.app.github.dev/dashboard")
  } catch (error: any) {
    return next(
      new AppErrors(error.message || "Redirecting falied", 500),
    );
  }
};
