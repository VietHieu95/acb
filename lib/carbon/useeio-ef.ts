/**
 * Hệ số phát thải EPA USEEIO (spend-based), theo mã ngành BEA.
 * Nguồn: EPA US Environmentally-Extended Input-Output (USEEIO) model.
 * Cột gốc: kg CO2e / USD. Quy đổi sang kg CO2e / 1.000.000 VNĐ theo tỷ giá bên dưới.
 */

export const VND_PER_USD = 26_000;
const VND_PER_MILLION = 1_000_000;

export interface UseeioFactor {
  /** Mã ngành BEA/USEEIO */
  code: string;
  /** Tên ngành (EN) */
  nameEn: string;
  /** Hệ số gốc kg CO2e / USD */
  kgCo2ePerUsd: number;
}

export const USEEIO_FACTORS: UseeioFactor[] = [
  { code: "22", nameEn: "Electricity, natural gas, drinking water, and wastewater treatment", kgCo2ePerUsd: 2.793 },
  { code: "111CA", nameEn: "Oilseeds, grains, vegetables, fruits, animal farms and aquaculture", kgCo2ePerUsd: 1.72 },
  { code: "486", nameEn: "Pipeline transport", kgCo2ePerUsd: 1.712 },
  { code: "562", nameEn: "Waste management and remediation services", kgCo2ePerUsd: 1.293 },
  { code: "484", nameEn: "Truck transport", kgCo2ePerUsd: 1.281 },
  { code: "212", nameEn: "Metal ores, dimensional stone, nonmetallic minerals", kgCo2ePerUsd: 1.096 },
  { code: "481", nameEn: "Air transport", kgCo2ePerUsd: 0.887 },
  { code: "211", nameEn: "Unrefined oil and gas", kgCo2ePerUsd: 0.881 },
  { code: "327", nameEn: "Clay, glass, cement, concrete, and other nonmetallic mineral products", kgCo2ePerUsd: 0.822 },
  { code: "311FT", nameEn: "Food and beverage and tobacco products", kgCo2ePerUsd: 0.762 },
  { code: "213", nameEn: "Well drilling and support activities for mining", kgCo2ePerUsd: 0.694 },
  { code: "482", nameEn: "Rail transport", kgCo2ePerUsd: 0.664 },
  { code: "483", nameEn: "Water transport (boats, ships, ferries)", kgCo2ePerUsd: 0.653 },
  { code: "324", nameEn: "Petroleum fuels, asphalt, and other petroleum and coal products", kgCo2ePerUsd: 0.62 },
  { code: "331", nameEn: "Primary and secondary ferrous and nonferrous metals", kgCo2ePerUsd: 0.6 },
  { code: "322", nameEn: "Paper products and paper production facilities", kgCo2ePerUsd: 0.475 },
  { code: "325", nameEn: "Agricultural, pharmaceutical, industrial, and commercial chemicals", kgCo2ePerUsd: 0.43 },
  { code: "493", nameEn: "Warehouses", kgCo2ePerUsd: 0.429 },
  { code: "ORE", nameEn: "Other real estate", kgCo2ePerUsd: 0.419 },
  { code: "487OS", nameEn: "Couriers, messengers, transportation for leisure activities", kgCo2ePerUsd: 0.403 },
  { code: "713", nameEn: "Amusement facilities, gambling facilities, resort and recreation facilities", kgCo2ePerUsd: 0.366 },
  { code: "485", nameEn: "Passenger ground transport", kgCo2ePerUsd: 0.331 },
  { code: "326", nameEn: "Plastics and rubber products", kgCo2ePerUsd: 0.305 },
  { code: "113FF", nameEn: "Raw forest products, wild-caught fish and game, agriculture and forestry support", kgCo2ePerUsd: 0.294 },
  { code: "23", nameEn: "Construction", kgCo2ePerUsd: 0.285 },
  { code: "323", nameEn: "Print media and printing support", kgCo2ePerUsd: 0.275 },
  { code: "332", nameEn: "Fabricated metal products", kgCo2ePerUsd: 0.27 },
  { code: "3361MV", nameEn: "On-road vehicles (excluding motorcycles) and accompanying parts", kgCo2ePerUsd: 0.247 },
  { code: "321", nameEn: "Wood products (e.g. plywood, veneer)", kgCo2ePerUsd: 0.244 },
  { code: "313TT", nameEn: "Textiles and textile-derived products (except clothes)", kgCo2ePerUsd: 0.243 },
  { code: "445", nameEn: "Food and beverage stores", kgCo2ePerUsd: 0.239 },
  { code: "333", nameEn: "Machinery (except computers)", kgCo2ePerUsd: 0.22 },
  { code: "722", nameEn: "Food and beverage establishments", kgCo2ePerUsd: 0.215 },
  { code: "525", nameEn: "Funds, trusts, and financial vehicles", kgCo2ePerUsd: 0.197 },
  { code: "335", nameEn: "Lights and light fixtures, switch boards, transformers, and home appliances", kgCo2ePerUsd: 0.196 },
  { code: "61", nameEn: "Educational institutions and services", kgCo2ePerUsd: 0.195 },
  { code: "337", nameEn: "Furniture and shelving", kgCo2ePerUsd: 0.195 },
  { code: "452", nameEn: "General merchandise stores", kgCo2ePerUsd: 0.179 },
  { code: "721", nameEn: "Hotels and campgrounds", kgCo2ePerUsd: 0.177 },
  { code: "4A0", nameEn: "Other retail", kgCo2ePerUsd: 0.171 },
  { code: "622", nameEn: "Hospitals", kgCo2ePerUsd: 0.165 },
  { code: "623", nameEn: "Nursing, community, mental health, and substance abuse facilities", kgCo2ePerUsd: 0.162 },
  { code: "624", nameEn: "Child day care, community food services, housing services, and other relief services", kgCo2ePerUsd: 0.157 },
  { code: "81", nameEn: "Other services, except government", kgCo2ePerUsd: 0.148 },
  { code: "441", nameEn: "Vehicles and parts sales", kgCo2ePerUsd: 0.148 },
  { code: "339", nameEn: "Medical supplies, entertainment and sporting goods, fashion goods, advertising products", kgCo2ePerUsd: 0.144 },
  { code: "42", nameEn: "Wholesale trade", kgCo2ePerUsd: 0.137 },
  { code: "5412OP", nameEn: "Miscellaneous professional, scientific, and technical services", kgCo2ePerUsd: 0.135 },
  { code: "3364OT", nameEn: "Other vehicles (e.g. aircraft, water vessels), missiles, and accompanying parts", kgCo2ePerUsd: 0.116 },
  { code: "561", nameEn: "Administrative and support services", kgCo2ePerUsd: 0.114 },
  { code: "315AL", nameEn: "Clothing and leather", kgCo2ePerUsd: 0.104 },
  { code: "55", nameEn: "Company and enterprise management", kgCo2ePerUsd: 0.104 },
  { code: "523", nameEn: "Financial investments, exchanges, and advising", kgCo2ePerUsd: 0.094 },
  { code: "621", nameEn: "Healthcare professions, laboratories, and ambulances", kgCo2ePerUsd: 0.09 },
  { code: "532RL", nameEn: "Renting and leasing of goods, equipment, vehicles and nonfinancial intangible assets", kgCo2ePerUsd: 0.088 },
  { code: "514", nameEn: "Data processing, internet publishing, and other information services", kgCo2ePerUsd: 0.085 },
  { code: "513", nameEn: "Radio, TV, telecommunication", kgCo2ePerUsd: 0.085 },
  { code: "711AS", nameEn: "Performing arts, spectator sports, museums, and related activities", kgCo2ePerUsd: 0.072 },
  { code: "5415", nameEn: "Computer programming and systems design", kgCo2ePerUsd: 0.064 },
  { code: "521CI", nameEn: "Monetary authorities, depository and nondepository credit intermediation and related activities", kgCo2ePerUsd: 0.061 },
  { code: "334", nameEn: "Computers and relevant parts, conductors, measuring devices, communication devices", kgCo2ePerUsd: 0.06 },
  { code: "5411", nameEn: "Legal services", kgCo2ePerUsd: 0.056 },
  { code: "511", nameEn: "Media, literature, and software", kgCo2ePerUsd: 0.055 },
  { code: "512", nameEn: "Film and sound-based entertainment", kgCo2ePerUsd: 0.054 },
  { code: "524", nameEn: "Insurance agencies, carriers, and brokerages", kgCo2ePerUsd: 0.041 },
  { code: "HS", nameEn: "Housing", kgCo2ePerUsd: 0.02 },
];

const BY_CODE: Record<string, UseeioFactor> = Object.fromEntries(
  USEEIO_FACTORS.map((f) => [f.code, f]),
);

export function getFactor(code: string): UseeioFactor {
  const f = BY_CODE[code];
  if (!f) throw new Error(`USEEIO code không tồn tại: ${code}`);
  return f;
}

/** kg CO2e / 1.000.000 VNĐ — quy đổi từ kg CO2e/USD theo tỷ giá; cắt nhiễu float ở 6 chữ số (không làm tròn số liệu). */
export function efPerMillionVnd(code: string): number {
  const ef = getFactor(code);
  return parseFloat(((ef.kgCo2ePerUsd * VND_PER_MILLION) / VND_PER_USD).toFixed(6));
}
