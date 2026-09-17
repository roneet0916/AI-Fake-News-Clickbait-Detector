interface ProbabilityCardProps {
  label: string;
  probability: number;
  goodThreshold?: number;
  badThreshold?: number;
  icon: string;
}

export default function ProbabilityCard({
  label,
  probability,
  goodThreshold = 0.3,
  badThreshold = 0.7,
  icon,
}: ProbabilityCardProps) {
  const percent = Math.round(probability * 100);
  let colorClass = "bg-green-100 text-green-800";
  let barColor = "bg-green-500";
  let statusText = "Low";

  if (probability >= badThreshold) {
    colorClass = "bg-red-100 text-red-800";
    barColor = "bg-red-500";
    statusText = "High";
  } else if (probability >= goodThreshold) {
    colorClass = "bg-yellow-100 text-yellow-800";
    barColor = "bg-yellow-500";
    statusText = "Moderate";
  }

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-semibold text-lg">{icon} {label}</h3>
        <span className={`px-3 py-1 rounded-full text-xs font-bold ${colorClass}`}>
          {statusText}
        </span>
      </div>
      <div className="flex items-baseline gap-2 mb-3">
        <span className="text-3xl font-bold">{percent}%</span>
        <span className="text-gray-500">probability</span>
      </div>
      <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
        <div
          className={`h-full rounded-full transition-all duration-700 ${barColor}`}
          style={{ width: `${percent}%` }}
          role="progressbar"
          aria-valuenow={percent}
          aria-valuemin={0}
          aria-valuemax={100}
        />
      </div>
    </div>
  );
}
