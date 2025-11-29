export type Projection = {
  year: number;
  revenue: number;
  ebit: number;
  taxRate: number;
  nopat: number;
  depreciation: number;
  capex: number;
  changeInWC: number;
  freeCashFlow: number;
};

export type ValuationInput = {
  companyName: string;
  sharesOutstanding: number;
  projections: Projection[];
  wacc: number;
  growthRate: number;
  terminalMethod: "gordon" | "multiple";
  exitMultiple?: number;
  perpetualGrowth?: number;
};
