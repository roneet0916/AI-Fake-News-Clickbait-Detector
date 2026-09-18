🛡️ AI NewsGuard

Fake News & Clickbait Analysis System

AI/ML-powered textual pattern analysis for identifying patterns
associated with potentially misleading news and clickbait.

⚠️ Important Disclaimer

This tool provides AI/ML-based textual pattern analysis. It does not
verify factual accuracy. A clickbait headline can be factually true; a
non-clickbait article can contain false information. Do not use this
tool as a substitute for professional fact-checking.

📌 Overview

AI NewsGuard is a full-stack web application that combines NLP,
classical machine learning, explainability, REST APIs, database
persistence, testing, and a responsive frontend.

A user submits a headline or article and the system performs:

Fake-news-related pattern prediction

Clickbait analysis

Sentiment analysis

News-category classification where supported by the dataset

Explainable indicators

Confidence/probability information where technically supported

Human-readable summary

Persistent analysis history

Interactive results dashboard

Model evaluation and methodology transparency

The system predicts patterns learned from training data; it does not
independently establish whether a claim is factually true or false.

🎯 Problem Statement

Online news and social platforms allow misleading, sensationalized, and
clickbait-style content to spread rapidly. Non-expert users may find it
difficult to identify textual patterns commonly associated with such
content.

AI NewsGuard provides a first-pass textual screening tool that analyzes
submitted content and presents interpretable signals. It is not a
replacement for independent fact-checking.

🎯 Objectives

Apply NLP techniques to news text.

Build a reproducible ML classification pipeline.

Analyze fake-news-related textual patterns.

Detect clickbait-style headline patterns.

Perform sentiment analysis.

Classify supported news categories.

Provide interpretable indicators.

Persist analysis history using SQLite.

Provide a professional responsive web interface.

Expose analysis through FastAPI.

Evaluate models using actual experimental results.

Demonstrate responsible and transparent AI/ML.

✨ Features

News Analysis

Fake-news pattern prediction

Clickbait detection

Sentiment analysis

Category classification where supported

Explainable indicators

Confidence/probability values where supported

Human-readable summary

Dashboard

Prediction cards

Probability/confidence visualization

Clickbait indicators

Sentiment and category information

Explanation panel

Original submitted content

Transparency/disclaimer messaging

History

Save analyses

Browse previous analyses

View individual analysis details

Delete records

Engineering

Input validation

API error handling

Missing-model handling

SQLite persistence

Automated backend/ML tests

Frontend lint/type/build checks

Modular architecture

Reproducible documentation

🧩 Functional Requirements

ID

Requirement

FR-01

User can enter a headline or article text.

FR-02

Invalid or insufficient input is rejected clearly.

FR-03

System performs fake-news-related ML prediction.

FR-04

System performs clickbait analysis.

FR-05

System performs sentiment analysis.

FR-06

System performs category classification where supported.

FR-07

System provides explainable textual indicators.

FR-08

Results are displayed in an interactive dashboard.

FR-09

Results are persisted in SQLite.

FR-10

Users can view and delete history records.

FR-11

Model evaluation information is available.

FR-12

Frontend communicates with the FastAPI REST API.

⚙️ Non-Functional Requirements

Performance: no model retraining during inference; saved artifacts
are loaded for prediction.

Usability: responsive UI, clear navigation, meaningful states and
messages.

Reliability: graceful API, model, database, and validation
failures.

Maintainability: modular services, typed interfaces, reusable
components.

Security: validate inputs, never execute user content, protect
secrets, never commit .env.

Scalability: separate API routing, inference, and storage
concerns.

Observability: structured logging where practical.

Resource efficiency: use lightweight classical NLP/ML methods
suitable for the project environment.

🏗️ System Architecture

User
  ↓
Next.js + React + TypeScript
  ↓ REST API
FastAPI + Pydantic
  ↓
