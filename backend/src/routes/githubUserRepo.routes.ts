import { Router } from "express";
import { githubUserRepoController } from "../controllers/githubUserRepo.controller";

const router = Router();

router.post("/userrepo", githubUserRepoController)

export default router;