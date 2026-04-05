import supertest from "supertest";
import express from "express";
import axios from "axios";
import { jest, describe, it, expect } from "@jest/globals";
import { githubUserRepoController } from "../src/controllers/githubUserRepo.controller";
import { encryptToken } from "../src/config/crypto";
import { User } from "../src/models/User.model";

jest.mock("axios");
const mockedAxios = axios as jest.Mocked<typeof axios>;

const app = express();
app.use(express.json());

app.post("/userrepo", githubUserRepoController);

describe("Github user repo controller", () => {
  it("should decrypt token and fetch repo", async () => {
    //SEEDING DB
    const { cipher, nonce } = await encryptToken("fake-token");

    await User.create({
      githubId: 123,
      login: "user123",
      cipher,
      nonce,
    });

    mockedAxios.get.mockResolvedValueOnce({
      data: [
        {
          name: "repo-one",
          full_name: "testuser/repo-one",
          html_url: "https://github.com/testuser/repo-one",
          description: "First repo",
          stargazers_count: 10,
          forks_count: 2,
          language: "TypeScript",
          languages_url:
            "https://api.github.com/repos/testuser/repo-one/languages",
          visibility: "public",
          updated_at: "2024-01-01T00:00:00Z",
        },
        {
          name: "repo-two",
          full_name: "testuser/repo-two",
          html_url: "https://github.com/testuser/repo-two",
          description: "Second repo",
          stargazers_count: 5,
          forks_count: 1,
          language: "JavaScript",
          languages_url:
            "https://api.github.com/repos/testuser/repo-two/languages",
          visibility: "public",
          updated_at: "2024-01-02T00:00:00Z",
        },
      ],
    });

    const response = await supertest(app)
      .post("/userrepo")
      .send({ githubId: 123 });

    // ⭐ ASSERTIONS GO HERE
    expect(response.status).toBe(200);
    expect(response.body.length).toBe(2);
    expect(response.body[0].name).toBe("repo-one");
    expect(mockedAxios.get).toHaveBeenCalled();
  });
});
