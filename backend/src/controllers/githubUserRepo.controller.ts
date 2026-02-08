import { getGithubUserRepo } from "../services/githubUserRepo.services";
import { Request, Response, NextFunction } from "express";
import { AppErrors } from "../utils/AppErrors";

export const githubUserRepoController = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const { accessToken } = req.body;

    if(!accessToken){
        return next(new AppErrors("Access token not found", 400))
    }

    try {
        const userrepo = await getGithubUserRepo(accessToken)
        return res.json(userrepo)
    } catch (error) {
        return next(new AppErrors("Failed to fetch github userrepo", 500))
    }
}