"""Analysis API route — POST /api/analyze"""

from fastapi import APIRouter, HTTPException
from pydantic import BaseModel, Field

from app.services.analysis_service import analyze_text
from app.config import settings

router = APIRouter()


class AnalyzeRequest(BaseModel):
    """Request body for the analyze endpoint."""
    title: str = Field(
        ...,
        min_length=3,
        max_length=500,
        description="News headline or title",
        examples=["Scientists Discover New Species in Deep Ocean"],
    )
    text: str = Field(
        default="",
        max_length=10000,
        description="Full article text (optional — headline-only analysis is supported)",
    )


class AnalyzeResponse(BaseModel):
    """Response from the analyze endpoint."""
    id: int
    title: str
    created_at: str
    status: str
    fake_news: dict
    clickbait: dict
    sentiment: dict
    category: dict
    explanation: dict
    summary: str


@router.post("/analyze", response_model=AnalyzeResponse)
async def analyze_news(request: AnalyzeRequest):
    """
    Analyze a news headline/article for fake news, clickbait,
    sentiment, and category classification.
    
    Returns structured analysis with explainable indicators.
    """
    # Additional validation
    combined = f"{request.title} {request.text}".strip()
    if len(combined) < settings.min_text_length:
        raise HTTPException(
            status_code=422,
            detail=f"Input text is too short. Minimum {settings.min_text_length} characters required.",
        )

    try:
        result = analyze_text(title=request.title, text=request.text)
        return result
    except Exception as e:
        raise HTTPException(
            status_code=500,
            detail="Analysis failed. Please try again later.",
        )
