import KPI from "../components/UI/KPI";

export default function Dashboard() {
  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold text-primary">Dashboard</h1>

      <div className="grid md:grid-cols-3 gap-4">
        <KPI label="Projects Completed" value="—" />
        <KPI label="Saved Valuations" value="—" />
        <KPI label="Avg. Value/Share" value="—" highlight />
      </div>

      <div className="card mt-4">
        <h2 className="text-xl font-semibold mb-2">Welcome!</h2>
        <p className="text-sm leading-relaxed">
          This is your DCF Valuation Dashboard.  
          Once you run valuations, your summaries and history will appear here.
        </p>
      </div>
    </div>
  );
}
