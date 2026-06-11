import { Router } from "express";
import { validateJwt } from "../middleware/validateJwt";
import { githubStarredController } from "../controllers/githubStarred.controller";

const router = Router();

router.get("/starred", validateJwt, githubStarredController)

export default router;