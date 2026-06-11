import { NextFunction, Request, Response } from "express";
import { getGithubStarred } from "../services/githubStarred.services";
import { AppErrors } from "../utils/AppErrors";

export const githubStarredController = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const userId = req.user?.userId

        if (!req.user?.userId) {
            return res.status(301).json({
                success: false,
                message: "Unauthorized"
            })
        }

        const starred = await getGithubStarred(userId)

        return res.status(200).json({
            success: true,
            starred
        })
    } catch (error) {
        return next(new AppErrors("Failed to fetch github user profile", 500));
    }

}