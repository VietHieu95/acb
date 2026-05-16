export type CarbonTier = "low" | "medium" | "high";

export type SpendCategory =
  | "transport"
  | "food"
  | "shopping"
  | "travel"
  | "utilities"
  | "other";

export interface RawTransaction {
  id: string;
  date: string;
  merchant: string;
  amountVnd: number;
  mcc: number;
  category: SpendCategory;
  /** Supermarket tx that can trigger reusable-bag push */
  triggersBagPrompt?: boolean;
}

export interface EnrichedTransaction extends RawTransaction {
  co2eKg: number;
  tier: CarbonTier;
  tierLabel: string;
  merchantModifier: number;
  merchantTag?: string;
  greenPoints: number;
}

export type TreeStage = 0 | 1 | 2 | 3 | 4;

export interface EcoState {
  bagPromptAnswered: boolean;
  bagBonusApplied: boolean;
  donatedTrees: number;
  pointsSpentOnDonate: number;
  balance: number;
  userTransactions: RawTransaction[];
  /** GD siêu thị vừa quét — chờ hỏi túi vải */
  pendingBagTxId: string | null;
}

export const INITIAL_BALANCE = 125_430_000;

export const DEFAULT_ECO_STATE: EcoState = {
  bagPromptAnswered: false,
  bagBonusApplied: false,
  donatedTrees: 0,
  pointsSpentOnDonate: 0,
  balance: INITIAL_BALANCE,
  userTransactions: [],
  pendingBagTxId: null,
};

export const STORAGE_KEY = "acb-eco-tracker-state";
