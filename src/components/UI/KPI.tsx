export default function KPI({
  label,
  value,
  highlight = false
}: {
  label: string;
  value: string | number;
  highlight?: boolean;
}) {
  return (
    <div
      className={`card border-l-4 ${
        highlight ? "border-highlight" : "border-primary"
      }`}
    >
      <p className="text-sm text-gray-500">{label}</p>
      <h3 className="text-xl font-bold mt-1">{value}</h3>
    </div>
  );
}
