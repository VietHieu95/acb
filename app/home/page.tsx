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
        <section className="mx-4 mt-4 rounded-xl bg-blue-50 p-3 ring-1 ring-blue-100">
          <p className="text-[10px] leading-relaxed text-blue-900">
            <strong>Mô hình:</strong> CO₂e = Số tiền × Hệ số EF (theo MCC) ×
            Hệ số merchant (AI nhận diện VinBus, Xanh SM, thương hiệu bền vững…)
          </p>
        </section>
      </div>
    </AppShell>
  );
}
