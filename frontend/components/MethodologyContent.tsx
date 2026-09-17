"use client";

import React from "react";

export default function MethodologyContent() {
  return (
    <div className="space-y-8 text-gray-800 dark:text-gray-200">
      {/* Overview Section */}
      <section className="bg-white dark:bg-gray-800 p-6 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm">
        <h2 className="text-xl font-bold mb-3 text-indigo-600 dark:text-indigo-400">
          1. System Architecture & Multi-Stage Pipeline
        </h2>
        <p className="text-sm leading-relaxed mb-4">
          AI NewsGuard evaluates news articles using an ensemble of Machine Learning (ML) classifiers and Natural Language Processing (NLP) feature extractors. Rather than relying on a single black-box model, the platform breaks down content into quantifiable dimensions:
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
          <div className="p-4 bg-gray-50 dark:bg-gray-900/50 rounded-lg border border-gray-100 dark:border-gray-800">
            <h3 className="font-semibold mb-1 text-gray-900 dark:text-gray-100">🎯 Fake News Classifier</h3>
            <p className="text-xs text-gray-600 dark:text-gray-400">
              Logistic Regression & Multinomial Naive Bayes trained on TF-IDF n-grams (unigrams & bigrams) to identify unverified claims and misinformation patterns.
            </p>
          </div>
          <div className="p-4 bg-gray-50 dark:bg-gray-900/50 rounded-lg border border-gray-100 dark:border-gray-800">
            <h3 className="font-semibold mb-1 text-gray-900 dark:text-gray-100">📰 Clickbait Detector</h3>
            <p className="text-xs text-gray-600 dark:text-gray-400">
              Heuristic rule extraction combined with supervised classification measuring capitalization ratio, sensational tokens, and curiosity gaps.
            </p>
          </div>
          <div className="p-4 bg-gray-50 dark:bg-gray-900/50 rounded-lg border border-gray-100 dark:border-gray-800">
            <h3 className="font-semibold mb-1 text-gray-900 dark:text-gray-100">😊 Sentiment Analyzer</h3>
            <p className="text-xs text-gray-600 dark:text-gray-400">
              Lexicon-based VADER sentiment analysis measuring positive, negative, neutral, and compound emotional polarity.
            </p>
          </div>
          <div className="p-4 bg-gray-50 dark:bg-gray-900/50 rounded-lg border border-gray-100 dark:border-gray-800">
            <h3 className="font-semibold mb-1 text-gray-900 dark:text-gray-100">🧠 Explainable AI Engine</h3>
            <p className="text-xs text-gray-600 dark:text-gray-400">
              Generates transparent human-readable explanations summarizing key feature indicators and model confidence reasoning.
            </p>
          </div>
        </div>
      </section>

      {/* Preprocessing Section */}
      <section className="bg-white dark:bg-gray-800 p-6 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm">
        <h2 className="text-xl font-bold mb-3 text-indigo-600 dark:text-indigo-400">
          2. NLP Preprocessing Standard
        </h2>
        <p className="text-sm leading-relaxed mb-3">
          To ensure high model precision and avoid data leakage, raw input text undergoes standardized preprocessing prior to vectorization:
        </p>
        <ul className="list-disc pl-5 text-sm space-y-2 text-gray-700 dark:text-gray-300">
          <li><strong>Unicode Normalization:</strong> NFKD normalization converts accented and special symbols.</li>
          <li><strong>Text Lowercasing & Cleaning:</strong> Strips excess whitespace, non-standard punctuation, and control codes.</li>
          <li><strong>NLTK Tokenization:</strong> Uses NLTK's sentence and word tokenizers.</li>
          <li><strong>Stopword Removal:</strong> Filters out non-informative English stop words while preserving key diagnostic modifiers.</li>
        </ul>
      </section>

      {/* Academic Disclaimer */}
      <section className="bg-amber-50 dark:bg-amber-950/30 p-6 rounded-xl border border-amber-200 dark:border-amber-900/50 text-amber-900 dark:text-amber-200">
        <h2 className="text-lg font-bold mb-2 flex items-center gap-2">
          <span>⚠️</span> Academic & Ethical Disclaimer
        </h2>
        <p className="text-xs leading-relaxed">
          AI NewsGuard is designed strictly as an automated media literacy and text analysis tool. Machine Learning model predictions are based on statistical linguistic patterns within training data and <strong>do not constitute real-time fact-checking or absolute truth verification</strong>. Users are encouraged to cross-reference articles with verified, independent primary sources.
        </p>
      </section>
    </div>
  );
}
