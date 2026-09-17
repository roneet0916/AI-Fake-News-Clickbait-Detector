# Workflow Document

## System Workflow

### 1. User Input Flow
```
User enters headline + article
→ Frontend validates (non-empty, min length)
→ User clicks "Analyze"
→ Frontend shows loading state
→ POST /api/analyze with { title, text, category? }
```

### 2. Backend Analysis Flow
```
Receive request → Validate (Pydantic) → Preprocess text
→ Run fake news classifier → Run clickbait analyzer
→ Run sentiment analysis → Run category classifier
→ Generate explanations → Save to history → Return result
```

### 3. ML Training Workflow
```
Acquire dataset → Clean → Remove nulls/duplicates
→ Inspect class balance → Train/test split (stratified)
→ Preprocess → TF-IDF fit (training only)
→ Train candidate models → Evaluate → Select best
→ Save model + vectorizer + metadata
```

### 4. History Flow
```
Analysis result → Save to SQLite (timestamp, title, preview, scores)
→ History page queries /api/history
→ User clicks record → Detail view via /api/history/{id}
→ User deletes → DELETE /api/history/{id}
```

### 5. Frontend Rendering Flow
```
Page load → Layout renders (Navbar + Footer)
→ Page component fetches data
→ Results render with:
  → Confidence cards (fake news, clickbait)
  → Sentiment badge
  → Category badge
  → Indicator list
  → Explanation panel
  → Disclaimer
```
