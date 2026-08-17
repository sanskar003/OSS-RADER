import mongoose, { Schema } from "mongoose";

export interface IStarred extends Document {
    userId: mongoose.Types.ObjectId;
    repoId: number;

    name: string;
    fullName: string;
    description?: string;

    stars: number;
    forks: number;

    language?: string;
    languages?: Record<string, number>;
    topics?: string[];

    isPrivate: boolean;
    htmlUrl: string;

    pushedAt?: Date;
}

const StarredSchema = new Schema<IStarred>(
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

        topics: {
            type: [String],
            default: [],
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
    { timestamps: true }
);

StarredSchema.index(
    { userId: 1, repoId: 1 },
    { unique: true }
);

export const Starred = mongoose.model<IStarred>("Starred", StarredSchema);