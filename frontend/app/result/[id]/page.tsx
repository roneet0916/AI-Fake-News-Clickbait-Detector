"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Navbar from "../../../components/Navbar";
import Footer from "../../../components/Footer";
import ResultDashboard from "../../../components/ResultDashboard";
import LoadingState from "../../../components/LoadingState";
import ErrorState from "../../../components/ErrorState";
import api from "../../../lib/api";

export default function ResultDetailPage() {
  const params = useParams();
  const id = params?.id ? Number(params.id) : null;

  const [result, setResult] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchRecord = async () => {
    if (!id) return;
    setLoading(true);
    setError(null);
    try {
      const data = await api.getHistoryById(id);
      setResult(data);
    } catch (err: any) {
      setError(err.message || "Failed to load analysis record details.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRecord();
  }, [id]);

  return (
    <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
      <Navbar />
      <main className="flex-1 max-w-4xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-3xl font-bold mb-2">Analysis Record #{id}</h1>
        {result?.title && (
          <p className="text-gray-600 dark:text-gray-400 mb-6 font-medium">
            "{result.title}"
          </p>
        )}

        {loading ? (
          <LoadingState message="Retrieving record details from analysis database..." />
        ) : error ? (
          <ErrorState message={error} onRetry={() => fetchRecord()} />
        ) : (
          result && <ResultDashboard result={result} />
        )}
      </main>
      <Footer />
    </div>
  );
}
