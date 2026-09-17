export default function EmptyState({ message }: { message: string }) {
  return (
    <div className="text-center py-16">
      <div className="text-5xl mb-4">📭</div>
      <p className="text-gray-500 text-lg">{message}</p>
    </div>
  );
}
