"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const tabs = [
  { href: "/home", label: "Trang chủ", icon: "🏠" },
  { href: "/transactions", label: "Giao dịch", icon: "💳" },
  { href: "/scan", label: "Quét QR", icon: "📷", center: true },
  { href: "/forest", label: "Khu rừng", icon: "🌳" },
  { href: "/rewards", label: "Ưu đãi", icon: "🎁" },
];

export function BottomNav() {
  const pathname = usePathname();

  return (
    <nav className="absolute bottom-0 left-0 right-0 z-30 border-t border-slate-200 bg-white/95 backdrop-blur-md">
      <div className="flex items-end">
        {tabs.map((tab) => {
          const active = pathname === tab.href;
          if (tab.center) {
            return (
              <Link
                key={tab.href}
                href={tab.href}
                className="-mt-4 flex flex-1 flex-col items-center"
              >
                <span
                  className={`flex h-12 w-12 items-center justify-center rounded-full text-xl shadow-lg ${
                    active
                      ? "bg-[#0066B3] text-white ring-4 ring-[#0066B3]/20"
                      : "bg-[#0066B3] text-white"
                  }`}
                >
                  {tab.icon}
                </span>
                <span
                  className={`mt-0.5 text-[9px] font-bold ${
                    active ? "text-[#0066B3]" : "text-slate-600"
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
                active ? "text-[#0066B3]" : "text-slate-500 hover:text-slate-700"
              }`}
            >
              <span className="text-base">{tab.icon}</span>
              {tab.label}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
