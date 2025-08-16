import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { ChevronLeft, Sparkles, Calendar, Clock } from "lucide-react";
export function SummaryHeader({
  title,
  created_at,
  reading_time = 1, // Default reading time to 1 minute
}: {
  title: string;
  created_at: string;
  reading_time?: number; // Optional reading time, default is 1 minute
}) {
  return (
    <div className="flex gap-4 mb-4 justify-between">
      <div className="space-y-6">
        <div className="flex flex-wrap items-center gap-4">
          <Badge
            variant={"secondary"}
            className="relative px-4 py-1.5 text-sm font-medium  rounded-full text-rose-500 bg-white/80 hover:bg-white/90 backdrop-blur-xs transition-all duration-200 shadow-xs hover:shadow-md "
          >
            <Sparkles className="h-4 w-4 mr-1.5 text-rose-500" />
            AI Summary
          </Badge>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Calendar className="h-4 w-4  text-rose-400" />
            {new Date(created_at).toLocaleDateString("en-US", {
              month: "long",
              day: "numeric",
              year: "numeric",
            })}
          </div>

          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Clock className="h-4 w-4  text-rose-400" />
            {reading_time} minute read
          </div>
        </div>
        <h1 className="text-2xl lg:text-4xl font-bold lg:tracking-tight ">
          <span className="bg-linear-to-r from-rose-600 to-orange-600 bg-clip-text text-transparent">
            {title}
          </span>
        </h1>
      </div>
      <div className="self-start">
        <Button
          asChild
          size="sm"
          className="group flex items-center gap-1 sm:gap-2 hover:bg-white/80 backdrop-blur-xs rounded-full transition-all duration-200 shadow-xs hover:shadow-md border border-rose-100/30 bg-rose-100 px-2 sm:px-3 text-rose-500 "
        >
          <Link href="/dashboard">
            <ChevronLeft className="h-3 w-3 sm:h-4 sm:w-4  group-hover:translate-x-0.5 transition-transform duration-200" />
            <span className="text-xs sm:text-sm text-muted-foreground font-medium">
              Back
              <span className="hidden sm:inline"> to Dashboard</span>
            </span>
          </Link>
        </Button>
      </div>
      {/* {title} */}
    </div>
  );
}
