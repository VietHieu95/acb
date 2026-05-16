"use client";

import { useCallback, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEco } from "@/context/EcoProvider";
import {
  calculateCo2e,
  formatCo2,
  formatVnd,
  getCarbonTier,
  getTierLabel,
} from "@/lib/carbon/calculator";
import { QR_MERCHANTS, type QrMerchant } from "@/lib/qr/merchants";
import { QrScanner } from "./QrScanner";
import { CarbonBadge } from "@/components/transactions/CarbonBadge";

type Step = "scan" | "confirm" | "success";

export function PaymentFlow() {
  const router = useRouter();
  const { balance, payFromQr } = useEco();
  const [step, setStep] = useState<Step>("scan");
  const [selected, setSelected] = useState<QrMerchant | null>(null);
  const [payError, setPayError] = useState<string | null>(null);

  const handleDetected = useCallback((merchant: QrMerchant) => {
    setSelected(merchant);
    setPayError(null);
    setStep("confirm");
  }, []);

  const handlePay = () => {
    if (!selected) return;
    const result = payFromQr(selected);
    if (!result.ok) {
      setPayError(result.error ?? "Thanh toán thất bại");
      return;
    }
    setStep("success");
  };

  const preview = selected
    ? calculateCo2e(selected.amountVnd, selected.mcc, selected.merchant)
    : null;
  const previewTier = preview ? getCarbonTier(preview.co2eKg) : null;

  return (
    <div className="space-y-4 p-4 pb-8">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-base font-bold text-slate-800">Quét QR thanh toán</h2>
          <p className="text-xs text-slate-500">
            Số dư: <strong className="text-[#0066B3]">{formatVnd(balance)}</strong>
          </p>
        </div>
        <Link
          href="/qr-codes"
          className="rounded-lg bg-[#0066B3]/10 px-2 py-1 text-[10px] font-semibold text-[#0066B3]"
        >
          Mã QR demo
        </Link>
      </div>

      {step === "scan" && (
        <>
          <QrScanner active onDetected={handleDetected} />

          <section>
            <p className="mb-2 text-xs font-semibold text-slate-600">
              Hoặc chọn dịch vụ (không cần camera)
            </p>
            <div className="grid grid-cols-2 gap-2">
              {QR_MERCHANTS.map((m) => (
                <button
                  key={m.id}
                  type="button"
                  onClick={() => handleDetected(m)}
                  className="rounded-xl bg-white p-3 text-left shadow-sm ring-1 ring-slate-100 active:scale-[0.98]"
                >
                  <span className="text-xl">{m.icon}</span>
                  <p className="mt-1 line-clamp-2 text-[11px] font-semibold text-slate-800">
                    {m.merchant}
                  </p>
                  <p className="text-[10px] text-slate-500">{formatVnd(m.amountVnd)}</p>
                </button>
              ))}
            </div>
          </section>
        </>
      )}

      {step === "confirm" && selected && preview && previewTier && (
        <section className="rounded-2xl bg-white p-4 shadow-lg ring-1 ring-slate-100">
          <p className="text-xs font-medium text-slate-500">Xác nhận chuyển khoản</p>
          <p className="mt-1 text-lg font-bold text-slate-900">{selected.merchant}</p>
          <p className="mt-3 text-2xl font-bold text-[#0066B3]">
            {formatVnd(selected.amountVnd)}
          </p>
          <div className="mt-3 flex flex-wrap gap-2">
            <CarbonBadge
              tier={previewTier}
              label={getTierLabel(previewTier)}
              co2eKg={preview.co2eKg}
            />
            <span className="rounded-full bg-slate-100 px-2 py-0.5 text-[10px] text-slate-600">
              MCC {selected.mcc}
            </span>
          </div>
          <p className="mt-2 text-[10px] text-slate-500">{selected.description}</p>
          {payError && (
            <p className="mt-2 rounded-lg bg-red-50 p-2 text-xs text-red-700">{payError}</p>
          )}
          <div className="mt-4 flex gap-2">
            <button
              type="button"
              onClick={() => {
                setStep("scan");
                setSelected(null);
                setPayError(null);
              }}
              className="flex-1 rounded-xl bg-slate-100 py-3 text-sm font-semibold text-slate-700"
            >
              Hủy
            </button>
            <button
              type="button"
              onClick={handlePay}
              disabled={balance < selected.amountVnd}
              className="flex-1 rounded-xl bg-[#0066B3] py-3 text-sm font-bold text-white disabled:opacity-50"
            >
              Xác nhận trả
            </button>
          </div>
        </section>
      )}

      {step === "success" && selected && preview && previewTier && (
        <section className="rounded-2xl bg-gradient-to-br from-green-50 to-white p-6 text-center shadow-lg ring-1 ring-green-200">
          <span className="text-4xl">✓</span>
          <h3 className="mt-2 text-lg font-bold text-[#1B5E20]">Thanh toán thành công</h3>
          <p className="mt-1 text-sm text-slate-600">{selected.merchant}</p>
          <p className="mt-2 text-xl font-bold">{formatVnd(selected.amountVnd)}</p>
          <p className="mt-3 text-sm text-slate-600">
            Carbon ước tính:{" "}
            <strong className={previewTier === "high" ? "text-red-600" : "text-green-700"}>
              {formatCo2(preview.co2eKg)}
            </strong>
          </p>
          {selected.triggersBagPrompt && (
            <p className="mt-2 text-xs text-[#0066B3]">
              Sắp có câu hỏi về túi vải…
            </p>
          )}
          <div className="mt-4 flex flex-col gap-2">
            <button
              type="button"
              onClick={() => router.push("/transactions")}
              className="rounded-xl bg-[#0066B3] py-3 text-sm font-bold text-white"
            >
              Xem giao dịch
            </button>
            <button
              type="button"
              onClick={() => {
                setStep("scan");
                setSelected(null);
              }}
              className="rounded-xl bg-slate-100 py-2.5 text-sm font-medium text-slate-700"
            >
              Quét thêm
            </button>
          </div>
        </section>
      )}
    </div>
  );
}