Analysis Service
  ├── NLP Preprocessing
  ├── TF-IDF
  ├── Fake News Model
  ├── Clickbait Analyzer
  ├── Sentiment Analyzer
  ├── Category Classifier
  └── Explanation Engine
  ↓
SQLite Analysis History
  +
Saved ML Artifacts
  ↓
Results Dashboard / History

🔄 Workflow

Enter News Text
      ↓
Frontend Validation
      ↓
POST /api/analyze
      ↓
FastAPI Request Validation
      ↓
NLP Preprocessing
      ↓
TF-IDF Transformation
      ↓
ML/NLP Analysis
      ↓
Explanation Generation
      ↓
Save Result to SQLite
      ↓
Return Structured JSON
      ↓
Render Results Dashboard

🤖 AI/ML Pipeline

Dataset

The project uses a labeled Fake/Real News dataset. The expected local
files are:

backend/data/Fake.csv
backend/data/True.csv

Before training, the pipeline should inspect missing values, duplicates,
class distribution, invalid rows, and data quality.

Preprocessing

The implementation should document its actual text-cleaning and
normalization steps in docs/dataset.md.

TF-IDF

Text is transformed into numerical features using TF-IDF.

Important: TF-IDF must be fitted only on the training data after the
train/test split to prevent data leakage.

Fake News Model

Baseline:

TF-IDF + Logistic Regression

Where computationally reasonable, compare against:

TF-IDF + Multinomial Naive Bayes

TF-IDF + Linear SVM

The final model must be selected using actual measured results.

Clickbait Analysis

The clickbait module may use a trained classifier and/or interpretable
headline features depending on the available dataset and implementation.

Possible indicators include excessive punctuation, sensational wording,
question structures, curiosity-gap patterns, capitalization, and
list-style structures. Only implemented indicators should be reported.

Sentiment

The sentiment module analyzes the emotional/polarity characteristics of
the submitted text using the implemented NLP approach.

Category Classification

Category classification should only be enabled when the selected dataset
provides appropriate category labels and sufficient data.

📊 Model Evaluation

Use a held-out test set and, where practical, validation or
cross-validation.

Recommended metrics:

Accuracy

Precision

Recall

F1 Score

Confusion Matrix

Example:

Model

Accuracy

Precision

Recall

F1

TF-IDF + Logistic Regression

Actual result

Actual result

Actual result

Actual result

Alternative model

Actual result

Actual result

Actual result

Actual result

Never insert fabricated metrics. Replace placeholders only with values
from executed experiments.

🧠 Explainability

Depending on the implemented model, the application can expose:

influential terms/features

textual indicators

clickbait feature contributions

probability/confidence information

The UI must distinguish:

Type

Meaning

ML Prediction

Output from a trained model

Heuristic Indicator

Pattern detected by a defined rule

External Evidence

Independently verified information

AI NewsGuard currently focuses on textual analysis and does not perform
independent external fact verification.

🛠️ Technology Stack

Layer

Technology

Frontend

Next.js 14, React 18

Language

TypeScript

Styling

Tailwind CSS

Charts

Recharts

Icons

Lucide

Backend

FastAPI

Python

3.11+

Validation

Pydantic v2

Server

Uvicorn

ML

scikit-learn

Data

pandas, NumPy

NLP

NLTK

Serialization

joblib

Database

SQLite

Testing

pytest, httpx

Frontend Quality

ESLint, TypeScript strict

Python Quality

Ruff

📂 Project Structure

