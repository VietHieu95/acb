import type { CarbonTier, EnrichedTransaction, RawTransaction } from "../types";
import { getBaseEmissionFactor } from "./mcc-factors";
import { matchMerchant } from "./merchant-rules";

export function getCarbonTier(co2eKg: number): CarbonTier {
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
): { co2eKg: number; modifier: number; tag?: string } {
  const baseEF = getBaseEmissionFactor(mcc);
  const { modifier, tag } = matchMerchant(merchant);
  const co2eKg = (amountVnd / 1_000_000) * baseEF * modifier;
  return { co2eKg, modifier, tag: tag || undefined };
}

export function enrichTransaction(tx: RawTransaction): EnrichedTransaction {
  const { co2eKg, modifier, tag } = calculateCo2e(
    tx.amountVnd,
    tx.mcc,
    tx.merchant,
  );
  const tier = getCarbonTier(co2eKg);

  return {
    ...tx,
    co2eKg,
    tier,
    tierLabel: getTierLabel(tier),
    merchantModifier: modifier,
    merchantTag: tag,
    greenPoints: greenPointsFromTier(tier),
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
