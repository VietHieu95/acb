import type { SpendCategory } from "../types";
import { efPerMillionVnd, getFactor, VND_PER_USD } from "./useeio-ef";

export type CarbonMethod = "spend-intensity" | "activity-check";
export type CarbonConfidence = "high" | "medium" | "low";

export interface CarbonProfile {
  id: string;
  method: CarbonMethod;
  tag: string;
  co2eKg: number;
  intensityKgPerMillionVnd: number;
  formulaText: string;
  assumptionText: string;
  sourceLabel: string;
  sourceRefs: string[];
  confidence: CarbonConfidence;
}

interface ProfileInput {
  amountVnd: number;
  mcc: number;
  merchant: string;
  category: SpendCategory;
}

const VND_PER_MILLION = 1_000_000;

/** Cắt nhiễu dấu phẩy động (IEEE) nhưng KHÔNG làm tròn số liệu: giữ tối đa 6 chữ số thập phân thực. */
function trimNum(value: number, maxDecimals = 6): string {
  return parseFloat(value.toFixed(maxDecimals)).toString();
}

function amountMillions(amountVnd: number): number {
  return amountVnd / VND_PER_MILLION;
}

/** Bỏ dấu tiếng Việt để so khớp từ khoá ổn định hơn. */
function normalize(value: string): string {
  return value
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/đ/g, "d");
}

function hasAny(value: string, keywords: string[]): boolean {
  return keywords.some((k) => value.includes(k));
}

interface Mapping {
  code: string;
  tag: string;
  confidence: CarbonConfidence;
}

