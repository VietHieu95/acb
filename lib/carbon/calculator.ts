import type { CarbonTier, EnrichedTransaction, RawTransaction } from "../types";
import { resolveCarbonProfile } from "./profiles";

export function getCarbonTier(co2eKg: number, estimated = true): CarbonTier {
  if (!estimated) return "unknown";
  if (co2eKg < 0.5) return "low";
  if (co2eKg <= 2) return "medium";
  return "high";
}

export function getTierLabel(tier: CarbonTier): string {
  switch (tier) {
    case "low":
      return "Chi tiêu xanh";
    case "medium":
      return "Trung bình";
    case "high":
      return "Phát thải cao";
    case "unknown":
      return "Chưa đủ dữ liệu";
  }
}

export function greenPointsFromTier(tier: CarbonTier): number {
  switch (tier) {
    case "low":
      return 40;
    case "medium":
      return 10;
    case "high":
      return -25;
    case "unknown":
      return 0;
  }
}

export function calculateCo2e(
  amountVnd: number,
  mcc: number,
  merchant: string,
  category: RawTransaction["category"] = "other",
) {
  return resolveCarbonProfile({ amountVnd, mcc, merchant, category });
}

export function enrichTransaction(tx: RawTransaction): EnrichedTransaction {
  const profile = calculateCo2e(tx.amountVnd, tx.mcc, tx.merchant, tx.category);
  const tier = getCarbonTier(profile.co2eKg, profile.method !== "not-estimated");

  return {
    ...tx,
    co2eKg: profile.co2eKg,
    tier,
    tierLabel: getTierLabel(tier),
    merchantTag: profile.tag,
    greenPoints: greenPointsFromTier(tier),
    carbonMethod: profile.method,
    carbonFormula: profile.formulaText,
    carbonAssumption: profile.assumptionText,
    carbonSource: profile.sourceLabel,
    carbonSourceRefs: profile.sourceRefs,
    carbonConfidence: profile.confidence,
  };
}

export function enrichAll(transactions: RawTransaction[]): EnrichedTransaction[] {
  return transactions.map(enrichTransaction);
}

export function formatCo2(kg: number): string {
  if (kg < 1) return `${(kg * 1000).toFixed(0)} g`;
  return `${kg.toFixed(2)} kg`;
}

export function formatVnd(amount: number): string {
  return new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
    maximumFractionDigits: 0,
  }).format(amount);
}

export const BAG_CO2_REDUCTION_KG = 0.2;
export const BAG_GREEN_POINTS = 50;
