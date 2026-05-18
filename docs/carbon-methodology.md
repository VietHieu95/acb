# Carbon methodology and teacher Q&A

This project is a B2C banking prototype for education and gamification, not an ISO 14064 / corporate carbon inventory. The purpose is to help customers compare spending categories and understand greener lifestyle choices.

## 1. Core explanation

MCC is not an emission-factor database. MCC only classifies the transaction category. Eco-Tracker then applies an educational emission factor by spending category:

```text
CO2e = (Transaction amount / 1,000,000 VND) x educational EF
```

This is designed for relative comparison inside a banking app: spending 1 million VND on fuel should look worse than spending 1 million VND on bus/rail. The absolute kg number is an estimate and can differ from real life.

## 2. Recommended EF table for the demo

| MCC / category | Sector | EF used (kg CO2e / 1M VND) | Rationale | Confidence |
|---|---|---:|---|---|
| 4900 / electricity | Electricity bill | 300 | Vietnam grid EF approx. 0.6766 kg/kWh and 1M VND electricity approx. 440-500 kWh | Medium |
| 5541 | Fuel / gasoline | 100 | EPA Motor Gasoline 8.78 kg CO2/gallon = 2.319 kg/liter; 1M VND / 23,000 VND/liter approx. 43.5 liters | High |
| 3000-3299 / 4511 | Air travel | 38.5 | Educational benchmark from EPA/air-travel factor logic, kept for relative game scoring | Medium |
| 5411 | Grocery / supermarket | 30 | Educational retail benchmark, not product-level footprint | Low |
| 5812 / 5814 | Restaurant / F&B | 10.5 | Educational F&B benchmark, not menu-level footprint | Low |
| 5691 / 5651 | Apparel / retail | 7.5 | Educational apparel benchmark, not item-level LCA | Low |
| 4814 / 4899 | Telecom / internet | 5 | Low-carbon digital utility benchmark | Low |
| 4111 / 4112 | Bus / rail | 3 | Low-carbon mobility benchmark; VinBus/rail are encouraged in gameplay | Medium |
| Xanh SM / EV ride | Electric ride-hailing | 1-2 | EV kWh/km x Vietnam grid EF, low but not zero | Medium |
| Grab/taxi ICE | Ride-hailing gasoline | ~15 | EPA passenger car 0.297 kg/mile = 0.185 kg/km plus fare/km assumption | Medium |

## 3. Source basis

| Source | What it supports | Presentation line |
|---|---|---|
| EPA GHG Emission Factors Hub 2025 | Gasoline, passenger car, bus, rail, air factors | "EPA gives the base activity factors; we convert them into VND-based educational factors." |
| Vietnam grid emission factor | Electricity and EV indirect emissions | "Vietnam electricity is carbon-intensive, so electricity bill has high EF." |
| GHG Protocol Scope 3 Calculation Guidance | Allows choosing methods based on available data | "This is an estimate based on available transaction data, not a formal audit." |
| Green SM / VinBus official websites | Merchant classification as electric/green transport | "Merchant name helps classify Xanh SM/VinBus as low-carbon mobility." |
| IEA Global EV Outlook | EVs have no tailpipe emissions but depend on electricity mix | "EV is lower than gasoline, but not zero." |

Important EPA figures from the uploaded workbook:

- Table 2: Motor Gasoline = **8.78 kg CO2/gallon** = **2.319 kg CO2/liter**.
- Table 10: Passenger Car = **0.297 kg CO2/vehicle-mile** = **0.185 kg CO2/km**.
- Table 10: Bus = **0.066 kg CO2/passenger-mile** = **0.041 kg CO2/passenger-km**.
- Table 10: Intercity Rail National Average = **0.096 kg CO2/passenger-mile** = **0.060 kg CO2/passenger-km**.
- Table 10: Air Travel Medium Haul = **0.129 kg CO2/passenger-mile** = **0.080 kg CO2/passenger-km**.

## 4. Why this is acceptable for ACB Eco-Tracker

The product goal is not exact carbon accounting. It is to make invisible emissions visible enough for retail customers to compare choices:

- Bus/rail and EV rides should reward the forest.
- Fuel, electricity, and flights should pressure the carbon budget.
- Grocery/F&B/apparel remain approximate education signals, not product-level claims.

A fair product disclaimer is:

> Hệ số phát thải mang tính tham khảo, dựa trên EPA GHG Emission Factors Hub 2025 và hệ số điện lưới Việt Nam. Kết quả dùng cho giáo dục/game hoá, không phải kiểm kê carbon chính thức; sai số có thể khoảng ±30% hoặc cao hơn với mua sắm/F&B/thời trang.

## 5. Teacher Q&A

### Q1. EF lấy từ đâu?

MCC không phải nguồn EF. MCC chỉ phân loại ngành. EF lấy từ EPA GHG Emission Factors Hub 2025, hệ số điện lưới Việt Nam, và một số benchmark giáo dục cho nhóm bán lẻ/F&B.

### Q2. Vì sao dùng kg/triệu VND thay vì tính từng sản phẩm?

Vì app ngân hàng chỉ có dữ liệu giao dịch: số tiền, merchant, MCC. Khách hàng B2C cần tín hiệu tương đối để thay đổi hành vi, không cần carbon audit từng SKU. Nếu có dữ liệu sản phẩm trong tương lai thì có thể nâng cấp.

### Q3. Xăng 100 kg/triệu lấy ở đâu?

EPA cho Motor Gasoline = 8.78 kg CO2/gallon = 2.319 kg/liter. Với giá xăng demo 23,000 VND/liter, 1 triệu VND mua khoảng 43.5 lít, phát thải khoảng 101 kg CO2.

### Q4. Điện 300 kg/triệu có cao quá không?

Không. Với hệ số điện lưới Việt Nam khoảng 0.6766 kg/kWh và 1 triệu VND mua khoảng 440-500 kWh điện, phát thải khoảng 300-338 kg CO2e. Dùng 300 là bảo thủ.

### Q5. Vì sao Xanh SM không bằng 0?

Xe điện không phát thải tại ống xả, nhưng điện sạc vẫn có phát thải từ lưới điện. Vì vậy Xanh SM thấp hơn Grab/xăng nhưng không bằng 0.

### Q6. Siêu thị/F&B/thời trang có chính xác không?

Không chính xác đến từng sản phẩm. Đây là benchmark giáo dục theo chi tiêu. App nên ghi rõ là tham khảo; sản phẩm thật cần SKU, trọng lượng, thành phần, bao bì, logistics hoặc dữ liệu merchant.

### Q7. Nếu thầy hỏi đây có phải carbon audit không?

Không. Đây là consumer-facing estimate cho giáo dục và game hoá. App không phục vụ báo cáo ISO 14064 hay báo cáo ESG doanh nghiệp.

## 6. One-minute defense script

"Eco-Tracker dùng MCC để phân loại giao dịch, rồi gán hệ số phát thải tham khảo theo 1 triệu VND để giáo dục người dùng. Các hệ số quan trọng như xăng và xe lấy từ EPA GHG Emission Factors Hub 2025; điện hiệu chỉnh theo hệ số điện lưới Việt Nam; Xanh SM/VinBus được nhận diện bằng tên merchant. Mục tiêu không phải kiểm kê carbon chính xác, mà là giúp khách hàng thấy chi tiêu nào tương đối xanh hơn và game hoá hành vi tiêu dùng bền vững."
