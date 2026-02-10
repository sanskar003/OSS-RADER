import { Router } from "express"
import { githubProfileController } from "../controllers/githubProfile.controller";
import { validateAccessToken } from "../middleware/validateAccessToken";

let router = Router();

router.post("/profile", validateAccessToken, githubProfileController)

export default router