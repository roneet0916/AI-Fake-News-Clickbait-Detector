"""Analysis orchestration service — chains all analysis steps together."""

import logging
from typing import Optional

from app.services.preprocessing import TextPreprocessor
from app.services.clickbait import ClickbaitFeatureExtractor
from app.services.sentiment import SentimentAnalyzer
from app.services.category import CategoryClassifier
from app.services.explanation import ExplanationEngine
from app.db.repository import save_analysis

logger = logging.getLogger(__name__)

# Singleton instances — initialized once
_preprocessor = TextPreprocessor()
_clickbait_extractor = ClickbaitFeatureExtractor()
_sentiment_analyzer = SentimentAnalyzer()
_category_classifier = CategoryClassifier()
_explanation_engine = ExplanationEngine()

# ML model references — loaded at startup
_fake_news_model = None
_fake_news_vectorizer = None
_fake_news_model_name = None


def set_fake_news_model(model, vectorizer, model_name: str = "logistic_regression"):
    """Set the fake news model after loading from disk."""
    global _fake_news_model, _fake_news_vectorizer, _fake_news_model_name
    _fake_news_model = model
    _fake_news_vectorizer = vectorizer
    _fake_news_model_name = model_name
    logger.info(f"Fake news model loaded: {model_name}")


def get_model_status() -> dict:
    """Return current model loading status."""
    return {
        "fake_news_model_loaded": _fake_news_model is not None,
        "fake_news_vectorizer_loaded": _fake_news_vectorizer is not None,
        "model_name": _fake_news_model_name,
    }


def analyze_text(title: str, text: str) -> dict:
    """
    Run the full analysis pipeline on input text.
    
    Pipeline:
      1. Preprocess text
      2. Fake news prediction (ML or fallback)
      3. Clickbait analysis (heuristic)
      4. Sentiment analysis
      5. Category classification
      6. Explanation generation
      7. Save to history
    
    Returns structured analysis result.
    """
    # Use title + text combined for analysis, title alone for clickbait
    full_text = f"{title} {text}".strip() if text else title
    headline = title.strip()

    # 1. Preprocess for ML
    preprocessed = _preprocessor.preprocess(full_text, remove_stopw=True, stem=False)

    # 2. Fake news prediction
    fake_news_result = _predict_fake_news(preprocessed)

    # 3. Clickbait analysis (on headline primarily)
    clickbait_result = _clickbait_extractor.score(headline)

    # 4. Sentiment analysis
    sentiment_result = _sentiment_analyzer.analyze(full_text)

    # 5. Category classification
    category_result = _category_classifier.classify(full_text)

    # 6. Get top features if ML model available
    top_features = _get_top_features(preprocessed)

    # 7. Generate explanation
    explanation = _explanation_engine.generate(
        fake_news_result=fake_news_result,
        clickbait_result=clickbait_result,
        sentiment_result=sentiment_result,
        category_result=category_result,
        top_features=top_features,
    )

    # 8. Save to history
    article_preview = text[:500] if text else title[:500]
    record_id = save_analysis(
        title=title[:500],
        article_preview=article_preview,
        fake_probability=fake_news_result.get("probability", 0.5),
        predicted_label=fake_news_result.get("label", "unknown"),
        clickbait_probability=clickbait_result.get("clickbait_probability", 0.0),
        clickbait_label=clickbait_result.get("clickbait_label", "unknown"),
        sentiment=sentiment_result.get("sentiment", "neutral"),
        category=category_result.get("category", "other"),
        analysis_summary=explanation.get("summary", ""),
    )

    return {
        "id": record_id,
        "title": title,
        "created_at": "just now",
        "status": "complete",
        "fake_news": fake_news_result,
        "clickbait": clickbait_result,
        "sentiment": sentiment_result,
        "category": category_result,
        "explanation": explanation,
        "summary": explanation.get("summary", ""),
    }


def _predict_fake_news(preprocessed_text: str) -> dict:
    """
    Predict fake news using the loaded ML model.
    Falls back to a disclaimer if no model is loaded.
    """
    if _fake_news_model is None or _fake_news_vectorizer is None:
        return {
            "label": "unknown",
            "probability": 0.5,
            "confidence": 0.0,
            "method": "none",
            "message": "No fake news model is currently loaded. Train the model first.",
        }

    try:
        # Transform text using the fitted vectorizer
        features = _fake_news_vectorizer.transform([preprocessed_text])
        
        # Get prediction and probabilities
        prediction = _fake_news_model.predict(features)[0]
        probabilities = _fake_news_model.predict_proba(features)[0]
        
        # Determine label and probability
        # Convention: class 0 = real, class 1 = fake
        classes = list(_fake_news_model.classes_)
        if 1 in classes:
            fake_idx = classes.index(1)
        else:
            fake_idx = 1 if len(classes) > 1 else 0
        
        fake_prob = float(probabilities[fake_idx])
        label = "potentially_misleading" if fake_prob >= 0.5 else "likely_reliable"

        return {
            "label": label,
            "probability": round(fake_prob, 4),
            "confidence": round(abs(fake_prob - 0.5) * 2, 4),
            "method": f"ml_{_fake_news_model_name}",
            "raw_prediction": int(prediction),
        }
    except Exception as e:
        logger.error(f"Fake news prediction failed: {e}")
        return {
            "label": "error",
            "probability": 0.5,
            "confidence": 0.0,
            "method": "error",
            "message": f"Prediction error: {str(e)}",
        }


def _get_top_features(preprocessed_text: str) -> list:
    """
    Extract top contributing features from the linear model for explainability.
    Only works with linear models (LogisticRegression, LinearSVC).
    """
    if _fake_news_model is None or _fake_news_vectorizer is None:
        return []

    try:
        if not hasattr(_fake_news_model, 'coef_'):
            return []

        features = _fake_news_vectorizer.transform([preprocessed_text])
        feature_names = _fake_news_vectorizer.get_feature_names_out()
        coef = _fake_news_model.coef_[0]

        # Get non-zero features in the input
        nonzero_indices = features.nonzero()[1]
        feature_weights = []
        for idx in nonzero_indices:
            feature_weights.append({
                "word": feature_names[idx],
                "weight": round(float(coef[idx]), 4),
                "tfidf_value": round(float(features[0, idx]), 4),
            })

        # Sort by absolute weight
        feature_weights.sort(key=lambda x: abs(x["weight"]), reverse=True)
        return feature_weights[:10]
    except Exception as e:
        logger.error(f"Feature extraction failed: {e}")
        return []
