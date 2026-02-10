import { Router } from "express";
import { githubUserRepoController } from "../controllers/githubUserRepo.controller";
import { validateAccessToken } from "../middleware/validateAccessToken";

const router = Router();

router.post("/userrepo", validateAccessToken, githubUserRepoController)

export default router;