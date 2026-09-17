"use client";

import React from "react";
import IndicatorList from "./IndicatorList";

interface AnalysisResult {
  id?: number;
  prediction?: "REAL" | "FAKE" | string;
  confidence?: number;
  fake_news?: {
    label?: string;
    probability?: number;
    confidence?: number;
    method?: string;
    message?: string;
  };
  clickbait?: {
    is_clickbait?: boolean;
    clickbait_label?: string;
    score?: number;
    clickbait_probability?: number;
    indicators?: string[];
    features?: Record<string, any>;
  };
  sentiment?: {
    sentiment?: string;
    label?: string;
    score?: number;
    compound?: number;
  };
  category?: {
    category?: string;
    confidence?: number;
  };
  explanation?: {
    summary?: string;
    indicators?: any[];
    key_indicators?: string[];
    feature_explanations?: string[];
    disclaimer?: string;
  };
  summary?: string;
}

interface ResultDashboardProps {
  result: AnalysisResult;
}

export default function ResultDashboard({ result }: ResultDashboardProps) {
  // Normalize fake news label & probability
  const fakeLabel =
    result.fake_news?.label ||
    (result.prediction ? result.prediction.toLowerCase() : "unknown");

  const isFake =
    fakeLabel === "potentially_misleading" ||
    fakeLabel === "fake" ||
    fakeLabel === "misleading";

  const fakeProb =
    result.fake_news?.probability ??
    (result.confidence !== undefined
      ? isFake
        ? result.confidence
        : 1 - result.confidence
      : 0.5);

  const confidencePct = Math.round(fakeProb * 100);

  // Normalize clickbait
  const isClickbait =
    result.clickbait?.clickbait_label === "clickbait" ||
    result.clickbait?.is_clickbait ||
    (result.clickbait?.clickbait_probability ?? 0) >= 0.5;

  const clickbaitScore =
    result.clickbait?.clickbait_probability ?? result.clickbait?.score ?? 0;
  const clickbaitPct = Math.round(clickbaitScore * 100);

  const clickbaitSignals: string[] = result.clickbait?.indicators || [];
  if (clickbaitSignals.length === 0 && result.clickbait?.features) {
    const f = result.clickbait.features;
    if (f.exclamation_count > 0)
      clickbaitSignals.push(`Contains ${f.exclamation_count} exclamation mark(s)`);
    if (f.curiosity_phrase_count > 0)
      clickbaitSignals.push(`Uses ${f.curiosity_phrase_count} curiosity-gap phrase(s)`);
    if (f.emotional_word_count > 0)
      clickbaitSignals.push(`Contains ${f.emotional_word_count} emotional word(s)`);
    if (f.uppercase_ratio > 0.3)
      clickbaitSignals.push(`High uppercase letter ratio (${Math.round(f.uppercase_ratio * 100)}%)`);
  }

  // Normalize sentiment
  const sentimentLabel =
    result.sentiment?.sentiment || result.sentiment?.label || "neutral";
  const sentimentScore =
    result.sentiment?.score ?? result.sentiment?.compound ?? 0;

  // Normalize category
  const categoryName = result.category?.category || "General";

  // Normalize explanation
  const explanationSummary =
    result.explanation?.summary || result.summary || "Analysis complete.";

  const rawIndicators =
    result.explanation?.indicators || result.explanation?.key_indicators || [];
  const indicatorMessages: string[] = rawIndicators.map((ind: any) =>
    typeof ind === "string" ? ind : ind.message || JSON.stringify(ind)
  );

  const featureExplanations = result.explanation?.feature_explanations || [];
  const disclaimer =
    result.explanation?.disclaimer ||
    "This analysis is powered by statistical ML models and heuristic rules for decision support.";

  return (
    <div className="space-y-6 mt-8 animate-fadeIn">
      {/* Primary Result Banner */}
      <div
        className={`p-6 rounded-2xl border transition-all ${
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
                  Fake News Risk Verdict
                </span>
                <h2 className="text-2xl font-bold">
                  {isFake
                    ? "POTENTIALLY MISLEADING / UNVERIFIED"
                    : "LIKELY AUTHENTIC & RELIABLE"}
                </h2>
              </div>
            </div>
            <p className="mt-2 text-sm opacity-90">
              Risk Probability: <strong className="font-semibold">{confidencePct}%</strong>
            </p>
          </div>

          <div className="w-full md:w-56 bg-white/60 dark:bg-black/30 p-3.5 rounded-xl border border-current/10">
            <div className="text-xs font-semibold mb-1 flex justify-between">
              <span>Reliable</span>
              <span>Misleading ({confidencePct}%)</span>
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

      {/* Grid of Analytical Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Clickbait Card */}
        <div className="bg-white dark:bg-gray-800 p-5 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm">
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-semibold text-gray-800 dark:text-gray-100 flex items-center gap-2">
              <span>📰</span> Clickbait Score
            </h3>
            <span
              className={`px-2.5 py-1 rounded-full text-xs font-semibold ${
                isClickbait
                  ? "bg-amber-100 text-amber-800 dark:bg-amber-900/40 dark:text-amber-300"
                  : "bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300"
              }`}
            >
              {isClickbait ? "Clickbait Detected" : "Standard Headline"}
            </span>
          </div>
          <div className="mb-4">
            <div className="flex justify-between text-sm text-gray-600 dark:text-gray-400 mb-1">
              <span>Sensationalism Score</span>
              <span className="font-bold text-gray-900 dark:text-gray-100">
                {clickbaitPct}/100
              </span>
            </div>
            <div className="w-full bg-gray-100 dark:bg-gray-700 h-2.5 rounded-full overflow-hidden">
              <div
                className="h-full bg-amber-500 transition-all duration-500"
                style={{ width: `${clickbaitPct}%` }}
              />
            </div>
          </div>
          {clickbaitSignals.length > 0 && (
            <IndicatorList indicators={clickbaitSignals} title="Detected Signals" />
          )}
        </div>

        {/* Sentiment Card */}
        <div className="bg-white dark:bg-gray-800 p-5 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm">
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-semibold text-gray-800 dark:text-gray-100 flex items-center gap-2">
              <span>😊</span> Content Sentiment
            </h3>
            <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-indigo-50 text-indigo-700 dark:bg-indigo-900/40 dark:text-indigo-300 capitalize">
              {sentimentLabel}
            </span>
          </div>
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
            Emotional Score:{" "}
            <strong className="text-gray-900 dark:text-gray-100">
              {sentimentScore > 0 ? "+" : ""}
              {typeof sentimentScore === "number" ? sentimentScore.toFixed(2) : sentimentScore}
            </strong>
          </p>
          <p className="text-xs text-gray-500 dark:text-gray-400">
            Highly sensational or emotional sentiment often accompanies misleading content.
          </p>
        </div>

        {/* Category Card */}
        <div className="bg-white dark:bg-gray-800 p-5 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm">
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-semibold text-gray-800 dark:text-gray-100 flex items-center gap-2">
              <span>📂</span> Topic Category
            </h3>
            <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-purple-50 text-purple-700 dark:bg-purple-900/40 dark:text-purple-300 capitalize">
              {categoryName}
            </span>
          </div>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Categorized automatically using NLP keyword matching and text analysis.
          </p>
        </div>
      </div>

      {/* AI Explanation Engine Output */}
      <div className="bg-white dark:bg-gray-800 p-6 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm space-y-4">
        <h3 className="text-lg font-bold text-gray-900 dark:text-gray-100 flex items-center gap-2">
          <span>🧠</span> Explainable AI Analysis Summary
        </h3>
        <p className="text-gray-700 dark:text-gray-300 text-sm leading-relaxed">
          {explanationSummary}
        </p>

        {indicatorMessages.length > 0 && (
          <div>
            <h4 className="text-xs uppercase tracking-wider font-semibold text-gray-500 dark:text-gray-400 mb-2">
              Key Diagnostic Indicators
            </h4>
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm">
              {indicatorMessages.map((msg, idx) => (
                <li
                  key={idx}
                  className="flex items-start gap-2 p-2.5 bg-gray-50 dark:bg-gray-900/50 rounded-lg text-gray-700 dark:text-gray-300 border border-gray-100 dark:border-gray-700/50"
                >
                  <span className="text-indigo-500 mt-0.5">•</span>
                  <span>{msg}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {featureExplanations.length > 0 && (
          <div>
            <h4 className="text-xs uppercase tracking-wider font-semibold text-gray-500 dark:text-gray-400 mb-2">
              TF-IDF Word Weight Explanations
            </h4>
            <ul className="space-y-1.5 text-xs text-gray-600 dark:text-gray-300">
              {featureExplanations.map((feat, idx) => (
                <li key={idx} className="flex items-center gap-2">
                  <span className="text-emerald-500">🔍</span>
                  <span>{feat}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        <div className="pt-3 border-t border-gray-100 dark:border-gray-700/60 text-xs text-amber-700 dark:text-amber-400 flex items-start gap-2">
          <span>ℹ️</span>
          <span>{disclaimer}</span>
        </div>
      </div>
    </div>
  );
}
