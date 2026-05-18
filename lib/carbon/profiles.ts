import type { SpendCategory } from "../types";

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
const FUEL_PRICE_VND_PER_LITER = 23_000;
const GASOLINE_KG_CO2_PER_LITER = 2.319;
const VN_GRID_KG_CO2E_PER_KWH = 0.6766;
const VN_ELECTRICITY_PRICE_VND_PER_KWH = 2_250;
const EV_KWH_PER_KM = 0.16;
const EV_RIDE_PRICE_VND_PER_KM = 14_000;
const ICE_RIDE_KG_CO2E_PER_KM = 0.185;
const ICE_RIDE_PRICE_VND_PER_KM = 12_500;

const EDUCATIONAL_INTENSITIES: Record<string, number> = {
  electricity: 300,
  fuel: 100,
  flight: 38.5,
  grocery: 30,
  restaurant: 10.5,
  apparel: 7.5,
  telecom: 5,
  electricRide: 2,
  busRail: 3,
};

function includesAny(value: string, keywords: string[]): boolean {
  const normalized = value.toLowerCase().normalize("NFD");
  return keywords.some((keyword) => normalized.includes(keyword));
}

function roundKg(value: number): number {
  return Math.max(0.001, Math.round(value * 1000) / 1000);
}

function amountMillions(amountVnd: number): number {
  return amountVnd / VND_PER_MILLION;
}

function profile(input: Omit<CarbonProfile, "co2eKg"> & { amountVnd: number }): CarbonProfile {
  return {
    ...input,
    co2eKg: roundKg(amountMillions(input.amountVnd) * input.intensityKgPerMillionVnd),
  };
}

function spendProfile({
  id,
  tag,
  amountVnd,
  intensity,
  sourceLabel,
  sourceRefs,
  assumptionText,
  confidence,
}: {
  id: string;
  tag: string;
  amountVnd: number;
  intensity: number;
  sourceLabel: string;
  sourceRefs: string[];
  assumptionText: string;
  confidence: CarbonConfidence;
}): CarbonProfile {
  return profile({
    id,
    method: "spend-intensity",
    tag,
    amountVnd,
    intensityKgPerMillionVnd: intensity,
    formulaText: `${amountMillions(amountVnd).toFixed(2)} triệu VND × ${intensity} kg CO2e/triệu VND`,
    assumptionText,
    sourceLabel,
    sourceRefs,
    confidence,
  });
}

