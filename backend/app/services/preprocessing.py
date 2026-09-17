import re
import unicodedata
import nltk
from nltk.corpus import stopwords
from nltk.stem import PorterStemmer
from typing import Optional

nltk.download("punkt_tab", quiet=True)
nltk.download("stopwords", quiet=True)
nltk.download("wordnet", quiet=True)


class TextPreprocessor:
    def __init__(self):
        self.stemmer = PorterStemmer()
        try:
            self.stop_words = set(stopwords.words('english'))
        except Exception:
            self.stop_words = set()

    def normalize_unicode(self, text: str) -> str:
        return unicodedata.normalize('NFKD', text)

    def lowercase(self, text: str) -> str:
        return text.lower()

    def normalize_whitespace(self, text: str) -> str:
        return re.sub(r'\s+', ' ', text).strip()

    def clean_text(self, text: str) -> str:
        text = self.normalize_unicode(text)
        text = self.lowercase(text)
        text = self.normalize_whitespace(text)
        return text

    def tokenize(self, text: str) -> list[str]:
        return nltk.word_tokenize(text)

    def remove_stopwords(self, tokens: list[str]) -> list[str]:
        return [t for t in tokens if t not in self.stop_words]

    def stem_tokens(self, tokens: list[str]) -> list[str]:
        return [self.stemmer.stem(t) for t in tokens]

    def preprocess(self, text: str, remove_stopw: bool = True, stem: bool = False) -> str:
        text = self.clean_text(text)
        tokens = self.tokenize(text)
        if remove_stopw:
            tokens = self.remove_stopwords(tokens)
        if stem:
            tokens = self.stem_tokens(tokens)
        return ' '.join(tokens)
