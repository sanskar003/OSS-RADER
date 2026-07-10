import { NextFunction, Request, Response } from "express";
import { AppErrors } from "../utils/AppErrors";
import { getGithubStarredSync } from "../services/githubStarredSync.services";

export const githubStarredSyncController = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const userId = req.user?.userId

        if (!req.user?.userId) {
            return res.status(401).json({
                success: false,
                message: "Unauthorized"
            })
        }

        const starredsync = await getGithubStarredSync(userId)

        return res.status(200).json({
            success: true,
            starredsync
        })
    } catch (error) {
        return next(new AppErrors("Failed to fetch github user profile", 500));
    }

}