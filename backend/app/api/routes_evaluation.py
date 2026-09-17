import json
import os
from pathlib import Path
from fastapi import APIRouter, HTTPException
from pydantic import BaseModel

router = APIRouter(prefix="/evaluation")

MODELS_DIR = Path(__file__).resolve().parent.parent.parent / "models"


class EvaluationResults(BaseModel):
    fake_news_model: dict | None
    clickbait_model: dict | None
    comparison: dict | None


@router.get("")
async def get_evaluation():
    results_path = MODELS_DIR / "evaluation_results.json"
    if results_path.exists():
        with open(results_path) as f:
            data = json.load(f)
            return {
                "fake_news_model": data.get("fake_news"),
                "clickbait_model": data.get("clickbait"),
                "comparison": data.get("comparison"),
            }
    return {
        "fake_news_model": None,
        "clickbait_model": None,
        "comparison": None,
    }
