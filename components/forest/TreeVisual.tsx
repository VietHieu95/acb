import type { TreeStage } from "@/lib/types";

const STAGE_EMOJI: Record<TreeStage, string> = {
  0: "🌰",
  1: "🌱",
  2: "🪴",
  3: "🌳",
  4: "🌸",
};

export function TreeVisual({
  stage,
  wilted,
  size = "lg",
}: {
  stage: TreeStage;
  wilted?: boolean;
  size?: "sm" | "lg";
}) {
  const scale = size === "sm" ? "text-5xl" : "text-7xl";
  return (
    <div
      className={`relative inline-flex items-center justify-center ${scale} ${
        wilted ? "animate-wilt opacity-70 grayscale-[40%]" : "animate-grow"
      }`}
      role="img"
      aria-label={`Cây giai đoạn ${stage}`}
    >
      {STAGE_EMOJI[stage]}
      {wilted && (
        <span className="absolute -bottom-1 text-lg" title="Chi tiêu đỏ liên tiếp">
          💧
        </span>
      )}
    </div>
  );
}
