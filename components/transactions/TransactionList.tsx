"use client";

import { useMemo, useState } from "react";
import { useEco } from "@/context/EcoProvider";
import { formatCo2, formatVnd } from "@/lib/carbon/calculator";
import { CarbonBadge } from "./CarbonBadge";

const categoryIcons: Record<string, string> = {
  transport: "🚌",
  food: "🍽️",
  shopping: "🛒",
  travel: "✈️",
  utilities: "⚡",
  other: "📦",
};

type Filter = "all" | "low" | "high";

export function TransactionList() {
  const { transactions } = useEco();
  const [filter, setFilter] = useState<Filter>("all");

  const filtered = useMemo(() => {
    const sorted = [...transactions].sort(
      (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
    );
    if (filter === "all") return sorted;
    if (filter === "low") return sorted.filter((t) => t.tier === "low");
    return sorted.filter((t) => t.tier === "high");
  }, [transactions, filter]);

  const filters: { key: Filter; label: string }[] = [
    { key: "all", label: "Tất cả" },
    { key: "low", label: "Xanh" },
    { key: "high", label: "Đỏ" },
  ];

  return (
    <div className="space-y-3 p-4">
      <div>
        <h2 className="text-base font-bold text-slate-800">Giao dịch tháng 5</h2>
        <p className="text-xs text-slate-500">
          Mỗi giao dịch có MCC, merchant và CO2e ước tính
        </p>
      </div>
      <div className="rounded-xl bg-white p-3 text-[10px] leading-relaxed text-slate-500 shadow-sm ring-1 ring-slate-100">
        <p>
          <strong className="text-slate-700">Minh bạch:</strong> App chỉ tính CO2e cho giao dịch có dữ liệu hoạt động bảo vệ được như xăng, xe, bus, tàu, máy bay. Mua sắm/F&B/thời trang sẽ ghi chưa đủ dữ liệu.
        </p>
      </div>
      <div className="flex gap-2">
        {filters.map((f) => (
          <button
            key={f.key}
            type="button"
            onClick={() => setFilter(f.key)}
            className={`min-h-9 rounded-full px-3 py-1 text-xs font-medium transition-colors ${
              filter === f.key
                ? "bg-[#0066B3] text-white"
                : "bg-white text-slate-600 ring-1 ring-slate-200"
            }`}
          >
            {f.label}
          </button>
        ))}
      </div>
      <ul className="space-y-2">
        {filtered.map((tx) => (
          <li
            key={tx.id}
            className="rounded-xl bg-white p-3 shadow-sm ring-1 ring-slate-100"
          >
            <div className="flex items-start gap-3">
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-slate-100 text-lg">
                {categoryIcons[tx.category] ?? "📦"}
              </span>
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-semibold text-slate-800">
                  {tx.merchant}
                  {tx.id.startsWith("user-") && (
                    <span className="ml-1 rounded bg-[#0066B3]/10 px-1 py-0.5 text-[9px] font-bold text-[#0066B3]">
                      Mới
                    </span>
                  )}
                </p>
                <p className="text-xs text-slate-500">
                  MCC {tx.mcc} · {tx.carbonMethod} · {new Date(tx.date).toLocaleDateString("vi-VN", {
                    day: "2-digit",
                    month: "2-digit",
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </p>
                {tx.merchantTag && (
                  <p className="mt-0.5 text-[10px] font-medium text-[#2E7D32]">
                    Profile: {tx.merchantTag}
                  </p>
                )}
                <div className="mt-2 flex flex-wrap items-center justify-between gap-2">
                  <span className="text-sm font-bold text-slate-900">
                    {formatVnd(tx.amountVnd)}
                  </span>
                  <CarbonBadge
                    tier={tx.tier}
                    label={tx.tierLabel}
                    co2eKg={tx.co2eKg}
                  />
                </div>
                <div className="mt-2 rounded-lg bg-slate-50 p-2 text-[10px] leading-relaxed text-slate-500">
                  <p className="font-mono text-slate-600">{tx.carbonFormula}</p>
                  <p className="mt-1">{tx.carbonAssumption}</p>
                  <p className="mt-1 font-medium text-slate-600">{tx.carbonMethod === "not-estimated" ? "Lý do" : "Nguồn"}: {tx.carbonSource}</p>
                  <p className="mt-1 text-slate-400">{tx.carbonConfidence === "not-rated" ? "Không ảnh hưởng điểm xanh" : `Độ tin cậy: ${tx.carbonConfidence} · Điểm xanh: ${tx.greenPoints > 0 ? "+" : ""}${tx.greenPoints}`}</p>
                </div>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
