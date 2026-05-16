"use client";

import { type ReactNode } from "react";
import { PhoneShell } from "./PhoneShell";
import { ReusableBagPrompt } from "@/components/push/ReusableBagPrompt";

export function AppShell({ children }: { children: ReactNode }) {
  return (
    <PhoneShell>
      {children}
      <ReusableBagPrompt />
    </PhoneShell>
  );
}
