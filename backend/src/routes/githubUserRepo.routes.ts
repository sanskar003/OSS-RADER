import { Router } from "express";
import { githubUserRepoController } from "../controllers/githubUserRepo.controller";
import { validateJwt } from "../middleware/validateJwt";

const router = Router();

router.get("/userrepo", validateJwt, githubUserRepoController)

export default router;