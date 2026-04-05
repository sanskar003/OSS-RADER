import mongoose, { Schema, Document } from "mongoose";

export interface IRepo extends Document {
  userId: mongoose.Types.ObjectId; // FK → User
  repoId: number; // GitHub repo ID (unique per user)

  name: string;
  fullName: string;
  description?: string;

  stars: number;
  forks: number;

  language?: string; // primary language
  languages?: Record<string, number>; // full breakdown from GitHub API

  isPrivate: boolean;
  htmlUrl: string;

  pushedAt?: Date; // last push on GitHub
  updatedAt: Date; // snapshot updatedAt (sync time)
  createdAt: Date;
}

const RepoSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    repoId: {
      type: Number,
      required: true,
    },

    name: {
      type: String,
      required: true,
    },

    fullName: {
      type: String,
      required: true,
    },

    description: String,
    stars: {
      type: Number,
      default: 0,
    },

    forks: {
      type: Number,
      default: 0,
    },

    language: String,

    languages: {
      type: Object,
      default: {},
    },

    isPrivate: {
      type: Boolean,
      default: false,
    },
    htmlUrl: {
      type: String,
      required: true,
    },

    pushedAt: Date,
  },
  { timestamps: true },
);

// Ensure a user cannot have duplicate repo snapshots
RepoSchema.index({ userId: 1, repoId: 1 }, { unique: true });

export const Repo = mongoose.model<IRepo>("Repo", RepoSchema);
