import { Projection, ValuationInput } from "../types";
import { discount } from "../utils/helpers";

export function calcProjections(base: Projection[]): Projection[] {
  return base.map((p) => {
    const nopat = p.ebit * (1 - p.taxRate);
    const freeCashFlow =
      nopat + p.depreciation - p.capex - p.changeInWC;

    return { ...p, nopat, freeCashFlow };
  });
}

export function dcf(inputs: ValuationInput) {
  const {
    projections,
    wacc,
    perpetualGrowth = 0.02,
    terminalMethod,
    exitMultiple = 10,
    sharesOutstanding
  } = inputs;

  const discountRate = wacc;

  // PV of forecasted FCF
  const pvForecast = projections.reduce((sum, p, idx) => {
    return sum + discount(p.freeCashFlow, discountRate, idx + 1);
  }, 0);

  // Terminal Value
  const lastFCF = projections[projections.length - 1].freeCashFlow;

  let terminalValue = 0;
  if (terminalMethod === "gordon") {
    terminalValue =
      (lastFCF * (1 + perpetualGrowth)) /
      (discountRate - perpetualGrowth);
  } else {
    terminalValue = lastFCF * exitMultiple;
  }

  const pvTerminal = discount(
    terminalValue,
    discountRate,
    projections.length
  );

  const enterpriseValue = pvForecast + pvTerminal;

  const equityValue = enterpriseValue;
  const valuePerShare = equityValue / sharesOutstanding;

  return {
    pvForecast,
    terminalValue,
    pvTerminal,
    enterpriseValue,
    equityValue,
    valuePerShare,
    sensitivity: sensitivityMatrix(inputs, projections)
  };
}

function sensitivityMatrix(inputs: ValuationInput, projections: Projection[]) {
  const grid = [-0.02, -0.01, 0, 0.01, 0.02];

  const baseWacc = inputs.wacc;
  const baseGrowth = inputs.growthRate;

  const matrix: number[][] = [];

  for (let gDelta of grid) {
    const row: number[] = [];
    for (let rDelta of grid) {
      const adjInputs = {
        ...inputs,
        wacc: baseWacc + rDelta,
        growthRate: baseGrowth + gDelta
      };

      const last = projections[projections.length - 1];
      const adjLastFCF = last.freeCashFlow * (1 + adjInputs.growthRate);

      let term =
        adjInputs.terminalMethod === "gordon"
          ? (adjLastFCF * (1 + (adjInputs.perpetualGrowth ?? 0.02))) /
            (adjInputs.wacc - (adjInputs.perpetualGrowth ?? 0.02))
          : adjLastFCF * (adjInputs.exitMultiple ?? 10);

      const pvTerm = term / Math.pow(1 + adjInputs.wacc, projections.length);
      const pvForecast = projections.reduce(
        (s, p, idx) =>
          s + p.freeCashFlow / Math.pow(1 + adjInputs.wacc, idx + 1),
        0
      );

      const ev = pvForecast + pvTerm;
      const vps = ev / adjInputs.sharesOutstanding;

      row.push(Number(vps.toFixed(2)));
    }
    matrix.push(row);
  }

  return matrix;
}
