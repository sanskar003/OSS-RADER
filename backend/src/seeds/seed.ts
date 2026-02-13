import { connectDb } from "../config/db";
import { User } from "../models/User.model";
import { Repo } from "../models/Repo.model";
import { Contribution } from "../models/Contribution.model";
import { SyncLog } from "../models/SyncLog.model";

async function runSeed() {
  await connectDb();

  // Insert a test user
  const user = await User.create({
    username: "testUser",
    email: "test@example.com",
    githubId: "12348",
     accessToken: "dummy-token",
  });

  // Insert a test repo
  await Repo.create({
    userId: user._id,
    repoId: 999,
    name: "test-repo",
    fullName: "testUser/test-repo",
    stars: 10,
    forks: 2,
    htmlUrl: "https://github.com/testUser/test-repo",
  });

  // Insert a test contribution
  await Contribution.create({
    userId: user._id,
    date: new Date(),
    count: 5,
  });

  // Insert a test sync log
  await SyncLog.create({
    userId: user._id,
    status: "success",
    message: "Initial seed sync",
    startedAt: new Date(),
    finishedAt: new Date(),
  });

  console.log("✅ Seed data inserted successfully");
  process.exit(0);
}

runSeed();