ai-newsguard/
├── frontend/
│   ├── app/
│   │   ├── layout.tsx
│   │   ├── page.tsx
│   │   ├── analyzer/page.tsx
│   │   ├── history/page.tsx
│   │   ├── history/[id]/page.tsx
│   │   ├── methodology/page.tsx
│   │   └── evaluation/page.tsx
│   ├── components/
│   │   ├── layout/
│   │   ├── home/
│   │   ├── analyzer/
│   │   ├── results/
│   │   ├── history/
│   │   └── shared/
│   ├── hooks/
│   ├── lib/
│   ├── types/
│   └── public/
├── backend/
│   ├── app/
│   │   ├── api/
│   │   ├── core/
│   │   ├── db/
│   │   ├── ml/
│   │   ├── schemas/
│   │   └── services/
│   ├── data/
│   ├── models/
│   ├── tests/
│   └── requirements.txt
├── docs/
│   ├── architecture.md
│   ├── workflow.md
│   ├── dataset.md
│   ├── model-evaluation.md
│   ├── design-decisions.md
│   ├── testing.md
│   ├── REPORT_CONTENT.md
│   ├── VIVA_PREPARATION.md
│   └── diagrams/
├── statement.md
├── PROJECT_STATE.md
├── CHANGELOG.md
├── AGENTS.md
├── .env.example
├── .gitignore
└── README.md

Keep this tree synchronized with the actual repository.

🚀 Installation

Prerequisites

Python 3.11+

Node.js 18+

npm

Git

Backend

cd backend
python -m venv .venv

Windows:

.venv\Scriptsctivate

macOS/Linux:

source .venv/bin/activate

Install dependencies:

pip install -r requirements.txt
python -m app.ml.download_nltk

Dataset

Place the permitted dataset files in:

backend/data/
├── Fake.csv
└── True.csv

Train

cd backend
python -m app.ml.train_fake_news

Run Backend

uvicorn app.main:app --reload

Default development API:

http://localhost:8000

FastAPI docs:

http://localhost:8000/docs

Frontend

cd frontend
npm install

Create .env.local:

NEXT_PUBLIC_API_URL=http://localhost:8000

Run:

npm run dev

Default development frontend:

http://localhost:3000

🔐 Environment Variables

Use .env.example as the template.

Never commit:

.env
.env.local

Never commit API keys, passwords, tokens, or other secrets.

🔌 API

Method

Endpoint

Description

GET

/api/health

Health check

POST

/api/analyze

Analyze news text

GET

/api/history

List analysis history

GET

/api/history/{id}

Get one analysis

DELETE

/api/history/{id}

Delete analysis

GET

/api/models

Model status

GET

/api/evaluation

Model metrics

Keep this table synchronized with the implemented API.

🧪 Testing

Backend:

cd backend
pytest tests/ -v

Frontend:

cd frontend
npm run lint
npm run build

Testing should cover:

health endpoint

valid analysis

empty/short input

malformed requests

model loading failures

history creation

history retrieval

history deletion

preprocessing

model/vectorizer loading

prediction schema

clickbait feature extraction

key frontend behavior

Never claim tests pass unless they were actually executed.

🗄️ Database

SQLite stores analysis history.

Conceptual record:

ANALYSIS_HISTORY
├── id
├── created_at
├── title
├── text_preview
├── full_text
├── fake_prediction
├── fake_probability_fake
├── fake_probability_real
├── fake_label
├── fake_confidence
├── clickbait_type
├── clickbait_label
├── clickbait_score
├── sentiment
├── sentiment_score
├── category
├── risk_level
└── analysis_summary

The actual database schema must match the implementation.

📐 Design Documentation

The repository should contain:

Problem Statement

Objectives

Functional Requirements

Non-functional Requirements

System Architecture

Workflow Diagram

Use Case Diagram

Sequence Diagram

Class/Component Diagram

ER Diagram

Dataset Description

Model Selection Rationale

Evaluation Methodology

Design Decisions

Testing Documentation

Mermaid sources should be stored under:

docs/diagrams/

Every diagram must match the actual implementation.

🎓 Academic Alignment

This project is structured for the VITyarthi Build Your Own Project —
Fundamentals of AI/ML requirements:

Problem statement and objectives

At least 3 major functional modules

At least 4 non-functional requirements

Architecture and workflow

UML/design diagrams

Database/storage design

Dataset description

Model selection rationale

