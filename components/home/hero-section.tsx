import { Button } from "@/components/ui/button";
import { Sparkles } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export default function HeroSection() {
  return (
    <section className="relative mx-auto flex flex-col z-0 items-center justify-center py-16 sm:py-20 lg:pb-28 transition-all animate-in lg:px-12 max-w-7xl">
      {/* <div className=""> */}
      <div className="relative p-[1px] overflow-hidden rounded-full bg-linear-to-r from-rose-200 via-rose-500 to-rose-800 animate-gradient-x group">
        {/* <Badge variant={"secondary"} className="  "> */}
        {/* seems badge not work */}
        <div className="inline-flex items-center border focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent text-secondary-foreground hover:bg-secondary/80 relative px-6 py-2 text-base font-medium bg-white rounded-full group-hover:bg-gray-50 transition-colors duration-200">
          <Sparkles className="w-6 h-6 mr-2 text-rose-600 animate-pulse" />
          <p className="text-base text-rose-600">Powered by AI</p>
          {/* </Badge> */}
        </div>
      </div>
      <h1>Transform your PDFs into concise summaries</h1>
      <h2>Get a summary of your PDF in seconds</h2>
      <Button>Try for free</Button>
      {/* </div> */}
    </section>
  );
}
