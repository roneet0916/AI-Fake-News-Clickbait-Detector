from pydantic import BaseModel


class HistoryEntry(BaseModel):
    id: int
    created_at: str
    title: str
    article_preview: str
    fake_probability: float
    predicted_label: str
    clickbait_probability: float
    clickbait_label: str
    sentiment: str
    category: str
    analysis_summary: str


class HistoryListResponse(BaseModel):
    total: int
    entries: list[HistoryEntry]
