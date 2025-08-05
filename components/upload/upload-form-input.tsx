"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { forwardRef } from "react";

interface UploadFormInputProps {
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
}

const UploadFormInput = forwardRef<HTMLFormElement, UploadFormInputProps>(
  ({ onSubmit }, ref) => {
    return (
      <form ref={ref} onSubmit={onSubmit} className="flex flex-col gap-6">
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
);
UploadFormInput.displayName = "UploadFormInput";

export default UploadFormInput;
