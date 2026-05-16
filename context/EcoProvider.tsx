"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { enrichAll, enrichTransaction } from "@/lib/carbon/calculator";
import {
  computeGreenScore,
  getTreeStage,
  hasConsecutiveHighTier,
  totalCo2Kg,
  co2ByCategory,
} from "@/lib/forest/score";
import { MOCK_TRANSACTIONS } from "@/lib/mock/transactions";
import type { QrMerchant } from "@/lib/qr/merchants";
import {
  DEFAULT_ECO_STATE,
  INITIAL_BALANCE,
  STORAGE_KEY,
  type EcoState,
  type EnrichedTransaction,
  type RawTransaction,
  type TreeStage,
} from "@/lib/types";

interface PayResult {
  ok: boolean;
  error?: string;
  transaction?: EnrichedTransaction;
}

interface EcoContextValue {
  transactions: EnrichedTransaction[];
  ecoState: EcoState;
  balance: number;
  greenScore: number;
  treeStage: TreeStage;
  totalCo2: number;
  categoryBreakdown: Record<string, number>;
  isWilted: boolean;
  showBagPrompt: boolean;
  answerBagPrompt: (usedBag: boolean) => void;
  donatePoints: (points: number) => void;
  payFromQr: (merchant: QrMerchant) => PayResult;
  resetDemo: () => void;
  showResetHint: boolean;
  setShowResetHint: (v: boolean) => void;
}

const EcoContext = createContext<EcoContextValue | null>(null);

function loadState(): EcoState {
  if (typeof window === "undefined") return DEFAULT_ECO_STATE;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return DEFAULT_ECO_STATE;
    const parsed = JSON.parse(raw) as Partial<EcoState>;
    return {
      ...DEFAULT_ECO_STATE,
      ...parsed,
      balance: parsed.balance ?? INITIAL_BALANCE,
      userTransactions: parsed.userTransactions ?? [],
      pendingBagTxId: parsed.pendingBagTxId ?? null,
    };
  } catch {
    return DEFAULT_ECO_STATE;
  }
}

export function EcoProvider({ children }: { children: ReactNode }) {
  const [ecoState, setEcoState] = useState<EcoState>(DEFAULT_ECO_STATE);
  const [hydrated, setHydrated] = useState(false);
  const [showResetHint, setShowResetHint] = useState(false);

  useEffect(() => {
    setEcoState(loadState());
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(ecoState));
  }, [ecoState, hydrated]);

  const allRaw = useMemo(
    () => [...MOCK_TRANSACTIONS, ...ecoState.userTransactions],
    [ecoState.userTransactions],
  );

  const transactions = useMemo(() => enrichAll(allRaw), [allRaw]);

  const greenScore = useMemo(
    () =>
      computeGreenScore(
        transactions,
        ecoState.bagBonusApplied,
        ecoState.pointsSpentOnDonate,
      ),
    [transactions, ecoState.bagBonusApplied, ecoState.pointsSpentOnDonate],
  );

  const treeStage = useMemo(() => getTreeStage(greenScore), [greenScore]);
  const totalCo2 = useMemo(
    () => totalCo2Kg(transactions, ecoState.bagBonusApplied),
    [transactions, ecoState.bagBonusApplied],
  );
  const categoryBreakdown = useMemo(
    () => co2ByCategory(transactions),
    [transactions],
  );
  const isWilted = useMemo(
    () => hasConsecutiveHighTier(transactions, 3),
    [transactions],
  );

  const showBagPrompt = useMemo(
    () =>
      hydrated &&
      ecoState.pendingBagTxId !== null &&
      !ecoState.bagPromptAnswered,
    [ecoState.pendingBagTxId, ecoState.bagPromptAnswered, hydrated],
  );

  const payFromQr = useCallback(
    (merchant: QrMerchant): PayResult => {
      if (ecoState.balance < merchant.amountVnd) {
        return { ok: false, error: "Số dư không đủ để thanh toán." };
      }

      const tx: RawTransaction = {
        id: `user-${Date.now()}`,
        date: new Date().toISOString(),
        merchant: merchant.merchant,
        amountVnd: merchant.amountVnd,
        mcc: merchant.mcc,
        category: merchant.category,
        triggersBagPrompt: merchant.triggersBagPrompt,
      };

      setEcoState((prev) => ({
        ...prev,
        balance: prev.balance - merchant.amountVnd,
        userTransactions: [tx, ...prev.userTransactions],
        bagPromptAnswered: merchant.triggersBagPrompt
          ? false
          : prev.bagPromptAnswered,
        pendingBagTxId: merchant.triggersBagPrompt ? tx.id : null,
      }));

      return { ok: true, transaction: enrichTransaction(tx) };
    },
    [ecoState.balance],
  );

  const answerBagPrompt = useCallback((usedBag: boolean) => {
    setEcoState((prev) => ({
      ...prev,
      bagPromptAnswered: true,
      pendingBagTxId: null,
      bagBonusApplied: usedBag ? true : prev.bagBonusApplied,
    }));
  }, []);

  const donatePoints = useCallback((points: number) => {
    setEcoState((prev) => ({
      ...prev,
      pointsSpentOnDonate: prev.pointsSpentOnDonate + points,
      donatedTrees: prev.donatedTrees + (points >= 80 ? 5 : 1),
    }));
  }, []);

  const resetDemo = useCallback(() => {
    setEcoState(DEFAULT_ECO_STATE);
    localStorage.removeItem(STORAGE_KEY);
    setShowResetHint(false);
  }, []);

  const value: EcoContextValue = {
    transactions,
    ecoState,
    balance: ecoState.balance,
    greenScore,
    treeStage,
    totalCo2,
    categoryBreakdown,
    isWilted,
    showBagPrompt,
    answerBagPrompt,
    donatePoints,
    payFromQr,
    resetDemo,
    showResetHint,
    setShowResetHint,
  };

  if (!hydrated) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#F5F7FA]">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-[#0066B3] border-t-transparent" />
      </div>
    );
  }

  return (
    <EcoContext.Provider value={value}>{children}</EcoContext.Provider>
  );
}

export function useEco() {
  const ctx = useContext(EcoContext);
  if (!ctx) throw new Error("useEco must be used within EcoProvider");
  return ctx;
}
