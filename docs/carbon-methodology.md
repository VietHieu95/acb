# Carbon methodology and teacher Q&A

This project is a presentation prototype, not an official ACB carbon accounting product. To avoid weak assumptions, the current demo only calculates CO2e for transactions that can be defended with activity-based logic: fuel, taxi/ride-hailing, electric mobility, public transport, rail, and flights.

## 1. Core explanation

MCC is not an emission-factor database. MCC only tells the app what kind of merchant the transaction belongs to.

```text
MCC -> classify transaction type -> choose carbon profile -> calculate if activity data can be defended
```

The demo uses:

```text
CO2e = activity data x emission factor
```

If a transaction does not contain enough defensible activity data, the app does not assign a CO2e number. It shows `Chưa đủ dữ liệu` instead.

## 2. What is calculated and what is not

| Transaction type | Demo decision | Reason |
|---|---|---|
| Fuel station | Calculate | Amount can estimate liters of gasoline. |
| Flight | Calculate | Route distance can estimate passenger-km. |
| Taxi / ride-hailing | Calculate | Demo can assume trip distance from fare. |
| Electric taxi / bus | Calculate | Electricity use and grid EF can estimate indirect emissions. |
| Rail | Calculate | Passenger-km factor is defensible. |
| Grocery / supermarket | Do not calculate | Transaction does not reveal product mix, weight, packaging, logistics. |
| F&B | Do not calculate | Transaction does not reveal food ingredients, portion size, waste, supply chain. |
| Fashion / retail | Do not calculate | Transaction does not reveal product material, quantity, supplier data. |

This is more conservative than forcing a spend-based EEIO number into every retail transaction.

## 3. Sources and role

| Source | Role in this prototype | What to say in presentation |
|---|---|---|
| GHG Protocol Scope 3 Calculation Guidance | Defends choosing calculation methods based on data quality. | "Em chỉ tính khi dữ liệu đủ bảo vệ; còn thiếu dữ liệu thì ghi chưa đủ dữ liệu." |
| US EPA gasoline factor | Supports gasoline combustion around 8.89 kg CO2/gallon = about 2.35 kg CO2/liter. | "MCC 5541 chỉ nhận diện trạm xăng; EF xăng lấy từ EPA/IPCC, không lấy từ MCC." |
| UK Government GHG Conversion Factors | Activity factors for taxi/car, bus, rail, and air travel. | "Giao thông dùng hệ số theo km/passenger-km." |
| ICAO Carbon Emissions Calculator | Supports flight-emission methodology. | "Vé máy bay tính theo khoảng cách route/passenger-km." |
| Green SM official website | Confirms Xanh SM is pure-electric mobility. | "Nguồn này dùng để phân loại merchant là xe điện." |
| VinBus official website | Confirms VinBus positioning as green/electric public transport. | "VinBus được classify là xe buýt điện." |
| IEA Global EV Outlook | Explains EVs reduce tailpipe emissions but lifecycle depends on grid electricity. | "Xe điện không bằng 0 vì còn phát thải gián tiếp từ điện lưới." |

Useful links:

- GHG Protocol Scope 3 Calculation Guidance: https://ghgprotocol.org/scope-3-calculation-guidance-2
- US EPA Greenhouse Gas Equivalencies / gasoline factor: https://www.epa.gov/energy/greenhouse-gases-equivalencies-calculator-calculations-and-references
- UK Government GHG Conversion Factors: https://www.gov.uk/government/collections/government-conversion-factors-for-company-reporting
- ICAO Carbon Emissions Calculator: https://www.icao.int/environmental-protection/Carbonoffset/Pages/default.aspx
- Green SM: https://www.greensm.com/vn-vi
- VinBus: https://vinbus.vn/
- IEA Global EV Outlook: https://www.iea.org/reports/global-ev-outlook-2024

## 4. Demo profiles

| Profile | Formula used in demo | Assumption | Source basis | Confidence |
|---|---|---|---|---|
| Fuel | liters x kg CO2/liter | Amount / 23,000 VND per liter | EPA/IPCC gasoline combustion | High |
| Vietnam Airlines | passenger-km x kg CO2e/pkm | SGN-HAN approx. 1,160 km | ICAO / UK GHG Factors | Medium |
| Xanh SM | km x kWh/km x Vietnam grid EF | 8-14 km trip, EV energy use 0.16 kWh/km, grid EF 0.66 kg/kWh | Green SM / IEA / grid EF assumption | Medium |
| VinBus | passenger-km x bus factor x EV adjustment | 6 km urban bus trip | VinBus / UK GHG Factors / IEA | Medium |
| Rail | passenger-km x rail factor | 320 km rail trip | UK GHG Factors | Medium |
| Grab/taxi | km x taxi/car factor | 8-10 km ride-hailing trip | UK GHG Factors | Medium |
| Grocery/F&B/fashion | Not estimated | Missing product/activity data | Data quality limitation | Not rated |

