import { User } from "../src/models/User.model";
import { githubTopLanguageController } from "../src/controllers/githubTopLanguage.controller";
import request from "supertest";
import express from "express";
import axios from "axios";
import { describe, it, expect, jest } from "@jest/globals";
import { encryptToken } from "../src/config/crypto"; // ⭐ use real helper

jest.mock("axios");
const mockedAxios = axios as jest.Mocked<typeof axios>;

const app = express();
app.use(express.json());
app.post("/top-languages", githubTopLanguageController);

describe("GitHub Top Language Controller", () => {
  it("should decrypt token and fetch repos", async () => {
    // ✅ Seed DB using real encryptToken helper
    const { cipher, nonce } = await encryptToken("fake-token");

    await User.create({
      githubId: 123,
      login: "testuser",
      cipher,
      nonce,
    });

    // Mock GitHub API response
    mockedAxios.get.mockResolvedValueOnce({
      data: [
        { language: "TypeScript" },
        { language: "JavaScript" },
        { language: "TypeScript" },
      ],
    });

    // Call API
    const response = await request(app)
      .post("/top-languages")
      .send({ githubId: 123 });

    // Assertions
    expect(response.status).toBe(200);
    expect(response.body.topLanguage).toBe("TypeScript");
    expect(mockedAxios.get).toHaveBeenCalled();
  });
});