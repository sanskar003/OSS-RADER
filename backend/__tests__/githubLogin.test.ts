import { describe, it, expect } from "@jest/globals";
import { User } from "../src/models/User.model";
import { githubLoginController } from "../src/controllers/auth.controller";
import request from "supertest";
import express from "express";

const app = express();
app.use(express.json());
app.post("/auth/github", githubLoginController)

describe("GitHub Login Controller", () => {
  it("should encrypt and save user on login", async () => {
    // Simulate a POST request to /auth/github
    const response = await request(app)
      .post("/auth/github")
      .send({
        accessToken: "fake-token",
        profile: { id: 123, login: "testuser" },
      });

    // Assert HTTP response
    expect(response.status).toBe(200);
    expect(response.body.success).toBe(true);

    // Assert DB state
    const user = await User.findOne({ githubId: 123 });
    expect(user).not.toBeNull();
    expect(user?.cipher).toBeDefined();
    expect(user?.nonce).toBeDefined();
  });
});
