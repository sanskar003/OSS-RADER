import mongoose, { Schema, Document } from "mongoose";

export interface IUser extends Document {
  githubId: number;
  login: string;
  name?: string;
  email?: string;
  avatarUrl?: string;

  cipher: string;
  nonce: string;
  refreshToken?: string;

  lastSyncedAt?: Date;

  createdAt: Date;
  updatedAt: Date;
}

const UserSchema = new Schema<IUser>(
  {
    githubId: { type: Number, required: true, unique: true },
    login: { type: String, required: true },

    name: String,
    email: String,
    avatarUrl: String,

    cipher: { type: String, required: true },
    nonce: { type: String, required: true },
    refreshToken: String,

    lastSyncedAt: Date,
  },
  { timestamps: true },
);

export const User = mongoose.model<IUser>("User", UserSchema);
