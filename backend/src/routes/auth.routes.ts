import { Router } from "express";
import { githubAuthController } from "../controllers/auth.controller";
import { githubCallbackController } from "../controllers/githubCallback.controller";


const router = Router();

router.post("/github", githubAuthController);

router.post("/github/callback", githubCallbackController)

export default router;