import re
from typing import Optional

POSITIVE_WORDS = {
    'good', 'great', 'excellent', 'positive', 'success',
    'win', 'happy', 'amazing', 'beautiful', 'love',
    'best', 'better', 'wonderful', 'fantastic', 'incredible',
    'outstanding', 'perfect', 'improve', 'progress', 'hope',
    'benefit', 'growth', 'achieve', 'thrilled', 'delight',
    'enjoy', 'pleasant', 'impressive', 'remarkable', 'superb',
}

NEGATIVE_WORDS = {
    'bad', 'terrible', 'negative', 'fail', 'loss',
    'sad', 'horrible', 'awful', 'hate', 'worst',
    'worse', 'disaster', 'tragic', 'poor', 'critical',
    'danger', 'threat', 'crisis', 'concern', 'alarming',
    'disturbing', 'frightening', 'devastating', 'damaging',
    'trouble', 'problem', 'difficult', 'severe', 'urgent',
}


class SentimentAnalyzer:
    def __init__(self):
        self.positive_words = POSITIVE_WORDS
        self.negative_words = NEGATIVE_WORDS

    def analyze(self, text: str) -> dict:
        text_lower = text.lower()
        words = re.findall(r'\b\w+\b', text_lower)
        pos_count = sum(1 for w in words if w in self.positive_words)
        neg_count = sum(1 for w in words if w in self.negative_words)
        total = len(words) if words else 1

        score = (pos_count - neg_count) / max(total, 1)

        if score > 0.05:
            label = 'positive'
        elif score < -0.05:
            label = 'negative'
        else:
            label = 'neutral'

        return {
            'sentiment': label,
            'score': round(score, 4),
            'positive_words': pos_count,
            'negative_words': neg_count,
        }
