import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import NewValuation from "./pages/NewValuation";
import History from "./pages/History";

import WaccCalculator from "./components/wacc/WaccCalculator";
import DgmCalculator from "./components/dgm/DgmCalculator";

import Sidebar from "./components/layout/Sidebar";

export default function App() {
  return (
    <BrowserRouter basename="/ai-dcf-valuation">
      <div className="flex min-h-screen">
        <Sidebar />

        <div className="flex-1 p-6 bg-gray-50">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/new" element={<NewValuation />} />
            <Route path="/history" element={<History />} />

            {/* Tools */}
            <Route path="/wacc" element={<WaccCalculator />} />
            <Route path="/dgm" element={<DgmCalculator />} />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
}
