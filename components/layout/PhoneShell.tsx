"use client";

import { type ReactNode } from "react";
import { AppHeader } from "./AppHeader";
import { BottomNav } from "./BottomNav";

export function PhoneShell({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-screen items-start justify-center bg-[#1E1E1E] px-2 py-4">
      <div className="relative flex h-[calc(100vh-32px)] min-h-[720px] w-full max-w-[390px] flex-col overflow-hidden rounded-[2rem] border border-slate-900/20 bg-[#F7F9FC] shadow-2xl shadow-black/30">
        <AppHeader />
        <main className="flex-1 overflow-y-auto overscroll-contain pb-28 pt-4">{children}</main>
        <BottomNav />
      </div>
    </div>
  );
}
