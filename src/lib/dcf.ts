// src/lib/dcf.ts

// --------------------------
// COST OF EQUITY (CAPM)
// --------------------------
export function calculateCostOfEquity(
  rf: number,        // risk-free rate %
  beta: number,      // beta
  rm: number         // market return %
): number {
  const Re = rf + beta * (rm - rf);
  return Re / 100;   // return decimal
}

// --------------------------
// COST OF DEBT
// --------------------------
export function calculateCostOfDebt(
  interestExpense: number,
  totalDebt: number
): number {
  if (totalDebt === 0) return 0;
  return interestExpense / totalDebt; // decimal
}

// --------------------------
// WACC CALCULATOR
// --------------------------
export function calculateWACC(
  rf: number,
  beta: number,
  rm: number,
  debt: number,
  equity: number,
  interestExpense: number,
  taxRate: number
): number {
  const Re = calculateCostOfEquity(rf, beta, rm); // Cost of equity (decimal)
  const Rd = calculateCostOfDebt(interestExpense, debt); // Cost of debt (decimal)
  const T = taxRate / 100;

  const V = debt + equity;
  const E = equity / V;
  const D = debt / V;

  const wacc = (E * Re) + (D * Rd * (1 - T));
  return wacc * 100; // Return % for UI
}

// --------------------------
// DIVIDEND GROWTH MODEL
// --------------------------
export function calculateDGM(
  d1: number, // next year's dividend
  r: number,  // required return %
  g: number   // growth rate %
): number {
  const R = r / 100;
  const G = g / 100;

  if (R <= G) throw new Error("Required return must be greater than growth rate");

  return d1 / (R - G);
}

// --------------------------
// FREE CASH FLOW PROJECTION
// --------------------------
export function projectFCF(
  initialFCF: number,
  growthRate: number,
  years: number
): number[] {
  let list = [];
  let current = initialFCF;

  for (let i = 0; i < years; i++) {
    current = current * (1 + growthRate / 100);
    list.push(current);
  }
  return list;
}

// --------------------------
// DISCOUNTING FUNCTION
// --------------------------
export function discountValue(
  value: number,
  discountRate: number,
  year: number
): number {
  return value / Math.pow(1 + discountRate / 100, year);
}

// --------------------------
// TERMINAL VALUE (GORDON)
// --------------------------
export function calculateTerminalValueGordon(
  fcfLastYear: number,
  perpetualGrowth: number,
  discountRate: number
): number {
  return (fcfLastYear * (1 + perpetualGrowth / 100)) /
         ((discountRate - perpetualGrowth) / 100);
}

// --------------------------
// TERMINAL VALUE (EXIT MULTIPLE)
// --------------------------
export function calculateTerminalValueMultiple(
  fcfLastYear: number,
  exitMultiple: number
): number {
  return fcfLastYear * exitMultiple;
}

// --------------------------
// FULL DCF ENGINE
// --------------------------
export function runDCF({
  initialFCF,
  growthRate,
  years,
  discountRate,
  terminalGrowthRate,
  exitMultiple,
  sharesOutstanding
}: any) {
  const projectedFCF = projectFCF(initialFCF, growthRate, years);

  const discountedFCF = projectedFCF.map((fcf, i) =>
    discountValue(fcf, discountRate, i + 1)
  );

  const pvFCF = discountedFCF.reduce((a, b) => a + b, 0);

  const lastFCF = projectedFCF[projectedFCF.length - 1];

  const terminalValueGordon = calculateTerminalValueGordon(
    lastFCF,
    terminalGrowthRate,
    discountRate
  );

  const terminalValueMultiple = calculateTerminalValueMultiple(
    lastFCF,
    exitMultiple
  );

  const pvTerminalGordon = discountValue(
    terminalValueGordon,
    discountRate,
    years
  );

  const pvTerminalMultiple = discountValue(
    terminalValueMultiple,
    discountRate,
    years
  );

  const enterpriseValueGordon = pvFCF + pvTerminalGordon;
  const enterpriseValueMultiple = pvFCF + pvTerminalMultiple;

  const equityValueGordon = enterpriseValueGordon;
  const equityValueMultiple = enterpriseValueMultiple;

  return {
    projectedFCF,
    discountedFCF,
    pvFCF,
    terminalValueGordon,
    terminalValueMultiple,
    pvTerminalGordon,
    pvTerminalMultiple,
    enterpriseValueGordon,
    enterpriseValueMultiple,
    equityValueGordon,
    equityValueMultiple,
    valuePerShareGordon: equityValueGordon / sharesOutstanding,
    valuePerShareMultiple: equityValueMultiple / sharesOutstanding
  };
}

