import express, { Request, Response } from "express";
import trendingRoute from "./routes/trendingRepo.routes"
import githubProfileRoute from "./routes/githubProfile.routes"
import githubUserRepoRoute from "./routes/githubUserRepo.routes"
import { errorHandler } from "./middleware/errorHandler";

const app = express();

app.use(express.json())

app.get("/", (req: Request, res: Response) => {
  res.send("OSS Rader Backend Running 🚀");
});

app.use("/api/project", trendingRoute)
app.use("/api/project", githubProfileRoute)
app.use("/api/project", githubUserRepoRoute)

// ERROR HANDLER MIDDLEWARE
app.use(errorHandler)

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
});