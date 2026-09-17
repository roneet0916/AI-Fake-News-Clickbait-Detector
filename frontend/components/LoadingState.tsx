export default function LoadingState({ message }: { message: string }) {
  return (
    <div className="flex flex-col items-center justify-center py-16">
      <div className="relative w-16 h-16 mb-6">
        <div className="absolute inset-0 border-4 border-indigo-200 rounded-full" />
        <div className="absolute inset-0 border-4 border-indigo-600 rounded-full border-t-transparent animate-spin" />
      </div>
      <p className="text-lg text-gray-600">{message}</p>
    </div>
  );
}
