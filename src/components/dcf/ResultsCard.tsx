import React from "react";
import { currency } from "../../utils/helpers";

export default function ResultsCard({ result }: { result: any }) {
  if (!result) return null;

  return (
    <div className="card">
      <h4 className="font-bold mb-3">Valuation Summary</h4>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        <div>
          <div className="text-sm text-gray-500">PV of Forecast</div>
          <div className="text-lg font-semibold">₹{currency(result.pvForecast)}</div>

          <div className="text-sm text-gray-500 mt-3">Terminal Value</div>
          <div className="text-lg font-semibold">₹{currency(result.terminalValue)}</div>

          <div className="text-sm text-gray-500 mt-3">PV of Terminal</div>
          <div className="text-lg font-semibold">₹{currency(result.pvTerminal)}</div>
        </div>

        <div>
          <div className="text-sm text-gray-500">Enterprise Value</div>
          <div className="text-lg font-semibold">₹{currency(result.enterpriseValue)}</div>

          <div className="text-sm text-gray-500 mt-3">Equity Value</div>
          <div className="text-lg font-semibold">₹{currency(result.equityValue)}</div>

          <div className="text-sm text-gray-500 mt-3">Value per Share</div>
          <div className="text-lg font-semibold">₹{currency(result.valuePerShare)}</div>
        </div>
      </div>
    </div>
  );
}
