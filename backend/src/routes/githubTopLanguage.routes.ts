import { Router } from "express";
import { githubTopLanguageController } from "../controllers/githubTopLanguage.controller";
import { validateAccessToken } from "../middleware/validateAccessToken";

const router = Router();

router.post("/top-languages", validateAccessToken, githubTopLanguageController)

export default router;