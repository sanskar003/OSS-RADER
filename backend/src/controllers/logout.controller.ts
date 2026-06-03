import { Request, Response } from "express";

export const logoutController = (
    req: Request,
    res: Response
) => {
    res.clearCookie("token", {
        httpOnly: true,
        secure: true,
        sameSite: "none",
    });

    return res.status(200).json({
        success: true,
        message: "Logged out successfully"
    });
};