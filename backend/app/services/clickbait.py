import re
from typing import Optional


class ClickbaitFeatureExtractor:
    URGENCY_WORDS = {
        'urgent', 'breaking', 'alert', 'warning', 'critical',
        'instant', 'immediate', 'now', 'today', 'moment',
        'shocking', 'unbelievable', 'incredible', 'astonishing',
        'miracle', 'sudden', 'emergency', 'urgently', 'hurry'
    }

    EMOTIONAL_WORDS = {
        'shocking', 'amazing', 'terrifying', 'heartbreaking',
        'outrageous', 'disgusting', 'beautiful', 'horrible',
        'incredible', 'unbelievable', 'shocking', 'devastating',
        'thrilling', 'frightening', 'glorious', 'pathetic', 'evil'
    }

    CURIOSITY_PHRASES = {
        "you won", "you'll never", "don't tell", "they don't want",
        "you need", "what they", "what no one", "can't believe",
        "never knew", "secret", "hidden", "untold",
        "what happened", "what really", "the truth", "you think",
        "here's why", "here's what", "this is what",
    }

    SENSATIONAL_KEYWORDS = {
        'shocking', 'outrageous', 'incredible', 'unbelievable',
        'amazing', 'shocking', 'terrifying', 'astonishing',
        'miracle', 'shocking', 'shocking', 'mind blowing'
    }

    def __init__(self):
        self.features: dict = {}

    def extract(self, text: str) -> dict:
        headline = text.strip()
        features = {
            'headline_length': len(headline),
            'exclamation_count': headline.count('!'),
            'question_mark_count': headline.count('?'),
            'uppercase_ratio': self._uppercase_ratio(headline),
            'digit_count': sum(c.isdigit() for c in headline),
            'emotional_word_count': self._count_keywords(headline, self.EMOTIONAL_WORDS),
            'urgency_word_count': self._count_keywords(headline, self.URGENCY_WORDS),
            'curiosity_phrase_count': self._count_phrases(headline, self.CURIOSITY_PHRASES),
            'sensational_keyword_count': self._count_keywords(headline, self.SENSATIONAL_KEYWORDS),
        }
        return features

    def _uppercase_ratio(self, text: str) -> float:
        letters = [c for c in text if c.isalpha()]
        if not letters:
            return 0.0
        return sum(1 for c in letters if c.isupper()) / len(letters)

    def _count_keywords(self, text: str, keywords: set[str]) -> int:
        text_lower = text.lower()
        return sum(1 for kw in keywords if kw in text_lower)

    def _count_phrases(self, text: str, phrases: set[str]) -> int:
        text_lower = text.lower()
        return sum(1 for p in phrases if p in text_lower)

    def score(self, text: str) -> dict:
        features = self.extract(text)
        total_score = sum(features.values())
        clickbait_probability = min(1.0, total_score / 20.0)
        label = 'clickbait' if clickbait_probability >= 0.4 else 'not_clickbait'
        return {
            'features': features,
            'clickbait_probability': round(clickbait_probability, 4),
            'clickbait_label': label,
            'method': 'heuristic',
        }
