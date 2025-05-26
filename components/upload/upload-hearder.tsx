import { Sparkles } from "lucide-react";

export default function UploadHeader() {
  return (
    <div className="flex flex-col justify-center items-center gap-6 text-center">
      <div className="relative p-[1px] overflow-hidden rounded-full bg-linear-to-r from-rose-200 via-rose-500 to-rose-800 animate-gradient-x group">
        <span className="inline-flex items-center border focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent text-secondary-foreground hover:bg-secondary/80 relative px-6 py-2 text-base font-medium bg-white rounded-full group-hover:bg-gray-50 transition-colors duration-200">
          <Sparkles className="w-6 h-6 mr-2 text-rose-600 animate-pulse" />
          <p className="text-base">AI-Powered Content Creation</p>
        </span>
      </div>
      <div className="capitalize text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
        Start Uploading
        <span className="relative inline-block">
          <span className="relative z-10 px-2">Your PDFs </span>
          <span
            className="absolute inset-0 bg-rose-200/50 -rotate-2 rounded-lg transform -skew-y-1"
            aria-hidden="true"
          ></span>
        </span>
      </div>
      <div className="text-lg text-gray-600 mt-2 leading-8 max-w-2xl text-center">
        <p>Upload your PDF and let our AI do the magic ✨</p>
      </div>
    </div>
  );
}
