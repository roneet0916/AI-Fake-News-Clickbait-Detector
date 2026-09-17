# Changelog

All notable changes to the AI NewsGuard project will be documented in this file.

## [1.0.0] - 2026-09-18

### Added
- **Full-Stack Application Architecture**: Built FastAPI backend and Next.js 14+ frontend with complete REST API integration.
- **Machine Learning Pipelines**:
  - Logistic Regression & Multinomial Naive Bayes models trained on TF-IDF unigram & bigram features for fake news classification.
  - Supervised clickbait classification model & heuristic indicator extractor.
  - Automated evaluation script saving real metrics, confusion matrices, and ROC-AUC scores.
- **Explainable AI Engine**:
  - Human-readable analysis summary generation.
  - Feature impact breakdown and key indicator highlights.
  - Responsible media literacy disclaimer banners.
- **Frontend User Interface**:
  - Responsive Next.js 14 App Router UI with Tailwind CSS.
  - Pages: Home, Analyze, System Dashboard, History Log, Result Detail (`/result/[id]`), and Methodology.
  - Components: `ResultDashboard`, `HistoryTable`, `DashboardContent`, `MethodologyContent`, `IndicatorList`, `NewsInput`, `Navbar`, `Footer`.
- **Database & Persistence**: SQLite repository storing analysis history with search, filter, and delete capabilities.
- **Test Suite**: 35 automated pytest integration, unit, and API tests.
