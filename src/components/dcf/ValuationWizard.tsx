import React, { useMemo, useState } from "react";
import ProjectionsTable from "./ProjectionsTable";
import ResultsCard from "./ResultsCard";
import FCFChart from "../charts/FCFChart";
import PVBreakdownChart from "../charts/PVBreakdownChart";
import SensitivityHeatmap from "../charts/SensitivityHeatmap";
import { calcProjections, dcf } from "../../lib/dcf";
import { Projection, ValuationInput } from "../../types";
import { jsPDF } from "jspdf";
import html2canvas from "html2canvas";
import { useAuth } from "../../hooks/useAuth";
import { saveValuation } from "../../lib/firestore";

const today = new Date().getFullYear();

const defaultProjections: Projection[] = [
  { year: today + 1, revenue: 1000, ebit: 200, taxRate: 0.25, nopat: 0, depreciation: 20, capex: 30, changeInWC: 10, freeCashFlow: 0 },
  { year: today + 2, revenue: 1100, ebit: 220, taxRate: 0.25, nopat: 0, depreciation: 24, capex: 33, changeInWC: 12, freeCashFlow: 0 },
  { year: today + 3, revenue: 1210, ebit: 242, taxRate: 0.25, nopat: 0, depreciation: 30, capex: 36, changeInWC: 14, freeCashFlow: 0 }
];

