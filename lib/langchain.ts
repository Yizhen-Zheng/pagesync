import { PDFLoader } from "@langchain/community/document_loaders/fs/pdf";

export async function fetchAndExtractPdfText(fileUrl: string) {
  const response = await fetch(fileUrl);
  //raw blob
  const blob = await response.blob();
  // Convert to ArrayBuffer to ensure all data is loaded into memory
  // This guarantees the PDF parser has complete, immediate access to all bytes
  const arrayBuffer = await blob.arrayBuffer();
  // allow random access by PDF parser
  const loader = new PDFLoader(new Blob([arrayBuffer]));
  const docs = await loader.load();
  return docs.map((doc) => doc.pageContent).join("\n");
}
