import { useState } from "react";

export default function DgmCalculator() {
  const [d1, setD1] = useState("");
  const [r, setR] = useState("");
  const [g, setG] = useState("");

  const [value, setValue] = useState<number | null>(null);

  const calculateDGM = () => {
    const D1 = parseFloat(d1);
    const R = parseFloat(r) / 100;
    const G = parseFloat(g) / 100;

    if (R <= G) {
      alert("Error: r must be greater than g");
      return;
    }

    const result = D1 / (R - G);
    setValue(result);
  };

  return (
    <div className="p-6 bg-white shadow rounded-md space-y-4">
      <h2 className="text-xl font-semibold text-primary">Dividend Growth Model</h2>

      <div className="space-y-3">
        <input className="input" placeholder="Dividend Next Year (D1)"
          value={d1} onChange={e => setD1(e.target.value)} />

        <input className="input" placeholder="Required Return (%)"
          value={r} onChange={e => setR(e.target.value)} />

        <input className="input" placeholder="Growth Rate (%)"
          value={g} onChange={e => setG(e.target.value)} />
      </div>

      <button
        onClick={calculateDGM}
        className="bg-secondary text-white px-4 py-2 rounded shadow"
      >
        Calculate Value
      </button>

      {value !== null && (
        <div className="mt-4 font-bold text-lg text-highlight">
          Intrinsic Value per Share: ₹{value.toFixed(2)}
        </div>
      )}
    </div>
  );
}
