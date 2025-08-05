"use server";
import { getDbConnection } from "@/lib/db";
import { currentUser } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";

export async function deleteSummaryAction(summaryId: string) {
  try {
    const sql = await getDbConnection();
    const user = await currentUser();
    if (!user?.id) {
      throw new Error("User not found");
    }

    const result =
      await sql`DELETE FROM pdf_summaries WHERE id = ${summaryId} AND user_id = ${user.id} RETURNING id;`;

    if (result.length > 0) {
      revalidatePath("/dashboard");
      return {
        success: true,
        message: "Summary deleted successfully",
      };
    }
    return {
      success: false,
      message: "Summary not found",
    };
  } catch (error) {
    console.error(error);
    return {
      success: false,
      message: "Something went wrong",
    };
  }
}
