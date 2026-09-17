import { useState } from "react";

interface NewsInputProps {
  onAnalyze: (data: { title: string; text: string; category?: string }) => void;
  disabled?: boolean;
}

export default function NewsInput({ onAnalyze, disabled }: NewsInputProps) {
  const [title, setTitle] = useState("");
  const [text, setText] = useState("");
  const [category, setCategory] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});

  const maxLength = 10000;

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!title.trim() && !text.trim()) {
      newErrors.general = "Please enter at least a headline or article text.";
    }
    if (title.length > 500) {
      newErrors.title = "Headline must be under 500 characters.";
    }
    if (text.length > maxLength) {
      newErrors.text = `Article text must be under ${maxLength} characters.`;
    }
    if (title.trim() && title.trim().length < 5) {
      newErrors.title = "Headline must be at least 5 characters.";
    }
    if (text.trim() && text.trim().length < 10) {
      newErrors.text = "Article text must be at least 10 characters.";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    onAnalyze({
      title: title.trim(),
      text: text.trim(),
      category: category.trim() || undefined,
    });
  };

  const handleClear = () => {
    setTitle("");
    setText("");
    setCategory("");
    setErrors({});
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white dark:bg-gray-800 p-6 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm space-y-5">
      {errors.general && (
        <div className="bg-red-50 dark:bg-red-900/30 text-red-700 dark:text-red-300 border border-red-200 dark:border-red-800 px-4 py-3 rounded-lg text-sm">
          {errors.general}
        </div>
      )}

      <div>
        <label htmlFor="headline" className="block text-sm font-semibold text-gray-800 dark:text-gray-200 mb-1">
          Headline <span className="text-red-500">*</span>
        </label>
        <input
          id="headline"
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Enter a news headline..."
          className="w-full px-4 py-3 bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 border border-gray-300 dark:border-gray-600 rounded-lg placeholder-gray-400 dark:placeholder-gray-500 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
          maxLength={500}
        />
        <div className="flex justify-between mt-1">
          {errors.title ? (
            <span className="text-red-500 text-xs font-medium">{errors.title}</span>
          ) : (
            <span />
          )}
          <span className="text-gray-500 dark:text-gray-400 text-xs">
            {title.length}/500
          </span>
        </div>
      </div>

      <div>
        <label htmlFor="article" className="block text-sm font-semibold text-gray-800 dark:text-gray-200 mb-1">
          Article Body <span className="text-gray-400 font-normal">(optional — headline-only supported)</span>
        </label>
        <textarea
          id="article"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Paste or type the full article text here..."
          rows={7}
          className="w-full px-4 py-3 bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 border border-gray-300 dark:border-gray-600 rounded-lg placeholder-gray-400 dark:placeholder-gray-500 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 resize-y transition-colors"
          maxLength={maxLength}
        />
        <div className="flex justify-between mt-1">
          {errors.text ? (
            <span className="text-red-500 text-xs font-medium">{errors.text}</span>
          ) : (
            <span />
          )}
          <span className="text-gray-500 dark:text-gray-400 text-xs">
            {text.length}/{maxLength}
          </span>
        </div>
      </div>

      <div>
        <label htmlFor="category" className="block text-sm font-semibold text-gray-800 dark:text-gray-200 mb-1">
          Category <span className="text-gray-400 font-normal">(optional)</span>
        </label>
        <input
          id="category"
          type="text"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          placeholder="e.g. Technology, Politics, Health..."
          className="w-full px-4 py-3 bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 border border-gray-300 dark:border-gray-600 rounded-lg placeholder-gray-400 dark:placeholder-gray-500 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
        />
      </div>

      <div className="flex gap-3 pt-2">
        <button
          type="submit"
          disabled={disabled}
          className="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 px-6 rounded-lg shadow-sm disabled:opacity-50 disabled:cursor-not-allowed transition-all"
        >
          {disabled ? "Analyzing..." : "🔍 Analyze News"}
        </button>
        <button
          type="button"
          onClick={handleClear}
          disabled={disabled}
          className="px-6 py-3 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-200 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-lg disabled:opacity-50 transition-colors"
        >
          Clear
        </button>
      </div>
    </form>
  );
}
