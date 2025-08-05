"use server";
// -------------------------- import begins --------------------------

import { fetchAndExtractPdfText } from "@/lib/langchain";
import { generateSummaryFromGemini } from "@/lib/gemini";
import { auth } from "@clerk/nextjs/server";
import { savePDFSummary, PDFSummaryType } from "@/lib/summaries";
import { formatFileNameAsTitle } from "@/utils/format-utils";
import { revalidatePath } from "next/cache";
// -------------------------- import ends --------------------------

// -------------------------- generate contents begins --------------------------
export async function generatePdfSummary(uploadResponse: {
  userId: string;
  file: { url: string; name: string };
}) {
  if (!uploadResponse) {
    return {
      success: false,
      message: "File upload failed",
      data: null,
    };
  }
  const {
    userId,
    file: { url: pdfUrl, name: fileName },
  } = uploadResponse;

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
    } catch (err) {
      console.error(err);
    }
    if (!summary) {
      return {
        success: false,
        message: "Failed to generate summary",
        data: null,
      };
    }
    const formattedFileName = formatFileNameAsTitle(fileName);
    return {
      success: true,
      message: "summary generated successfully",
      data: {
        summary,
        title: formattedFileName,
      },
    };
  } catch (err) {
    console.error(err);
    throw err;
  }
}
// -------------------------- generate contents ends --------------------------

// -------------------------- save contents begins --------------------------
/**
 * the main function to insert verify user and store contents
 * @param {PDFSummaryType}
 *
 */
export async function storePDFSummaryAction({
  fileUrl,
  summary,
  title,
  fileName,
}: PDFSummaryType) {
  let savedPDFSummary: any;
  try {
    const { userId } = await auth();
    if (!userId) {
      return {
        success: false,
        message: "Unauthorized",
      };
    }
    savedPDFSummary = await savePDFSummary({
      userId,
      fileUrl,
      summary,
      title,
      fileName,
    });
    if (!savedPDFSummary) {
      return {
        success: false,
        message: "Summary upload failed",
      };
    }
    revalidatePath(`/summaries/${savedPDFSummary.id}`);
    return {
      success: true,
      message: "Summary uploaded successfully",
      data: { id: savedPDFSummary.id },
    };
  } catch (error) {
    console.error(error);
    return {
      success: false,
      message: "Summary upload failed",
    };
  }
}
