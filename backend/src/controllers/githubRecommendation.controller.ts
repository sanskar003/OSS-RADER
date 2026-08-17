import { NextFunction, Request, Response } from "express";
import { getGithubRecommendation } from "../services/githubRecommendation.services";
import { AppErrors } from "../utils/AppErrors";

export const githubRecommendationController = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const userId = req.user?.userId;

        if (!userId) {
            return res.status(401).json({
                success: false,
                message: "Unauthorized",
            });
        }

        const recommendations = await getGithubRecommendation(userId);

        return res.status(200).json({
            success: true,
            recommendations,
        });
    } catch (error) {
        return next(
            new AppErrors("Failed to fetch github recommendations repos", 500)
        );
    }
}