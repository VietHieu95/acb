"use client";

import { useState } from "react";
import { useEco } from "@/context/EcoProvider";

const OPTIONS = [
  { points: 30, trees: 1, label: "30 điểm" },
  { points: 80, trees: 5, label: "80 điểm" },
];

export function DonateModal({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const { availableGreenPoints, donatePoints } = useEco();
  const [message, setMessage] = useState<string | null>(null);

  if (!open) return null;

  const handleDonate = (points: number, trees: number) => {
    if (availableGreenPoints < points) {
      setMessage("Không đủ điểm xanh!");
      return;
    }
    donatePoints(points);
    setMessage(`🌳 Đã quyên góp trồng ${trees} cây thật!`);
    setTimeout(() => {
      setMessage(null);
      onClose();
    }, 2000);
  };

  return (
    <>
      <div className="fixed inset-0 z-40 bg-black/40" onClick={onClose} />
      <div className="fixed inset-x-4 bottom-24 z-50 mx-auto max-w-[360px] rounded-2xl bg-white p-5 shadow-2xl">
        <h2 className="text-base font-bold text-slate-800">Trồng cây thật</h2>
        <p className="mt-1 text-xs text-slate-500">
          Đổi điểm xanh hỗ trợ dự án GreenVN × ACB
        </p>
        <p className="mt-2 text-sm">
          Điểm khả dụng:{" "}
          <strong className="text-[#2E7D32]">{availableGreenPoints}</strong>
        </p>
        {message && (
          <p className="mt-2 rounded-lg bg-green-50 p-2 text-center text-xs text-green-800">
            {message}
          </p>
        )}
        <div className="mt-4 space-y-2">
          {OPTIONS.map((opt) => (
            <button
              key={opt.points}
              type="button"
              disabled={availableGreenPoints < opt.points}
              onClick={() => handleDonate(opt.points, opt.trees)}
              className="w-full rounded-xl border border-green-200 bg-green-50 py-3 text-sm font-semibold text-[#1B5E20] disabled:opacity-40 hover:bg-green-100"
            >
              {opt.label} → +{opt.trees} cây
            </button>
          ))}
        </div>
        <button
          type="button"
          onClick={onClose}
          className="mt-3 w-full py-2 text-xs text-slate-500"
        >
          Đóng
        </button>
      </div>
    </>
  );
}
