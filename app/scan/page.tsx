import { AppShell } from "@/components/layout/AppShell";
import { PaymentFlow } from "@/components/scan/PaymentFlow";

export default function ScanPage() {
  return (
    <AppShell>
      <PaymentFlow />
    </AppShell>
  );
}
