import fs from "fs"
import pdfParse from "pdf-parse";

// console.log(pdfParse,"pdfParse");

export const extractTextFromPDF = async (filePath) => {
  try {
    // Read PDF file
    const dataBuffer = fs.readFileSync(filePath);

    // pdfParse(dataBuffer).then(data => {
    //     console.log(data.text);       // Extracted text
    //     console.log(data.numpages);   // Number of pages
    //     console.log(data.info);       // PDF metadata
    //   });

    // Extract text
    const pdfData = await pdfParse(dataBuffer);

    return pdfData.text;
  } catch (error) {
    console.error("Error extracting PDF text:", error);
    throw error;
  }
};