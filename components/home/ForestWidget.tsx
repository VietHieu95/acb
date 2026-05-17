"use client";

import Link from "next/link";
import { useEco } from "@/context/EcoProvider";
import { STAGE_LABELS } from "@/lib/forest/score";
import { TreeVisual } from "@/components/forest/TreeVisual";

export function ForestWidget() {
  const { greenScore, treeStage, isWilted } = useEco();

  return (
    <section className="mx-4 mt-5">
      <h3 className="text-base font-bold text-slate-800">Dịch vụ dành riêng</h3>
      <div className="mt-3 grid grid-cols-2 gap-3">
        <Link
          href="/forest"
          className="rounded-2xl border border-slate-100 bg-white p-3 shadow-sm active:scale-[0.99]"
        >
          <div className="flex items-start justify-between gap-2">
            <div>
              <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-green-50 text-xl">🌳</span>
              <p className="mt-2 text-sm font-bold leading-tight text-slate-800">Eco Forest</p>
              <p className="mt-1 text-[10px] leading-tight text-slate-500">
                {STAGE_LABELS[treeStage]} · {greenScore} điểm
              </p>
            </div>
            <TreeVisual stage={treeStage} wilted={isWilted} size="sm" />
          </div>
        </Link>
        <Link
          href="/transactions"
          className="rounded-2xl border border-slate-100 bg-white p-3 shadow-sm active:scale-[0.99]"
        >
          <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 text-xl">🌍</span>
          <p className="mt-2 text-sm font-bold leading-tight text-slate-800">Eco-Tracker</p>
          <p className="mt-1 text-[10px] leading-tight text-slate-500">
            MCC + AI merchant để ước tính CO2e
          </p>
          <span className="mt-2 inline-flex rounded-full bg-[#C8F56A] px-2 py-0.5 text-[9px] font-bold text-[#154500]">
            New
          </span>
        </Link>
      </div>
    </section>
  );
}
