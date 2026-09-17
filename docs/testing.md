# Testing Documentation

## Test Strategy

### Backend Tests (pytest)
Location: `backend/tests/`

**API Tests** (`test_api.py`):
- Health endpoint returns 200
- Valid analysis request returns structured result
- Empty input returns 422
- Too-short input returns 422
- Malformed request returns 422
- History create/read/delete cycle

**ML Tests** (`test_ml.py`):
- Preprocessing function output validation
- Vectorizer loading
- Model prediction output schema
- Clickbait feature extraction

### Frontend Tests
Location: `frontend/__tests__/` (if needed)

- Analyzer form validation
- Result display rendering
- Navigation between pages

### Test Execution
```bash
# Backend tests
cd backend && pytest tests/ -v

# Frontend type checking
cd frontend && npx tsc --noEmit
```

### Test Coverage Goals
- All API endpoints tested
- All ML pipeline functions tested
- Error handling paths tested

## Running Tests
```bash
cd backend && pytest tests/ -v --tb=short
```
