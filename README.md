# ACB Eco-Tracker — Web Demo

Demo mobile-first mô phỏng tính năng **ACB Eco-Tracker**: theo dõi dấu chân carbon từ giao dịch thẻ/QR (MCC + Input-Output Model), nhận diện merchant xanh, game **Khu rừng**, push túi vải và ưu đãi ESG.

> **Lưu ý:** Đây là prototype thuyết trình, không kết nối hệ thống ngân hàng thật. Số liệu carbon mang tính giáo dục.

## Chạy local

```bash
npm install
npm run dev
```

Mở [http://localhost:3000](http://localhost:3000) — giao diện hiển thị khung điện thoại 390px.

## Deploy Vercel

```bash
npx vercel
```

Hoặc import repo GitHub trên [vercel.com](https://vercel.com) → Framework: **Next.js** → Deploy.

## Quét QR & thanh toán (tương tác)

1. Tab **Quét QR** (nút giữa) hoặc **Quét QR thanh toán** trên Trang chủ.
2. Cấp quyền **camera** → quét mã QR từ trang **Mã QR demo** (`/qr-codes`).
3. Xác nhận thanh toán → giao dịch mới xuất hiện (nhãn **Mới**), số dư giảm, carbon cập nhật.
4. Quét **Co.opmart** → popup hỏi túi vải.

**Hai cách dùng mã QR:**
- Trong app: mở `/qr-codes` (máy thứ 2 hoặc in màn hình).
- File PNG in sẵn: chạy `npm run generate-qr` → thư mục `public/qr/*.png`.

| Mã dịch vụ | Dịch vụ | Gợi ý carbon |
|------------|---------|--------------|
| `vinbus` | VinBus 7.000₫ | Xanh |
| `xanhsm` | Xanh SM 125.000₫ | Xanh |
| `train` | Tàu hỏa 890.000₫ | Xanh |
| `coopmart` | Co.opmart 487.500₫ | Vàng + túi vải |
| `bodyshop` | The Body Shop | Xanh |
| `mango` | Mango Committed | Xanh |
| `highlands` | Highlands Organic | Vàng |
| `grab` | Grab | Đỏ |
| `shell` | Shell xăng | Đỏ |
| `vietnam-airlines` | Vietnam Airlines | Đỏ |

Payload QR: `ACBECO:v1|{mã}` (vd. `ACBECO:v1|vinbus`).

## Kịch bản pitch (~3 phút)

1. **Trang chủ** — Số dư, CO₂ tháng, biểu đồ theo danh mục, widget Khu rừng.
2. **Giao dịch** — So sánh VinBus/Xanh SM (xanh) với Shell/Vietnam Airlines (đỏ). Lọc Tất cả / Xanh / Đỏ.
3. **Popup túi vải** — Xuất hiện khi vào app (giao dịch Co.opmart). Chọn **Có** → +50 điểm, −0,2 kg CO₂.
4. **Khu rừng** — Xem cây theo điểm xanh; nếu 3+ giao dịch đỏ liên tiếp → cây héo (animation).
5. **Ưu đãi** — Voucher ESG theo stage rừng; quyên góp trồng cây (demo UX).

## Reset demo

Giữ **logo ACB ONE** ở header ~3 giây → bấm **Reset demo** để xóa trạng thái `localStorage`.

## Công thức (demo)

```
CO₂e (kg) = (Số tiền VNĐ / 1.000.000) × EF(MCC) × Hệ số merchant
```

- **EF:** hệ số phát thải theo ngành (MCC), ví dụ xăng 5541 cao, giao thông công cộng 4111 thấp.
- **Merchant:** rule-based (VinBus, Xanh SM, tàu hỏa, thương hiệu bền vững…).

## Cấu trúc chính

- `lib/carbon/` — calculator, MCC factors, merchant rules
- `lib/forest/score.ts` — điểm xanh, stage cây
- `lib/mock/transactions.ts` — 18 giao dịch mẫu
- `context/EcoProvider.tsx` — state + localStorage
