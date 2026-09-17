import json
from pathlib import Path
from typing import Optional

MODELS_DIR = Path(__file__).resolve().parent.parent.parent / "models"


def save_model_metadata(name: str, metadata: dict) -> None:
    MODELS_DIR.mkdir(parents=True, exist_ok=True)
    path = MODELS_DIR / f"{name}_metadata.json"
    with open(path, 'w') as f:
        json.dump(metadata, f, indent=2, default=str)


def load_model_metadata(name: str) -> Optional[dict]:
    path = MODELS_DIR / f"{name}_metadata.json"
    if not path.exists():
        return None
    with open(path, 'r') as f:
        return json.load(f)


def save_evaluation_results(results: dict) -> None:
    MODELS_DIR.mkdir(parents=True, exist_ok=True)
    path = MODELS_DIR / "evaluation_results.json"
    with open(path, 'w') as f:
        json.dump(results, f, indent=2, default=str)


def load_evaluation_results() -> Optional[dict]:
    path = MODELS_DIR / "evaluation_results.json"
    if not path.exists():
        return None
    with open(path, 'r') as f:
        return json.load(f)
