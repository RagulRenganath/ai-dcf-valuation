import { useState } from "react";

export default function DgmCalculator() {
  const [d1, setD1] = useState("");
  const [r, setR] = useState("");
  const [g, setG] = useState("");

  const [value, setValue] = useState<number | null>(null);

  const calculate = () => {
    const D1 = parseFloat(d1);
    const R = parseFloat(r) / 100;
    const G = parseFloat(g) / 100;

    if (R <= G) {
      alert("Required return (r) must be greater than growth rate (g).");
      return;
    }

    const result = D1 / (R - G);
    setValue(result);
  };

  return (
    <div className="p-6 bg-white shadow rounded-md space-y-4">
      <h2 className="text-xl font-semibold text-primary">
        Dividend Growth Model (DGM)
      </h2>

      <div className="space-y-3">
        <input
          className="input"
          placeholder="Next Year Dividend (D1)"
          value={d1}
          onChange={(e) => setD1(e.target.value)}
        />

        <input
          className="input"
          placeholder="Required Return (%)"
          value={r}
          onChange={(e) => setR(e.target.value)}
        />

        <input
          className="input"
          placeholder="Growth Rate (%)"
          value={g}
          onChange={(e) => setG(e.target.value)}
        />
      </div>

      <button
        onClick={calculate}
        className="bg-secondary text-white px-4 py-2 rounded shadow hover:bg-primary transition"
      >
        Calculate Value
      </button>

      {value !== null && (
        <p className="text-lg font-bold text-highlight mt-3">
          Intrinsic Value per Share: ₹{value.toFixed(2)}
        </p>
      )}
    </div>
  );
}

