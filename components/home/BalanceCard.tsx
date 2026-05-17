"use client";

import Link from "next/link";
import { useEco } from "@/context/EcoProvider";
import { formatVnd } from "@/lib/carbon/calculator";

const quickActions = [
  { label: "Accounts", icon: "🏦" },
  { label: "Cards", icon: "💳" },
  { label: "Savings", icon: "🐷" },
  { label: "Loans", icon: "💵" },
  { label: "Payment", icon: "👛", href: "/scan", badge: "QR" },
  { label: "Investment", icon: "📈" },
  { label: "Insurance", icon: "🛡️" },
  { label: "Asset", icon: "🏘️", badge: "New" },
];

export function BalanceCard() {
  const { balance, greenScore } = useEco();

  return (
    <section className="mx-4 rounded-[1.4rem] bg-white p-4 shadow-xl shadow-slate-200/80 ring-1 ring-slate-100">
      <div className="grid grid-cols-[1fr_116px] gap-3">
        <div className="min-w-0 rounded-2xl bg-white p-2">
          <p className="text-xs text-slate-500">Available balance</p>
          <p className="mt-1 truncate text-[22px] font-bold tracking-tight text-[#0878F8]">
            {formatVnd(balance)}
          </p>
          <p className="mt-1 text-[10px] text-slate-400">Payment account · **** 8842</p>
        </div>
        <div className="rounded-2xl bg-[#F5F8FF] p-3">
          <p className="text-[11px] text-slate-500">ACB Rewards</p>
          <p className="mt-1 text-xl font-bold text-[#0878F8]">{greenScore}</p>
          <p className="text-[10px] text-slate-500">green points</p>
        </div>
      </div>

      <Link
        href="/scan"
        className="mt-4 flex items-center gap-3 rounded-2xl border border-slate-100 bg-white px-3 py-3 text-left shadow-sm active:scale-[0.99]"
      >
        <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#EAF4FF] text-2xl">✅</span>
        <span className="min-w-0 flex-1 text-sm font-semibold leading-snug text-slate-700">
Pay by QR and track carbon instantly
        </span>
      </Link>

      <div className="mt-4 grid grid-cols-4 gap-x-2 gap-y-4 border-t border-slate-100 pt-4">
        {quickActions.map((action) => {
          const content = (
            <>
              <span className="relative flex h-14 w-14 items-center justify-center rounded-full bg-[#F2F7FF] text-2xl text-[#0878F8]">
                {action.icon}
                {action.badge && (
                  <span className="absolute -right-1 -top-1 rounded-full bg-[#C8F56A] px-1.5 py-0.5 text-[9px] font-bold text-[#154500]">
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
              <Link key={action.label} href={action.href} className="flex flex-col items-center">
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
