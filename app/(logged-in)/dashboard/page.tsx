import BgGradient from "@/components/common/bg-gradient";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import Link from "next/link";

export default function Page() {
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
          </div>
        </div>
      </div>
    </main>
  );
}
