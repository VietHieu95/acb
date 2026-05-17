export interface MerchantMatch {
  modifier: number;
  tag: string;
}

/**
 * Merchant modifiers model the app's AI/name matching layer.
 * Values are conservative demo assumptions: known electric/public transport
 * merchants reduce the generic MCC factor; high-carbon merchants keep baseline.
 */
const RULES: { keywords: string[]; modifier: number; tag: string }[] = [
  {
    keywords: ["vinbus", "xe buýt điện", "xe buyt dien"],
    modifier: 0.12,
    tag: "Xe buýt điện",
  },
  {
    keywords: ["xanh sm", "xanhsm", "green sm", "grab electric"],
    modifier: 0.18,
    tag: "Taxi/xe công nghệ điện",
  },
  {
    keywords: ["be green", "be group electric"],
    modifier: 0.25,
    tag: "Di chuyển điện",
  },
  {
    keywords: ["đường sắt", "duong sat", "vietnam railway", "tàu hỏa", "tau hoa"],
    modifier: 0.45,
    tag: "Tàu hỏa",
  },
  {
    keywords: [
      "patagonia",
      "mango committed",
      "mango committed -",
      "the body shop",
      "everlane",
    ],
    modifier: 0.65,
    tag: "Thương hiệu bền vững",
  },
  {
    keywords: ["vinfast", "dat bike", "pega"],
    modifier: 0.5,
    tag: "Sản phẩm/xe điện",
  },
  {
    keywords: ["highlands organic", "starbucks reserve"],
    modifier: 0.8,
    tag: "F&B có thuộc tính xanh",
  },
];

export function matchMerchant(merchantName: string): MerchantMatch {
  const normalized = merchantName.toLowerCase().normalize("NFD");

  for (const rule of RULES) {
    if (rule.keywords.some((kw) => normalized.includes(kw))) {
      return { modifier: rule.modifier, tag: rule.tag };
    }
  }

  return { modifier: 1, tag: "" };
}
