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
      <div className="flex items-start justify-between">
        <div>
          <h3 className="text-sm font-bold text-slate-800">Dấu chân carbon</h3>
          <p className="text-xs text-slate-500">Tháng 5/2026 · Input-Output Model</p>
        </div>
        <div className="text-right">
          <p className="text-xl font-bold text-slate-900">{formatCo2(totalCo2)}</p>
          <p className="text-[10px] text-slate-500">CO₂e</p>
        </div>
      </div>
      {ecoState.bagBonusApplied && (
        <p className="mt-2 rounded-lg bg-green-50 px-2 py-1 text-[10px] text-green-800">
          −0,2 kg nhờ túi vải tái sử dụng
        </p>
      )}
      <div className="mt-4 space-y-2">
        {entries.map(([label, value], i) => (
          <div key={label}>
            <div className="mb-1 flex justify-between text-[10px]">
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
    </section>
  );
}
