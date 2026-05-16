import type { CarbonTier, EnrichedTransaction, TreeStage } from "../types";
import { BAG_GREEN_POINTS } from "../carbon/calculator";

export const STAGE_THRESHOLDS = [0, 100, 250, 400, 600] as const;

export const STAGE_LABELS = [
  "Hạt giống",
  "Mầm non",
  "Cây nhỏ",
  "Cây lớn",
  "Nở hoa",
] as const;

export function computeBaseGreenScore(transactions: EnrichedTransaction[]): number {
  return transactions.reduce((sum, tx) => sum + tx.greenPoints, 0);
}

export function computeGreenScore(
  transactions: EnrichedTransaction[],
  bagBonusApplied: boolean,
  pointsSpentOnDonate: number,
): number {
  const base = computeBaseGreenScore(transactions);
  const bag = bagBonusApplied ? BAG_GREEN_POINTS : 0;
  return Math.max(0, base + bag - pointsSpentOnDonate);
}

export function getTreeStage(score: number): TreeStage {
  if (score >= STAGE_THRESHOLDS[4]) return 4;
  if (score >= STAGE_THRESHOLDS[3]) return 3;
  if (score >= STAGE_THRESHOLDS[2]) return 2;
  if (score >= STAGE_THRESHOLDS[1]) return 1;
  return 0;
}

export function getStageProgress(score: number, stage: TreeStage): number {
  const current = STAGE_THRESHOLDS[stage];
  const next =
    stage < 4 ? STAGE_THRESHOLDS[stage + 1] : STAGE_THRESHOLDS[4] + 200;
  if (stage >= 4) return 100;
  return Math.min(100, ((score - current) / (next - current)) * 100);
}

export function hasConsecutiveHighTier(
  transactions: EnrichedTransaction[],
  count = 3,
): boolean {
  const sorted = [...transactions].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
  );
  let streak = 0;
  for (const tx of sorted) {
    if (tx.tier === "high") {
      streak++;
      if (streak >= count) return true;
    } else {
      streak = 0;
    }
  }
  return false;
}

export function totalCo2Kg(
  transactions: EnrichedTransaction[],
  bagBonusApplied: boolean,
): number {
  const raw = transactions.reduce((sum, tx) => sum + tx.co2eKg, 0);
  const reduction = bagBonusApplied ? 0.2 : 0;
  return Math.max(0, raw - reduction);
}

export function co2ByCategory(
  transactions: EnrichedTransaction[],
): Record<string, number> {
  const labels: Record<string, string> = {
    transport: "Giao thông",
    food: "Ăn uống",
    shopping: "Mua sắm",
    travel: "Du lịch",
    utilities: "Tiện ích",
    other: "Khác",
  };

  const result: Record<string, number> = {};
  for (const tx of transactions) {
    const label = labels[tx.category] ?? "Khác";
    result[label] = (result[label] ?? 0) + tx.co2eKg;
  }
  return result;
}

export function tierColor(tier: CarbonTier): string {
  switch (tier) {
    case "low":
      return "#2E7D32";
    case "medium":
      return "#F9A825";
    case "high":
      return "#D32F2F";
  }
}
