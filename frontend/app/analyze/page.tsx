import { Suspense, useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import NewsInput from "../components/NewsInput";
import ResultDashboard from "../components/ResultDashboard";
import LoadingState from "../components/LoadingState";
import ErrorState from "../components/ErrorState";
import api from "../lib/api";

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
      setError(err.message || "Analysis failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar />
      <main className="flex-1 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-3xl font-bold mb-2">Analyze News</h1>
        <p className="text-gray-600 mb-6">
          Enter a headline or full article to receive AI-powered analysis including
          fake news detection, clickbait scoring, sentiment analysis, and more.
        </p>

        <NewsInput onAnalyze={handleAnalyze} disabled={loading} />

        {loading && <LoadingState message="Analyzing content with AI models..." />}
        {error && <ErrorState message={error} onRetry={() => setError(null)} />}

        {result && <ResultDashboard result={result} />}
      </main>
      <Footer />
    </>
  );
}
