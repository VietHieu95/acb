"use client";

import { useEco } from "@/context/EcoProvider";
import {
  STAGE_LABELS,
  STAGE_THRESHOLDS,
  getStageProgress,
} from "@/lib/forest/score";
import { TreeVisual } from "./TreeVisual";
import { Icon } from "@/components/ui/Icon";

export function ForestScene() {
  const { availableGreenPoints, greenScore, treeStage, isWilted, ecoState } = useEco();
  const progress = getStageProgress(greenScore, treeStage);
  const nextThreshold = treeStage < 4 ? STAGE_THRESHOLDS[treeStage + 1] : null;

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
          <span className="font-medium text-slate-700">Điểm xanh tích lũy</span>
          <span className="font-bold text-[#2E7D32]">{greenScore}</span>
        </div>
        <div className="mt-2 h-3 overflow-hidden rounded-full bg-slate-100">
          <div
            className="h-full rounded-full bg-gradient-to-r from-[#66BB6A] to-[#2E7D32] transition-all duration-700"
            style={{ width: `${progress}%` }}
          />
        </div>
        <div className="mt-2 flex justify-between gap-2 text-[10px] text-slate-500">
          <span>Điểm khả dụng để quyên góp: {availableGreenPoints}</span>
          {nextThreshold !== null && treeStage < 4 ? (
            <span>
              Cần thêm {nextThreshold - greenScore} điểm
            </span>
          ) : (
            <span>Đã đạt cấp cao nhất</span>
          )}
        </div>
      </div>

      <section className="mt-4 w-full rounded-xl bg-white p-4 shadow-sm ring-1 ring-slate-100">
        <div className="flex items-center justify-between gap-2">
          <h2 className="text-sm font-bold text-slate-800">Lộ trình cấp rừng</h2>
          <span className="rounded-full bg-green-50 px-2 py-0.5 text-[10px] font-semibold text-green-800">
            Bạn đang ở: {STAGE_LABELS[treeStage]}
          </span>
        </div>
        <div className="mt-3 space-y-2">
          {STAGE_LABELS.map((label, index) => {
            const threshold = STAGE_THRESHOLDS[index];
            const completed = greenScore >= threshold;
            const current = treeStage === index;
            const needed = Math.max(0, threshold - greenScore);

            return (
              <div
                key={label}
                className={`flex items-center gap-3 rounded-xl border p-3 ${
                  current
                    ? "border-[#2E7D32] bg-green-50"
                    : completed
                      ? "border-green-100 bg-white"
                      : "border-slate-100 bg-slate-50"
                }`}
              >
                <span
                  className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-xs font-bold ${
                    completed ? "bg-acb-green text-white" : "bg-slate-200 text-slate-500"
                  }`}
                >
                  {completed ? <Icon name="check" className="h-4 w-4" /> : index + 1}
                </span>
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-semibold text-slate-800">{label}</p>
                  <p className="text-[10px] text-slate-500">
                    Mốc: {threshold} điểm
                    {!completed && ` · Cần thêm ${needed} điểm`}
                    {current && " · Cấp hiện tại"}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      <div className="mt-4 w-full space-y-2 text-xs text-slate-600">
        <p className="rounded-lg bg-white/80 p-3 ring-1 ring-slate-100">
          <strong className="text-[#0066B3]">Cách chơi:</strong> Giao dịch xanh
          (VinBus, Xanh SM, tàu hỏa…) cộng điểm. Giao dịch đỏ (xăng, máy bay)
          trừ điểm.
        </p>
        {ecoState.donatedTrees > 0 && (
          <p className="rounded-lg bg-green-50 p-3 text-green-800">
            Bạn đã quyên góp trồng {ecoState.donatedTrees} cây thật. Rừng ảo vẫn giữ cấp độ đã tích lũy.
          </p>
        )}
      </div>
    </div>
  );
}
