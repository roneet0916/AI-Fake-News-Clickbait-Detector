import { useState, useEffect } from "react";
import Link from "next/link";
import api from "../../lib/api";
import { HistoryRecord } from "../../types";
import EmptyState from "../components/EmptyState";
import Card from "../components/Card";

export default function HistoryTable() {
  const [records, setRecords] = useState<HistoryRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [error, setError] = useState<string | null>(null);

  const fetchRecords = async (query?: string) => {
    try {
      setError(null);
      const data = await api.getHistory();
      setRecords(query ? data.filter((r: any) => r.title?.toLowerCase().includes(query.toLowerCase())) : data);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRecords();
  }, []);

  const handleDelete = async (id: number) => {
    if (!confirm("Delete this analysis record?")) return;
    try {
      await api.deleteHistory(id);
      setRecords(records.filter((r: any) => r.id !== id));
    } catch (err: any) {
      setError(err.message);
    }
  };

  const getBadge = (prob: number) => {
    if (prob >= 0.7) return { text: "High Risk", className: "bg-red-100 text-red-700" };
    if (prob >= 0.3) return { text: "Uncertain", className: "bg-yellow-100 text-yellow-700" };
    return { text: "Low Risk", className: "bg-green-100 text-green-700" };
  };

  if (error) {
    return (
      <div className="bg-red-50 text-red-700 px-4 py-3 rounded-lg">
        {error} — <button onClick={() => fetchRecords()} className="underline">Retry</button>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex gap-3">
        <input
          type="text"
          placeholder="Search history..."
          value={search}
          onChange={(e) => { setSearch(e.target.value); }}
          className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
        />
      </div>

      {loading && <div className="text-center py-8">Loading...</div>}

      {!loading && records.length === 0 && (
        <EmptyState message="No analysis history yet. Analyze some news first!" />
      )}

      {!loading && records.length > 0 && (
        <div className="overflow-x-auto">
          <table className="w-full bg-white rounded-xl border border-gray-200 overflow-hidden">
            <thead>
              <tr className="bg-gray-50 text-left">
                <th className="px-6 py-3 text-sm font-semibold">Title</th>
                <th className="px-6 py-3 text-sm font-semibold">Fake News</th>
                <th className="px-6 py-3 text-sm font-semibold">Clickbait</th>
                <th className="px-6 py-3 text-sm font-semibold">Date</th>
                <th className="px-6 py-3 text-sm font-semibold">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {records.map((record) => {
                const fakeBadge = getBadge(record.fake_probability);
                const clickBadge = getBadge(record.clickbait_probability);
                return (
                  <tr key={record.id} className="hover:bg-gray-50">
                    <td className="px-6 py-3">
                      <Link href={`/result?id=${record.id}`} className="text-indigo-600 hover:underline font-medium">
                        {record.title || "Untitled"}
                      </Link>
                    </td>
                    <td className="px-6 py-3">
                      <span className={`px-2 py-0.5 rounded-full text-xs font-bold ${fakeBadge.className}`}>
                        {fakeBadge.text}
                      </span>
                    </td>
                    <td className="px-6 py-3">
                      <span className={`px-2 py-0.5 rounded-full text-xs font-bold ${clickBadge.className}`}>
                        {clickBadge.text}
                      </span>
                    </td>
                    <td className="px-6 py-3 text-gray-500 text-sm">
                      {new Date(record.created_at).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-3">
                      <button
                        onClick={() => handleDelete(record.id)}
                        className="text-red-500 hover:text-red-700 text-sm"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
