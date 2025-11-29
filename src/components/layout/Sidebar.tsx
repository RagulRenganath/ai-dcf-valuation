import { Link, useLocation } from "react-router-dom";

export default function Sidebar() {
  const loc = useLocation();

  const item = (to: string, label: string) => (
    <Link
      to={to}
      className={`block px-4 py-3 rounded mb-2 font-medium ${
        loc.pathname === to
          ? "bg-primary text-white"
          : "bg-white hover:bg-gray-200"
      }`}
    >
      {label}
    </Link>
  );

  return (
    <div className="w-64 bg-gray-100 p-4 shadow-md hidden md:block">
      <h2 className="text-xl font-bold text-primary mb-4">DCF Suite</h2>

      {item("/", "Dashboard")}
      {item("/new", "New Valuation")}
      {item("/history", "History")}

      <div className="mt-4 border-t pt-4">
        <p className="text-gray-600 font-semibold mb-2">Tools</p>

        {item("/wacc", "WACC Calculator")}
        {item("/dgm", "Dividend Growth Model")}
      </div>
    </div>
  );
}

