"use client";

import Link from "next/link";
import { useEco } from "@/context/EcoProvider";
import { STAGE_LABELS } from "@/lib/forest/score";
import { TreeVisual } from "@/components/forest/TreeVisual";

export function ForestWidget() {
  const { greenScore, treeStage, isWilted } = useEco();

  return (
    <Link
      href="/forest"
      className="mx-4 mt-4 block rounded-2xl bg-gradient-to-br from-[#e8f5e9] to-[#c8e6c9] p-4 shadow-sm ring-1 ring-green-200/60 transition-transform active:scale-[0.98]"
    >
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-sm font-bold text-[#1B5E20]">Khu rừng của bạn</h3>
          <p className="text-xs text-green-800/70">
            {STAGE_LABELS[treeStage]} · {greenScore} điểm xanh
          </p>
        </div>
        <span className="text-xs font-medium text-[#2E7D32]">Xem →</span>
      </div>
      <div className="mt-2 flex justify-center">
        <TreeVisual stage={treeStage} wilted={isWilted} size="sm" />
      </div>
    </Link>
  );
}
