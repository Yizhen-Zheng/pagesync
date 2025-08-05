import { getDbConnection } from "./db";

export interface PDFSummaryType {
  userId?: string;
  fileUrl: string;
  summary: string;
  title: string;
  fileName: string;
}

export async function getSummariesByUserId(userId: string) {
  const sql = await getDbConnection();
  const summaries =
    await sql`SELECT * FROM pdf_summaries WHERE user_id = ${userId} ORDER BY created_at DESC`;
  return summaries;
}
export async function deleteSummariesById(summaryId: string, userId: string) {
  const sql = await getDbConnection();
  const result =
    await sql`DELETE FROM pdf_summaries WHERE id = ${summaryId} AND user_id = ${userId} RETURNING id;`;
  return result;
}

export async function savePDFSummary({
  userId,
  fileUrl,
  summary,
  title,
  fileName,
}: PDFSummaryType) {
  try {
    const sql = await getDbConnection();
    const savedPDFSummary =
      await sql`INSERT INTO pdf_summaries (user_id, original_file_url, summary_text, title, file_name) VALUES (${userId}, ${fileUrl}, ${summary}, ${title}, ${fileName}) RETURNING id, summary_text`;
    return savedPDFSummary[0];
  } catch (error) {
    return {
      success: false,
      message: "Summary upload failed",
    };
  }
}
