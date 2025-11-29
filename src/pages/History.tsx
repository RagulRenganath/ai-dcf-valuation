import { useEffect, useState } from "react";
import { useAuth } from "../hooks/useAuth";
import { loadUserValuations } from "../lib/firestore";
import ValuationItem from "../components/history/ValuationItem";

export default function History() {
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);
  const [valuations, setValuations] = useState<any[]>([]);

  useEffect(() => {
    async function fetchData() {
      if (!user?.uid) {
        setLoading(false);
        return;
      }
      const data = await loadUserValuations(user.uid);
      setValuations(data);
      setLoading(false);
    }

    fetchData();
  }, [user]);

  if (!user) {
    return (
      <div className="p-6">
        <h1 className="text-2xl font-bold text-primary mb-3">Valuation History</h1>
        <p className="text-gray-600">You must be logged in to view saved valuations.</p>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="p-6 text-gray-600">Loading valuations...</div>
    );
  }

  return (
    <div className="p-6 space-y-4">
      <h1 className="text-2xl font-bold text-primary">Valuation History</h1>

      {valuations.length === 0 ? (
        <p className="text-gray-600">No saved valuations yet.</p>
      ) : (
        <div className="space-y-4">
          {valuations.map((v) => (
            <ValuationItem key={v.id} item={v} />
          ))}
        </div>
      )}
    </div>
  );
}

