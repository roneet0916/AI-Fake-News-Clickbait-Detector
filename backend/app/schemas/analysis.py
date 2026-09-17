from datetime import datetime
from typing import Optional

from pydantic import BaseModel


class AnalysisRequest(BaseModel):
    title: str
    text: str
    category: Optional[str] = None


class AnalysisResponse(BaseModel):
    id: int
    title: str
    created_at: str
    status: str
    fake_news: dict
    clickbait: dict
    sentiment: dict
    category: dict
    explanation: str
    summary: str
