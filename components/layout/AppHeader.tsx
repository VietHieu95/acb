"use client";

import { useRef } from "react";
import { useEco } from "@/context/EcoProvider";

export function AppHeader() {
  const { resetDemo, setShowResetHint, showResetHint } = useEco();
  const holdTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const startHold = () => {
    holdTimer.current = setTimeout(() => setShowResetHint(true), 3000);
  };

  const cancelHold = () => {
    if (holdTimer.current) clearTimeout(holdTimer.current);
  };

  return (
    <header className="sticky top-0 z-20 bg-gradient-to-r from-[#0066B3] to-[#004d8c] px-4 pb-3 pt-10 text-white">
      <div className="flex items-center justify-between">
        <button
          type="button"
          className="text-left"
          onPointerDown={startHold}
          onPointerUp={cancelHold}
          onPointerLeave={cancelHold}
          onPointerCancel={cancelHold}
        >
          <p className="text-xs font-medium opacity-80">ACB ONE</p>
          <h1 className="text-lg font-bold tracking-tight">Eco-Tracker</h1>
        </button>
        <span className="rounded-full bg-white/20 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wide">
          Beta Demo
        </span>
      </div>
      {showResetHint && (
        <button
          type="button"
          onClick={resetDemo}
          className="mt-2 w-full rounded-lg bg-white/15 py-1.5 text-xs font-medium hover:bg-white/25"
        >
          ↺ Reset demo
        </button>
      )}
    </header>
  );
}
