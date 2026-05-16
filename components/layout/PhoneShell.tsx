"use client";

import { type ReactNode } from "react";
import { AppHeader } from "./AppHeader";
import { BottomNav } from "./BottomNav";

export function PhoneShell({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-200 to-slate-300 flex items-start justify-center py-4 px-2">
      <div className="relative flex w-full max-w-[390px] min-h-[780px] flex-col overflow-hidden rounded-[2rem] border border-slate-300/80 bg-[#F5F7FA] shadow-2xl shadow-slate-400/40">
        <AppHeader />
        <main className="flex-1 overflow-y-auto pb-20">{children}</main>
        <BottomNav />
      </div>
    </div>
  );
}
