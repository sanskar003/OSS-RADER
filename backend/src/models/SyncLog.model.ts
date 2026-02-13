import mongoose, { Schema, Document } from "mongoose";

export interface ISyncLog extends Document {
  userId: mongoose.Types.ObjectId;   // FK → User
  status: "success" | "failed";
  message?: string;                  // error or summary message

  startedAt: Date;
  finishedAt: Date;

  createdAt: Date;
  updatedAt: Date;
}

const SyncLogSchema = new Schema<ISyncLog>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    status: {
      type: String,
      enum: ["success", "failed"],
      required: true,
    },

    message: {
      type: String,
    },

    startedAt: {
      type: Date,
      required: true,
    },

    finishedAt: {
      type: Date,
      required: true,
    },
  },
  { timestamps: true }
);

export const SyncLog = mongoose.model<ISyncLog>("SyncLog", SyncLogSchema);