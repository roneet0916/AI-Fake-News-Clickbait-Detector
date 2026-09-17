# Architecture Document

## System Architecture

### Overview
AI NewsGuard follows a clean three-tier architecture:

1. **Presentation Layer**: Next.js frontend with React/TypeScript/Tailwind CSS
2. **Application Layer**: FastAPI backend with REST API
3. **AI/ML Service Layer**: NLP preprocessing, ML models, explanation engine

### Component Diagram

```
User (Browser)
    ↓
Next.js Frontend (App Router)
    ↓ REST API (JSON over HTTP)
FastAPI Backend
    ↓ Service Calls
Analysis Service
    ├── NLP Preprocessing (NLTK)
    ├── TF-IDF Vectorization (scikit-learn)
    ├── Fake News Model (Logistic Regression / Naive Bayes)
    ├── Clickbait Analyzer (Heuristic + optional ML)
    ├── Sentiment Analyzer (Lexicon-based)
    ├── Category Classifier (TF-IDF + classifier)
    └── Explanation Engine (Feature importance + rules)
    ↓
SQLite Database (History)
    ↓
Joblib/Pickle Model Artifacts
```

### Key Design Decisions

1. **Separation of Concerns**: Each ML task (fake news, clickbait, sentiment, category) has its own module/service
2. **TF-IDF + Classical ML**: Chosen for interpretability, speed, and reasonable accuracy on text classification tasks
3. **SQLite**: Lightweight, no external dependencies, suitable for single-user/college project scale
4. **Joblib**: Standard serialization for scikit-learn models
5. **App Router**: Next.js 14 App Router for server-side rendering and routing

### Data Flow

1. User submits headline + article via frontend form
2. Frontend sends POST request to `/api/analyze`
3. Backend validates input using Pydantic schemas
4. Analysis service preprocesses text
5. Each ML component analyzes independently
6. Explanation engine generates human-readable insights
7. Result saved to SQLite history
8. Structured response returned to frontend
9. Frontend renders polished dashboard

### Module Dependencies

```
frontend/app/          → depends on →  backend/api/
backend/app/main.py    → depends on →  backend/app/services/
backend/app/services/  → depends on →  backend/app/ml/
backend/app/ml/        → depends on →  backend/app/utils/
backend/app/db/        → independent (storage layer)
```
