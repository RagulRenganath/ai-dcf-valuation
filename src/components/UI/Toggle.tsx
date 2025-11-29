export default function Toggle({
  checked,
  onChange
}: {
  checked: boolean;
  onChange: () => void;
}) {
  return (
    <label className="inline-flex items-center cursor-pointer">
      <span className="mr-2 text-sm">Dark Mode</span>

      <div className="relative">
        <input
          type="checkbox"
          className="sr-only"
          checked={checked}
          onChange={onChange}
        />
        <div
          className={`w-12 h-6 rounded-full transition ${
            checked ? "bg-primary" : "bg-gray-300"
          }`}
        />
        <div
          className={`dot absolute top-0 left-0 w-6 h-6 bg-white rounded-full shadow transition ${
            checked ? "translate-x-6" : ""
          }`}
        />
      </div>
    </label>
  );
}
