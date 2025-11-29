import { useState } from "react";
export default function WaccCalculator() {
  return <div className="p-4 bg-white shadow">WACC Calculator Working</div>;
}
  const [rf, setRf] = useState("");
  const [beta, setBeta] = useState("");
  const [rm, setRm] = useState("");

  const [debt, setDebt] = useState("");
  const [interest, setInterest] = useState("");
  const [equity, setEquity] = useState("");
  const [tax, setTax] = useState("");

  const [wacc, setWacc] = useState<number | null>(null);

  const calculateWACC = () => {
    const Rf = parseFloat(rf);
    const Beta = parseFloat(beta);
    const Rm = parseFloat(rm);
    const Debt = parseFloat(debt);
    const Equity = parseFloat(equity);
    const Interest = parseFloat(interest);
    const Tax = parseFloat(tax) / 100;

    const Re = Rf + Beta * (Rm - Rf);
    const Rd = Interest / Debt;

    const V = Debt + Equity;

    const WACC = (Equity / V) * Re + (Debt / V) * Rd * (1 - Tax);

    setWacc(WACC * 100);
  };

  return (
    <div className="p-6 bg-white shadow rounded-md space-y-4">
      <h2 className="text-xl font-semibold text-primary">WACC Calculator</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <input className="input" placeholder="Risk-free Rate (%)"
          value={rf} onChange={e => setRf(e.target.value)} />

        <input className="input" placeholder="Beta"
          value={beta} onChange={e => setBeta(e.target.value)} />

        <input className="input" placeholder="Market Return (%)"
          value={rm} onChange={e => setRm(e.target.value)} />

        <input className="input" placeholder="Total Debt"
          value={debt} onChange={e => setDebt(e.target.value)} />

        <input className="input" placeholder="Interest Expense"
          value={interest} onChange={e => setInterest(e.target.value)} />

        <input className="input" placeholder="Market Value of Equity"
          value={equity} onChange={e => setEquity(e.target.value)} />

        <input className="input" placeholder="Tax Rate (%)"
          value={tax} onChange={e => setTax(e.target.value)} />
      </div>

      <button
        onClick={calculateWACC}
        className="bg-secondary text-white px-4 py-2 rounded shadow hover:bg-primary transition"
      >
        Calculate WACC
      </button>

      {wacc !== null && (
        <div className="mt-4 font-bold text-lg text-highlight">
          WACC: {wacc.toFixed(2)}%
        </div>
      )}
    </div>
  );
}
