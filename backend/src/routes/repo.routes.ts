import { Router } from "express";
import { repoController } from "../controllers/repo.controller";

const router = Router()

router.get("/repos", repoController)

export default router;