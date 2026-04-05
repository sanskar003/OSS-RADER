import { Router } from "express";
import { githubLoginController } from "../controllers/auth.controller";


const router = Router();

router.post("/login/github", githubLoginController)

export default router;