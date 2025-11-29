import React from "react";
import { Projection } from "../../types";

export default function ProjectionsTable({
  projections,
  onChange
}: {
  projections: Projection[];
  onChange: (p: Projection[]) => void;
}) {
  function update(idx: number, key: keyof Projection, val: string | number) {
    const next = projections.map((r, i) =>
      i === idx ? { ...r, [key]: typeof val === "string" ? Number(val) : val } : r
    );
    onChange(next);
  }

  function addRow() {
    const last = projections[projections.length - 1];
    const nextYear = last ? last.year + 1 : new Date().getFullYear() + 1;
    const newRow: Projection = {
      year: nextYear,
      revenue: 0,
      ebit: 0,
      taxRate: 0.25,
      nopat: 0,
      depreciation: 0,
      capex: 0,
      changeInWC: 0,
      freeCashFlow: 0
    };
    onChange([...projections, newRow]);
  }

  function removeRow(idx: number) {
    if (projections.length <= 1) return;
    onChange(projections.filter((_, i) => i !== idx));
  }

  return (
    <div className="card overflow-auto">
      <div className="flex justify-between items-center mb-3">
        <h4 className="font-bold">Editable Projections</h4>
        <div className="flex gap-2">
          <button onClick={addRow} className="px-3 py-1 rounded bg-secondary text-white text-sm">Add year</button>
        </div>
      </div>

      <table className="w-full table-auto text-sm">
        <thead>
          <tr className="text-left text-xs text-gray-500">
            <th className="p-2">Year</th>
            <th className="p-2">Revenue</th>
            <th className="p-2">EBIT</th>
            <th className="p-2">Depreciation</th>
            <th className="p-2">CapEx</th>
            <th className="p-2">ΔWorkingCap</th>
            <th className="p-2">Tax Rate</th>
            <th className="p-2">FCF</th>
            <th className="p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {projections.map((p, idx) => (
            <tr key={idx} className="border-t">
              <td className="p-2">{p.year}</td>
              <td className="p-2">
                <input className="border p-1 rounded w-28" value={p.revenue} onChange={(e) => update(idx, "revenue", e.target.value)} />
              </td>
              <td className="p-2">
                <input className="border p-1 rounded w-24" value={p.ebit} onChange={(e) => update(idx, "ebit", e.target.value)} />
              </td>
              <td className="p-2">
                <input className="border p-1 rounded w-20" value={p.depreciation} onChange={(e) => update(idx, "depreciation", e.target.value)} />
              </td>
              <td className="p-2">
                <input className="border p-1 rounded w-20" value={p.capex} onChange={(e) => update(idx, "capex", e.target.value)} />
              </td>
              <td className="p-2">
                <input className="border p-1 rounded w-20" value={p.changeInWC} onChange={(e) => update(idx, "changeInWC", e.target.value)} />
              </td>
              <td className="p-2">
                <input className="border p-1 rounded w-20" value={p.taxRate} onChange={(e) => update(idx, "taxRate", e.target.value)} />
              </td>
              <td className="p-2">{(p.freeCashFlow ?? 0).toFixed(2)}</td>
              <td className="p-2">
                <button onClick={() => removeRow(idx)} className="text-sm text-red-500">Remove</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
