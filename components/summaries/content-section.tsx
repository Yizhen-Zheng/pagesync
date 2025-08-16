import { parseEmojoPoint, parsePoint } from "@/utils/format-utils";

function EmojiPoint({ point }: { point: string }) {
  const parsed = parseEmojoPoint(point);
  if (!parsed) {
    return null;
  }
  const { emoji, text } = parsed;
  console.log("Parsed emoji:", emoji, "Text:", text);
  return (
    <div className="group relative bg-linear-to-br from-gray-200/[0.08] to-gray-400/[0.03] p-4 rounded-2xl border border-gray-500/10  hover:shadow-lg transition-all ">
      <div className=" absolute inset-0 bg-linear-to-r from-gray-100/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity rounded-2xl"></div>
      <div className="relative flex items-start gap-3">
        <span className="text-lg lg:text-xl shrink-0 pt-1">{emoji}</span>
        <p className="text-lg lg:text-xl text-muted-foreground/90 leading-relaxed">
          {text}
        </p>
      </div>
    </div>
  );
}

function RegularPoint({ point }: { point: string }) {
  return (
    <div className="group relative bg-linear-to-br from-gray-200/[0.08] to-gray-400/[0.03] p-4 rounded-2xl border border-gray-500/10  hover:shadow-lg transition-all ">
      <div className=" absolute inset-0 bg-linear-to-r from-gray-100/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity rounded-2xl"></div>
      <p className="relative text-lg lg:text-xl text-muted-foreground/90 leading-relaxed text-left">
        {point}
      </p>
    </div>
  );
}

export function ContentSection({
  points,
}: {
  title: string;
  points: string[];
}) {
  return (
    <div className="space-y-4">
      {points.map((point, index) => {
        const { isNumbered, isMainPoint, hasEmoji, isEmpty } =
          parsePoint(point);
        if (isEmpty) {
          return <div></div>;
        }

        if (hasEmoji || isMainPoint) {
          return <EmojiPoint key={`emoji-point-${index}`} point={point} />;
        }
        return <RegularPoint key={`regular-point-${index}`} point={point} />;
      })}
    </div>
  );
}
