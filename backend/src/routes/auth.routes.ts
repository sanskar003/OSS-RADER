import { Router } from "express";
import { githubAuthController } from "../controllers/auth.controller";
import { githubCallbackController } from "../controllers/githubCallback.controller";
import { validateJwt } from "../middleware/validateJwt";
import { meController } from "../controllers/me.controller";
import { logoutController } from "../controllers/logout.controller";


const router = Router();

router.get("/github", githubAuthController);

router.get("/github/callback", githubCallbackController)

router.get("/me", validateJwt, meController)

router.post("/logout", logoutController)

export default router;