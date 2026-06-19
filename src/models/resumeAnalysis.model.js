import mongoose from "mongoose";

const resumeAnalysisSchema = new mongoose.Schema(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "users",
            required: true,
        },

        jobDescription: {
            type: String,
            required: true,
            trim: true,
        },

        selfDescription: {
            type: String,
            trim: true,
        },

        analysis: {
            type: mongoose.Schema.Types.Mixed,
            required: true,
        },
    },
    {
        timestamps: true,
    }
);

export const ResumeAnalysisModel = mongoose.model("ResumeAnalysis", resumeAnalysisSchema);
