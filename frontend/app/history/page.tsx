"use client";

import { useEffect, useState } from "react";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import HistoryTable from "../../components/HistoryTable";
import LoadingState from "../../components/LoadingState";
import ErrorState from "../../components/ErrorState";
import api from "../../lib/api";

export default function HistoryPage() {
  const [records, setRecords] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchHistory = async (query?: string) => {
    setLoading(true);
    setError(null);
    try {
      const data = await api.getHistory(50, 0, query);
      setRecords(data);
    } catch (err: any) {
      setError(err.message || "Failed to load analysis history.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchHistory();
  }, []);

  const handleDelete = async (id: number) => {
    if (!confirm("Are you sure you want to delete this analysis record?")) return;
    try {
      await api.deleteHistory(id);
      setRecords((prev) => prev.filter((r) => r.id !== id));
    } catch (err: any) {
      alert(err.message || "Failed to delete record");
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
      <Navbar />
      <main className="flex-1 max-w-6xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-3xl font-bold mb-2">Analysis History</h1>
        <p className="text-gray-600 dark:text-gray-400 mb-6">
          View, search, and manage your past AI news analysis evaluations.
        </p>

        {loading ? (
          <LoadingState message="Loading saved analysis history..." />
        ) : error ? (
          <ErrorState message={error} onRetry={() => fetchHistory()} />
        ) : (
          <HistoryTable
            records={records}
            onDelete={handleDelete}
            onSearch={(q) => fetchHistory(q)}
          />
        )}
      </main>
      <Footer />
    </div>
  );
}
