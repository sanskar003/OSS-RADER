import mongoose, { Schema, Document } from "mongoose";

export interface IUser extends Document {
  githubId: string;
  username: string;
  name?: string;
  email?: string;
  avatarUrl?: string;

  accessToken: string;
  refreshToken?: string;

  lastSyncedAt?: Date;

  createdAt: Date;
  updatedAt: Date;
}

const UserSchema = new Schema<IUser>(
  {
    githubId: {
      type: String,
      required: true,
      unique: true,
    },
    username: {
      type: String,
      required: true,
    },
    name: String,
    email: String,
    avatarUrl: String,

    accessToken: {
      type: String,
      required: true,
    },
    refreshToken: String,

    lastSyncedAt: Date,
  },
  { timestamps: true },
);

export const User = mongoose.model<IUser>("User", UserSchema);
