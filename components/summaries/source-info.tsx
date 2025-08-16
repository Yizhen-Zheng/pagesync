import { FileText, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { DownloadSummaryButton } from "./download-summary-button";
import Link from "next/link";

export function SourceInfo({
  file_name,
  original_file_url,
  created_at,
  title,
  summary_text,
}: {
  file_name: string;
  original_file_url: string;
  created_at: string;
  title: string;
  summary_text: string;
}) {
  return (
    <div className="flex flex-col lg:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
      <div className="flex items-center gap-2 justify-center">
        <FileText className="h-4 w-4 text-rose-400" />
        <span className="">{file_name}</span>
      </div>
      <div className="flex gap-2">
        <Button
          asChild
          variant={"ghost"}
          size="sm"
          className="text-rose-600 hover:text-rose-700 hover:bg-rose-50"
        >
          <a href={original_file_url} target="_blank" rel="noopener noreferrer">
            <ExternalLink className="h-4 w-4 text-rose-400" />
            View Original
          </a>
        </Button>
        <DownloadSummaryButton
          title={title}
          summary_text={summary_text}
          file_name={file_name}
          created_at={created_at}
          original_file_url={original_file_url}
        />
      </div>
    </div>
  );
}
