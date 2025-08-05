"use server";
import { currentUser } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";
import { deleteSummariesById } from "@/lib/summaries";

export async function deleteSummaryAction(summaryId: string) {
  try {
    const user = await currentUser();
    if (!user?.id) {
      throw new Error("User not found");
    }
    const result = await deleteSummariesById(summaryId, user.id);

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
