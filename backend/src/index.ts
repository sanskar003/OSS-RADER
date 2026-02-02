import express, { Request, Response } from "express";
import trendingRoute from "./routes/trendingRepo.route"
import { errorHandler } from "./middleware/errorHandler";

const app = express();

app.get("/", (req: Request, res: Response) => {
  res.send("OSS Rader Backend Running 🚀");
});

app.use("/api/project", trendingRoute)

// ERROR HANDLER MIDDLEWARE
app.use(errorHandler)

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
});