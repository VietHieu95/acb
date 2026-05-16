/** kg CO2e per 1,000,000 VND — simplified Input-Output factors for demo */
const MCC_EXACT: Record<number, number> = {
  4111: 120, // public transport
  4121: 150, // taxi/limo
  4131: 100, // bus
  5411: 280, // grocery
  5541: 920, // gas station
  5542: 880, // fuel
  5691: 420, // apparel
  5812: 350, // restaurants
  5814: 380, // fast food
  3000: 850, // airlines
  3001: 850,
  3010: 820,
  3020: 800,
};

function inRange(mcc: number, min: number, max: number): boolean {
  return mcc >= min && mcc <= max;
}

export function getBaseEmissionFactor(mcc: number): number {
  if (MCC_EXACT[mcc] !== undefined) return MCC_EXACT[mcc];

  if (inRange(mcc, 3000, 3299)) return 820;
  if (inRange(mcc, 4000, 4799)) return 200;
  if (inRange(mcc, 5500, 5599)) return 900;
  if (inRange(mcc, 5400, 5499)) return 300;
  if (inRange(mcc, 5600, 5699)) return 400;
  if (inRange(mcc, 5800, 5899)) return 360;

  return 320; // default
}
