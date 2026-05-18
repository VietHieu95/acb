"use client";

import { useEco } from "@/context/EcoProvider";
import { formatCo2 } from "@/lib/carbon/calculator";

const CHART_COLORS = ["#0066B3", "#2E7D32", "#F9A825", "#7B1FA2", "#546E7A"];

export function CarbonSummary() {
  const { totalCo2, categoryBreakdown, ecoState } = useEco();
  const entries = Object.entries(categoryBreakdown).sort((a, b) => b[1] - a[1]);
  const max = Math.max(...entries.map(([, v]) => v), 0.01);

  return (
    <section className="mx-4 mt-4 rounded-2xl bg-white p-4 shadow-sm ring-1 ring-slate-100">
      <div className="flex items-start justify-between gap-3">
        <div>
          <h3 className="text-sm font-bold text-slate-800">Dấu chân carbon tháng này</h3>
          <p className="text-xs text-slate-500">Giáo dục: kg CO2e / 1 triệu VND</p>
        </div>
        <div className="shrink-0 text-right">
          <p className="text-xl font-bold text-slate-900">{formatCo2(totalCo2)}</p>
          <p className="text-[10px] text-slate-500">CO2e</p>
        </div>
      </div>

      <div className="mt-3 rounded-xl bg-slate-50 p-3 ring-1 ring-slate-100">
        <p className="text-[10px] font-semibold uppercase text-slate-500">Công thức demo</p>
        <p className="mt-1 font-mono text-[10px] text-slate-700">
CO2e = (VNĐ / 1.000.000) × EF giáo dục
        </p>
        <p className="mt-1 text-[10px] leading-relaxed text-slate-500">
EF dùng để so sánh tương đối lối sống: điện/xăng cao, bus/tàu thấp, shopping/F&B ở mức tham khảo.
        </p>
      </div>

      {ecoState.bagBonusApplied && (
        <p className="mt-2 rounded-lg bg-green-50 px-2 py-1 text-[10px] text-green-800">
          -0,2 kg nhờ túi vải tái sử dụng
        </p>
      )}
      <div className="mt-4 space-y-2">
        {entries.map(([label, value], i) => (
          <div key={label}>
            <div className="mb-1 flex justify-between gap-2 text-[10px]">
              <span className="font-medium text-slate-600">{label}</span>
              <span className="text-slate-500">{formatCo2(value)}</span>
            </div>
            <div className="h-2 overflow-hidden rounded-full bg-slate-100">
              <div
                className="h-full rounded-full transition-all duration-500"
                style={{
                  width: `${(value / max) * 100}%`,
                  backgroundColor: CHART_COLORS[i % CHART_COLORS.length],
                }}
              />
            </div>
          </div>
        ))}
      </div>
      <p className="mt-3 text-[10px] leading-relaxed text-slate-400">
Hệ số mang tính tham khảo cho game hoá B2C, có thể chênh lệch ±30%, không phải kiểm kê carbon chính thức.
      </p>
    </section>
  );
}
