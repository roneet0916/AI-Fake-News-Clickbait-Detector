"""
ML Evaluation Script.
Loads trained model evaluation results and prints formatted summary metrics.
Run: python -m app.ml.evaluate
"""

import json
import logging
from pathlib import Path

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

MODELS_DIR = Path(__file__).resolve().parent.parent.parent / "models"


def evaluate():
    eval_file = MODELS_DIR / "evaluation_results.json"
    if not eval_file.exists():
        logger.error("No evaluation_results.json found. Run train_fake_news first.")
        return

    with open(eval_file, "r") as f:
        results = json.load(f)

    print("=" * 60)
    print("           AI NEWSGUARD — ML MODEL EVALUATION SUMMARY         ")
    print("=" * 60)

    for model_name, metrics in results.items():
        if model_name == "metadata":
            continue
        print(f"\nModel: {model_name.upper().replace('_', ' ')}")
        print("-" * 40)
        print(f"  Accuracy  : {metrics.get('accuracy', 0):.4f}")
        print(f"  Precision : {metrics.get('precision', 0):.4f}")
        print(f"  Recall    : {metrics.get('recall', 0):.4f}")
        print(f"  F1-Score  : {metrics.get('f1_score', 0):.4f}")
        print(f"  ROC-AUC   : {metrics.get('roc_auc', 0):.4f}")
        if "confusion_matrix" in metrics:
            print(f"  Confusion Matrix: {metrics['confusion_matrix']}")

    cb_eval = MODELS_DIR / "clickbait_metadata.json"
    if cb_eval.exists():
        with open(cb_eval, "r") as f:
            cb_metrics = json.load(f)
        print("\nModel: CLICKBAIT CLASSIFIER")
        print("-" * 40)
        print(f"  Accuracy  : {cb_metrics.get('accuracy', 0):.4f}")
        print(f"  Precision : {cb_metrics.get('precision', 0):.4f}")
        print(f"  Recall    : {cb_metrics.get('recall', 0):.4f}")
        print(f"  F1-Score  : {cb_metrics.get('f1_score', 0):.4f}")

    print("=" * 60)


if __name__ == "__main__":
    evaluate()
