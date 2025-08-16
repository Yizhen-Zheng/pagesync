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

// ----------- formatting utils for summary viewer -----------

// helper 1: split summary text into sections
export const splitSections = (summary_text: string) => {
  const sections = summary_text
    .split("\n# ")
    .map((section) => section.trim())
    .filter((section) => section !== "")
    .map(parseSection);
  return sections;
};
// helper 2: parse each section into title and content
export const parseSection = (
  section: string
): {
  title: string;
  points: string[];
} => {
  // Assuming the first line is the title and the rest is content
  const [title, ...content] = section.split("\n");

  // If the title starts with '#', remove it, and trim whitespace
  // e.g., "# Section Title"
  const parseddTitle = title.startsWith("#")
    ? title.slice(1).trim()
    : title.trim(); // Remove leading '# ' if present

  const points: String[] = [];
  let currentPoint = "";
  content.forEach((line) => {
    const trimedLine = line.trim(); // trim each line
    if (trimedLine.startsWith("•")) {
      if (currentPoint) {
        points.push(currentPoint.trim()); // Push the previous point
      }
      currentPoint = trimedLine; // Start a new point
    } else if (!trimedLine) {
      if (currentPoint) {
        points.push(currentPoint.trim()); // Push the last point if exists
      }
      currentPoint = ""; // Reset current point
    } else {
      currentPoint += ` ${trimedLine}`; // Append to the current point
    }
  });
  if (currentPoint) {
    points.push(currentPoint.trim()); // Push the last point if exists
  }
  // Remove leading bullet and whitespace
  const cleanedPoints = points
    .map((point) => point.replace(/^[•\s]+/, "").trim())
    .filter((point) => point && point !== "#" && !point.startsWith("[Choose")); // Filter out empty points

  return { title: parseddTitle, points: cleanedPoints };
};

// helper 3: test if point is numbered, main point, has emoji or is empty
export const parsePoint = (point: string) => {
  const isNumbered = /^\d+\./.test(point);
  const isMainPoint = /^•/.test(point);
  const emojiRegex = /[\u{1F300}-\u{1F9FF}]|[\u{2600}-\u{26FF}]/u;
  const hasEmoji = emojiRegex.test(point);
  const isEmpty = point.trim() === "";
  return { isNumbered, isMainPoint, hasEmoji, isEmpty };
};
// helper 4: split point content into emoji and text
export const parseEmojoPoint = (content: string) => {
  const cleanContent = content.replace(/^[•]\s*/, "").trim();
  const match = cleanContent.match(/^(\p{Emoji}+)(.+)$/u);
  if (!match) {
    return null;
  }
  const [_, emoji, text] = match;
  return {
    emoji: emoji.trim(),
    text: text.trim(),
  };
};
