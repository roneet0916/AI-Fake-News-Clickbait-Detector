interface Indicator {
  name: string;
  description: string;
  level: "high" | "medium" | "low";
}

interface IndicatorListProps {
  indicators: Indicator[];
}

export default function IndicatorList({ indicators }: IndicatorListProps) {
  if (indicators.length === 0) {
    return (
      <div className="text-gray-500 text-sm">No significant indicators detected.</div>
    );
  }

  return (
    <ul className="space-y-2">
      {indicators.map((indicator) => (
        <li
          key={indicator.name}
          className="flex items-start gap-3 p-3 rounded-lg bg-gray-50"
        >
          <span
            className={`w-3 h-3 rounded-full mt-1.5 flex-shrink-0 ${
              indicator.level === "high"
                ? "bg-red-500"
                : indicator.level === "medium"
                ? "bg-yellow-500"
                : "bg-green-500"
            }`}
            aria-hidden="true"
          />
          <div>
            <span className="font-medium text-sm">{indicator.name}</span>
            <p className="text-gray-600 text-sm">{indicator.description}</p>
          </div>
        </li>
      ))}
    </ul>
  );
}
