import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";
dotenv.config();

console.log(process.env.GEMINI_API_SECRATE_KEY,"gemini key")

const aiConfig = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_SECRATE_KEY,
});

export default aiConfig;


// "profileSummary":"",
// "resumeScore":0,
// "jobMatch":0,
// "strengths":[],
// "missingSkills":[],
// "technicalSkillGap":[],
// "softSkillGap":[],
// "careerPath":[],
// "projectsToBuild":[],
// "certifications":[],
// "interviewQuestions":[],
// "learningRoadmap":[],
// "finalSuggestion":""