interface ErrorStateProps {
  message: string;
  onRetry?: () => void;
}

export default function ErrorState({ message, onRetry }: ErrorStateProps) {
  return (
    <div className="bg-red-50 border border-red-200 rounded-xl p-6 text-center">
      <div className="text-4xl mb-3">⚠️</div>
      <h3 className="text-lg font-semibold text-red-800 mb-2">Something went wrong</h3>
      <p className="text-red-600 mb-4">{message}</p>
      {onRetry && (
        <button
          onClick={onRetry}
          className="px-4 py-2 bg-red-100 text-red-700 rounded-lg hover:bg-red-200 transition-colors font-medium"
        >
          Try Again
        </button>
      )}
    </div>
  );
}
