export interface MerchantMatch {
  modifier: number;
  tag: string;
}

const RULES: { keywords: string[]; modifier: number; tag: string }[] = [
  {
    keywords: ["vinbus", "xe buýt điện", "xe buyt dien"],
    modifier: 0.3,
    tag: "Phương tiện điện",
  },
  {
    keywords: ["xanh sm", "xanhsm", "be group", "grab electric"],
    modifier: 0.4,
    tag: "Di chuyển xanh",
  },
  {
    keywords: ["đường sắt", "duong sat", "vietnam railway", "tàu hỏa", "tau hoa"],
    modifier: 0.35,
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
    modifier: 0.6,
    tag: "Thương hiệu bền vững",
  },
  {
    keywords: ["vinfast", "dat bike", "pega"],
    modifier: 0.45,
    tag: "Xe điện",
  },
  {
    keywords: ["highlands organic", "starbucks reserve"],
    modifier: 0.75,
    tag: "Cà phê bền vững",
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
