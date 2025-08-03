"use server";
// -------------------------- import begins --------------------------

import { fetchAndExtractPdfText } from "@/lib/langchain";
import { generateSummaryFromGemini } from "@/lib/gemini";
import { auth, currentUser } from "@clerk/nextjs/server";
import { getDbConnection } from "@/lib/db";
import { string } from "zod";
import { formatFileNameAsTitle } from "@/utils/format-utils";
import { revalidatePath } from "next/cache";
// -------------------------- import ends --------------------------

// -------------------------- type define begins --------------------------
interface PDFSummaryType {
  userId?: string;
  fileUrl: string;
  summary: string;
  title: string;
  fileName: string;
}
// -------------------------- type define ends --------------------------

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
      console.log("summary:\n");
      console.log(summary);
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
 * a helper function to insert generated content and raw data into pdf_summaries table
 * @param {PDFSummaryType}
 *
 */
export async function savePDFSummary({
  userId,
  fileUrl,
  summary,
  title,
  fileName,
}: PDFSummaryType) {
  try {
    const sql = await getDbConnection();
    await sql`INSERT INTO pdf_summaries (user_id, original_file_url, summary_text, title, file_name) VALUES (${userId}, ${fileUrl}, ${summary}, ${title}, ${fileName})`;
  } catch (error) {
    return {
      success: false,
      message: "Summary upload failed",
    };
  }
}
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
  } catch (error) {
    console.error(error);
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
}
