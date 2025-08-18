import BgGradient from "@/components/common/bg-gradient";
import { Button } from "@/components/ui/button";
import { Plus, ArrowRight } from "lucide-react";
import Link from "next/link";
import SummaryCard from "@/components/summaries/summary-card";
import { getSummariesByUserId } from "@/lib/summaries";
import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import EmptySummaryState from "@/components/summaries/empty-summary-state";
import { getUploadLimitOfUser } from "@/lib/user";

export default async function Page() {
  const user = await currentUser();
  if (!user?.id || !user?.emailAddresses?.[0]?.emailAddress) {
    return redirect("/sign-in");
  }

  const summaries = await getSummariesByUserId(user.id);
  const { uploadLimit, uploadCount } = await getUploadLimitOfUser(
    user.id,
    user.emailAddresses[0].emailAddress
  );
  return (
    <main>
      <BgGradient className="from-emerald-200 via-teal-200 to-cyan-200"></BgGradient>
      <div className="container mx-auto flex flex-col gap-4 ">
        <div className="px-2 py-12 sm:py-24">
          <div className="flex gap-4 mb-8 justify-between">
            <div className="flex flex-col gap-2">
              <h1 className="text-4xl font-bold tracking-tight bg-linear-to-r from-gray-600 to-gray-700 bg-clip-text text-transparent">
                Your Summaries
              </h1>
              <p className="text-gray-600">
                Transform your PDFs into concise, actionable summaries
              </p>
            </div>
            {uploadCount < uploadLimit && (
              <Button
                size={"lg"}
                asChild
                className="w-full min-[400px]:w-auto bg-linear-to-r from-rose-500 to-rose-700 hover:from-rose-600 hover:to-rose-800 hover:scale-105 transition-all duration-300 text-white group hover:no-underline flex items-center justify-center "
              >
                <Link href="/upload" className="">
                  <div className="flex items-center justify-center ">
                    <Plus className="mr-2 h-5 w-5 " />
                    <p>New Summary</p>
                  </div>
                </Link>
              </Button>
            )}
          </div>
          {uploadCount >= uploadLimit && (
            <div className="mb-6">
              <div className="bg-rose-50 border border-rose-200 rounded-lg p-4 text-rose-800 ">
                <p className="text-sm">
                  You've reached the limit of {uploadLimit} summaries on the
                  Basic plan.{" "}
                  <Link
                    href="/#pricing"
                    className="text-rose-800 underline font-medium underline-offset-4 inline-flex items-center"
                  >
                    Click here to upgrade
                    <ArrowRight className="w-4 h-4 inline-block"></ArrowRight>
                  </Link>
                  for unlimited summaries.
                </p>
              </div>
            </div>
          )}
          {summaries.length === 0 ? (
            <EmptySummaryState />
          ) : (
            <div className="grid grid-cols-1 gap-4 sm:gap-6 md:grid-cols-2 lg:grid-cols-3 sm:px-0">
              {summaries.map((summary, i) => (
                <SummaryCard key={i} summary={summary} />
              ))}
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
