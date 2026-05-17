# Carbon methodology and citation notes

This project is a presentation prototype, not an official carbon accounting product. The formula and data design are based on recognised carbon-accounting approaches, while the exact EF and merchant modifier values in the demo are calibrated assumptions for storytelling.

## Model used in the demo

```text
CO2e (kg) = (Transaction amount in VND / 1,000,000) x EF(MCC) x merchant modifier
```

- `EF(MCC)` is a spend-based emission factor by merchant category code.
- `merchant modifier` is the app's AI/name-recognition adjustment for cases where the merchant has a cleaner or dirtier operating model than the generic MCC average.
- Example: MCC `4121` can include normal ride-hailing/taxi. If the merchant name is `Xanh SM`, the app applies an electric-mobility modifier because Green SM describes itself as a pure-electric mobility service.

## Sources to cite

1. GHG Protocol, Corporate Value Chain (Scope 3) Standard
   - Use for the argument that organisations can estimate value-chain emissions and should choose suitable calculation methods depending on data availability.
   - Link: https://ghgprotocol.org/corporate-value-chain-scope-3-standard

2. GHG Protocol, Scope 3 Calculation Guidance
   - Use for spend-based, average-data, supplier-specific, and hybrid calculation logic. This supports the idea that a bank can start from transaction spend when product-level activity data is unavailable.
   - Link: https://ghgprotocol.org/scope-3-calculation-guidance-2

3. EXIOBASE environmentally extended input-output database
   - Use for the Input-Output / Multi-Regional Input-Output basis: estimating emissions and resource use by industry and final consumption groups.
   - Link: https://exiobase.eu/

4. US EPA, USEEIO models
   - Use as another recognised example of Environmentally Extended Input-Output modelling for supply-chain and spend-based footprints.
   - Link: https://www.epa.gov/land-research/us-environmentally-extended-input-output-useeio-models

5. UK Government conversion factors for greenhouse gas reporting
   - Use to explain that official conversion-factor datasets commonly convert activity data such as distance travelled, fuel used, and other activities into GHG emissions.
   - Link: https://www.gov.uk/government/collections/government-conversion-factors-for-company-reporting

6. Green SM official website
   - Use as support that Xanh SM / Green SM is positioned as an electric mobility service, so the demo applies an EV merchant modifier rather than treating it like a generic taxi.
   - Link: https://www.greensm.com/vn-vi

7. VinBus official website
   - Use as support that VinBus is a green/electric bus mobility service in Vietnam.
   - Link: https://vinbus.vn/

8. International Energy Agency, Global EV Outlook
   - Use for the broader claim that electric vehicles are a key decarbonisation pathway for road transport, while lifecycle emissions depend on the electricity mix and vehicle use.
   - Link: https://www.iea.org/reports/global-ev-outlook-2024

## How to explain this in the presentation

A bank already receives transaction amount, merchant name, and MCC when customers pay by card or QR. Eco-Tracker uses these fields to estimate a spend-based carbon footprint. MCC provides a sector-level baseline. Then the AI merchant layer adjusts the baseline when the merchant is recognised as electric mobility, public transport, rail, fuel, airline, or a sustainable brand.

This is intentionally an estimate, not a carbon audit. The product value is that customers get a consistent signal inside their banking app: which spending categories are likely high-carbon, which are lower-carbon, and how behaviour changes over time.

## Why Xanh SM should not be several kg CO2e in this demo

A pure spend-based model can overestimate a clean merchant if it only sees a generic taxi MCC. For example, MCC `4121` covers taxi/ride-hailing broadly and does not know whether the car is electric. That is why the demo adds a merchant modifier after matching `Xanh SM`/`Green SM`.

With the revised demo values:

```text
Xanh SM 125,000 VND = 0.125 x 18 x 0.18 = 0.405 kg CO2e
```

This is still an indicative spend-based estimate. If the app had trip distance, vehicle energy use, and electricity-grid factors, it should use an activity-based calculation instead. For a hackathon/pitch prototype, the important point is the ranking: Xanh SM and VinBus are lower than normal ride-hailing, fuel, and airline spending.

## Limitations to state honestly

- MCC is industry-level, not product-level. One MCC can include merchants with very different footprints.
- Spend-based EEIO estimates are useful for screening but less precise than activity-based data.
- Merchant modifiers require a trusted merchant registry, supplier disclosures, certifications, or verified AI classification before production use.
- The demo factors are educational assumptions. A real bank deployment should license or build a validated Vietnam-specific factor database and governance process.
