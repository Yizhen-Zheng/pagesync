import { createUploadthing, type FileRouter } from "uploadthing/next";
import { UploadThingError } from "uploadthing/server";
import { currentUser } from "@clerk/nextjs/server";

const f = createUploadthing();
// createUploadthing: a factory , return: a builder function

export const ourFileRouter = {
  pdfUploader: f({ pdf: { maxFileSize: "32MB" } })
    .middleware(async ({ req }) => {
      const user = await currentUser();
      if (!user) {
        throw new UploadThingError("Unauthorized");
      }
      return { userId: user.id };
    })
    .onUploadComplete(async ({ metadata, file }) => {
      // TODO: Handle uploaded file

      return {
        userId: metadata.userId,
        file: { url: file.ufsUrl, name: file.name },
      };
    }),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;
/*
f: take an input config, return a new obj with methods
f({ 
   memeType1: {maxFileSize: "32MB"},  <--different end points
   memeType2: {maxFileSize: "32MB", maxFileCount: 10},
   ...
})
chain: -> middleware -> onUploadComplete(process file or further action)
*/
