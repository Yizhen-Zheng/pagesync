import { GoogleGenerativeAI } from "@google/generative-ai";
import { SUMMARY_SYSTEM_PROMPT } from "@/utils/prompts";
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "");

export async function generateSummaryFromGemini(pdfText: string) {
  try {
    const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });
    const chat = model.startChat({
      generationConfig: {
        temperature: 0.5,
        maxOutputTokens: 1500,
      },
    });
    const result = await chat.sendMessage(
      `${SUMMARY_SYSTEM_PROMPT}\n\n\nTransform this document into an engaging, easy-to-read summary with contextually relevant emojis and proper markdown formatting: \n\n${pdfText}`
    );
    const response = await result.response;

    return response.text();
  } catch (error: any) {
    if (error?.status === 429) {
      throw new Error("RATE_LIMIT_EXCEEDED");
    }
    console.error("Error in generateSummaryFromGemini:", error);
    throw error;
  }
}
