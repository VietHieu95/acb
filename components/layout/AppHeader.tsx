"use client";

import { useRef } from "react";
import { useEco } from "@/context/EcoProvider";
import { Icon } from "@/components/ui/Icon";

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
    <header className="relative bg-gradient-to-br from-acb to-acb-dark px-5 pb-16 pt-7 text-white">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -right-16 top-12 h-56 w-56 rounded-full bg-white/10" />
        <div className="absolute -bottom-24 left-8 h-72 w-72 rotate-45 rounded-[5rem] bg-white/10" />
      </div>
      <div className="relative flex items-start justify-between">
        <button
          type="button"
          className="flex items-center gap-3 text-left"
          onPointerDown={startHold}
          onPointerUp={cancelHold}
          onPointerLeave={cancelHold}
          onPointerCancel={cancelHold}
        >
          <span className="flex h-12 w-12 items-center justify-center rounded-full bg-white text-acb-green shadow-lg">
            <Icon name="leaf" className="h-6 w-6" />
          </span>
          <span>
            <span className="block text-xs text-white/80">Chào buổi sáng</span>
            <span className="block text-lg font-bold leading-tight">Bình An</span>
          </span>
        </button>
        <div className="flex gap-2">
          <span className="flex h-10 w-10 items-center justify-center rounded-full bg-white/20 backdrop-blur">
            <Icon name="sparkle" className="h-5 w-5" />
          </span>
          <span className="flex h-10 w-10 items-center justify-center rounded-full bg-white/20 backdrop-blur">
            <Icon name="bell" className="h-5 w-5" />
          </span>
        </div>
      </div>
      <div className="relative mt-5">
        <p className="text-sm text-white/85">Ngân hàng số</p>
        <p className="mt-1 text-3xl font-black tracking-tight">ACB ONE</p>
        <p className="mt-1 text-sm text-white/85">Một chạm, trải nghiệm trọn vẹn</p>
      </div>
      {showResetHint && (
        <button
          type="button"
          onClick={resetDemo}
          className="relative mt-3 w-full rounded-xl bg-white/20 py-2 text-xs font-medium backdrop-blur hover:bg-white/25"
        >
          Đặt lại demo
        </button>
      )}
    </header>
  );
}
