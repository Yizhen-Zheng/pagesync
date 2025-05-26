"use client";
import { useUploadThing } from "@/utils/uploadthing";
import UploadFormInput from "./upload-form-input";
import { z } from "zod";

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
      console.error("error occurred while uploading", err);
    },
    onUploadBegin: ({ file }) => {
      console.log("upload has begun for", file);
    },
  });
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const file = formData.get("file") as File;

    // schema validation (zod)
    const validatedFileds = schema.safeParse({ file });
    console.log(validatedFileds);
    if (!validatedFileds.success) {
      console.log(
        validatedFileds.error.flatten().fieldErrors.file?.[0] ?? "Invalid file"
      );
      //   return;
    }

    // TODO: upload to uploadthing
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
