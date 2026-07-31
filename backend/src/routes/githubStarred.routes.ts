import { Router } from "express";
import { validateJwt } from "../middleware/validateJwt";
import { githubStarredController } from "../controllers/githubStarred.controller";
import { githubStarredSyncController } from "../controllers/githubStarredSync.controller";

const router = Router();

router.get("/starred", validateJwt, githubStarredController)

router.post("/starred/sync", validateJwt, githubStarredSyncController)

export default router;