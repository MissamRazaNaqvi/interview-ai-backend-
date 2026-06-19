import { z } from "zod";
// import { zodToJsonSchema } from "zod-to-json-schema";

// export const ResumeAnalysisSchema = z.object({
//     atsScore: z
//         .number()
//         .min(0)
//         .max(100)
//         .describe(
//             "ATS compatibility score between 0 and 100 indicating how well the resume is optimized for Applicant Tracking Systems."
//         ),

//     jobMatchScore: z
//         .number()
//         .min(0)
//         .max(100)
//         .describe(
//             "Overall score between 0 and 100 representing how closely the candidate's resume matches the provided job description."
//         ),

//     profileSummary: z
//         .string()
//         .describe(
//             "A concise professional summary of the candidate's background, experience, education, and career profile."
//         ),

//     technicalSkills: z
//         .object({
//             matched: z
//                 .array(z.string())
//                 .describe(
//                     "Technical skills found in both the resume and the job description."
//                 ),

//             missing: z
//                 .array(z.string())
//                 .describe(
//                     "Technical skills required by the job description but not found in the resume."
//                 ),

//             additional: z
//                 .array(z.string())
//                 .describe(
//                     "Additional technical skills present in the resume but not explicitly requested in the job description."
//                 ),

//             score: z
//                 .number()
//                 .min(0)
//                 .max(100)
//                 .describe(
//                     "Technical skill matching score between 0 and 100."
//                 ),
//         })
//         .describe(
//             "Analysis of the candidate's technical skills compared with the job requirements."
//         ),

//     softSkills: z
//         .object({
//             strengths: z
//                 .array(z.string())
//                 .describe(
//                     "Soft skills demonstrated by the candidate."
//                 ),

//             missing: z
//                 .array(z.string())
//                 .describe(
//                     "Soft skills expected for the role but not evident in the resume."
//                 ),

//             score: z
//                 .number()
//                 .min(0)
//                 .max(100)
//                 .describe(
//                     "Soft skills matching score between 0 and 100."
//                 ),
//         })
//         .describe(
//             "Analysis of communication, teamwork, leadership, adaptability, and other interpersonal skills."
//         ),

//     skillGapAnalysis: z
//         .object({
//             criticalMissingSkills: z
//                 .array(z.string())
//                 .describe(
//                     "Important skills required by the role but missing from the resume."
//                 ),

//             recommendedLearning: z
//                 .array(z.string())
//                 .describe(
//                     "Learning recommendations to bridge skill gaps."
//                 ),

//             overallGap: z
//                 .string()
//                 .describe(
//                     "Summary of the gap between current profile and target role."
//                 ),
//         })
//         .describe(
//             "Detailed skill gap analysis."
//         ),
//     // resumeStrengths: z
//     //     .array(z.string())
//     //     .describe(
//     //         "Strong aspects of the resume that improve employability."
//     //     ),

//     // resumeWeaknesses: z
//     //     .array(z.string())
//     //     .describe(
//     //         "Weak areas of the resume that should be improved."
//     //     ),
//     // missingKeywords: z
//     //     .array(z.string())
//     //     .describe(
//     //         "Important ATS keywords present in the job description but missing from the resume."
//     //     ),

//     // improvementSuggestions: z
//     //     .array(
//     //         z.object({
//     //             section: z
//     //                 .string()
//     //                 .describe(
//     //                     "Resume section requiring improvement."
//     //                 ),

//     //             suggestion: z
//     //                 .string()
//     //                 .describe(
//     //                     "Specific recommendation to improve that section."
//     //                 ),
//     //         })
//     //     )
//     //     .describe(
//     //         "Actionable resume improvement suggestions."
//     //     ),

//     // recommendedProjects: z
//     //     .array(
//     //         z.object({
//     //             title: z
//     //                 .string()
//     //                 .describe(
//     //                     "Project title that would strengthen the candidate's profile."
//     //                 ),

//     //             description: z
//     //                 .string()
//     //                 .describe(
//     //                     "Detailed description of the recommended project."
//     //                 ),

//     //             skillsCovered: z
//     //                 .array(z.string())
//     //                 .describe(
//     //                     "Skills that will be learned or demonstrated through the project."
//     //                 ),
//     //         })
//     //     )
//     //     .describe(
//     //         "Projects recommended to improve the candidate's employability and job match score."
//     //     ),

//     // careerPathRecommendation: z
//     //     .object({
//     //         currentLevel: z.string().describe(
//     //             "Current career level of the candidate."
//     //         ),

//     //         nextRole: z.string().describe(
//     //             "Recommended next role."
//     //         ),

