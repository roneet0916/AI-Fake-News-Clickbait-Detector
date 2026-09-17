interface BadgeProps {
  label: string;
  children: React.ReactNode;
  variant?: "default" | "success" | "warning" | "danger";
}

export default function Badge({ label, children, variant = "default" }: BadgeProps) {
  const styles = {
    default: "bg-gray-100 text-gray-800",
    success: "bg-green-100 text-green-800",
    warning: "bg-yellow-100 text-yellow-800",
    danger: "bg-red-100 text-red-800",
  };

  return (
    <span className="inline-flex items-center gap-1">
      <span className={`px-2.5 py-0.5 rounded-full text-xs font-bold ${styles[variant]}`}>
        {children}
      </span>
      {label && <span className="text-gray-500 text-sm">{label}</span>}
    </span>
  );
}
