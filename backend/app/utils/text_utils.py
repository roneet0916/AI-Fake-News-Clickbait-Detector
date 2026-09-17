import re
from typing import Optional


def truncate_text(text: str, max_length: int = 200) -> str:
    if len(text) <= max_length:
        return text
    return text[:max_length].rsplit(' ', 1)[0] + '...'


def format_probability(probability: float) -> str:
    return f"{probability:.2%}"


def safe_str(value: Optional[str], default: str = "") -> str:
    return value if value else default


def truncate_label(label: str, max_length: int = 12) -> str:
    if len(label) <= max_length:
        return label
    return label[:max_length] + '...'


def clean_headline(text: str) -> str:
    return re.sub(r'<[^>]+>', '', text).strip()