Evaluation methodology

Modular source code

Validation and error handling

Testing

Git/GitHub version control

Project report support

Evaluation Rubric

Component

Weight

Problem Understanding & Requirements

10%

Design & Documentation

20%

Implementation Quality

25%

Innovation, Depth & Complexity

15%

GitHub Repository & Version Control

10%

Project Report

20%

Total

100%

🖼️ Screenshots

Add real screenshots after implementation:

docs/screenshots/
├── home.png
├── analyzer.png
├── results.png
├── history.png
├── methodology.png
└── evaluation.png

Recommended screenshots include the landing page, analyzer, results
dashboard, history, methodology/evaluation pages, and responsive/mobile
views.

⚠️ Limitations

Predictions depend on the quality and distribution of training data.

Textual patterns cannot independently establish factual truth.

Dataset bias may affect predictions.

ML predictions can be incorrect.

Clickbait detection is not misinformation detection.

Sentiment does not determine factual accuracy.

Category classification depends on supported labeled data.

Confidence values are not certainty.

The system does not currently perform independent external fact
verification.

Results should be treated as screening signals, not definitive
factual judgments.

🚀 Future Enhancements

Evidence retrieval from trustworthy sources

Retrieval-augmented fact verification

Source credibility analysis

Evidence citation

Multilingual NLP

Transformer-based models

Larger and more diverse datasets

Human-in-the-loop review

Authentication and user workspaces

Model monitoring and drift detection

Cloud deployment

Advanced analytics

📚 References

Use official documentation for the technologies actually used:

Next.js

React

TypeScript

Tailwind CSS

FastAPI

Pydantic

scikit-learn

pandas

NumPy

NLTK

SQLite

pytest

Also document the actual dataset source, version, license/terms, and
access date.

📁 Supporting Documentation

statement.md

Contains the problem statement, scope, target users, and high-level
features.

docs/

Contains architecture, workflow, dataset, evaluation, design decisions,
testing, diagrams, report content, and viva preparation.

PROJECT_STATE.md

Tracks verified development progress.

CHANGELOG.md

Tracks meaningful project changes.

AGENTS.md

Contains project-specific engineering instructions.

🌱 Development & Git Workflow

Use:

Implement
  ↓
Test
  ↓
Inspect
  ↓
Fix
  ↓
Commit
  ↓
Push
  ↓
Update PROJECT_STATE.md
  ↓
Continue

Use meaningful conventional commits such as:

chore: initialize project foundation
docs: add project requirements and architecture
chore: scaffold frontend and backend
feat: add dataset ingestion pipeline
feat: implement NLP preprocessing
feat: implement TF-IDF feature pipeline
feat: train fake news baseline model
feat: add fake news model evaluation
feat: add model persistence and inference
feat: implement clickbait analysis
feat: add sentiment analysis
feat: add category classification
feat: add explanation engine
feat: implement FastAPI analysis endpoint
feat: add SQLite analysis history
feat: build analyzer frontend
feat: build analysis results dashboard
feat: build history and methodology pages
test: add automated ML and API tests
fix: improve validation and error handling
refactor: improve application architecture
docs: add UML and project report documentation
docs: add viva preparation and methodology
chore: final quality assurance
chore: finalize release

Important: commits must represent real completed work. Never create
empty/fake commits simply to increase GitHub history.

🤝 Responsible AI

AI NewsGuard emphasizes:

Transparency: clearly explain what the system can and cannot
determine.

No false certainty: predictions are not presented as facts.

Data awareness: document dataset limitations and possible bias.

Explainability: expose useful textual indicators where technically
appropriate.

Reproducibility: use reproducible training/evaluation procedures.

Honest reporting: never fabricate metrics, datasets, screenshots,
tests, or development history.

👥 Project Context

Project: AI NewsGuard — Fake News & Clickbait Analysis System
Academic Area: Fundamentals of AI/ML
Type: Full-stack NLP/ML web application
