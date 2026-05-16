import { AppShell } from "@/components/layout/AppShell";
import { TransactionList } from "@/components/transactions/TransactionList";

export default function TransactionsPage() {
  return (
    <AppShell>
      <TransactionList />
    </AppShell>
  );
}
