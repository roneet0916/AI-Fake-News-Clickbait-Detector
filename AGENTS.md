# AGENTS.md

## OpenCode Agent Instructions

This repository is **AI NewsGuard — Fake News & Clickbait Analysis System**.

### Project Stack
- **Frontend**: Next.js 14+ (App Router), React, TypeScript, Tailwind CSS
- **Backend**: FastAPI (Python 3.13)
- **ML**: scikit-learn, TF-IDF, Logistic Regression, Naive Bayes
- **Storage**: SQLite (via `db/repository.py`)
- **Model Artifacts**: joblib in `backend/models/`

### Key Commands
- Start backend: `cd backend && uvicorn app.main:app --reload --port 8000`
- Start frontend: `cd frontend && npx next dev`
- Train models: `cd backend && python -m app.ml.train_fake_news`
- Run tests: `cd backend && pytest tests/`
- Build frontend: `cd frontend && npx next build`

### Development Workflow
1. Every code change must be tested before committing.
2. Use conventional commits (e.g., `feat:`, `fix:`, `docs:`, `test:`, `chore:`).
3. Never commit `.env`, credentials, API keys, or model artifacts.
4. Update `PROJECT_STATE.md` after each milestone.
5. ML training is a separate step — never train during API inference.
6. Always verify dataset is real and documented before training.
7. If a dataset download fails, create a small clearly-labeled demo dataset and document it.

### Architecture Reminders
- Frontend calls backend via REST API (no direct DB access from frontend)
- ML models loaded once at startup, not per-request
- Preprocessing must be consistent between training and inference
- No data leakage: fit TF-IDF only on training data

### Directory Layout
```
backend/app/          FastAPI application code
frontend/app/         Next.js app router pages
docs/                 Architecture, methodology, evaluation docs
data/                 Raw datasets (gitignored if large)
models/               Trained model artifacts (gitignored)
tests/                Test suites
```

### Critical Rules
- Never fabricate metrics, test results, or commit history.
- Never expose stack traces to users in production responses.
- Do not claim the system verifies factual truth.
- All ML evaluation metrics must come from actual experiments.
