import express, { Request, Response } from "express";
import cors from "cors";
import dotenv from "dotenv";
import cookieParser from "cookie-parser"
import trendingRoute from "./routes/trendingRepo.routes"
import githubProfileRoute from "./routes/githubProfile.routes"
import githubUserRepoRoute from "./routes/githubUserRepo.routes"
import githubTopLanguageRoute from "./routes/githubTopLanguage.routes"
import authGithubLogin from "./routes/auth.routes"
import { errorHandler } from "./middleware/errorHandler";
import { connectDb } from "./config/db";

dotenv.config();
const app = express();

//CONNECTING TO DB
connectDb()

app.use(cookieParser())
app.use(express.json())
app.use(cors({origin: "https://stunning-sniffle-x5pv49rgq765c6w56-3000.app.github.dev", credentials: true }))

//HOME PAGE
app.get("/", (req: Request, res: Response) => {
  res.send("OSS Rader Backend Running 🚀");
});

//PUBLIC ROUTE NO AUTH REQUIRED
app.use("/api/project", trendingRoute)

//PRIVATE ROUTE AUTH REQUIRED
app.use("/api/project", githubProfileRoute)
app.use("/api/project", githubUserRepoRoute)
app.use("/api/project", githubTopLanguageRoute)

//AUTH ROUTE
app.use("/api/auth", authGithubLogin)

// ERROR HANDLER MIDDLEWARE
app.use(errorHandler)

//SERVER CONNECTION 
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
});