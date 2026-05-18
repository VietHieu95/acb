"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { ReactNode } from "react";

const iconClass = "h-6 w-6";

const icons: Record<string, ReactNode> = {
  home: (
    <svg viewBox="0 0 24 24" className={iconClass} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 10.5 12 3l9 7.5" />
      <path d="M5 10v10h14V10" />
      <path d="M9 20v-6h6v6" />
    </svg>
  ),
  cards: (
    <svg viewBox="0 0 24 24" className={iconClass} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="5" width="18" height="14" rx="3" />
      <path d="M3 10h18" />
      <path d="M7 15h4" />
    </svg>
  ),
  qr: (
    <svg viewBox="0 0 24 24" className="h-7 w-7" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="4" y="4" width="6" height="6" rx="1" />
      <rect x="14" y="4" width="6" height="6" rx="1" />
      <rect x="4" y="14" width="6" height="6" rx="1" />
      <path d="M14 14h2v2" />
      <path d="M20 14v6h-6" />
      <path d="M17 17h3" />
    </svg>
  ),
  savings: (
    <svg viewBox="0 0 24 24" className={iconClass} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M5 11c0-4 3.5-7 8-7 3 0 5.5 1.4 6.7 3.7" />
      <path d="M4 13h16" />
      <path d="M6 13c.5 4 3.4 7 7 7s6.5-3 7-7" />
      <path d="M8 8h.01" />
    </svg>
  ),
  rewards: (
    <svg viewBox="0 0 24 24" className={iconClass} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="m12 3 2.8 5.7 6.2.9-4.5 4.4 1.1 6.2L12 17.3 6.4 20.2 7.5 14 3 9.6l6.2-.9L12 3Z" />
    </svg>
  ),
};

const tabs = [
  { href: "/home", label: "Home", icon: icons.home },
  { href: "/transactions", label: "Cards", icon: icons.cards },
  { href: "/scan", label: "QR", icon: icons.qr, center: true },
  { href: "/forest", label: "Savings", icon: icons.savings },
  { href: "/rewards", label: "Rewards", icon: icons.rewards },
];

export function BottomNav() {
  const pathname = usePathname();

  return (
    <nav className="absolute bottom-0 left-0 right-0 z-30 border-t border-slate-200 bg-white/95 shadow-[0_-8px_24px_rgba(15,23,42,0.08)] backdrop-blur-md">
      <div className="flex items-end px-1 pb-1">
        {tabs.map((tab) => {
          const active = pathname === tab.href;
          if (tab.center) {
            return (
              <Link
                key={tab.href}
                href={tab.href}
                className="-mt-6 flex flex-1 flex-col items-center pb-1"
                aria-label={tab.label}
              >
                <span
                  className={`flex h-[58px] w-[58px] items-center justify-center rounded-full shadow-lg ${
                    active
                      ? "bg-[#0878F8] text-white ring-4 ring-[#0878F8]/20"
                      : "bg-[#0878F8] text-white"
                  }`}
                >
                  {tab.icon}
                </span>
                <span className={`mt-1 text-[10px] font-bold ${active ? "text-[#0878F8]" : "text-slate-600"}`}>
                  {tab.label}
                </span>
              </Link>
            );
          }
          return (
            <Link
              key={tab.href}
              href={tab.href}
              className={`flex min-h-[64px] flex-1 flex-col items-center justify-center gap-1 text-[10px] font-medium transition-colors ${
                active ? "text-[#0878F8]" : "text-slate-500 hover:text-slate-700"
              }`}
              aria-label={tab.label}
            >
              {tab.icon}
              <span>{tab.label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
