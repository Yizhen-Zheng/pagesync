import { Button } from "@/components/ui/button";
import { Sparkles } from "lucide-react";
import { Badge } from "@/components/ui/badge";
export default function HeroSection() {
  return (
    <section>
      <div className="">
        <div className="flex ">
          <Badge className="relative p-[1px] overflow-hidden rounded-full bg-linear-to-r from-rose-200 via-rose-500 to-rose-800 animate-gradient-x group">
            <Sparkles className="w-6 h-6 mr-2 text-rose-600 animate-pulse" />
            <p>Powered by AI</p>
          </Badge>
        </div>
        <h1>Transform your PDFs into concise summaries</h1>
        <h2>Get a summary of your PDF in seconds</h2>
        <Button>Try for free</Button>
      </div>
    </section>
  );
}
