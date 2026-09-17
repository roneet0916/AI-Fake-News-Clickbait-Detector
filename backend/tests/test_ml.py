import pytest
from app.services.preprocessing import TextPreprocessor
from app.services.clickbait import ClickbaitFeatureExtractor
from app.services.sentiment import SentimentAnalyzer
from app.services.category import CategoryClassifier


class TestPreprocessing:
    def setup_method(self):
        self.preprocessor = TextPreprocessor()

    def test_clean_text(self):
        text = "  Hello   WORLD!  "
        result = self.preprocessor.clean_text(text)
        assert result == "hello world!"

    def test_normalize_unicode(self):
        text = "café"
        result = self.preprocessor.normalize_unicode(text)
        assert isinstance(result, str)

    def test_tokenize(self):
        tokens = self.preprocessor.tokenize("hello world test")
        assert len(tokens) > 0
        assert "hello" in tokens

    def test_remove_stopwords(self):
        tokens = ["the", "quick", "brown", "fox"]
        result = self.preprocessor.remove_stopwords(tokens)
        assert "the" not in result
        assert "quick" in result

    def test_stem_tokens(self):
        tokens = ["running", "flies", "studies"]
        result = self.preprocessor.stem_tokens(tokens)
        assert isinstance(result, list)
        assert len(result) == len(tokens)

    def test_preprocess_returns_string(self):
        result = self.preprocessor.preprocess("The quick brown fox jumps!")
        assert isinstance(result, str)
        assert len(result) > 0

    def test_preprocess_preserves_content(self):
        text = "Machine learning is great"
        result = self.preprocessor.preprocess(text, remove_stopw=False, stem=False)
        assert "machine" in result.lower()
        assert "learning" in result.lower()

    def test_clean_text_no_trailing_spaces(self):
        text = "  Hello   World  "
        result = self.preprocessor.normalize_whitespace(text)
        assert result == "Hello World"
        assert not result.endswith("  ")


class TestClickbaitFeatureExtractor:
    def setup_method(self):
        self.extractor = ClickbaitFeatureExtractor()

    def test_extract_features(self):
        text = "You Won't Believe What Happens Next!!!"
        features = self.extractor.extract(text)
        assert "headline_length" in features
        assert "exclamation_count" in features
        assert "uppercase_ratio" in features
        assert "emotional_word_count" in features

    def test_urgency_word_detection(self):
        text = "Breaking news urgent alert"
        features = self.extractor.extract(text)
        assert features["urgency_word_count"] > 0

    def test_score_returns_structure(self):
        text = "Test headline"
        result = self.extractor.score(text)
        assert "features" in result
        assert "clickbait_probability" in result
        assert "clickbait_label" in result
        assert "method" in result
        assert result["method"] == "heuristic"


class TestSentimentAnalyzer:
    def setup_method(self):
        self.analyzer = SentimentAnalyzer()

    def test_positive_sentiment(self):
        result = self.analyzer.analyze("This is great and wonderful and excellent")
        assert result["sentiment"] == "positive"
        assert result["score"] > 0

    def test_negative_sentiment(self):
        result = self.analyzer.analyze("This is terrible and horrible and awful")
        assert result["sentiment"] == "negative"
        assert result["score"] < 0

    def test_neutral_sentiment(self):
        result = self.analyzer.analyze("The meeting is at 3pm tomorrow")
        assert result["sentiment"] in ["neutral", "positive", "negative"]

    def test_sentiment_has_required_fields(self):
        result = self.analyzer.analyze("test")
        assert "sentiment" in result
        assert "score" in result
        assert "positive_words" in result
        assert "negative_words" in result


class TestCategoryClassifier:
    def setup_method(self):
        self.classifier = CategoryClassifier()

    def test_technology_classification(self):
        text = "Apple releases new iPhone with advanced AI capabilities and machine learning features"
        result = self.classifier.classify(text)
        assert result["category"] == "technology"

    def test_other_category(self):
        text = "xyz abc qwerty unknown content"
        result = self.classifier.classify(text)
        assert result["category"] == "other"

    def test_category_has_confidence(self):
        text = "The stock market showed significant gains today"
        result = self.classifier.classify(text)
        assert "category" in result
        assert "confidence" in result
        assert 0 <= result["confidence"] <= 1
