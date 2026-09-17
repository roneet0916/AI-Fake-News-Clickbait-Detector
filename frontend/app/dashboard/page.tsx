"use client";

import { useEffect, useState } from "react";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import DashboardContent from "../../components/DashboardContent";
import LoadingState from "../../components/LoadingState";
import ErrorState from "../../components/ErrorState";
import api from "../../lib/api";

export default function DashboardPage() {
  const [stats, setStats] = useState({
    totalAnalyses: 0,
    fakeCount: 0,
    realCount: 0,
    clickbaitCount: 0,
  });
  const [evaluation, setEvaluation] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadData = async () => {
    setLoading(true);
    setError(null);
    try {
      const [history, evalData] = await Promise.all([
        api.getHistory(100).catch(() => []),
        api.getEvaluation().catch(() => null),
      ]);

      const fakeCount = history.filter((r: any) => r.prediction?.toUpperCase() === "FAKE").length;
      const realCount = history.filter((r: any) => r.prediction?.toUpperCase() === "REAL").length;
      const clickbaitCount = history.filter((r: any) => r.clickbait?.is_clickbait).length;

      setStats({
        totalAnalyses: history.length,
        fakeCount,
        realCount,
        clickbaitCount,
      });

      setEvaluation(evalData);
    } catch (err: any) {
      setError(err.message || "Failed to load dashboard statistics.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
      <Navbar />
      <main className="flex-1 max-w-6xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-3xl font-bold mb-2">System Dashboard</h1>
        <p className="text-gray-600 dark:text-gray-400 mb-6">
          Real-time metrics, ML benchmark accuracy comparisons, and detection system statistics.
        </p>

        {loading ? (
          <LoadingState message="Fetching system analytics and ML model performance metrics..." />
        ) : error ? (
          <ErrorState message={error} onRetry={() => loadData()} />
        ) : (
          <DashboardContent stats={stats} evaluation={evaluation} />
        )}
      </main>
      <Footer />
    </div>
  );
}
