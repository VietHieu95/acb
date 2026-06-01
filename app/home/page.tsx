import { AppShell } from "@/components/layout/AppShell";
import { BalanceCard } from "@/components/home/BalanceCard";
import { CarbonSummary } from "@/components/home/CarbonSummary";
import { ForestWidget } from "@/components/home/ForestWidget";

export default function HomePage() {
  return (
    <AppShell>
      <div className="pb-4">
        <BalanceCard />
        <ForestWidget />
        <CarbonSummary />
        <section className="mx-4 mt-4 rounded-2xl bg-acb-tint p-3 ring-1 ring-blue-100">
          <p className="text-[10px] font-semibold uppercase text-acb">Nguồn phương pháp</p>
          <p className="mt-1 text-[10px] leading-relaxed text-slate-600">
            Hệ số phát thải theo ngành (spend-based) từ mô hình EPA USEEIO — kg CO2e/USD, quy đổi sang VNĐ theo tỷ giá 26.000đ/USD. Phân loại ngành dựa trên mã MCC của giao dịch.
          </p>
        </section>
      </div>
    </AppShell>
  );
}
