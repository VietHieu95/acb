"use client";

import { useEco } from "@/context/EcoProvider";
import {
  STAGE_LABELS,
  STAGE_THRESHOLDS,
  getStageProgress,
} from "@/lib/forest/score";
import { TreeVisual } from "./TreeVisual";

export function ForestScene() {
  const { greenScore, treeStage, isWilted, ecoState } = useEco();
  const progress = getStageProgress(greenScore, treeStage);
  const nextThreshold =
    treeStage < 4 ? STAGE_THRESHOLDS[treeStage + 1] : null;

  return (
    <div className="flex flex-col items-center p-4">
      <div className="w-full rounded-2xl bg-gradient-to-b from-sky-100 via-green-50 to-amber-50 p-6 shadow-inner ring-1 ring-green-100">
        <TreeVisual stage={treeStage} wilted={isWilted} />
        <p className="mt-4 text-center text-lg font-bold text-[#1B5E20]">
          {STAGE_LABELS[treeStage]}
        </p>
        {isWilted && (
          <p className="mt-2 text-center text-xs text-amber-800 animate-pulse">
            Cây đang héo vì 3+ giao dịch phát thải cao liên tiếp. Chi tiêu xanh
            để hồi phục!
          </p>
        )}
      </div>

      <div className="mt-6 w-full rounded-xl bg-white p-4 shadow-sm ring-1 ring-slate-100">
        <div className="flex justify-between text-sm">
          <span className="font-medium text-slate-700">Điểm xanh</span>
          <span className="font-bold text-[#2E7D32]">{greenScore}</span>
        </div>
        <div className="mt-2 h-3 overflow-hidden rounded-full bg-slate-100">
          <div
            className="h-full rounded-full bg-gradient-to-r from-[#66BB6A] to-[#2E7D32] transition-all duration-700"
            style={{ width: `${progress}%` }}
          />
        </div>
        {nextThreshold !== null && treeStage < 4 && (
          <p className="mt-2 text-[10px] text-slate-500">
            Còn {nextThreshold - greenScore} điểm để lên{" "}
            {STAGE_LABELS[treeStage + 1]}
          </p>
        )}
      </div>

      <div className="mt-4 w-full space-y-2 text-xs text-slate-600">
        <p className="rounded-lg bg-white/80 p-3 ring-1 ring-slate-100">
          <strong className="text-[#0066B3]">Cách chơi:</strong> Giao dịch xanh
          (VinBus, Xanh SM, tàu hỏa…) cộng điểm. Giao dịch đỏ (xăng, máy bay)
          trừ điểm.
        </p>
        {ecoState.donatedTrees > 0 && (
          <p className="rounded-lg bg-green-50 p-3 text-green-800">
            Bạn đã quyên góp trồng {ecoState.donatedTrees} cây thật qua dự án
            cộng đồng ACB × GreenVN.
          </p>
        )}
      </div>
    </div>
  );
}