## 5. MCC mapping

| MCC | Meaning in demo | Carbon decision |
|---|---|---|
| 3000-3299 | Airlines | Calculate with flight profile. |
| 4111 / 4131 | Public transport / bus / rail-like services | Calculate if merchant matches VinBus/rail profile. |
| 4121 | Taxi / ride-hailing | Xanh SM electric profile if merchant matches; otherwise taxi/car profile. |
| 5411 | Grocery / supermarket | Do not calculate CO2e in demo. |
| 5541 / 5542 | Fuel station | Calculate with fuel liters profile. |
| 5691 | Apparel / fashion retail | Do not calculate CO2e in demo. |
| 5812 / 5814 | Restaurant / F&B | Do not calculate CO2e in demo. |

## 6. Teacher Q&A

### Q1. EF lấy từ đâu?

MCC không phải nguồn EF. MCC chỉ giúp phân loại giao dịch. EF lấy từ nguồn phát thải theo hoạt động: xăng dùng EPA/IPCC theo lít, giao thông dùng UK GHG Conversion Factors theo km/passenger-km, máy bay dùng ICAO/UK theo route/passenger-km.

### Q2. Vì sao bỏ siêu thị, F&B, thời trang?

Vì chỉ nhìn số tiền và MCC không biết người dùng mua gì, số lượng bao nhiêu, nguyên liệu gì, vận chuyển ra sao. Nếu gán hệ số spend-based sẽ dễ bị hỏi nguồn và độ chính xác. Demo chọn cách bảo thủ: ghi `Chưa đủ dữ liệu`, không cộng CO2e và không ảnh hưởng điểm xanh.

### Q3. Xanh SM là xe điện sao vẫn có phát thải?

Xe điện không có phát thải tại ống xả, nhưng điện sạc xe vẫn có phát thải gián tiếp từ lưới điện. Vì vậy Xanh SM thấp hơn Grab/xăng, nhưng không bằng 0.

### Q4. MCC có đủ để tính chính xác carbon không?

Không đủ. MCC chỉ là điểm bắt đầu. Muốn chính xác hơn cần dữ liệu bổ sung như số km, số lít xăng, điện năng tiêu thụ, loại phương tiện, hoặc dữ liệu verified từ merchant.

### Q5. Nếu muốn tính siêu thị/F&B/thời trang trong sản phẩm thật thì làm sao?

Cần dữ liệu cấp sản phẩm hoặc merchant disclosure: SKU, danh mục hàng, trọng lượng, thành phần, bao bì, logistics, hoặc database LCA/EEIO đã được hiệu chuẩn theo Việt Nam. Khi chưa có, app chỉ nên ghi nhận giao dịch và khuyến nghị bổ sung dữ liệu.

### Q6. Vì sao hàng không cao hơn tàu?

Vì tính theo passenger-km, flight factor thường cao hơn rail factor. App dùng khoảng cách route để phản ánh khác biệt này thay vì chỉ nhìn giá vé.

### Q7. Nếu giá xăng thay đổi thì sao?

Trong demo, giá xăng là giả định để suy ra số lít từ số tiền. Sản phẩm thật nên lấy giá nhiên liệu thực tế theo thời điểm hoặc dữ liệu trực tiếp từ merchant/fuel receipt.

## 7. One-minute defense script

"Eco-Tracker không lấy MCC làm nguồn phát thải. MCC chỉ giúp phân loại giao dịch. Với các giao dịch có thể bảo vệ bằng dữ liệu hoạt động như xăng, taxi, xe điện, bus, tàu, máy bay, app dùng hệ số từ EPA/IPCC, UK GHG Factors, ICAO và IEA. Với siêu thị, F&B, thời trang, dữ liệu ngân hàng không biết sản phẩm cụ thể nên app không gán CO2e trong demo. Cách này bảo thủ hơn nhưng minh bạch và tránh suy diễn quá mức."
