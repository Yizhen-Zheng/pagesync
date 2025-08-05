export function formatFileNameAsTitle(fileName: string): string {
  const removeExtension = fileName.replace(/\.[^/.]+$/, "");
  const removeDashes = removeExtension.replace(/[-_]+/g, " ");
  const splitCamelCase = removeDashes.replace(/([a-z])([A-Z])/g, "$1 $2");
  const titleCase = splitCamelCase
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(" ")
    .trim();
  return titleCase;
}

export function formatDisplayTitle(url: string): string {
  const fileName = url.split("/").pop() || "";

  if (fileName) {
    return formatFileNameAsTitle(fileName);
  }
  return "";
}
