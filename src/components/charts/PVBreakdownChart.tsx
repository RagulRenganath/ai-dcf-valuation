import React from "react";
import { ResponsiveContainer, PieChart, Pie, Cell, Tooltip, Legend } from "recharts";

const COLORS = ["#0B2545", "#1FB6A4"];

export default function PVBreakdownChart({ pvForecast, pvTerminal }: { pvForecast: number; pvTerminal: number }) {
  const data = [{ name: "Forecast PV", value: Math.max(0, pvForecast) }, { name: "Terminal PV", value: Math.max(0, pvTerminal) }];

  return (
    <div className="card">
      <h4 className="font-bold mb-2">PV Breakdown</h4>
      <div style={{ width: "100%", height: 240 }}>
        <ResponsiveContainer>
          <PieChart>
            <Pie data={data} innerRadius={40} outerRadius={80} dataKey="value">
              {data.map((entry, i) => (
                <Cell key={i} fill={COLORS[i % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
