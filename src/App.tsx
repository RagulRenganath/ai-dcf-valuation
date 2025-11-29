import { BrowserRouter, Routes, Route } from "react-router-dom";
import Sidebar from "./components/layout/Sidebar";
import Header from "./components/layout/Header";
import Dashboard from "./pages/Dashboard";
import NewValuation from "./pages/NewValuation";
import History from "./pages/History";
import Login from "./components/auth/Login";
import Register from "./components/auth/Register";
import ResetPassword from "./components/auth/ResetPassword";
import { useState } from "react";

export default function App() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <BrowserRouter>
      <div className="flex">
        <Sidebar />

        {/* Mobile header */}
        <div className="md:hidden w-full">
          <Header onMenu={() => setMenuOpen(!menuOpen)} />
        </div>

        {/* Mobile slide-in menu */}
        {menuOpen && (
          <div className="absolute bg-white shadow p-4 w-56 top-16 left-0 md:hidden rounded">
            <a className="block p-2" href="/">Dashboard</a>
            <a className="block p-2" href="/new">New Valuation</a>
            <a className="block p-2" href="/history">History</a>
          </div>
        )}

        <main className="flex-1 md:ml-64 min-h-screen bg-background">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/new" element={<NewValuation />} />
            <Route path="/history" element={<History />} />

            {/* Auth routes */}
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/reset" element={<ResetPassword />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}
