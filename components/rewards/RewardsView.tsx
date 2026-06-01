"use client";

import { useState } from "react";
import { useEco } from "@/context/EcoProvider";
import { STAGE_LABELS } from "@/lib/forest/score";
import { RewardCard } from "./RewardCard";
import { DonateModal } from "./DonateModal";
import { Icon } from "@/components/ui/Icon";

export function RewardsView() {
  const { availableGreenPoints, greenScore, treeStage, ecoState } = useEco();
  const [donateOpen, setDonateOpen] = useState(false);

  return (
    <div className="space-y-4 p-4 pb-8">
      <section className="rounded-2xl bg-gradient-to-br from-acb to-acb-dark p-4 text-white">
        <p className="text-xs opacity-80">Điểm rừng tích lũy</p>
        <p className="text-3xl font-bold">{greenScore}</p>
        <p className="mt-1 text-xs opacity-90">
          Khả dụng: {availableGreenPoints} · Rừng: {STAGE_LABELS[treeStage]} · {ecoState.donatedTrees} cây thật
        </p>
      </section>

      <section>
        <h2 className="mb-2 text-sm font-bold text-slate-800">Ưu đãi ESG</h2>
        <div className="space-y-2">
          <RewardCard
            title="Giảm 1% lãi suất trả góp"
            description="Áp dụng khoản vay tiêu dùng xanh khi Rừng nở hoa (600+ điểm)."
            unlocked={treeStage >= 4}
            badge="VIP Xanh"
          />
          <RewardCard
            title="Voucher xe máy điện VinFast"
            description="Giảm 2.000.000₫ khi mua xe máy điện qua đối tác ACB."
            unlocked={treeStage >= 3}
            badge="Stage 3+"
          />
          <RewardCard
            title="Hoàn 5% Grab Xanh SM"
            description="Hoàn tiền tháng tới cho chuyến đi xe điện được nhận diện AI."
            unlocked={treeStage >= 2}
          />
        </div>
      </section>

      <button
        type="button"
        onClick={() => setDonateOpen(true)}
        className="flex w-full items-center justify-center gap-2 rounded-xl bg-acb-green py-3.5 text-sm font-bold text-white shadow-lg shadow-green-200 hover:bg-acb-green-dark"
      >
        <Icon name="tree" className="h-5 w-5" />
        Quyên góp trồng cây thật
      </button>

      <p className="text-center text-[10px] text-slate-400">
        Dữ liệu hành vi ESG giúp ACB phát triển tín dụng xanh B2C trong tương lai
      </p>

      <DonateModal open={donateOpen} onClose={() => setDonateOpen(false)} />
    </div>
  );
}
