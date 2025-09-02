export interface Material {
  id: string;
  name: string;
  pricePerGram: number; // in NOK
  density: number; // in g/cm³
  baseFee: number; // in NOK
}
