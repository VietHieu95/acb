"use client";

import { useEffect, useState } from "react";
import QRCode from "qrcode";
import Link from "next/link";
import { encodeQrPayload, QR_MERCHANTS } from "@/lib/qr/merchants";
import { formatVnd } from "@/lib/carbon/calculator";

const tierBorder = {
  green: "ring-green-300",
  yellow: "ring-amber-300",
  red: "ring-red-300",
};

export function QrCodeGrid() {
  const [images, setImages] = useState<Record<string, string>>({});

  useEffect(() => {
    let cancelled = false;
    const load = async () => {
      const next: Record<string, string> = {};
      for (const m of QR_MERCHANTS) {
        const payload = encodeQrPayload(m.id);
        next[m.id] = await QRCode.toDataURL(payload, {
          width: 220,
          margin: 2,
          color: { dark: "#003366", light: "#ffffff" },
        });
      }
      if (!cancelled) setImages(next);
    };
    void load();
    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <div className="space-y-4 p-4 pb-8">
      <div>
        <Link href="/scan" className="text-xs font-medium text-[#0066B3]">
          ← Quay lại quét QR
        </Link>
        <h2 className="mt-2 text-base font-bold text-slate-800">Mã QR dịch vụ demo</h2>
        <p className="mt-1 text-xs leading-relaxed text-slate-500">
          Mở trang này trên <strong>máy thứ hai</strong> hoặc in ra giấy, rồi dùng tab{" "}
          <strong>Quét QR</strong> trên app để quét. Mỗi mã = một thanh toán giả lập.
        </p>
        <p className="mt-2 rounded-lg bg-blue-50 p-2 text-[10px] text-blue-900">
          Định dạng: <code className="font-mono">ACBECO:v1|mã-dịch-vụ</code>
        </p>
      </div>

      <div className="grid gap-4">
        {QR_MERCHANTS.map((m) => (
          <article
            key={m.id}
            className={`rounded-2xl bg-white p-4 shadow-sm ring-2 ${tierBorder[m.tierHint]}`}
          >
            <div className="flex gap-4">
              <div className="shrink-0">
                {images[m.id] ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={images[m.id]}
                    alt={`QR ${m.merchant}`}
                    className="h-[110px] w-[110px] rounded-lg"
                  />
                ) : (
                  <div className="flex h-[110px] w-[110px] items-center justify-center rounded-lg bg-slate-100 text-xs text-slate-400">
                    Đang tạo…
                  </div>
                )}
              </div>
              <div className="min-w-0 flex-1">
                <span className="text-lg">{m.icon}</span>
                <h3 className="text-sm font-bold text-slate-800">{m.merchant}</h3>
                <p className="text-xs font-semibold text-[#0066B3]">
                  {formatVnd(m.amountVnd)}
                </p>
                <p className="mt-1 text-[10px] text-slate-500">{m.description}</p>
                <p className="mt-2 break-all font-mono text-[9px] text-slate-400">
                  {encodeQrPayload(m.id)}
                </p>
              </div>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
