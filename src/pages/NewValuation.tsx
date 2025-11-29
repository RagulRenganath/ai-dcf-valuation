import ValuationWizard from "../components/dcf/ValuationWizard";

export default function NewValuation() {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold text-primary mb-4">New Valuation</h1>
      <ValuationWizard />
    </div>
  );
}
