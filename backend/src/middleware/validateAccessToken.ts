import { Request, Response, NextFunction } from "express";
import { AppErrors } from "../utils/AppErrors";

export const validateAccessToken = (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const { accessToken } = req.body;

    if(!accessToken || typeof accessToken !== "string"){
        return next(new AppErrors("Valid access token is required",400))
    };

    next();
}