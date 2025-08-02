"use server";

import { fetchAndExtractPdfText } from "@/lib/langchain";
import { generateSummaryFromGemini } from "@/lib/gemini";

export async function generatePdfSummary(
  uploadResponse: [
    {
      serverData: {
        userId: string;
        file: { url: string; name: string };
      };
    }
  ]
) {
  if (!uploadResponse) {
    return {
      success: false,
      message: "File upload failed",
      data: null,
    };
  }
  const {
    serverData: {
      userId,
      file: { url: pdfUrl, name: fileName },
    },
  } = uploadResponse[0];

  if (!pdfUrl) {
    return {
      success: false,
      message: "File upload failed",
      data: null,
    };
  }
  try {
    const pdfText = await fetchAndExtractPdfText(pdfUrl);

    let summary;
    try {
      summary = await generateSummaryFromGemini(pdfText);
      console.log("summary:\n");
      console.log(summary);
    } catch (err) {
      console.error(err);
      // if (err instanceof Error && err.message === "RATE_LIMIT_EXCEEDED") {
      //   try {
      //   } catch (error) {}
      // }
      // if (!summary) {
      //   return {
      //     success: false,
      //     message: "File upload failed",
      //     data: null,
      //   };
      // }
    }
    if (!summary) {
      return {
        success: false,
        message: "Failed to generate summary",
        data: null,
      };
    }
  } catch (err) {
    return {
      success: false,
      message: "File upload failed",
      data: null,
    };
  }
}
