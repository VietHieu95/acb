/**
 * Prototype spend-based emission factors.
 * Unit: kg CO2e per 1,000,000 VND spent.
 *
 * These factors are demo assumptions inspired by spend-based Scope 3 / EEIO
 * methods. They are not official ACB, Visa, Mastercard, or Vietnam factors.
 * See docs/carbon-methodology.md for sources and how to justify them.
 */
const MCC_EXACT: Record<number, number> = {
  4111: 8, // local/suburban public transport
  4121: 18, // taxi/ride-hailing baseline before merchant adjustment
  4131: 8, // bus
  5411: 80, // grocery stores/supermarkets
  5541: 90, // service stations/fuel
  5542: 90, // automated fuel dispensers
  5691: 95, // apparel/fashion retail
  5812: 50, // restaurants
  5814: 60, // fast food
  3000: 75, // airlines
  3001: 75,
  3010: 75,
  3020: 75,
};

function inRange(mcc: number, min: number, max: number): boolean {
  return mcc >= min && mcc <= max;
}

export function getBaseEmissionFactor(mcc: number): number {
  if (MCC_EXACT[mcc] !== undefined) return MCC_EXACT[mcc];

  if (inRange(mcc, 3000, 3299)) return 75;
  if (inRange(mcc, 4000, 4799)) return 25;
  if (inRange(mcc, 5500, 5599)) return 90;
  if (inRange(mcc, 5400, 5499)) return 80;
  if (inRange(mcc, 5600, 5699)) return 95;
  if (inRange(mcc, 5800, 5899)) return 55;

  return 60;
}
