import { Router } from "express";
import { trendingRepoController } from "../controllers/trendingRepo.controller";

let router = Router();

router.get("/trending", trendingRepoController);

export default router;