import json
import os
from pathlib import Path
from fastapi import APIRouter, HTTPException
from pydantic import BaseModel

router = APIRouter(prefix="/models")

MODELS_DIR = Path(__file__).resolve().parent.parent.parent / "models"


class ModelInfo(BaseModel):
    name: str
    type: str
    available: bool
    features: list[str] | None = None
    metrics: dict | None = None


@router.get("")
async def list_models():
    models = []
    fake_news_path = MODELS_DIR / "fake_news_model.joblib"
    clickbait_path = MODELS_DIR / "clickbait_model.joblib"
    vectorizer_path = MODELS_DIR / "tfidf_vectorizer.joblib"

    fake_news_available = fake_news_path.exists()
    clickbait_available = clickbait_path.exists()

    models.append(ModelInfo(
        name="fake_news",
        type="Logistic Regression / Naive Bayes (TF-IDF)",
        available=fake_news_available,
        features=["tfidf", "title_length", "capitalization_ratio", "punctuation"],
        metrics=_load_metrics("fake_news") if fake_news_available else None,
    ))
    models.append(ModelInfo(
        name="clickbait",
        type="Heuristic + Classifier (TF-IDF)",
        available=clickbait_available,
        features=["headline_length", "exclamation_count", "uppercase_ratio", "emotional_words"],
        metrics=_load_metrics("clickbait") if clickbait_available else None,
    ))
    models.append(ModelInfo(
        name="tfidf_vectorizer",
        type="TF-IDF Vectorizer",
        available=vectorizer_path.exists(),
    ))

    return {"models": models}


def _load_metrics(name: str) -> dict | None:
    path = MODELS_DIR / f"{name}_metadata.json"
    if path.exists():
        try:
            with open(path) as f:
                data = json.load(f)
                return data.get("metrics", data.get("evaluation"))
        except Exception:
            return None
    return None
