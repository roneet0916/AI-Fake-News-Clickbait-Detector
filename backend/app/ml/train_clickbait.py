"""
Clickbait Classifier Model Training Pipeline.
Trains a machine learning model for clickbait headline classification.
Saves model artifacts to backend/models/.
"""

import json
import logging
from pathlib import Path
import joblib
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.linear_model import LogisticRegression
from sklearn.model_selection import train_test_split
from sklearn.metrics import accuracy_score, precision_score, recall_score, f1_score

from app.services.preprocessing import TextPreprocessor

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

MODELS_DIR = Path(__file__).resolve().parent.parent.parent / "models"
MODELS_DIR.mkdir(parents=True, exist_ok=True)

CLICKBAIT_DATASET = [
    # CLICKBAIT (Label 1)
    ("You Won't Believe What Happened When This Celebrity Stepped Out!", 1),
    ("10 Shocking Secrets Doctors Don't Want You to Know About Weight Loss!", 1),
    ("This Simple Trick Will Change Your Life Forever - Number 4 Will Blow Your Mind!", 1),
    ("What This Dog Did Next Will Leave You in Complete Tears!", 1),
    ("Here Is The Real Reason Why Everyone Is Talking About This New App!", 1),
    ("Top 7 Mind Blowing Facts That Prove Everything You Learned Was A Lie!", 1),
    ("He Thought No One Was Looking, But What Happened Next Is Unbelievable!", 1),
    ("She Tried This Household Ingredient and You Won't Believe The Result!", 1),
    ("Why Everyone Is Going Crazy Over This Simple 5-Minute Routine!", 1),
    ("15 Secrets Elites Don't Want You To Know About Banking!", 1),
    ("What Happened to This Child Star Will Make You Cry Tears of Joy!", 1),
    ("Is This The End Of Smartphones? This New Gadget Changes Everything!", 1),
    ("Stop Doing This One Common Thing Immediately Before It Is Too Late!", 1),
    ("This Shocking Video Has The Entire Internet In Tears!", 1),
    ("What She Found Under Her Bed Left Everyone In Absolute Shock!", 1),

    # NON-CLICKBAIT (Label 0)
    ("Federal Reserve Maintains Benchmark Interest Rate Following Policy Meeting", 0),
    ("NASA Launches Solar Probe to Study Sun's Atmosphere and Solar Winds", 0),
    ("Quarterly Financial Results Show Growth in Renewable Energy Investments", 0),
    ("Mayor Announces New Urban Infrastructure Improvement Plan for 2026", 0),
    ("Study Shows Regular Exercise Reduces Risk of Cardiovascular Disease", 0),
    ("Tech Company Announces Software Update Addressing Security Vulnerabilities", 0),
    ("European Union Passes New Data Privacy Regulations for Tech Platforms", 0),
    ("Scientists Discover New Species of Deep Sea Coral in Pacific Ocean", 0),
    ("Public Library System Expands Digital Book Access for Local Residents", 0),
    ("Electric Vehicle Sales Reach New Record High in First Quarter", 0),
    ("High School Science Team Wins National Robotics Competition", 0),
    ("Heavy Rain Forecasted for Coastal Regions Over The Weekend", 0),
    ("Global Supply Chain Bottlenecks Ease as Shipping Volumes Normalize", 0),
    ("University Researchers Publish Paper on Quantum Computing Hardware", 0),
    ("Local Agriculture Department Issues Seasonal Crop Care Guidelines", 0),
]


def train():
    logger.info("Initializing Clickbait Training Pipeline...")
    preprocessor = TextPreprocessor()

    texts, labels = zip(*CLICKBAIT_DATASET)
    cleaned_texts = [preprocessor.clean_text(t) for t in texts]

    vectorizer = TfidfVectorizer(max_features=1000, ngram_range=(1, 2))
    X_tfidf = vectorizer.fit_transform(cleaned_texts)

    X_train, X_test, y_train, y_test = train_test_split(
        X_tfidf, labels, test_size=0.3, random_state=42, stratify=labels
    )

    model = LogisticRegression(C=1.0, random_state=42)
    model.fit(X_train, y_train)

    preds = model.predict(X_test)

    metrics = {
        "accuracy": float(accuracy_score(y_test, preds)),
        "precision": float(precision_score(y_test, preds, zero_division=0)),
        "recall": float(recall_score(y_test, preds, zero_division=0)),
        "f1_score": float(f1_score(y_test, preds, zero_division=0)),
    }

    logger.info(f"Clickbait Model Accuracy: {metrics['accuracy']:.4f}, F1: {metrics['f1_score']:.4f}")

    joblib.dump(model, MODELS_DIR / "clickbait_model.joblib")
    joblib.dump(vectorizer, MODELS_DIR / "clickbait_vectorizer.joblib")

    with open(MODELS_DIR / "clickbait_metadata.json", "w") as f:
        json.dump(metrics, f, indent=2)

    logger.info(f"Successfully saved clickbait model artifacts to {MODELS_DIR}")


if __name__ == "__main__":
    train()
