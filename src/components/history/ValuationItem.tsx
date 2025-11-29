import { useState } from "react";
import { currency } from "../../utils/helpers";

export default function ValuationItem({ item }: { item: any }) {
  const [open, setOpen] = useState(false);
  const data = item.payload;

  return (
    <div className="border rounded-lg p-4 bg-white shadow-sm">
      <div className="flex justify-between items-center">
        <div>
          <div className="font-semibold text-primary">
            Valuation ID: {item.id}
          </div>
          <div className="text-sm text-gray-500">
            {new Date(item.createdAt).toLocaleString()}
          </div>
        </div>

        <button
          onClick={() => setOpen(!open)}
          className="text-sm bg-secondary text-white px-3 py-1 rounded"
        >
          {open ? "Hide" : "View"}
        </button>
      </div>

      {open && (
        <div className="mt-4 border-t pt-4 text-sm space-y-2">
          <div>
            <strong>WACC:</strong> {data.inputs.wacc}
          </div>
          <div>
            <strong>Growth Rate:</strong> {data.inputs.growthRate}
          </div>
          <div>
            <strong>Terminal Method:</strong> {data.inputs.terminalMethod}
          </div>

          <div className="font-semibold mt-2">Results:</div>
          <div>Enterprise Value: ₹{currency(data.result.enterpriseValue)}</div>
          <div>Value per Share: ₹{currency(data.result.valuePerShare)}</div>

          <div className="font-semibold mt-3">Projections:</div>
          <div className="overflow-auto">
            <table className="min-w-full text-xs border">
              <thead>
                <tr className="bg-gray-100">
                  <th className="p-1 border">Year</th>
                  <th className="p-1 border">Revenue</th>
                  <th className="p-1 border">EBIT</th>
                  <th className="p-1 border">FCF</th>
                </tr>
              </thead>
              <tbody>
                {data.projections.map((p: any, idx: number) => (
                  <tr key={idx}>
                    <td className="border p-1">{p.year}</td>
                    <td className="border p-1">{p.revenue}</td>
                    <td className="border p-1">{p.ebit}</td>
                    <td className="border p-1">{p.freeCashFlow}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

        </div>
      )}
    </div>
  );
}
