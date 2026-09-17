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
    <form onSubmit={handleSubmit} className="space-y-4">
      {errors.general && (
        <div className="bg-red-50 text-red-700 px-4 py-3 rounded-lg text-sm">
          {errors.general}
        </div>
      )}

      <div>
        <label htmlFor="headline" className="block text-sm font-medium mb-1">
          Headline <span className="text-gray-500 font-normal">(required)</span>
        </label>
        <input
          id="headline"
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Enter a news headline..."
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
          maxLength={500}
        />
        <div className="flex justify-between mt-1">
          {errors.title ? (
            <span className="text-red-500 text-xs">{errors.title}</span>
          ) : (
            <span />
          )}
          <span className="text-gray-400 text-xs">
            {title.length}/500
          </span>
        </div>
      </div>

      <div>
        <label htmlFor="article" className="block text-sm font-medium mb-1">
          Article Body <span className="text-gray-500 font-normal">(required)</span>
        </label>
        <textarea
          id="article"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Paste or type the full article text here..."
          rows={8}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 resize-y"
          maxLength={maxLength}
        />
        <div className="flex justify-between mt-1">
          {errors.text ? (
            <span className="text-red-500 text-xs">{errors.text}</span>
          ) : (
            <span />
          )}
          <span className="text-gray-400 text-xs">
            {text.length}/{maxLength}
          </span>
        </div>
      </div>

      <div>
        <label htmlFor="category" className="block text-sm font-medium mb-1">
          Category <span className="text-gray-500 font-normal">(optional)</span>
        </label>
        <input
          id="category"
          type="text"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          placeholder="e.g. Technology, Politics, Health..."
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
        />
      </div>

      <div className="flex gap-3 pt-2">
        <button
          type="submit"
          disabled={disabled}
          className="flex-1 bg-indigo-600 text-white font-semibold py-3 px-6 rounded-lg hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          {disabled ? "Analyzing..." : "🔍 Analyze News"}
        </button>
        <button
          type="button"
          onClick={handleClear}
          disabled={disabled}
          className="px-6 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 transition-colors"
        >
          Clear
        </button>
      </div>
    </form>
  );
}
