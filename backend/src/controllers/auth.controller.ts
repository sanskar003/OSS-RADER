import { Request, Response, NextFunction } from "express";
import { handleGithubLogin } from "../services/auth.services";
import { AppErrors } from "../utils/AppErrors";

export const githubLoginController = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { accessToken, profile } = req.body;
    console.log("Incoming body:", req.body); 

    const user = await handleGithubLogin({ accessToken, profile });
    res.status(200).json({
      success: true,
      message: "Login successful",
      user,
    });
  } catch (error: any) {
    return next(new AppErrors(error.message || "Login or registraction failed", 500));
  }
};
