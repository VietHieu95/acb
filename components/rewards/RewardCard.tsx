import { Icon } from "@/components/ui/Icon";

export function RewardCard({
  title,
  description,
  unlocked,
  badge,
}: {
  title: string;
  description: string;
  unlocked: boolean;
  badge?: string;
}) {
  return (
    <article
      className={`rounded-xl p-4 ring-1 transition-all ${
        unlocked
          ? "bg-gradient-to-br from-green-50 to-white ring-green-200 shadow-sm"
          : "bg-slate-50 ring-slate-200 opacity-75"
      }`}
    >
      <div className="flex items-start justify-between gap-2">
        <h3 className="text-sm font-bold text-slate-800">{title}</h3>
        {badge && (
          <span
            className={`shrink-0 rounded-full px-2 py-0.5 text-[10px] font-bold ${
              unlocked
                ? "bg-[#2E7D32] text-white"
                : "bg-slate-200 text-slate-500"
            }`}
          >
            {badge}
          </span>
        )}
      </div>
      <p className="mt-1 text-xs text-slate-600">{description}</p>
      {!unlocked && (
        <p className="mt-2 flex items-center gap-1 text-[10px] font-medium text-slate-400">
          <Icon name="lock" className="h-3.5 w-3.5" />
          Mở khóa khi đạt mức rừng yêu cầu
        </p>
      )}
    </article>
  );
}
