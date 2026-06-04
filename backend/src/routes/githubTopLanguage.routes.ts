import { Router } from "express";
import { githubTopLanguageController } from "../controllers/githubTopLanguage.controller";
import { validateJwt } from "../middleware/validateJwt";

const router = Router();

router.get("/toplanguages", validateJwt, githubTopLanguageController)

export default router;