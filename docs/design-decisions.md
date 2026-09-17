# Design Decisions

## 1. Why TF-IDF + Logistic Regression?
- **TF-IDF**: Simple, effective, interpretable text representation. No need for deep learning infrastructure.
- **Logistic Regression**: Fast, probabilistic, interpretable coefficients. Strong baseline for text classification.
- Combined: Well-suited for binary classification with explainability requirements.

## 2. Why Not Deep Learning?
- Limited training data for this specific domain
- Deep learning requires more computational resources
- Less interpretable — harder to provide explanations
- TF-IDF + classical ML provides sufficient accuracy for this use case

## 3. Why SQLite?
- No external database server required
- Easy deployment for college project presentation
- Sufficient for single-user/analysis history at project scale
- Zero configuration

## 4. Why Next.js App Router?
- Modern React framework with excellent developer experience
- Server Components for better performance
- Built-in routing and API routes
- Excellent TypeScript support
- Strong ecosystem and community

## 5. Why FastAPI?
- Automatic API documentation (Swagger/ReDoc)
- Native async support
- Pydantic validation built-in
- Fast performance (ASGI)
- Excellent Python typing integration

## 6. Explainability Approach
- Clickbait: Rule-based features (exclamation marks, caps ratio, etc.) — inherently interpretable
- Fake news model: Linear model coefficients show feature importance
- No black-box predictions without explanation
- All explanations clearly labeled as model predictions, not facts
