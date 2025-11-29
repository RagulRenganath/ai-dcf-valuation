import { motion } from "framer-motion";
import { Link } from "react-router-dom";

export default function Sidebar() {
  return (
    <motion.aside
      initial={{ x: -40, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.4 }}
      className="hidden md:flex flex-col w-64 bg-white shadow-lg h-screen p-6 gap-6 fixed left-0 top-0"
    >
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 bg-primary rounded-lg" />
        <div>
          <h2 className="text-primary font-bold text-lg">
            AI DCF
          </h2>
          <p className="text-sm text-gray-500">Valuation Suite</p>
        </div>
      </div>

      <nav className="flex flex-col gap-2">
        <Link className="p-2 hover:bg-gray-100 rounded" to="/">Dashboard</Link>
        <Link to="/wacc" className="nav-item">WACC Calculator</Link>
        <Link to="/dgm" className="nav-item">Dividend Growth Model</Link>
        <Link className="p-2 hover:bg-gray-100 rounded" to="/new">New Valuation</Link>
        <Link className="p-2 hover:bg-gray-100 rounded" to="/history">History</Link>
      </nav>
    </motion.aside>
  );
}
