import { NextFunction, Request, Response } from "express";
import { handleRepo } from "../services/repo.services";
import { AppErrors } from "../utils/AppErrors";
import { repoQuerySchema } from "../schemas/zod.schema";

export const repoController = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {

        //VALIDATION + TRANSFORM
        const query = repoQuerySchema.parse(req.query)

        const repos = await handleRepo(query);
        return res.status(200).json({
            success: true,
            repos
        });
    } catch (error) {
        return next(
            new AppErrors("Failed to fetch repositories", 502),
        );
    }
}