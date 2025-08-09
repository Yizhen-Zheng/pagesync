import { getSummaryById } from "@/lib/summaries";
import { currentUser } from "@clerk/nextjs/server";
import { redirect, notFound } from "next/navigation";
import BgGradient from "@/components/common/bg-gradient";
import { SummaryHeader } from "@/components/summaries/summary-header";
import { SourceInfo } from "@/components/summaries/source-info";
import { SummaryViewer } from "@/components/summaries/summary-viewer";
import { FileText } from "lucide-react";
/**
 *
 * @param props
 * @returns
 * what is Partial render: part static
 * why async:
 * await for nextjs to parse URL segments and extract dynamic params([whatever in bracket])
 * and resolve async operations in routing process
 * then returns param obj
 */
export default async function SummaryPage(props: {
  params: Promise<{ id: string }>;
}) {
  // -------- check auth and data --------
  const params = await props.params;
  const user = await currentUser();
  if (!user?.id) {
    redirect("/sign-in");
  }
  const summary = await getSummaryById(params.id, user.id);
  if (!summary) {
    notFound();
  }
  //-------- --------
  const {
    title,
    summary_text,
    file_name,
    word_count,
    created_at,
    original_file_url,
  } = summary;
  const reading_time = Math.ceil(word_count / 200); // Assuming average reading speed of 200 words per minute
  return (
    <div className="relative isolate min-h-screen bg-linear-to-b from-rose-50/40 to-white">
      <BgGradient className="from-rose-400/30 via-rose-300.30 to-orange-200" />
      <div className="container mx-auto flex flex-col gap-4 ">
        <div className="px-4 sm:px-6 lg:px-8 py-6 sm:py-12 lg:py-24">
          <div className="flex flex-col">
            <SummaryHeader
              title={title}
              created_at={created_at}
              reading_time={reading_time}
            />
          </div>
          {file_name && (
            <SourceInfo
              file_name={file_name}
              original_file_url={original_file_url}
              title={title}
              created_at={created_at}
              summary_text={summary_text}
            />
          )}
          <div className="relative mt-4 sm:mt-8 lg:mt-16">
            <div className="relative p-4 sm:p-6 lg:p-8 bg-white/80 backdrop-blur-md rounded-2xl sm:rounded-3xl shadow-xl border border-rose-100/30 transition-all duration-300 hover:shadow-2xl hover:bg-white/90 max-w-4xl mx-auto">
              <div className="absolute inset-0 bg-linear-to-br from-rose-50/50 via-orange-50/30 to-transparent rounded-2xl sm:rounded-3xl opacity-50">
                <div className="absolute top-2 sm:top-4 right-2 sm:right-4  flex items-center gap-1.5 sm:gap-2 text-xs sm:text-sm text-muted-foreground bg-white/90 px-2 sm:px-3 py-1 sm:py-1.5 rounded-full shadow-xs">
                  <FileText className="h-3 w-3 sm:h-4 sm:w-4 text-rose-400" />
                  {word_count?.toLocaleString()} words
                </div>
              </div>
              <div className=" relative mt-8 sm:mt-6 flex justify-center">
                <SummaryViewer summary_text={summary_text} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
