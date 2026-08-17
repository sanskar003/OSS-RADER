import { Router } from "express";
import { validateJwt } from "../middleware/validateJwt";
import { githubRecommendationController } from "../controllers/githubRecommendation.controller";

const router = Router();

router.get("/recommendation", validateJwt, githubRecommendationController)

export default router;