export default function ValuationWizard() {
  const [projections, setProjections] = useState<Projection[]>(() => calcProjections(defaultProjections));
  const [wacc, setWacc] = useState<number>(0.10);
  const [growthRate, setGrowthRate] = useState<number>(0.05);
  const [terminalMethod, setTerminalMethod] = useState<"gordon" | "multiple">("gordon");
  const [perpGrowth, setPerpGrowth] = useState<number>(0.02);
  const [exitMultiple, setExitMultiple] = useState<number>(10);
  const [shares, setShares] = useState<number>(1_000_000);
  const [result, setResult] = useState<any | null>(null);
  const { user } = useAuth();
  const [saving, setSaving] = useState(false);
  const [saveStatus, setSaveStatus] = useState<string | null>(null);

  // When projections change, recalc FCF
  const computedProjections = useMemo(() => calcProjections(projections), [projections]);

  function runValuation() {
    const inputs: ValuationInput = {
      companyName: "Sample Co",
      sharesOutstanding: shares,
      projections: computedProjections,
      wacc,
      growthRate,
      terminalMethod,
      exitMultiple,
      perpetualGrowth: perpGrowth
    };
    const r = dcf(inputs);
    setResult(r);
  }

  async function exportPDF() {
    const el = document.getElementById("valuation-root")!;
    if (!el) return;
    const canvas = await html2canvas(el, { scale: 2 });
    const img = canvas.toDataURL("image/png");
    const pdf = new jsPDF("p", "mm", "a4");
    const imgProps = pdf.getImageProperties(img);
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
    pdf.addImage(img, "PNG", 0, 0, pdfWidth, pdfHeight);
    pdf.save("valuation.pdf");
  }

  async function saveToFirestore() {
    if (!user?.uid) {
      setSaveStatus("You must be logged in to save.");
      return;
    }
    setSaving(true);
    setSaveStatus(null);
    try {
      const payload = {
        inputs: {
          wacc,
          growthRate,
          terminalMethod,
          perpGrowth,
          exitMultiple,
          shares
        },
        projections: computedProjections,
        result
      };
      const id = await saveValuation(user.uid, payload);
      setSaveStatus(`Saved (id: ${id})`);
    } catch (err: any) {
      setSaveStatus("Save failed: " + err.message);
    } finally {
      setSaving(false);
    }
  }

  return (
    <div id="valuation-root" className="p-6 space-y-6">
      <div className="grid md:grid-cols-3 gap-4">
        <div className="md:col-span-2 space-y-4">
          <ProjectionsTable projections={computedProjections} onChange={(p) => setProjections(p)} />

          <div className="flex flex-wrap gap-3">
            <div className="card p-4">
              <label className="block text-sm mb-1">WACC (decimal)</label>
              <input type="number" step="0.001" value={wacc} onChange={(e) => setWacc(Number(e.target.value))} className="border p-2 rounded w-40" />
            </div>

            <div className="card p-4">
              <label className="block text-sm mb-1">Growth rate (decimal)</label>
              <input type="number" step="0.001" value={growthRate} onChange={(e) => setGrowthRate(Number(e.target.value))} className="border p-2 rounded w-40" />
            </div>

            <div className="card p-4">
              <label className="block text-sm mb-1">Terminal method</label>
              <select value={terminalMethod} onChange={(e) => setTerminalMethod(e.target.value as any)} className="border p-2 rounded">
                <option value="gordon">Gordon Growth</option>
                <option value="multiple">Exit Multiple</option>
              </select>
            </div>

            <div className="card p-4">
              <label className="block text-sm mb-1">Perpetual growth</label>
              <input type="number" step="0.001" value={perpGrowth} onChange={(e) => setPerpGrowth(Number(e.target.value))} className="border p-2 rounded w-36" />
            </div>

            <div className="card p-4">
              <label className="block text-sm mb-1">Exit multiple</label>
              <input type="number" step="0.1" value={exitMultiple} onChange={(e) => setExitMultiple(Number(e.target.value))} className="border p-2 rounded w-28" />
            </div>

            <div className="card p-4">
              <label className="block text-sm mb-1">Shares outstanding</label>
              <input type="number" step="1" value={shares} onChange={(e) => setShares(Number(e.target.value))} className="border p-2 rounded w-36" />
            </div>
          </div>

          <div className="flex gap-3">
            <button onClick={runValuation} className="py-2 px-4 rounded bg-secondary text-white">Run Valuation</button>
            <button onClick={exportPDF} className="py-2 px-4 rounded bg-highlight text-white">Export PDF</button>
            <button onClick={saveToFirestore} className="py-2 px-4 rounded bg-primary text-white">{saving ? "Saving..." : "Save"}</button>
          </div>

          {saveStatus && <div className="text-sm text-gray-600 mt-2">{saveStatus}</div>}

        </div>

        <div className="space-y-4">
          {result ? (
            <>
              <ResultsCard result={result} />
              <PVBreakdownChart pvForecast={result.pvForecast} pvTerminal={result.pvTerminal} />
              <FCFChart data={computedProjections} />
              <SensitivityHeatmap matrix={result.sensitivity} />
            </>
          ) : (
            <div className="card">
              <p className="text-sm text-gray-600">Run a valuation to view results, charts, and sensitivity analysis here.</p>
            </div>
          )}
        </div>
      </div>

      <div className="card">
        <h4 className="font-bold mb-2">How DCF Works</h4>
        <div className="text-sm leading-relaxed">
          <p><strong>What DCF is:</strong> Discounted Cash Flow estimates the present value of expected future free cash flows of a business, discounted at an appropriate rate (WACC).</p>
          <p><strong>How values are projected:</strong> We project revenue and profitability (EBIT), compute NOPAT, add non-cash items and subtract capital spending & working capital changes to arrive at Free Cash Flow (FCF).</p>
          <p><strong>How discounting works:</strong> Each future FCF is discounted to present value using WACC — higher discount rates reduce present values.</p>
          <p><strong>Terminal value:</strong> Captures value beyond the explicit forecast period and can be estimated with the Gordon Growth model (perpetual growth) or an Exit Multiple applied to terminal-year FCF.</p>
          <p><strong>Sensitivity analysis:</strong> The heatmap shows value-per-share across combinations of growth and discount rate shocks; use it to test valuation robustness.</p>
        </div>
      </div>
    </div>
  );
}
