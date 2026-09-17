"use client";

import React from "react";
import IndicatorList from "./IndicatorList";

interface AnalysisResult {
  id?: number;
  prediction: "REAL" | "FAKE" | string;
  confidence: number;
  fake_news_probability?: number;
  clickbait: {
    is_clickbait: boolean;
    score: number;
    indicators: string[];
    details?: {
      all_caps_words?: number;
      exclamation_marks?: number;
      question_marks?: number;
      sensational_words?: number;
      curiosity_gaps?: number;
    };
  };
  sentiment: {
    label: string;
    compound: number;
    pos?: number;
    neu?: number;
    neg?: number;
  };
  category: {
    category: string;
    confidence?: number;
  };
  explanation?: {
    summary: string;
    key_indicators: string[];
    feature_impacts?: Record<string, string>;
    disclaimer: string;
  };
}

interface ResultDashboardProps {
  result: AnalysisResult;
}

export default function ResultDashboard({ result }: ResultDashboardProps) {
  const isFake = result.prediction.toUpperCase() === "FAKE";
  const confidencePct = Math.round(result.confidence * 100);

  return (
    <div className="space-y-6 mt-8 animate-fadeIn">
      {/* Primary Result Banner */}
      <div
        className={`p-6 rounded-2xl border ${
          isFake
            ? "bg-red-500/10 border-red-500/30 text-red-900 dark:text-red-200"
            : "bg-emerald-500/10 border-emerald-500/30 text-emerald-900 dark:text-emerald-200"
        }`}
      >
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-3">
              <span className="text-3xl">{isFake ? "🚨" : "✅"}</span>
              <div>
                <span className="text-xs uppercase tracking-wider font-semibold opacity-75">
                  Fake News Verdict
                </span>
                <h2 className="text-2xl font-bold">
                  {isFake ? "LIKELY FAKE / UNVERIFIED NEWS" : "LIKELY AUTHENTIC NEWS"}
                </h2>
              </div>
            </div>
            <p className="mt-2 text-sm opacity-90">
              Confidence Score: <strong className="font-semibold">{confidencePct}%</strong>
            </p>
          </div>

          <div className="w-full md:w-48 bg-white/40 dark:bg-black/20 p-3 rounded-xl border border-current/10">
            <div className="text-xs font-semibold mb-1 flex justify-between">
              <span>Authentic</span>
              <span>Fake</span>
            </div>
            <div className="w-full bg-gray-200 dark:bg-gray-700 h-3 rounded-full overflow-hidden">
              <div
                className={`h-full transition-all duration-700 ${
                  isFake ? "bg-red-500" : "bg-emerald-500"
                }`}
                style={{ width: `${confidencePct}%` }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Grid of Key Analytical Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Clickbait Card */}
        <div className="bg-white dark:bg-gray-800 p-5 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm">
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-semibold text-gray-800 dark:text-gray-100 flex items-center gap-2">
              <span>📰</span> Clickbait Analysis
            </h3>
            <span
              className={`px-2.5 py-1 rounded-full text-xs font-semibold ${
                result.clickbait.is_clickbait
                  ? "bg-amber-100 text-amber-800 dark:bg-amber-900/40 dark:text-amber-300"
                  : "bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300"
              }`}
            >
              {result.clickbait.is_clickbait ? "Clickbait Detected" : "Standard Headline"}
            </span>
          </div>
          <div className="mb-4">
            <div className="flex justify-between text-sm text-gray-600 dark:text-gray-400 mb-1">
              <span>Sensationalism Score</span>
              <span className="font-bold text-gray-900 dark:text-gray-100">
                {Math.round(result.clickbait.score * 100)}/100
              </span>
            </div>
            <div className="w-full bg-gray-100 dark:bg-gray-700 h-2.5 rounded-full overflow-hidden">
              <div
                className="h-full bg-amber-500 transition-all duration-500"
                style={{ width: `${Math.round(result.clickbait.score * 100)}%` }}
              />
            </div>
          </div>
          <IndicatorList indicators={result.clickbait.indicators} title="Detected Clickbait Signals" />
        </div>

        {/* Sentiment Card */}
        <div className="bg-white dark:bg-gray-800 p-5 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm">
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-semibold text-gray-800 dark:text-gray-100 flex items-center gap-2">
              <span>😊</span> Content Sentiment
            </h3>
            <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-indigo-50 text-indigo-700 dark:bg-indigo-900/40 dark:text-indigo-300 capitalize">
              {result.sentiment.label}
            </span>
          </div>
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
            Compound Emotional Score:{" "}
            <strong className="text-gray-900 dark:text-gray-100">
              {result.sentiment.compound > 0 ? "+" : ""}
              {result.sentiment.compound.toFixed(2)}
            </strong>
          </p>
          <p className="text-xs text-gray-500 dark:text-gray-400">
            Highly emotional or aggressive sentiment in news articles often correlates with sensationalized reporting.
          </p>
        </div>

        {/* Category Card */}
        <div className="bg-white dark:bg-gray-800 p-5 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm">
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-semibold text-gray-800 dark:text-gray-100 flex items-center gap-2">
              <span>📂</span> Topic Category
            </h3>
            <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-purple-50 text-purple-700 dark:bg-purple-900/40 dark:text-purple-300">
              {result.category.category}
            </span>
          </div>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Categorized automatically based on keyword frequencies and domain-specific terminology.
          </p>
        </div>
      </div>

      {/* AI Explanation Engine Output */}
      {result.explanation && (
        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm space-y-4">
          <h3 className="text-lg font-bold text-gray-900 dark:text-gray-100 flex items-center gap-2">
            <span>🧠</span> Explainable AI Analysis Summary
          </h3>
          <p className="text-gray-700 dark:text-gray-300 text-sm leading-relaxed">
            {result.explanation.summary}
          </p>

          {result.explanation.key_indicators && result.explanation.key_indicators.length > 0 && (
            <div>
              <h4 className="text-xs uppercase tracking-wider font-semibold text-gray-500 dark:text-gray-400 mb-2">
                Key Diagnostic Indicators
              </h4>
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm">
                {result.explanation.key_indicators.map((ind, idx) => (
                  <li
                    key={idx}
                    className="flex items-start gap-2 p-2 bg-gray-50 dark:bg-gray-900/50 rounded-lg text-gray-700 dark:text-gray-300"
                  >
                    <span className="text-indigo-500">•</span>
                    <span>{ind}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          <div className="pt-2 border-t border-gray-100 dark:border-gray-700/60 text-xs text-amber-700 dark:text-amber-400 flex items-start gap-2">
            <span>ℹ️</span>
            <span>{result.explanation.disclaimer}</span>
          </div>
        </div>
      )}
    </div>
  );
}
