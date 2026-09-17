class CategoryClassifier:
    CATEGORY_KEYWORDS = {
        'technology': {
            'computer', 'software', 'digital', 'internet', 'phone',
            'app', 'tech', 'data', 'ai', 'algorithm', 'cyber',
            'mobile', 'browser', 'cloud', 'device', 'program',
            'code', 'engineering', 'silicon', 'robot', 'virtual',
        },
        'sports': {
            'game', 'team', 'player', 'score', 'match', 'football',
            'basketball', 'soccer', 'tennis', 'championship', 'league',
            'athlete', 'coach', 'season', 'win', 'tournament',
            'running', 'swimming', 'baseball', 'hockey', 'olympic',
        },
        'business': {
            'market', 'stock', 'trade', 'company', 'profit',
            'revenue', 'economy', 'bank', 'invest', 'money',
            'financial', 'corporate', 'industry', 'business',
            'entrepreneur', 'startup', 'billion', 'million',
            'merger', 'acquisition', 'dividend', 'forecast',
        },
        'health': {
            'health', 'medical', 'doctor', 'disease', 'treatment',
            'patient', 'drug', 'hospital', 'therapy', 'mental',
            'vaccine', 'virus', 'bacteria', 'symptom', 'diagnosis',
            'wellness', 'fitness', 'nutrition', 'cancer', 'heart',
        },
        'science': {
            'research', 'study', 'scientist', 'experiment', 'discovery',
            'physics', 'chemistry', 'biology', 'astronomy', 'evolution',
            'climate', 'space', 'planet', 'energy', 'nuclear',
            'laboratory', 'observation', 'theory', 'evidence',
        },
        'entertainment': {
            'movie', 'film', 'music', 'celebrity', 'hollywood',
            'concert', 'show', 'artist', 'album', 'song',
            'actor', 'actress', 'director', 'festival', 'award',
            'series', 'streaming', 'theater', 'performance',
        },
        'world': {
            'world', 'international', 'global', 'country', 'nation',
            'foreign', 'diplomacy', 'summit', 'treaty', 'refugee',
            'conflict', 'war', 'peace', 'united', 'europe', 'asia',
        },
        'politics': {
            'government', 'president', 'election', 'vote', 'party',
            'congress', 'senate', 'policy', 'law', 'senator',
            'representative', 'democrat', 'republican', 'campaign',
            'ballot', 'democracy', 'bill', 'legislation', 'speech',
        },
    }

    def __init__(self):
        self.category_keywords = self.CATEGORY_KEYWORDS

    def classify(self, text: str) -> dict:
        text_lower = text.lower()
        scores = {}
        for category, keywords in self.category_keywords.items():
            count = sum(1 for kw in keywords if kw in text_lower)
            scores[category] = count

        best_category = max(scores, key=scores.get)
        best_score = scores[best_category]

        if best_score == 0:
            return {
                'category': 'other',
                'confidence': 0.0,
                'method': 'keyword matching',
            }

        total = sum(scores.values())
        confidence = best_score / total if total > 0 else 0.0

        return {
            'category': best_category,
            'confidence': round(confidence, 4),
            'method': 'keyword matching',
            'scores': {k: v for k, v in scores.items() if v > 0},
        }
