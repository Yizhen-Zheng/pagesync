"use client";
import { useUploadThing } from "@/utils/uploadthing";
import UploadFormInput from "./upload-form-input";
import { z } from "zod";
import { toast } from "sonner";
import { generatePdfSummary } from "@/actions/upload-actions";

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
  const { startUpload, routeConfig } = useUploadThing("pdfUploader", {
    onClientUploadComplete: () => {
      console.log("uploaded successfully!");
    },
    onUploadError: (err) => {
      toast.error("Error occurred while uploading", {
        description: err.message,
      });
    },
    onUploadBegin: ({ file }) => {
      console.log("upload has begun for", file);
    },
  });
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
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
    if (!resp) {
      toast.error("Something went wrong", {
        description: "Please use a different file",
      });
      return;
    }

    toast.message("Processing PDF...", {
      description: "The AI is reading your PDF. This may take a while",
    });

    const summary = await generatePdfSummary(resp);
    // pass to ai
    // TODO: save to db
    // TODO: redirect to the [id] summary page
  };

  return (
    <div className="flex flex-col gap-8 w-full max-w-2xl mx-auto">
      <UploadFormInput onSubmit={handleSubmit} />
    </div>
  );
}
