import countyTownFeeMap from "../data/regionTownFeeMap";

export function isCounty(county: string): county is keyof typeof countyTownFeeMap {
  return county in countyTownFeeMap;
}

export function isTownInCounty(county: keyof typeof countyTownFeeMap, town: string): town is keyof typeof countyTownFeeMap[typeof county] {
  return town in countyTownFeeMap[county];
}

export function getShippingFee(county: string, town: string): number | undefined {
  if (!isCounty(county)) return undefined;
  if (!isTownInCounty(county, town)) return undefined;
  
  return countyTownFeeMap[county][town];
}

export function getTownsForCounty(county: string): string[] {
  if (!isCounty(county)) return [];
  return Object.keys(countyTownFeeMap[county]).sort((a, b) => a.localeCompare(b));
}