export function resolveCarbonProfile(input: ProfileInput): CarbonProfile {
  const { amountVnd, merchant, mcc, category } = input;
  const lower = merchant.toLowerCase().normalize("NFD");

  if (includesAny(lower, ["shell", "petrolimex", "xang", "xăng", "petrol"]) || mcc === 5541 || mcc === 5542) {
    const litersPerMillion = VND_PER_MILLION / FUEL_PRICE_VND_PER_LITER;
    const directIntensity = litersPerMillion * GASOLINE_KG_CO2_PER_LITER;
    return spendProfile({
      id: "fuel-vn-adjusted",
      tag: "Xăng dầu",
      amountVnd,
      intensity: Math.round(directIntensity),
      sourceLabel: "EPA GHG Emission Factors Hub 2025 + giá xăng VN",
      sourceRefs: [
        "EPA Table 2: Motor Gasoline = 8.78 kg CO2/gallon = 2.319 kg CO2/liter",
        "Giá xăng demo 23.000 VND/lít để quy đổi theo 1 triệu VND",
      ],
      assumptionText: `1 triệu VND mua khoảng ${litersPerMillion.toFixed(1)} lít xăng; EF = ${GASOLINE_KG_CO2_PER_LITER} kg CO2/lít.`,
      confidence: "high",
    });
  }

  if (includesAny(lower, ["xanh sm", "xanhsm", "green sm", "grab electric", "be green"])) {
    const kwhPerMillion = (VND_PER_MILLION / EV_RIDE_PRICE_VND_PER_KM) * EV_KWH_PER_KM;
    const directIntensity = kwhPerMillion * VN_GRID_KG_CO2E_PER_KWH;
    return spendProfile({
      id: "electric-ride-vn-grid",
      tag: "Taxi/xe công nghệ điện",
      amountVnd,
      intensity: Math.max(1, Math.round(directIntensity)),
      sourceLabel: "Green SM official + hệ số điện lưới VN + IEA EV Outlook",
      sourceRefs: [
        "Green SM official website: pure-electric mobility service",
        "Vietnam grid EF assumption 0.6766 kg CO2e/kWh",
        "IEA Global EV Outlook: EV has no tailpipe emissions but grid electricity matters",
      ],
      assumptionText: `Xe điện demo dùng ${EV_KWH_PER_KM} kWh/km, giá ${EV_RIDE_PRICE_VND_PER_KM.toLocaleString("vi-VN")} VND/km, lưới điện VN ${VN_GRID_KG_CO2E_PER_KWH} kg CO2e/kWh.`,
      confidence: "medium",
    });
  }

  if (includesAny(lower, ["grab", "taxi", "chuyen xe", "chuyến xe"]) || mcc === 4121) {
    const kmPerMillion = VND_PER_MILLION / ICE_RIDE_PRICE_VND_PER_KM;
    const directIntensity = kmPerMillion * ICE_RIDE_KG_CO2E_PER_KM;
    return spendProfile({
      id: "ride-hailing-ice",
      tag: "Xe công nghệ dùng xăng",
      amountVnd,
      intensity: Math.round(directIntensity),
      sourceLabel: "EPA GHG Emission Factors Hub 2025 Table 10",
      sourceRefs: [
        "EPA Table 10: Passenger Car = 0.297 kg CO2/vehicle-mile = 0.185 kg CO2/km",
      ],
      assumptionText: `Taxi/Grab thường demo dùng ${ICE_RIDE_PRICE_VND_PER_KM.toLocaleString("vi-VN")} VND/km và EF xe con ${ICE_RIDE_KG_CO2E_PER_KM} kg CO2/km.`,
      confidence: "medium",
    });
  }

  if (includesAny(lower, ["vinbus", "xe buyt dien", "xe buýt điện", "duong sat", "đường sắt", "vietnam railway", "tau hoa", "tàu hỏa"]) || mcc === 4111 || mcc === 4131) {
    return spendProfile({
      id: "bus-rail-low-carbon",
      tag: includesAny(lower, ["vinbus", "xe buyt dien", "xe buýt điện"]) ? "Xe buýt điện" : "Bus/tàu",
      amountVnd,
      intensity: EDUCATIONAL_INTENSITIES.busRail,
      sourceLabel: "EPA Table 10 + VinBus/rail low-carbon adjustment",
      sourceRefs: [
        "EPA Table 10: Bus = 0.066 kg CO2/passenger-mile; rail factors also reported by passenger-mile",
        "VinBus official website for electric bus classification",
      ],
      assumptionText: "Game hoá nhóm bus/tàu ở mức rất thấp để khuyến khích thay thế xe cá nhân/xăng dầu.",
      confidence: "medium",
    });
  }

  if (includesAny(lower, ["vietnam airlines", "airlines", "flight"]) || (mcc >= 3000 && mcc <= 3299)) {
    return spendProfile({
      id: "air-travel-education",
      tag: "Hàng không",
      amountVnd,
      intensity: EDUCATIONAL_INTENSITIES.flight,
      sourceLabel: "EPA Table 10 / ICAO Carbon Emissions Calculator",
      sourceRefs: [
        "EPA Table 10: Air travel factors by passenger-mile",
        "ICAO Carbon Emissions Calculator methodology",
      ],
      assumptionText: "Giữ hệ số theo 1 triệu VND để so sánh hành vi chi tiêu; không dùng làm carbon audit từng chuyến bay.",
      confidence: "medium",
    });
  }

  if (mcc === 4900 || includesAny(lower, ["evn", "electric", "dien luc", "điện lực", "hoa don dien", "hóa đơn điện"])) {
    const kwhPerMillion = VND_PER_MILLION / VN_ELECTRICITY_PRICE_VND_PER_KWH;
    const directIntensity = kwhPerMillion * VN_GRID_KG_CO2E_PER_KWH;
    return spendProfile({
      id: "electricity-vn-grid",
      tag: "Điện sinh hoạt",
      amountVnd,
      intensity: Math.round(directIntensity),
      sourceLabel: "Hệ số điện lưới Việt Nam + giá điện demo",
      sourceRefs: [
        "Vietnam grid EF assumption 0.6766 kg CO2e/kWh",
        "Giá điện demo 2.250 VND/kWh để quy đổi theo 1 triệu VND",
      ],
      assumptionText: `1 triệu VND tiền điện ≈ ${kwhPerMillion.toFixed(0)} kWh × ${VN_GRID_KG_CO2E_PER_KWH} kg CO2e/kWh.`,
      confidence: "medium",
    });
  }

  if (mcc === 5411 || includesAny(lower, ["coopmart", "lotte mart", "circle k"])) {
    return spendProfile({
      id: "grocery-education",
      tag: "Siêu thị",
      amountVnd,
      intensity: EDUCATIONAL_INTENSITIES.grocery,
      sourceLabel: "EPA USEEIO-style educational benchmark",
      sourceRefs: ["Educational spend-intensity benchmark for B2C gameplay"],
      assumptionText: "Hệ số tham khảo để so sánh hành vi chi tiêu; không đại diện cho từng sản phẩm trong giỏ hàng.",
      confidence: "low",
    });
  }

  if (mcc === 5812 || mcc === 5814 || includesAny(lower, ["highlands", "mcdonald", "restaurant", "coffee"])) {
    return spendProfile({
      id: "restaurant-education",
      tag: "F&B / nhà hàng",
      amountVnd,
      intensity: EDUCATIONAL_INTENSITIES.restaurant,
      sourceLabel: "EPA USEEIO-style educational benchmark",
      sourceRefs: ["Educational spend-intensity benchmark for B2C gameplay"],
      assumptionText: "Hệ số tham khảo cho game hoá; muốn chính xác cần dữ liệu món ăn/nguyên liệu/khối lượng.",
      confidence: "low",
    });
  }

  if (mcc === 5691 || includesAny(lower, ["mango", "the body shop", "fashion", "vinfast"])) {
    return spendProfile({
      id: "apparel-retail-education",
      tag: "Thời trang/retail",
      amountVnd,
      intensity: EDUCATIONAL_INTENSITIES.apparel,
      sourceLabel: "EPA USEEIO-style educational benchmark",
      sourceRefs: ["Educational spend-intensity benchmark for B2C gameplay"],
      assumptionText: "Hệ số tham khảo theo chi tiêu để giáo dục; không chứng nhận sản phẩm xanh hay footprint từng món hàng.",
      confidence: "low",
    });
  }

  if (category === "utilities") {
    return spendProfile({
      id: "telecom-utilities-education",
      tag: "Viễn thông/tiện ích số",
      amountVnd,
      intensity: EDUCATIONAL_INTENSITIES.telecom,
      sourceLabel: "Educational benchmark for low-carbon digital utilities",
      sourceRefs: ["Educational spend-intensity benchmark for B2C gameplay"],
      assumptionText: "Hệ số thấp để phản ánh dịch vụ số/viễn thông có footprint trực tiếp thấp hơn điện/xăng.",
      confidence: "low",
    });
  }

  return spendProfile({
    id: "other-education",
    tag: "Chi tiêu khác",
    amountVnd,
    intensity: 20,
    sourceLabel: "Educational benchmark",
    sourceRefs: ["Fallback educational spend-intensity benchmark"],
    assumptionText: "Không có profile riêng nên dùng benchmark trung tính cho mục đích game hoá.",
    confidence: "low",
  });
}
