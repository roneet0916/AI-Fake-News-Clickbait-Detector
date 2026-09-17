"use client";

import { useState } from "react";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import NewsInput from "../../components/NewsInput";
import ResultDashboard from "../../components/ResultDashboard";
import LoadingState from "../../components/LoadingState";
import ErrorState from "../../components/ErrorState";
import api from "../../lib/api";

export default function AnalyzePage() {
  const [result, setResult] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleAnalyze = async (data: { title: string; text: string; category?: string }) => {
    setLoading(true);
    setError(null);
    setResult(null);
    try {
      const response = await api.analyze(data);
      setResult(response);
    } catch (err: any) {
      setError(err.message || "Analysis failed. Please make sure the backend is running on http://localhost:8000.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
      <Navbar />
      <main className="flex-1 max-w-4xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-3xl font-bold mb-2">Analyze News Content</h1>
        <p className="text-gray-600 dark:text-gray-400 mb-6">
          Enter a headline or full article text to evaluate authentic vs fake news probability, clickbait markers, sentiment, and AI explainability.
        </p>

        <NewsInput onAnalyze={handleAnalyze} disabled={loading} />

        {loading && <LoadingState message="Processing news content across machine learning pipeline..." />}
        {error && <ErrorState message={error} onRetry={() => setError(null)} />}

        {result && <ResultDashboard result={result} />}
      </main>
      <Footer />
    </div>
  );
}
