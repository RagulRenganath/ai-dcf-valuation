import React from "react";

export default function SensitivityHeatmap({ matrix }: { matrix: number[][] }) {
  if (!matrix) return null;
  return (
    <div className="card">
      <h4 className="font-bold mb-2">Sensitivity (Value / Share)</h4>
      <div className="overflow-auto">
        <table className="w-full table-auto text-sm">
          <tbody>
            {matrix.map((row, i) => (
              <tr key={i}>
                {row.map((cell, j) => (
                  <td key={j} className="p-2 border text-center">{cell}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
