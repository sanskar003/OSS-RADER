import mongoose, { Schema, Document } from "mongoose";

export interface IContribution extends Document {
  userId: mongoose.Types.ObjectId;   // FK → User
  date: Date;                        // specific day
  count: number;                     // contributions on that day

  createdAt: Date;
  updatedAt: Date;
}

const ContributionSchema = new Schema<IContribution>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    date: {
      type: Date,
      required: true,
    },

    count: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

// Prevent duplicate entries for the same day per user
ContributionSchema.index({ userId: 1, date: 1 }, { unique: true });

export const Contribution = mongoose.model<IContribution>(
  "Contribution",
  ContributionSchema
);