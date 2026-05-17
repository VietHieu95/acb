"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const tabs = [
  { href: "/home", label: "Home", icon: "⌂" },
  { href: "/transactions", label: "Cards", icon: "▭" },
  { href: "/scan", label: "QR", icon: "▣", center: true },
  { href: "/forest", label: "Savings", icon: "◒" },
  { href: "/rewards", label: "Rewards", icon: "☆" },
];

export function BottomNav() {
  const pathname = usePathname();

  return (
    <nav className="absolute bottom-0 left-0 right-0 z-30 border-t border-slate-200 bg-white/95 backdrop-blur-md">
      <div className="flex items-end px-1">
        {tabs.map((tab) => {
          const active = pathname === tab.href;
          if (tab.center) {
            return (
              <Link
                key={tab.href}
                href={tab.href}
                className="-mt-5 flex flex-1 flex-col items-center pb-2"
              >
                <span
                  className={`flex h-13 w-13 items-center justify-center rounded-full text-2xl shadow-lg ${
                    active
                      ? "bg-[#0878F8] text-white ring-4 ring-[#0878F8]/20"
                      : "bg-[#0878F8] text-white"
                  }`}
                >
                  {tab.icon}
                </span>
                <span
                  className={`mt-0.5 text-[9px] font-bold ${
                    active ? "text-[#0878F8]" : "text-slate-600"
                  }`}
                >
                  {tab.label}
                </span>
              </Link>
            );
          }
          return (
            <Link
              key={tab.href}
              href={tab.href}
              className={`flex flex-1 flex-col items-center gap-0.5 py-2.5 text-[9px] font-medium transition-colors ${
                active ? "text-[#0878F8]" : "text-slate-500 hover:text-slate-700"
              }`}
            >
              <span className="text-xl leading-none">{tab.icon}</span>
              {tab.label}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
