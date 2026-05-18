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
        <section className="mx-4 mt-4 rounded-2xl bg-[#EAF4FF] p-3 ring-1 ring-blue-100">
          <p className="text-[10px] font-semibold uppercase text-[#0878F8]">Nguồn phương pháp</p>
          <p className="mt-1 text-[10px] leading-relaxed text-slate-600">
            Dựa trên GHG Protocol Scope 3 và hệ số activity-based từ EPA/IPCC, UK GHG Factors, ICAO, IEA cho xe điện, giao thông công cộng, hàng không, xăng dầu.
          </p>
        </section>
      </div>
    </AppShell>
  );
}
