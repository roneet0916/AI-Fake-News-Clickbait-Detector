"use client";

import React, { useState } from "react";
import Link from "next/link";

interface HistoryRecord {
  id: number;
  title: string;
  prediction: string;
  confidence: number;
  clickbait: {
    is_clickbait: boolean;
    score: number;
  };
  created_at: string;
}

interface HistoryTableProps {
  records: HistoryRecord[];
  onDelete?: (id: number) => void;
  onSearch?: (query: string) => void;
}

export default function HistoryTable({ records, onDelete, onSearch }: HistoryTableProps) {
  const [filter, setFilter] = useState<"ALL" | "FAKE" | "REAL">("ALL");
  const [query, setQuery] = useState("");

  const filtered = records.filter((rec) => {
    if (filter === "FAKE" && rec.prediction.toUpperCase() !== "FAKE") return false;
    if (filter === "REAL" && rec.prediction.toUpperCase() !== "REAL") return false;
    if (query.trim() && !rec.title.toLowerCase().includes(query.toLowerCase())) return false;
    return true;
  });

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
    if (onSearch) onSearch(e.target.value);
  };

  return (
    <div className="space-y-4">
      {/* Search and Filters */}
      <div className="flex flex-col sm:flex-row gap-4 justify-between items-center bg-white dark:bg-gray-800 p-4 rounded-xl border border-gray-200 dark:border-gray-700">
        <div className="relative w-full sm:w-72">
          <input
            type="text"
            value={query}
            onChange={handleSearchChange}
            placeholder="Search saved analysis history..."
            className="w-full pl-9 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-900 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
          <span className="absolute left-3 top-2.5 text-gray-400">🔍</span>
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto">
          {(["ALL", "FAKE", "REAL"] as const).map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
                filter === f
                  ? "bg-indigo-600 text-white"
                  : "bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600"
              }`}
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      {/* Table Display */}
      {filtered.length === 0 ? (
        <div className="text-center py-12 bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 text-gray-500">
          <p className="text-lg">No analysis records match your search filter.</p>
        </div>
      ) : (
        <div className="overflow-x-auto bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900/50 text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400">
                <th className="p-4">Title / Article Headline</th>
                <th className="p-4">Verdict</th>
                <th className="p-4">Confidence</th>
                <th className="p-4">Clickbait</th>
                <th className="p-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-gray-700 text-sm">
              {filtered.map((record) => {
                const isFake = record.prediction.toUpperCase() === "FAKE";
                return (
                  <tr key={record.id} className="hover:bg-gray-50 dark:hover:bg-gray-700/40 transition-colors">
                    <td className="p-4 font-medium text-gray-900 dark:text-gray-100 max-w-md truncate">
                      {record.title}
                    </td>
                    <td className="p-4">
                      <span
                        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold ${
                          isFake
                            ? "bg-red-100 text-red-800 dark:bg-red-900/40 dark:text-red-300"
                            : "bg-emerald-100 text-emerald-800 dark:bg-emerald-900/40 dark:text-emerald-300"
                        }`}
                      >
                        {isFake ? "FAKE" : "REAL"}
                      </span>
                    </td>
                    <td className="p-4 font-semibold text-gray-700 dark:text-gray-300">
                      {Math.round(record.confidence * 100)}%
                    </td>
                    <td className="p-4">
                      {record.clickbait?.is_clickbait ? (
                        <span className="text-xs text-amber-600 font-semibold">Yes</span>
                      ) : (
                        <span className="text-xs text-gray-400">No</span>
                      )}
                    </td>
                    <td className="p-4 text-right space-x-2">
                      <Link
                        href={`/result/${record.id}`}
                        className="inline-block px-3 py-1 bg-indigo-50 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 rounded-md text-xs font-semibold hover:bg-indigo-100 dark:hover:bg-indigo-900/50"
                      >
                        View
                      </Link>
                      {onDelete && (
                        <button
                          onClick={() => onDelete(record.id)}
                          className="px-3 py-1 bg-red-50 dark:bg-red-900/30 text-red-600 dark:text-red-400 rounded-md text-xs font-semibold hover:bg-red-100 dark:hover:bg-red-900/50"
                        >
                          Delete
                        </button>
                      )}
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
