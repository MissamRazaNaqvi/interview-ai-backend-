import express from "express";
import { verifyToken } from "../middleware/auth.middleware.js";
import { generatInterviewReport, getAnalysisById, getUserAnalyses } from "../controllers/ai.controller.js";
import { upload } from "../middleware/resume.middleware.js";


const aiRouter = express.Router();

// router.route('/').post(verifyToken,upload.single("resume"), generatInterviewReport)

aiRouter.post("/interview-report", verifyToken, upload.single("resume"), generatInterviewReport);
aiRouter.get("/analyses", verifyToken, getUserAnalyses);
aiRouter.get("/:id", verifyToken, getAnalysisById);

export { aiRouter }