import { AppShell } from "@/components/layout/AppShell";
import { QrCodeGrid } from "@/components/qr-codes/QrCodeGrid";

export default function QrCodesPage() {
  return (
    <AppShell>
      <QrCodeGrid />
    </AppShell>
  );
}
