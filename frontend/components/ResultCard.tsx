interface ResultCardProps {
  title: string;
  children: React.ReactNode;
  className?: string;
}

export default function ResultCard({ title, children, className = "" }: ResultCardProps) {
  return (
    <div className={`bg-white rounded-xl border border-gray-200 p-6 ${className}`}>
      <h3 className="font-semibold text-lg mb-3">{title}</h3>
      {children}
    </div>
  );
}
