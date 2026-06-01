"use client";

import { useState } from "react";
import { useEco } from "@/context/EcoProvider";
import { BAG_CO2_REDUCTION_KG, BAG_GREEN_POINTS } from "@/lib/carbon/calculator";
import { Icon } from "@/components/ui/Icon";

export function ReusableBagPrompt() {
  const { showBagPrompt, answerBagPrompt } = useEco();
  const [toast, setToast] = useState<string | null>(null);

  if (!showBagPrompt && !toast) return null;

  const handleAnswer = (usedBag: boolean) => {
    answerBagPrompt(usedBag);
    if (usedBag) {
      setToast(
        `+${BAG_GREEN_POINTS} điểm xanh · −${BAG_CO2_REDUCTION_KG} kg CO₂e`,
      );
    } else {
      setToast("Đã ghi nhận. Lần sau hãy mang túi vải nhé!");
    }
    setTimeout(() => setToast(null), 4000);
  };

  if (toast && !showBagPrompt) {
    return (
      <div className="fixed inset-x-0 top-24 z-50 mx-auto max-w-[360px] animate-slide-up rounded-xl bg-[#2E7D32] px-4 py-3 text-center text-sm font-medium text-white shadow-lg">
        {toast}
      </div>
    );
  }

  if (!showBagPrompt) return null;

  return (
    <>
      <div className="fixed inset-0 z-40 bg-black/40 backdrop-blur-sm" />
      <div
        className="fixed inset-x-4 bottom-24 z-50 mx-auto max-w-[360px] animate-slide-up rounded-2xl bg-white p-5 shadow-2xl"
        role="dialog"
        aria-labelledby="bag-prompt-title"
      >
        <div className="mb-3 flex items-center gap-2">
          <span className="flex h-10 w-10 items-center justify-center rounded-full bg-green-100 text-acb-green">
            <Icon name="bag" className="h-5 w-5" />
          </span>
          <div>
            <p className="text-[10px] font-semibold uppercase tracking-wide text-acb">
              Thông báo Eco-Tracker
            </p>
            <h2 id="bag-prompt-title" className="text-sm font-bold text-slate-800">
              Bạn có sử dụng túi vải cá nhân không?
            </h2>
          </div>
        </div>
        <p className="mb-4 text-xs text-slate-500">
          Giao dịch tại Co.opmart vừa qua. Trả lời để điều chỉnh carbon và cộng
          điểm Khu rừng.
        </p>
        <div className="flex gap-2">
          <button
            type="button"
            onClick={() => handleAnswer(true)}
            className="flex-1 rounded-xl bg-[#2E7D32] py-2.5 text-sm font-semibold text-white hover:bg-[#1B5E20]"
          >
            Có
          </button>
          <button
            type="button"
            onClick={() => handleAnswer(false)}
            className="flex-1 rounded-xl bg-slate-100 py-2.5 text-sm font-semibold text-slate-700 hover:bg-slate-200"
          >
            Không
          </button>
        </div>
      </div>
    </>
  );
}
