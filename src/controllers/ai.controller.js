import { ResumeAnalysisModel } from "../models/resumeAnalysis.model.js";
import { ResumeAnalysisSchema } from "../schemas/resumeZode.schema.js";
import aiConfig from "../services/aiConfig.services.js";
import { extractTextFromPDF } from "../services/pdfExtract.service.js";
import { ApiResponse } from "../utils/ApiResponse.js";

export const generatInterviewReport = async (req, res) => {
    try {
        const { jobDescription, selfDescription } = req.body;
        const userId = req?.user?._id;

        if (!req.file) {
            return res.status(400).json({ success: false, message: "No resume uploaded" });
        }

        if (!jobDescription) {
            return res.status(400).json({ success: false, message: "Job description is required" });
        }

        const resumeText = await extractTextFromPDF(req.file.path);

        // ✅ Explicitly tell Gemini EXACTLY what JSON structure to return
        const prompt = `
            You are a senior technical recruiter and ATS expert. Analyze the candidate's resume against the provided job description.

            Job Description: ${jobDescription}
            Candidate Self Description: ${selfDescription || "Not provided"}
            Resume Content: ${resumeText}

            Return ONLY a valid JSON object with EXACTLY this structure (no markdown, no explanation, no extra fields):

            {
            "atsScore": <number 0-100>,
            "jobMatchScore": <number 0-100>,
            "profileSummary": "<string>",
            "technicalSkills": {
                "matched": ["<skill>"],
                "missing": ["<skill>"],
                "additional": ["<skill>"],
                "score": <number 0-100>
            },
            "softSkills": {
                "strengths": ["<skill>"],
                "missing": ["<skill>"],
                "score": <number 0-100>
            },
            "skillGapAnalysis": {
                "criticalMissingSkills": ["<skill>"],
                "recommendedLearning": ["<string>"],
                "overallGap": "<string>"
            },
            "resumeStrengths": ["<string>"],
            "resumeWeaknesses": ["<string>"],
            "missingKeywords": ["<keyword>"],
            "improvementSuggestions": [
                { "section": "<string>", "suggestion": "<string>" }
            ],
            "recommendedProjects": [
                { "title": "<string>", "description": "<string>", "skillsCovered": ["<string>"] }
            ],
            "careerPathRecommendation": {
                "currentLevel": "<string>",
                "nextRole": "<string>",
                "longTermGoal": "<string>",
                "explanation": "<string>"
            },
            "learningRoadmap": {
                "beginner": ["<string>"],
                "intermediate": ["<string>"],
                "advanced": ["<string>"]
            },
            "interviewPreparation": {
                "technicalQuestions": ["<string>"],
                "behavioralQuestions": ["<string>"],
                "topicsToStudy": ["<string>"]
            },
            "overallFeedback": {
                "overallScore": <number 0-100>,
                "summary": "<string>",
                "hiringRecommendation": "<one of: Strongly Recommended | Recommended | Average | Needs Improvement | Not Recommended>"
            }
            }

            Rules:
            - Return ONLY the JSON object above. No markdown. No \`\`\`json fences.
            - Every array must have at least one item (never empty unless truly nothing applies, then use []).
            - Every number field must be a number, not a string.
            - hiringRecommendation must be exactly one of the 5 enum values listed.
            `;

        const response = await aiConfig.models.generateContent({
            model: "gemini-2.5-flash",
            contents: prompt,
            config: {
                responseMimeType: "application/json",
            },
        });

        const rawText = response.candidates?.[0]?.content?.parts?.[0]?.text || "";

        // ✅ Debug log — check what Gemini actually returned
        // console.log("=== RAW GEMINI RESPONSE ===");
        // console.log(rawText);
        // console.log("===========================");

        if (!rawText) {
            return res.status(500).json({
                success: false,
                message: "Gemini returned empty response",
            });
        }

        const cleanedText = rawText
            .replace(/```json/g, "")
            .replace(/```/g, "")
            .trim();

        // ✅ Parse JSON
        let parsedData;
        try {
            // ✅ Fix escaped single quotes that break JSON.parse
            const sanitized = cleanedText
                .replace(/\\'/g, "'")        // fix \' → '
                .replace(/[\u0000-\u001F\u007F]/g, ""); // remove control characters
        
            parsedData = JSON.parse(sanitized);
        } catch (parseError) {
            // ✅ Log exact parse error to find the exact position
            console.error("JSON Parse Error:", parseError.message);
        
            // ✅ Show the part of the string where parsing failed
            const match = parseError.message.match(/position (\d+)/);
            if (match) {
                const pos = parseInt(match[1]);
                console.error("Problematic area:", cleanedText.substring(pos - 50, pos + 50));
            }
        
            return res.status(500).json({
                success: false,
                message: "AI returned invalid JSON: " + parseError.message,
                rawResponse: cleanedText,
            });
        }


        // ✅ Validate with Zod
        const validatedData = ResumeAnalysisSchema.parse(parsedData);

        const savedAnalysis = await ResumeAnalysisModel.create({
            userId,
            jobDescription,
            selfDescription: selfDescription || "",
            analysis: validatedData,
        });

        return res.status(201).json(
            new ApiResponse(201, {
                analysisId: savedAnalysis._id,
                ...validatedData,
            }, "Report generated and saved successfully")
        );

    } catch (error) {
        console.error("=== ERROR ===");
        console.error(error);

        // ✅ Return Zod errors clearly for debugging
        if (error.name === "ZodError") {
            return res.status(422).json({
                success: false,
                message: "AI response did not match expected schema",
                zodErrors: error.errors,
            });
        }

        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

// ✅ Get all analyses for the logged-in user
export const getUserAnalyses = async (req, res) => {
    try {
        const userId = req.user?._id;

        const analyses = await ResumeAnalysisModel.find({ userId })
            .select("_id jobDescription createdAt analysis.overallFeedback analysis.jobMatchScore analysis.atsScore")
            .sort({ createdAt: -1 });

        return res.status(200).json(
            new ApiResponse(200, analyses, "Analyses fetched successfully")
        );
    } catch (error) {
        return res.status(500).json({ success: false, message: error.message });
    }
};

// ✅ Get single analysis by ID
export const getAnalysisById = async (req, res) => {
    try {
        const { id } = req.params;
        const userId = req.user._id;

        console.log(userId,"userId getAnalysisById")
        
        const analysis = await ResumeAnalysisModel.findOne({_id: id});

        if (!analysis) {
            return res.status(404).json({
                success: false,
                message: "Report not found or not authorized",
            });
        }

        return res.status(200).json({
            success: true,
            data: analysis,
            message: "Report fetched successfully",
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};