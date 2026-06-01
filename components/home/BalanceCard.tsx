"use client";

import Link from "next/link";
import { useEco } from "@/context/EcoProvider";
import { formatVnd } from "@/lib/carbon/calculator";
import { Icon, type IconName } from "@/components/ui/Icon";

const quickActions: {
  label: string;
  icon: IconName;
  href?: string;
  badge?: string;
}[] = [
  { label: "Tài khoản", icon: "account" },
  { label: "Thẻ", icon: "card" },
  { label: "Tiết kiệm", icon: "savings" },
  { label: "Vay vốn", icon: "loan" },
  { label: "Thanh toán", icon: "wallet", href: "/scan", badge: "QR" },
  { label: "Đầu tư", icon: "investment" },
  { label: "Bảo hiểm", icon: "insurance" },
  { label: "Tài sản", icon: "asset", badge: "Mới" },
];

export function BalanceCard() {
  const { balance, greenScore } = useEco();

  return (
    <section className="mx-4 rounded-[1.4rem] bg-white p-4 shadow-xl shadow-slate-200/80 ring-1 ring-slate-100">
      <div className="grid grid-cols-[1fr_116px] gap-3">
        <div className="min-w-0 rounded-2xl bg-white p-2">
          <p className="text-xs text-slate-500">Số dư khả dụng</p>
          <p className="mt-1 truncate text-[22px] font-bold tracking-tight text-acb">
            {formatVnd(balance)}
          </p>
          <p className="mt-1 text-[10px] text-slate-400">
            Tài khoản thanh toán · **** 8842
          </p>
        </div>
        <div className="rounded-2xl bg-acb-tint p-3">
          <p className="text-[11px] text-slate-500">Điểm thưởng</p>
          <p className="mt-1 text-xl font-bold text-acb">{greenScore}</p>
          <p className="text-[10px] text-slate-500">điểm xanh</p>
        </div>
      </div>

      <Link
        href="/scan"
        className="mt-4 flex items-center gap-3 rounded-2xl border border-slate-100 bg-white px-3 py-3 text-left shadow-sm active:scale-[0.99]"
      >
        <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-acb-tint text-acb-green">
          <Icon name="leaf" className="h-6 w-6" />
        </span>
        <span className="min-w-0 flex-1 text-sm font-semibold leading-snug text-slate-700">
          Thanh toán QR và đo carbon tức thì
        </span>
      </Link>

      <div className="mt-4 grid grid-cols-4 gap-x-2 gap-y-4 border-t border-slate-100 pt-4">
        {quickActions.map((action) => {
          const content = (
            <>
              <span className="relative flex h-14 w-14 items-center justify-center rounded-full bg-acb-tint text-acb">
                <Icon name={action.icon} className="h-6 w-6" />
                {action.badge && (
                  <span className="absolute -right-1 -top-1 rounded-full bg-acb-lime px-1.5 py-0.5 text-[9px] font-bold text-acb-green-dark">
                    {action.badge}
                  </span>
                )}
              </span>
              <span className="mt-1 text-center text-[11px] leading-tight text-slate-600">
                {action.label}
              </span>
            </>
          );

          if (action.href) {
            return (
              <Link
                key={action.label}
                href={action.href}
                className="flex flex-col items-center"
              >
                {content}
              </Link>
            );
          }

          return (
            <div key={action.label} className="flex flex-col items-center">
              {content}
            </div>
          );
        })}
      </div>
    </section>
  );
}
