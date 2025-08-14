import { useZoraCreateProvider } from "@/providers/ZoraCreateProvider";
import { ChangeEvent, useState } from "react";

type ScrollPosition = "top" | "mid" | "bottom" | null;

const TextInput = () => {
  const { fileUploading, write, writingText, creating } = useZoraCreateProvider();
  const [scrollPosition, setScrollPosition] = useState<ScrollPosition>(null);

  const [isEditing] = useState(true);

  const handleScroll = (e: React.UIEvent<HTMLElement>) => {
    const { scrollTop, scrollHeight, clientHeight } = e.target as HTMLElement;
    const position: ScrollPosition =
      scrollTop === 0
        ? "top"
        : scrollHeight - scrollTop - clientHeight <= 5
        ? "bottom"
        : "mid";
    setScrollPosition(position);
  };

  return (
    <div className="overflow-hidden size-full !font-spectral shadow-[5px_6px_2px_2px_#0000000f] border border-grey-moss-300 bg-white disabled:cursor-not-allowed relative">
      {isEditing ? (
        <textarea
          className="relative z-[2] size-full !outline-none p-2 md:p-4 pt-24 bg-grey-eggshell !resize-none overflow-y-auto"
          value={writingText}
          disabled={Boolean(fileUploading || creating)}
          onChange={(e: ChangeEvent<HTMLTextAreaElement>) => {
            write(e.target.value);
          }}
          onScroll={handleScroll}
        />
      ) : (
        <div
          className="relative z-[2] size-full p-2 md:p-4 pt-24 bg-grey-eggshell overflow-y-auto whitespace-pre-wrap"
          onScroll={handleScroll}
        >
          {writingText}
        </div>
      )}

      {scrollPosition && (
        <>
          {scrollPosition !== "top" && (
            <div className="pointer-events-none absolute z-[3] left-0 top-0 bg-gradientTopBottom w-full h-24" />
          )}
          {scrollPosition !== "bottom" && (
            <div className="pointer-events-none absolute z-[3] left-0 bottom-0 bg-gradientBottomTop w-full h-24" />
          )}
        </>
      )}
    </div>
  );
};

export default TextInput;
