import type { SpendCategory } from "../types";

export type CarbonMethod = "activity-based" | "not-estimated";
export type CarbonConfidence = "high" | "medium" | "not-rated";

export interface CarbonProfile {
  id: string;
  method: CarbonMethod;
  tag: string;
  co2eKg: number;
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

const FUEL_PRICE_VND_PER_LITER = 23_000;
const GASOLINE_KG_CO2_PER_LITER = 2.35;
const VN_GRID_KG_CO2E_PER_KWH = 0.66;
const EV_KWH_PER_KM = 0.16;
const TAXI_KG_CO2E_PER_KM = 0.18;
const BUS_KG_CO2E_PER_PKM = 0.08;
const RAIL_KG_CO2E_PER_PKM = 0.035;
const DOMESTIC_FLIGHT_KG_CO2E_PER_PKM = 0.158;

function includesAny(value: string, keywords: string[]): boolean {
  const normalized = value.toLowerCase().normalize("NFD");
  return keywords.some((keyword) => normalized.includes(keyword));
}

function roundKg(value: number): number {
  return Math.max(0.001, Math.round(value * 1000) / 1000);
}

function profile(overrides: CarbonProfile): CarbonProfile {
  return {
    ...overrides,
    co2eKg: overrides.method === "not-estimated" ? 0 : roundKg(overrides.co2eKg),
  };
}

function notEstimated(tag: string, reason: string): CarbonProfile {
  return profile({
    id: "not-estimated",
    method: "not-estimated",
    tag,
    co2eKg: 0,
    formulaText: "Không tính CO2e cho giao dịch này trong demo.",
    assumptionText: reason,
    sourceLabel: "Không áp dụng EF: thiếu dữ liệu hoạt động đáng tin cậy",
    sourceRefs: [
      "GHG Protocol Scope 3 Calculation Guidance: prefer better activity/supplier data when available",
    ],
    confidence: "not-rated",
  });
}

export function resolveCarbonProfile(input: ProfileInput): CarbonProfile {
  const { amountVnd, merchant, mcc } = input;
  const lower = merchant.toLowerCase().normalize("NFD");

  if (includesAny(lower, ["shell", "petrolimex", "xang", "xăng", "petrol"]) || mcc === 5541 || mcc === 5542) {
    const liters = amountVnd / FUEL_PRICE_VND_PER_LITER;
    return profile({
      id: "fuel-gasoline",
      method: "activity-based",
      tag: "Xăng dầu",
      co2eKg: liters * GASOLINE_KG_CO2_PER_LITER,
      formulaText: `${liters.toFixed(1)} lít xăng × ${GASOLINE_KG_CO2_PER_LITER} kg CO2/lít`,
      assumptionText: `Giá xăng demo ${FUEL_PRICE_VND_PER_LITER.toLocaleString("vi-VN")}đ/lít, suy ra khoảng ${liters.toFixed(1)} lít.`,
      sourceLabel: "US EPA / IPCC fuel combustion factor",
      sourceRefs: [
        "US EPA: 8.89 kg CO2/gallon gasoline = ~2.35 kg CO2/liter",
        "IPCC fuel combustion factors for gasoline",
      ],
      confidence: "high",
    });
  }

  if (includesAny(lower, ["vietnam airlines", "airlines", "flight"]) || (mcc >= 3000 && mcc <= 3299)) {
    const distanceKm = includesAny(lower, ["sgn han", "sgn-han", "hcm han"]) ? 1160 : 1000;
    return profile({
      id: "domestic-flight",
      method: "activity-based",
      tag: "Hàng không nội địa",
      co2eKg: distanceKm * DOMESTIC_FLIGHT_KG_CO2E_PER_PKM,
      formulaText: `${distanceKm.toLocaleString("vi-VN")} passenger-km × ${DOMESTIC_FLIGHT_KG_CO2E_PER_PKM} kg CO2e/pkm`,
      assumptionText: "Demo dùng khoảng cách SGN-HAN ước tính 1.160 km cho một hành khách.",
      sourceLabel: "ICAO Carbon Emissions Calculator / UK GHG Conversion Factors",
      sourceRefs: [
        "ICAO Carbon Emissions Calculator Methodology",
        "UK Government GHG Conversion Factors: business travel air",
      ],
      confidence: "medium",
    });
  }

  if (includesAny(lower, ["xanh sm", "xanhsm", "green sm", "grab electric", "be green"])) {
    const km = amountVnd >= 200_000 ? 14 : 8;
    return profile({
      id: "electric-ride-hailing",
      method: "activity-based",
      tag: "Taxi/xe công nghệ điện",
      co2eKg: km * EV_KWH_PER_KM * VN_GRID_KG_CO2E_PER_KWH,
      formulaText: `${km} km × ${EV_KWH_PER_KM} kWh/km × ${VN_GRID_KG_CO2E_PER_KWH} kg CO2e/kWh`,
      assumptionText: "Xe điện không phát thải tại ống xả; demo tính phát thải gián tiếp từ điện lưới Việt Nam.",
      sourceLabel: "Green SM official / Vietnam grid EF / IEA EV Outlook",
      sourceRefs: [
        "Green SM official website: pure-electric mobility service",
        "Vietnam grid emission factor assumption",
        "IEA Global EV Outlook",
      ],
      confidence: "medium",
    });
  }

  if (includesAny(lower, ["vinbus", "xe buyt dien", "xe buýt điện"])) {
    const km = 6;
    return profile({
      id: "electric-bus",
      method: "activity-based",
      tag: "Xe buýt điện",
      co2eKg: km * BUS_KG_CO2E_PER_PKM * 0.45,
      formulaText: `${km} passenger-km × ${BUS_KG_CO2E_PER_PKM} kg CO2e/pkm × hệ số xe điện`,
      assumptionText: "Demo giả định chuyến nội đô 6 km; VinBus được nhận diện là xe buýt điện nên thấp hơn bus dầu trung bình.",
      sourceLabel: "VinBus official / UK GHG Conversion Factors / IEA EV Outlook",
      sourceRefs: [
        "VinBus official website: green mobility positioning",
        "UK Government GHG Conversion Factors: bus travel",
        "IEA Global EV Outlook",
      ],
      confidence: "medium",
    });
  }

  if (includesAny(lower, ["duong sat", "đường sắt", "vietnam railway", "tau hoa", "tàu hỏa"])) {
    const distanceKm = 320;
    return profile({
      id: "rail",
      method: "activity-based",
      tag: "Tàu hỏa",
      co2eKg: distanceKm * RAIL_KG_CO2E_PER_PKM,
      formulaText: `${distanceKm} passenger-km × ${RAIL_KG_CO2E_PER_PKM} kg CO2e/pkm`,
      assumptionText: "Demo giả định chặng tàu 320 km cho một hành khách; tàu thấp hơn máy bay theo passenger-km.",
      sourceLabel: "UK GHG Conversion Factors: rail travel",
      sourceRefs: ["UK Government GHG Conversion Factors: rail travel"],
      confidence: "medium",
    });
  }

  if (includesAny(lower, ["grab", "taxi", "chuyen xe", "chuyến xe"]) || mcc === 4121) {
    const km = amountVnd >= 150_000 ? 10 : 8;
    return profile({
      id: "ride-hailing-ice",
      method: "activity-based",
      tag: "Xe công nghệ dùng xăng",
      co2eKg: km * TAXI_KG_CO2E_PER_KM,
      formulaText: `${km} km × ${TAXI_KG_CO2E_PER_KM} kg CO2e/km`,
      assumptionText: "Demo giả định chuyến xe công nghệ 8-10 km; dùng taxi/car average khi không có dữ liệu loại xe.",
      sourceLabel: "UK GHG Conversion Factors: taxi/car travel",
      sourceRefs: ["UK Government GHG Conversion Factors: taxi/car travel"],
      confidence: "medium",
    });
  }

  if (mcc === 5411 || includesAny(lower, ["coopmart", "lotte mart", "circle k", "highlands", "mcdonald"])) {
    return notEstimated(
      "Chưa đủ dữ liệu sản phẩm",
      "Siêu thị/F&B có nhiều mặt hàng khác nhau; chỉ từ số tiền và MCC không biết khối lượng, nguyên liệu, vận chuyển hay bao bì nên demo không gán CO2e.",
    );
  }

  if (mcc === 5691 || includesAny(lower, ["mango", "the body shop", "fashion", "vinfast"])) {
    return notEstimated(
      "Chưa đủ dữ liệu sản phẩm",
      "Thời trang/retail cần dữ liệu sản phẩm cụ thể hoặc supplier disclosure; demo không dùng hệ số spend-based để tránh suy diễn quá mức.",
    );
  }

  return notEstimated(
    "Chưa đủ dữ liệu",
    "Giao dịch này chưa có profile activity-based đủ chắc, nên demo chỉ ghi nhận giao dịch và không tính CO2e.",
  );
}
