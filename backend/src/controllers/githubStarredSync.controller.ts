import { NextFunction, Request, Response } from "express"
import { AppErrors } from "../utils/AppErrors";
import { getGithubStarredSync } from "../services/githubStarredSync.services";

export const githubStarredSyncController = async (
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

        const starredRepos = await getGithubStarredSync(userId);

        return res.status(200).json({
            success: true,
            starredRepos,
        });

    } catch (error) {
        next(
            new AppErrors(
                "Failed to sync starred repositories",
                500
            )
        );
    }
};
