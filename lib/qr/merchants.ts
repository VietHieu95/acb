import type { SpendCategory } from "../types";

export interface QrMerchant {
  id: string;
  merchant: string;
  amountVnd: number;
  mcc: number;
  category: SpendCategory;
  icon: string;
  tierHint: "green" | "yellow" | "red";
  description: string;
  triggersBagPrompt?: boolean;
}

/** Mã QR demo: ACBECO:v1|{id} */
export const QR_MERCHANTS: QrMerchant[] = [
  {
    id: "vinbus",
    merchant: "VinBus - Tuyến Bến Thành",
    amountVnd: 7_000,
    mcc: 4111,
    category: "transport",
    icon: "🚌",
    tierHint: "green",
    description: "Xe buýt điện — phát thải thấp",
  },
  {
    id: "xanhsm",
    merchant: "Xanh SM - Chuyến đi",
    amountVnd: 125_000,
    mcc: 4121,
    category: "transport",
    icon: "🚕",
    tierHint: "green",
    description: "Taxi điện — nhận diện AI",
  },
  {
    id: "train",
    merchant: "Đường sắt Việt Nam - SE1",
    amountVnd: 890_000,
    mcc: 4111,
    category: "travel",
    icon: "🚆",
    tierHint: "green",
    description: "Tàu hỏa — thay thế máy bay",
  },
  {
    id: "coopmart",
    merchant: "Co.opmart Nguyễn Đình Chiểu",
    amountVnd: 487_500,
    mcc: 5411,
    category: "shopping",
    icon: "🛒",
    tierHint: "yellow",
    description: "Siêu thị — có hỏi túi vải sau thanh toán",
    triggersBagPrompt: true,
  },
  {
    id: "bodyshop",
    merchant: "The Body Shop Vincom",
    amountVnd: 650_000,
    mcc: 5691,
    category: "shopping",
    icon: "🌿",
    tierHint: "green",
    description: "Thương hiệu bền vững",
  },
  {
    id: "mango",
    merchant: "Mango Committed - Fashion",
    amountVnd: 1_200_000,
    mcc: 5691,
    category: "shopping",
    icon: "👗",
    tierHint: "green",
    description: "Thời trang bền vững",
  },
  {
    id: "highlands",
    merchant: "Highlands Coffee Organic",
    amountVnd: 89_000,
    mcc: 5812,
    category: "food",
    icon: "☕",
    tierHint: "yellow",
    description: "F&B organic",
  },
  {
    id: "grab",
    merchant: "Grab - Chuyến xe",
    amountVnd: 156_000,
    mcc: 4121,
    category: "transport",
    icon: "🛵",
    tierHint: "red",
    description: "Xe xăng — phát thải cao hơn",
  },
  {
    id: "shell",
    merchant: "Shell Petrol Station Q1",
    amountVnd: 850_000,
    mcc: 5541,
    category: "transport",
    icon: "⛽",
    tierHint: "red",
    description: "Trạm xăng — carbon cao",
  },
  {
    id: "vietnam-airlines",
    merchant: "Vietnam Airlines - SGN HAN",
    amountVnd: 2_890_000,
    mcc: 3000,
    category: "travel",
    icon: "✈️",
    tierHint: "red",
    description: "Hàng không — phát thải rất cao",
  },
];

export function getMerchantById(id: string): QrMerchant | undefined {
  return QR_MERCHANTS.find((m) => m.id === id);
}

export function encodeQrPayload(merchantId: string): string {
  return `ACBECO:v1|${merchantId}`;
}
