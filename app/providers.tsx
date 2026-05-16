"use client";

import { EcoProvider } from "@/context/EcoProvider";
import type { ReactNode } from "react";

export function Providers({ children }: { children: ReactNode }) {
  return <EcoProvider>{children}</EcoProvider>;
}
