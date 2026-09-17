# AI NewsGuard — Fake News & Clickbait Analysis System

## README

### Project Title
AI NewsGuard — Fake News & Clickbait Analysis System

### Overview
AI NewsGuard is a web-based AI/ML system that analyzes news headlines and articles for fake news likelihood, clickbait indicators, sentiment, and news category classification. It provides explainable results with confidence scores and a professional dashboard.

### Problem Statement
The spread of misinformation and clickbait content online poses significant challenges. Traditional fact-checking is slow and resource-intensive. This project leverages NLP and machine learning to provide automated, explainable analysis of news content.

### Objectives
1. Classify news content as real or potentially fake using supervised ML
2. Detect clickbait characteristics in headlines and articles
3. Perform sentiment analysis on news content
4. Classify news into categories where dataset support exists
5. Provide explainable indicators for all predictions
6. Maintain analysis history with a professional dashboard

### Features
- Fake news classification (Logistic Regression + TF-IDF)
- Clickbait detection (heuristic + ML approach)
- Sentiment analysis (Positive/Negative/Neutral)
- News category classification
- Explainable AI indicators
- Analysis history with SQLite persistence
- Professional responsive dashboard
- Model evaluation page

### Technology Stack
- **Frontend**: Next.js 14, React, TypeScript, Tailwind CSS
- **Backend**: FastAPI, Pydantic, CORS
- **ML**: scikit-learn, TF-IDF, Logistic Regression, Multinomial Naive Bayes
- **NLP**: NLTK
- **Storage**: SQLite
- **Model Format**: joblib

### Project Structure
```
backend/           FastAPI application + ML services
frontend/          Next.js application
docs/              Architecture, methodology, evaluation docs
data/              Datasets (gitignored)
models/            Trained model artifacts (gitignored)
tests/             Test suites
```

### Installation

#### Backend
```bash
cd backend
pip install -r requirements.txt
python -m app.ml.train_fake_news
python -m app.ml.train_clickbait
uvicorn app.main:app --reload --port 8000
```

#### Frontend
```bash
cd frontend
npm install
npx next dev
```

### Environment Variables
Create `.env` in backend/ and frontend/ as needed. See `.env.example` for template.

### Running Tests
```bash
cd backend && pytest tests/
```

### Limitations
- Fake news classification is ML-based pattern matching, not factual verification
- Model accuracy depends on training data quality and coverage
- Clickbait detection uses heuristic rules when labeled data is unavailable
- Category classification limited to categories present in training data

### Disclaimer
This system provides machine-learning predictions based on patterns learned from training data. It is not independent fact verification and should not be represented as proof that a claim is true or false.

### References
- scikit-learn documentation: https://scikit-learn.org/
- FastAPI documentation: https://fastapi.tiangolo.com/
- Next.js documentation: https://nextjs.org/docs
- NLTK documentation: https://www.nltk.org/
