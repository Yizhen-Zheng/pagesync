"use client";
import { useUploadThing } from "@/utils/uploadthing";
import UploadFormInput from "./upload-form-input";
import { useRouter } from "next/navigation";
import { ClientUploadedFileData } from "uploadthing/types";
import { z } from "zod";
import { toast } from "sonner";
import {
  generatePdfSummary,
  storePDFSummaryAction,
} from "@/actions/upload-actions";
import { useRef, useState } from "react";

// everything requires the browser is going to be client

const schema = z.object({
  file: z
    .instanceof(File, { message: "Invalid file" })
    .refine((file) => file.size <= 20 * 1024 * 1024, {
      message: "File size must be less than 20MB",
    })
    .refine((file) => file.type.startsWith("application/pdf"), {
      message: "File must be a PDF",
    }),
});

export default function UploadForm() {
  const formRef = useRef<HTMLFormElement>(null);
  const router = useRouter();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { startUpload, routeConfig } = useUploadThing("pdfUploader", {
    onClientUploadComplete: () => {
      toast.success("Uploaded successfully");
    },
    onUploadError: (err) => {
      toast.error("Error occurred while uploading", {
        description: err.message,
      });
    },
    onUploadBegin: () => {
      toast.success("upload has begun for your file");
    },
  });
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const formData = new FormData(e.currentTarget);
      const file = formData.get("file") as File;

      const validatedFileds = schema.safeParse({ file });

      if (!validatedFileds.success) {
        toast.error("Something went wrong", {
          description:
            validatedFileds.error.flatten().fieldErrors.file?.[0] ??
            "Invalid file",
        });
        return;
      }

      toast.message("Uploading PDF...", {
        description: "We are uploading your PDF to our server",
      });

      const resp = await startUpload([file]);
      if (!resp || !resp[0]) {
        toast.error("Something went wrong", {
          description: "Please use a different file",
        });
        return;
      }

      toast.message("Processing PDF...", {
        description: "Processing your PDF. This may take a while",
      });
      const uploadThingServerData = resp[0].serverData;
      const result = await generatePdfSummary(uploadThingServerData);

      const { success, message, data } = result;
      if (data) {
        let storePDFSummaryActionResult;
        toast.message("Success", {
          description: "Summary generated",
        });
        if (data.summary) {
          storePDFSummaryActionResult = await storePDFSummaryAction({
            fileUrl: uploadThingServerData.file.url as string,
            summary: data.summary,
            title: data.title,
            fileName: file.name,
          });
          if (success && storePDFSummaryActionResult.data) {
            toast.message("Success", {
              description: "Summary saved",
            });
            formRef.current?.reset();
            router.push(`/summaries/${storePDFSummaryActionResult.data.id}`);
          }
        }
      }
    } catch (error) {
      setIsLoading(false);
      toast.error("Something went wrong", {
        description: "Please try again",
      });
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col gap-8 w-full max-w-2xl mx-auto">
      <UploadFormInput ref={formRef} onSubmit={handleSubmit} />
    </div>
  );
}
