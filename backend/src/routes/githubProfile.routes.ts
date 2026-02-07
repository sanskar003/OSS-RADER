import { Router } from "express"
import { githubProfileController } from "../controllers/githubProfile.controller";

let router = Router();

router.post("/profile", githubProfileController)

export default router