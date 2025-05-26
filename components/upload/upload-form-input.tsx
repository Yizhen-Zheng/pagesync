"use client";
import { Button } from "../ui/button";
import { Input } from "@/components/ui/input";

interface UploadFormInputProps {
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
}

export default function UploadFormInput({ onSubmit }: UploadFormInputProps) {
  return (
    <form onSubmit={onSubmit} className="flex flex-col gap-6">
      <div className="flex items-center gap-1.5 justify-end">
        <Input
          type="file"
          id="file"
          name="file"
          accept="application/pdf"
          required
          className=""
        />
        <Button type="submit">Upload Your PDF</Button>
      </div>
    </form>
  );
}
