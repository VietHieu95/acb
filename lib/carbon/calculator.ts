import type { CarbonTier, EnrichedTransaction, RawTransaction } from "../types";
import { resolveCarbonProfile } from "./profiles";

export function getCarbonTier(co2eKg: number): CarbonTier {
  if (co2eKg < 10) return "low";
  if (co2eKg < 50) return "medium";
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
  const tier = getCarbonTier(profile.co2eKg);

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

/** Cắt nhiễu dấu phẩy động (IEEE) nhưng KHÔNG làm tròn: giữ tối đa 6 chữ số thập phân thực. */
function trimNum(value: number, maxDecimals = 6): string {
  return parseFloat(value.toFixed(maxDecimals)).toString();
}

export function formatCo2(kg: number): string {
  if (kg < 1) return `${trimNum(kg * 1000)} g`;
  return `${trimNum(kg)} kg`;
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
