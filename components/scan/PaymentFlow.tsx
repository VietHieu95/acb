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
import { type QrMerchant } from "@/lib/qr/merchants";
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
    ? calculateCo2e(selected.amountVnd, selected.mcc, selected.merchant, selected.category)
    : null;
  const previewTier = preview ? getCarbonTier(preview.co2eKg) : null;

  return (
    <div className="space-y-4 p-4 pb-8">
      <div className="flex items-start justify-between gap-3">
        <div>
          <h2 className="text-base font-bold text-slate-800">Quét QR thanh toán</h2>
          <p className="text-xs text-slate-500">
            Số dư: <strong className="text-[#0066B3]">{formatVnd(balance)}</strong>
          </p>
        </div>
        <Link
          href="/qr-codes"
          className="shrink-0 rounded-lg bg-[#0066B3]/10 px-2 py-1 text-[10px] font-semibold text-[#0066B3]"
        >
          Mã QR demo
        </Link>
      </div>

      {step === "scan" && (
        <>
          <QrScanner active onDetected={handleDetected} />

          <section className="rounded-xl bg-white p-3 text-[11px] leading-relaxed text-slate-600 shadow-sm ring-1 ring-slate-100">
            <p className="font-semibold text-slate-800">Luồng demo dùng camera thật</p>
            <p className="mt-1">
              Mở <strong>/qr-codes</strong> trên thiết bị khác, đưa mã vào khung quét,
              rồi app sẽ tự lấy merchant, MCC và số tiền từ payload QR.
            </p>
            <p className="mt-2 rounded-lg bg-blue-50 p-2 text-blue-900">
              Không có nút chọn dịch vụ thủ công để trải nghiệm giống thanh toán QR thực tế hơn.
            </p>
          </section>
        </>
      )}

      {step === "confirm" && selected && preview && previewTier && (
        <section className="rounded-2xl bg-white p-4 shadow-lg ring-1 ring-slate-100">
          <p className="text-xs font-medium text-slate-500">Xác nhận thanh toán QR</p>
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
            {preview.tag && (
              <span className="rounded-full bg-green-50 px-2 py-0.5 text-[10px] font-semibold text-green-800 ring-1 ring-green-100">
                Profile: {preview.tag}
              </span>
            )}
            <span className="rounded-full bg-blue-50 px-2 py-0.5 text-[10px] font-semibold text-blue-800 ring-1 ring-blue-100">
              {preview.method}
            </span>
          </div>

          <div className="mt-4 rounded-xl bg-slate-50 p-3 ring-1 ring-slate-100">
            <p className="text-[11px] font-semibold text-slate-800">Cách app ước tính</p>
            <p className="mt-1 font-mono text-[10px] text-slate-600">
              {preview.formulaText} = {formatCo2(preview.co2eKg)}
            </p>
            <p className="mt-1 text-[10px] leading-relaxed text-slate-500">
              {preview.assumptionText}
            </p>
            <p className="mt-2 rounded-lg bg-white px-2 py-1 text-[10px] font-medium text-slate-600 ring-1 ring-slate-100">
              Nguồn: {preview.sourceLabel}
            </p>
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
              className="min-h-11 flex-1 rounded-xl bg-slate-100 py-3 text-sm font-semibold text-slate-700"
            >
              Hủy
            </button>
            <button
              type="button"
              onClick={handlePay}
              disabled={balance < selected.amountVnd}
              className="min-h-11 flex-1 rounded-xl bg-[#0066B3] py-3 text-sm font-bold text-white disabled:opacity-50"
            >
              Xác nhận trả
            </button>
          </div>
        </section>
      )}

      {step === "success" && selected && preview && previewTier && (
        <section className="rounded-2xl bg-white p-5 text-center shadow-lg ring-1 ring-green-200">
          <span className="text-4xl text-[#1B5E20]">✓</span>
          <h3 className="mt-2 text-lg font-bold text-[#1B5E20]">Thanh toán thành công</h3>
          <p className="mt-1 text-sm text-slate-600">{selected.merchant}</p>
          <p className="mt-2 text-xl font-bold">{formatVnd(selected.amountVnd)}</p>
          <p className="mt-3 text-sm text-slate-600">
            Carbon ước tính: <strong className={previewTier === "high" ? "text-red-600" : "text-green-700"}>{formatCo2(preview.co2eKg)}</strong>
          </p>
          {selected.triggersBagPrompt && (
            <p className="mt-2 rounded-lg bg-blue-50 p-2 text-xs text-[#0066B3]">
              App sẽ hỏi bạn có dùng túi vải cá nhân không để điều chỉnh điểm xanh.
            </p>
          )}
          <div className="mt-4 flex flex-col gap-2">
            <button
              type="button"
              onClick={() => router.push("/transactions")}
              className="min-h-11 rounded-xl bg-[#0066B3] py-3 text-sm font-bold text-white"
            >
              Xem giao dịch
            </button>
            <button
              type="button"
              onClick={() => {
                setStep("scan");
                setSelected(null);
              }}
              className="min-h-11 rounded-xl bg-slate-100 py-2.5 text-sm font-medium text-slate-700"
            >
              Quét thêm
            </button>
          </div>
        </section>
      )}
    </div>
  );
}
