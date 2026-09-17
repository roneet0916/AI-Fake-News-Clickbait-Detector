export default function StatBar({ label, value, max = 100, color = "bg-indigo-500" }: { label: string; value: number; max?: number; color?: string }) {
  const percent = Math.min(100, Math.max(0, (value / max) * 100));
  return (
    <div className="mb-3">
      <div className="flex justify-between text-sm mb-1">
        <span className="font-medium">{label}</span>
        <span className="text-gray-500">{value}</span>
      </div>
      <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
        <div className={`h-full rounded-full ${color} transition-all duration-500`} style={{ width: `${percent}%` }} />
      </div>
    </div>
  );
}
