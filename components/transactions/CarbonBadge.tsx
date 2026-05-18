import type { CarbonTier } from "@/lib/types";
import { formatCo2 } from "@/lib/carbon/calculator";

const styles: Record<
  CarbonTier,
  { bg: string; text: string; border: string }
> = {
  low: { bg: "bg-green-50", text: "text-green-800", border: "border-green-200" },
  medium: {
    bg: "bg-amber-50",
    text: "text-amber-800",
    border: "border-amber-200",
  },
  high: { bg: "bg-red-50", text: "text-red-800", border: "border-red-200" },
  unknown: {
    bg: "bg-slate-50",
    text: "text-slate-600",
    border: "border-slate-200",
  },
};

export function CarbonBadge({
  tier,
  label,
  co2eKg,
}: {
  tier: CarbonTier;
  label: string;
  co2eKg: number;
}) {
  const s = styles[tier];
  return (
    <span
      className={`inline-flex items-center gap-1 rounded-full border px-2 py-0.5 text-[10px] font-semibold ${s.bg} ${s.text} ${s.border}`}
    >
      {tier === "unknown" ? label : `${formatCo2(co2eKg)} · ${label}`}
    </span>
  );
}
