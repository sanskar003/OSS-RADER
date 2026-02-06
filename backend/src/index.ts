import express, { Request, Response } from "express";
import trendingRoute from "./routes/trendingRepo.route"
import githubProfileRoute from "./routes/githubProfile.route"
import { errorHandler } from "./middleware/errorHandler";

const app = express();

app.use(express.json())

app.get("/", (req: Request, res: Response) => {
  res.send("OSS Rader Backend Running 🚀");
});

app.use("/api/project", trendingRoute)
app.use("/api/project", githubProfileRoute)

// ERROR HANDLER MIDDLEWARE
app.use(errorHandler)

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
});