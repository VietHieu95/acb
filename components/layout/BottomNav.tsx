"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Icon, type IconName } from "@/components/ui/Icon";

const tabs: {
  href: string;
  label: string;
  icon: IconName;
  center?: boolean;
}[] = [
  { href: "/home", label: "Trang chủ", icon: "home" },
  { href: "/transactions", label: "Giao dịch", icon: "receipt" },
  { href: "/scan", label: "Quét QR", icon: "qr", center: true },
  { href: "/forest", label: "Khu rừng", icon: "tree" },
  { href: "/rewards", label: "Ưu đãi", icon: "gift" },
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
                aria-current={active ? "page" : undefined}
              >
                <span
                  className={`flex h-[58px] w-[58px] items-center justify-center rounded-full bg-acb text-white shadow-lg shadow-acb/30 ${
                    active ? "ring-4 ring-acb/20" : ""
                  }`}
                >
                  <Icon name={tab.icon} className="h-7 w-7" />
                </span>
                <span
                  className={`mt-1 text-[10px] font-bold ${
                    active ? "text-acb" : "text-slate-600"
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
              className={`flex min-h-[64px] flex-1 flex-col items-center justify-center gap-1 text-[10px] font-medium transition-colors ${
                active ? "text-acb" : "text-slate-500 hover:text-slate-700"
              }`}
              aria-label={tab.label}
              aria-current={active ? "page" : undefined}
            >
              <Icon name={tab.icon} className="h-6 w-6" />
              <span>{tab.label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
