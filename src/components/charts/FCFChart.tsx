import React from "react";
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip } from "recharts";

export default function FCFChart({ data }: { data: any[] }) {
  // transform for recharts: [{year, freeCashFlow}, ...]
  const chartData = data.map(d => ({ year: d.year, freeCashFlow: d.freeCashFlow }));
  return (
    <div className="card">
      <h4 className="font-bold mb-2">Free Cash Flow</h4>
      <div style={{ width: "100%", height: 240 }}>
        <ResponsiveContainer>
          <AreaChart data={chartData}>
            <XAxis dataKey="year" />
            <YAxis />
            <Tooltip />
            <Area type="monotone" dataKey="freeCashFlow" stroke="#0B2545" fillOpacity={0.15} />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