//     //         longTermGoal: z.string().describe(
//     //             "Suggested long-term career objective."
//     //         ),

//     //         explanation: z.string().describe(
//     //             "Reasoning behind the recommendation."
//     //         ),
//     //     })
//     //     .describe(
//     //         "Career growth recommendations."
//     //     ),

//     // learningRoadmap: z
//     //     .object({
//     //         beginner: z
//     //             .array(z.string())
//     //             .describe(
//     //                 "Beginner-level learning goals."
//     //             ),

//     //         intermediate: z
//     //             .array(z.string())
//     //             .describe(
//     //                 "Intermediate-level learning goals."
//     //             ),

//     //         advanced: z
//     //             .array(z.string())
//     //             .describe(
//     //                 "Advanced-level learning goals."
//     //             ),
//     //     })
//     //     .describe(
//     //         "Step-by-step learning roadmap."
//     //     ),
//     // interviewPreparation: z
//     //     .object({
//     //         technicalQuestions: z
//     //             .array(z.string())
//     //             .describe(
//     //                 "Likely technical interview questions based on the job description and resume."
//     //             ),

//     //         behavioralQuestions: z
//     //             .array(z.string())
//     //             .describe(
//     //                 "Likely behavioral interview questions for assessing soft skills and experience."
//     //             ),

//     //         topicsToStudy: z
//     //             .array(z.string())
//     //             .describe(
//     //                 "Important topics the candidate should study before interviews."
//     //             ),
//     //     })
//     //     .describe(
//     //         "Interview preparation guidance tailored to the candidate and target role."
//     //     ),

//     // overallFeedback: z
//     //     .object({
//     //         overallScore: z
//     //             .number()
//     //             .min(0)
//     //             .max(100)
//     //             .describe(
//     //                 "Overall candidate score considering ATS optimization, technical skills, experience, and job fit."
//     //             ),

//     //         summary: z
//     //             .string()
//     //             .describe(
//     //                 "Comprehensive summary of the candidate's strengths, weaknesses, and readiness for the role."
//     //             ),

//     //         hiringRecommendation: z
//     //             .enum([
//     //                 "Strongly Recommended",
//     //                 "Recommended",
//     //                 "Average",
//     //                 "Needs Improvement",
//     //                 "Not Recommended",
//     //             ])
//     //             .describe(
//     //                 "Final hiring recommendation based on resume analysis and job matching."
//     //             ),
//     //     })
//     //     .describe(
//     //         "Final assessment of the candidate's suitability for the role."
//     //     ),
// });

// export const ResumeAnalysisJsonSchema = zodToJsonSchema(ResumeAnalysisSchema);


// resumeZode.schema.js — uncomment ALL fields, your prompt now returns all of them

export const ResumeAnalysisSchema = z.object({
    atsScore: z.number().min(0).max(100),
    jobMatchScore: z.number().min(0).max(100),
    profileSummary: z.string(),
    technicalSkills: z.object({
        matched: z.array(z.string()),
        missing: z.array(z.string()),
        additional: z.array(z.string()),
        score: z.number().min(0).max(100),
    }),
    softSkills: z.object({
        strengths: z.array(z.string()),
        missing: z.array(z.string()),
        score: z.number().min(0).max(100),
    }),
    skillGapAnalysis: z.object({
        criticalMissingSkills: z.array(z.string()),
        recommendedLearning: z.array(z.string()),
        overallGap: z.string(),
    }),
    resumeStrengths: z.array(z.string()),
    resumeWeaknesses: z.array(z.string()),
    missingKeywords: z.array(z.string()),
    improvementSuggestions: z.array(z.object({
        section: z.string(),
        suggestion: z.string(),
    })),
    recommendedProjects: z.array(z.object({
        title: z.string(),
        description: z.string(),
        skillsCovered: z.array(z.string()),
    })),
    careerPathRecommendation: z.object({
        currentLevel: z.string(),
        nextRole: z.string(),
        longTermGoal: z.string(),
        explanation: z.string(),
    }),
    learningRoadmap: z.object({
        beginner: z.array(z.string()),
        intermediate: z.array(z.string()),
        advanced: z.array(z.string()),
    }),
    interviewPreparation: z.object({
        technicalQuestions: z.array(z.string()),
        behavioralQuestions: z.array(z.string()),
        topicsToStudy: z.array(z.string()),
    }),
    overallFeedback: z.object({
        overallScore: z.number().min(0).max(100),
        summary: z.string(),
        hiringRecommendation: z.enum([
            "Strongly Recommended",
            "Recommended",
            "Average",
            "Needs Improvement",
            "Not Recommended",
        ]),
    }),
});