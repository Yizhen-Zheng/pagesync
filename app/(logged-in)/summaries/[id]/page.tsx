import { getSummaryById } from "@/lib/summaries";
import { currentUser } from "@clerk/nextjs/server";
import { redirect, notFound } from "next/navigation";
import BgGradient from "@/components/common/bg-gradient";
import { SummaryHeader } from "@/components/summaries/summary-header";
import { SourceInfo } from "@/components/summaries/source-info";
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
  const { title, summary_content, file_name } = summary;
  return (
    <div className="relative isolate min-h-screen bg-linear-to-b from-rose-50/40 to-white">
      <BgGradient className="from-rose-400 via-rose-300 to-orange-200" />
      <div className="container mx-auto flex flex-col gap-4 ">
        <div className="px-4 sm:px-6 lg:px-8 py-6 sm:py-12 lg:py-24">
          <div className="flex flex-col">
            <SummaryHeader title={title} />
          </div>
          {file_name && <SourceInfo fileName={file_name} />}
          <div className="relative mt-4 sm:mt-8 lg:mt-16"></div>
        </div>
      </div>
    </div>
  );
}
