from datetime import datetime
from typing import Optional
from sqlalchemy import Column, Integer, String, Float, Text, DateTime
from sqlalchemy.orm import declarative_base

Base = declarative_base()


class AnalysisHistory(Base):
    __tablename__ = "analysis_history"

    id = Column(Integer, primary_key=True, autoincrement=True)
    created_at = Column(DateTime, default=datetime.utcnow, nullable=False)
    title = Column(String(500), nullable=False)
    article_preview = Column(Text, nullable=True)
    fake_probability = Column(Float, nullable=False, default=0.0)
    predicted_label = Column(String(50), nullable=False, default="unknown")
    clickbait_probability = Column(Float, nullable=False, default=0.0)
    clickbait_label = Column(String(50), nullable=False, default="unknown")
    sentiment = Column(String(50), nullable=False, default="neutral")
    category = Column(String(100), nullable=False, default="other")
    analysis_summary = Column(Text, nullable=True)