/** Map merchant / MCC / category → mã ngành USEEIO. */
function mapToIndustry({ merchant, mcc, category }: ProfileInput): Mapping {
  const m = normalize(merchant);

  // Điện / nước / khí đốt
  if (mcc === 4900 || hasAny(m, ["evn", "dien luc", "hoa don dien", "tien dien"]))
    return { code: "22", tag: "Điện / nước / khí đốt", confidence: "high" };

  // Xăng dầu
  if (mcc === 5541 || mcc === 5542 || hasAny(m, ["shell", "petrolimex", "xang", "petrol", "fuel"]))
    return { code: "324", tag: "Xăng dầu", confidence: "high" };

  // Hàng không
  if ((mcc >= 3000 && mcc <= 3299) || hasAny(m, ["airline", "airways", "hang khong", "flight", "vietjet", "bamboo"]))
    return { code: "481", tag: "Hàng không", confidence: "high" };

  // Đường sắt / metro
  if (hasAny(m, ["duong sat", "railway", "tau hoa", "train", "se1", "metro"]))
    return { code: "482", tag: "Đường sắt", confidence: "high" };

  // Đường thuỷ
  if (hasAny(m, ["pha ", "ferry", "tau thuy", "ship", "boat", "ca no"]))
    return { code: "483", tag: "Đường thuỷ", confidence: "medium" };

  // Giao thông đường bộ (bus, taxi, xe công nghệ)
  if (
    mcc === 4111 || mcc === 4121 || mcc === 4131 ||
    hasAny(m, ["vinbus", "bus", "buyt", "taxi", "grab", "xanh sm", "gojek", "be ", "chuyen xe", "xe "])
  )
    return { code: "485", tag: "Giao thông đường bộ", confidence: "high" };

  // Cửa hàng thực phẩm / siêu thị
  if (
    mcc === 5411 || mcc === 5422 || mcc === 5441 || mcc === 5451 || mcc === 5462 || mcc === 5499 ||
    hasAny(m, ["coopmart", "co.opmart", "lotte", "circle k", "mart", "sieu thi", "winmart", "bach hoa", "grocery"])
  )
    return { code: "445", tag: "Cửa hàng thực phẩm", confidence: "high" };

  // Nhà hàng / F&B
  if (
    mcc === 5811 || mcc === 5812 || mcc === 5813 || mcc === 5814 ||
    hasAny(m, ["highlands", "coffee", "cafe", "ca phe", "mcdonald", "kfc", "lotteria", "restaurant", "nha hang", "starbucks", "phuc long", "tra sua", "quan "])
  )
    return { code: "722", tag: "Nhà hàng / F&B", confidence: "high" };

  // Mỹ phẩm / hàng tiêu dùng cá nhân
  if (hasAny(m, ["body shop", "cosmetic", "my pham", "beauty", "guardian", "watsons"]))
    return { code: "339", tag: "Mỹ phẩm / hàng cá nhân", confidence: "medium" };

  // Xe & phụ tùng
  if (
    mcc === 5511 || mcc === 5521 || mcc === 5531 || mcc === 5532 || mcc === 5533 || mcc === 5571 ||
    hasAny(m, ["vinfast", "o to", "xe may", "phu tung", "showroom", "motor"])
  )
    return { code: "441", tag: "Xe & phụ tùng", confidence: "medium" };

  // Thời trang / may mặc
  if (
    mcc === 5611 || mcc === 5621 || mcc === 5631 || mcc === 5641 || mcc === 5651 || mcc === 5661 || mcc === 5691 ||
    hasAny(m, ["mango", "fashion", "thoi trang", "uniqlo", "zara", "quan ao", "giay", "shoe"])
  )
    return { code: "315AL", tag: "Thời trang / may mặc", confidence: "medium" };

  // Khách sạn / lưu trú
  if (mcc === 7011 || mcc === 7012 || (mcc >= 3500 && mcc <= 3999) || hasAny(m, ["hotel", "resort", "khach san", "homestay", "camp"]))
    return { code: "721", tag: "Khách sạn / lưu trú", confidence: "medium" };

  // Viễn thông / dịch vụ số
  if (
    mcc === 4814 || mcc === 4816 || mcc === 4899 ||
    hasAny(m, ["viettel", "mobifone", "vinaphone", "fpt", "internet", "telecom", "vien thong", "netflix", "spotify"])
  )
    return { code: "513", tag: "Viễn thông / số", confidence: "medium" };

  // Điện tử / máy tính
  if (mcc === 5045 || mcc === 5722 || mcc === 5732 || mcc === 5734 || hasAny(m, ["the gioi di dong", "fpt shop", "cellphones", "dien may", "laptop", "computer", "may tinh"]))
    return { code: "334", tag: "Điện tử / máy tính", confidence: "medium" };

  // Y tế / bệnh viện
  if (mcc === 8011 || mcc === 8021 || mcc === 8062 || mcc === 8099 || hasAny(m, ["benh vien", "hospital", "clinic", "phong kham"]))
    return { code: "622", tag: "Y tế", confidence: "medium" };

  // Giáo dục
  if (mcc === 8211 || mcc === 8220 || mcc === 8299 || hasAny(m, ["truong", "school", "university", "dai hoc", "hoc phi", "education"]))
    return { code: "61", tag: "Giáo dục", confidence: "medium" };

  // Giải trí / vui chơi
  if (mcc === 7298 || mcc === 7832 || mcc === 7991 || mcc === 7996 || mcc === 7997 || hasAny(m, ["cinema", "cgv", "rap ", "karaoke", "gym", "spa", "cong vien"]))
    return { code: "713", tag: "Giải trí / vui chơi", confidence: "medium" };

  // Fallback theo nhóm chi tiêu
  switch (category) {
    case "transport":
      return { code: "485", tag: "Giao thông đường bộ", confidence: "low" };
    case "food":
      return { code: "722", tag: "Nhà hàng / F&B", confidence: "low" };
    case "shopping":
      return { code: "452", tag: "Bán lẻ tổng hợp", confidence: "low" };
    case "travel":
      return { code: "487OS", tag: "Du lịch / lữ hành", confidence: "low" };
    case "utilities":
      return { code: "513", tag: "Tiện ích / viễn thông", confidence: "low" };
    default:
      return { code: "4A0", tag: "Bán lẻ khác", confidence: "low" };
  }
}

export function resolveCarbonProfile(input: ProfileInput): CarbonProfile {
  const { amountVnd } = input;
  const mapping = mapToIndustry(input);
  const factor = getFactor(mapping.code);
  const intensity = efPerMillionVnd(mapping.code);
  const millions = amountMillions(amountVnd);
  const co2eKg = parseFloat((millions * intensity).toFixed(6));

  return {
    id: `useeio-${mapping.code}`,
    method: "spend-intensity",
    tag: mapping.tag,
    co2eKg,
    intensityKgPerMillionVnd: intensity,
    formulaText: `${trimNum(millions)} triệu VND × ${trimNum(intensity)} kg CO2e/triệu VND`,
    assumptionText: `Ngành USEEIO ${factor.code} = ${factor.kgCo2ePerUsd} kg CO2e/USD; quy đổi theo tỷ giá ${VND_PER_USD.toLocaleString("vi-VN")}đ/USD ⇒ ${trimNum(intensity)} kg CO2e/triệu VND.`,
    sourceLabel: "EPA USEEIO — hệ số phát thải theo ngành (spend-based)",
    sourceRefs: [
      `USEEIO ${factor.code} — ${factor.nameEn}: ${factor.kgCo2ePerUsd} kg CO2e/USD`,
      `Quy đổi: × 1.000.000 ÷ ${VND_PER_USD.toLocaleString("vi-VN")} VND/USD`,
    ],
    confidence: mapping.confidence,
  };
}
