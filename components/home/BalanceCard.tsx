"use client";

import Link from "next/link";
import { useEco } from "@/context/EcoProvider";
import { formatVnd } from "@/lib/carbon/calculator";

export function BalanceCard() {
  const { balance } = useEco();

  return (
    <section className="mx-4 -mt-2 rounded-2xl bg-white p-4 shadow-lg shadow-slate-200/60 ring-1 ring-slate-100">
      <p className="text-xs font-medium text-slate-500">Số dư khả dụng</p>
      <p className="mt-1 text-2xl font-bold tracking-tight text-[#0066B3]">
        {formatVnd(balance)}
      </p>
      <p className="mt-2 text-[10px] text-slate-400">
        Tài khoản thanh toán · **** 8842
      </p>
      <Link
        href="/scan"
        className="mt-3 flex w-full items-center justify-center gap-2 rounded-xl bg-[#0066B3] py-2.5 text-sm font-bold text-white shadow-md active:scale-[0.98]"
      >
        <span>📷</span> Quét QR thanh toán
      </Link>
    </section>
  );
}
