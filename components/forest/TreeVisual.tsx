import type { TreeStage } from "@/lib/types";

const LEAF = "#43A047";
const LEAF_DARK = "#2E7D32";
const TRUNK = "#8D6E63";
const SOIL = "#A1887F";
const BLOSSOM = "#F48FB1";

function TreeArt({ stage }: { stage: TreeStage }) {
  return (
    <svg viewBox="0 0 100 100" className="h-full w-full" role="presentation">
      {/* bóng đất */}
      <ellipse cx="50" cy="90" rx="28" ry="5" fill="#1B5E20" opacity="0.12" />

      {stage === 0 && (
        <>
          <path d="M28 88c0-7 10-11 22-11s22 4 22 11Z" fill={SOIL} />
          <ellipse cx="50" cy="76" rx="6" ry="8" fill={LEAF_DARK} />
          <path d="M50 70c2-3 6-3 8-1-2 3-6 3-8 1Z" fill={LEAF} />
        </>
      )}

      {stage === 1 && (
        <>
          <path d="M30 88c0-6 9-9 20-9s20 3 20 9Z" fill={SOIL} />
          <path d="M50 80V58" stroke={LEAF_DARK} strokeWidth="3" strokeLinecap="round" />
          <path d="M50 66c-9 1-13-4-13-10 8-1 12 4 13 10Z" fill={LEAF} />
          <path d="M50 60c9 1 13-4 13-10-8-1-12 4-13 10Z" fill={LEAF_DARK} />
        </>
      )}

      {stage === 2 && (
        <>
          <rect x="46" y="58" width="8" height="30" rx="3" fill={TRUNK} />
          <circle cx="50" cy="48" r="20" fill={LEAF} />
          <circle cx="38" cy="56" r="12" fill={LEAF_DARK} />
          <circle cx="62" cy="56" r="12" fill={LEAF_DARK} />
        </>
      )}

      {stage === 3 && (
        <>
          <rect x="44" y="56" width="12" height="34" rx="4" fill={TRUNK} />
          <circle cx="50" cy="42" r="26" fill={LEAF} />
          <circle cx="32" cy="52" r="16" fill={LEAF_DARK} />
          <circle cx="68" cy="52" r="16" fill={LEAF_DARK} />
          <circle cx="50" cy="40" r="18" fill={LEAF} />
        </>
      )}

      {stage === 4 && (
        <>
          <rect x="44" y="56" width="12" height="34" rx="4" fill={TRUNK} />
          <circle cx="50" cy="42" r="26" fill={LEAF} />
          <circle cx="32" cy="52" r="16" fill={LEAF_DARK} />
          <circle cx="68" cy="52" r="16" fill={LEAF_DARK} />
          <circle cx="36" cy="38" r="4" fill={BLOSSOM} />
          <circle cx="52" cy="30" r="4" fill={BLOSSOM} />
          <circle cx="64" cy="44" r="4" fill={BLOSSOM} />
          <circle cx="46" cy="50" r="4" fill={BLOSSOM} />
          <circle cx="60" cy="36" r="4" fill={BLOSSOM} />
        </>
      )}
    </svg>
  );
}

export function TreeVisual({
  stage,
  wilted,
  size = "lg",
}: {
  stage: TreeStage;
  wilted?: boolean;
  size?: "sm" | "lg";
}) {
  const box = size === "sm" ? "h-16 w-16" : "h-28 w-28";
  return (
    <div
      className={`relative mx-auto ${box} ${
        wilted ? "animate-wilt opacity-70 grayscale-[60%]" : "animate-grow"
      }`}
      role="img"
      aria-label={`Cây giai đoạn ${stage}${wilted ? " (đang héo)" : ""}`}
    >
      <TreeArt stage={stage} />
      {wilted && (
        <svg
          viewBox="0 0 24 24"
          className="absolute -bottom-1 right-2 h-5 w-5 text-amber-500"
          fill="currentColor"
          aria-hidden="true"
        >
          <path d="M12 3s6 7 6 11a6 6 0 0 1-12 0c0-4 6-11 6-11Z" />
        </svg>
      )}
    </div>
  );
}
