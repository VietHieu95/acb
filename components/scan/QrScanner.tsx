"use client";

import { useCallback, useEffect, useId, useRef, useState } from "react";
import { Html5Qrcode } from "html5-qrcode";
import { parseQrPayload } from "@/lib/qr/decode";
import type { QrMerchant } from "@/lib/qr/merchants";

interface QrScannerProps {
  onDetected: (merchant: QrMerchant) => void;
  active: boolean;
}

export function QrScanner({ onDetected, active }: QrScannerProps) {
  const regionId = useId().replace(/:/g, "");
  const scannerRef = useRef<Html5Qrcode | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [starting, setStarting] = useState(false);
  const handledRef = useRef(false);

  const stopScanner = useCallback(async () => {
    if (scannerRef.current?.isScanning) {
      try {
        await scannerRef.current.stop();
      } catch {
        /* ignore */
      }
    }
    scannerRef.current = null;
  }, []);

  useEffect(() => {
    if (!active) {
      void stopScanner();
      return;
    }

    handledRef.current = false;
    let cancelled = false;

    const start = async () => {
      setStarting(true);
      setError(null);
      await stopScanner();

      const scanner = new Html5Qrcode(regionId);
      scannerRef.current = scanner;

      try {
        await scanner.start(
          { facingMode: "environment" },
          { fps: 10, qrbox: { width: 240, height: 240 } },
          (decoded) => {
            if (handledRef.current) return;
            const merchant = parseQrPayload(decoded);
            if (!merchant) return;
            handledRef.current = true;
            void stopScanner();
            onDetected(merchant);
          },
          () => {
            /* no QR in frame */
          },
        );
        if (!cancelled) setStarting(false);
      } catch {
        if (!cancelled) {
          setError(
            "Không mở được camera. Hãy cấp quyền camera hoặc chọn dịch vụ bên dưới.",
          );
          setStarting(false);
        }
      }
    };

    void start();

    return () => {
      cancelled = true;
      void stopScanner();
    };
  }, [active, onDetected, regionId, stopScanner]);

  return (
    <div className="relative overflow-hidden rounded-2xl bg-black">
      <div id={regionId} className="min-h-[280px] w-full [&_video]:object-cover" />
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
        <div className="h-56 w-56 rounded-2xl border-2 border-white/80 shadow-[0_0_0_9999px_rgba(0,0,0,0.45)]" />
      </div>
      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-3 text-center text-xs text-white">
        {starting
          ? "Đang mở camera…"
          : "Đưa mã QR vào khung — VietQR demo ACB Eco-Tracker"}
      </div>
      {error && (
        <p className="absolute left-2 right-2 top-2 rounded-lg bg-red-600/90 px-2 py-1 text-center text-[10px] text-white">
          {error}
        </p>
      )}
    </div>
  );
}
