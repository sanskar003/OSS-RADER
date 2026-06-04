import { Router } from "express"
import { githubProfileController } from "../controllers/githubProfile.controller";
import { validateJwt } from "../middleware/validateJwt";

let router = Router();

router.get("/profile", validateJwt, githubProfileController)

export default router