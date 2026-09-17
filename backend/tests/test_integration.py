import pytest
import json
from pathlib import Path
import sys
import os

sys.path.insert(0, os.path.dirname(os.path.dirname(os.path.abspath(__file__))))


class TestConfig:
    def test_settings_creation(self):
        from app.config import settings
        assert settings.backend_port == 8000
        assert settings.max_text_length > 0


class TestModelLoading:
    def test_models_dir_config(self):
        from app.config import settings
        assert len(settings.models_dir) > 0


class TestAPIContracts:
    def test_analysis_request_schema(self):
        from app.schemas.analysis import AnalysisRequest
        data = AnalysisRequest(title="Test", text="Content here")
        assert data.title == "Test"
        assert data.text == "Content here"

    def test_analysis_request_optional_category(self):
        from app.schemas.analysis import AnalysisRequest
        data = AnalysisRequest(title="Test", text="Content", category="Tech")
        assert data.category == "Tech"

    def test_history_entry_schema(self):
        from app.schemas.history import HistoryEntry
        entry = HistoryEntry(
            id=1, created_at="2026-01-01T00:00:00", title="Test",
            article_preview="Preview", fake_probability=0.3,
            predicted_label="real", clickbait_probability=0.2,
            clickbait_label="not_clickbait", sentiment="neutral",
            category="other", analysis_summary="Test",
        )
        assert entry.id == 1


class TestDatabaseConnection:
    def test_get_db_path(self):
        from app.db.database import get_db_path
        path = get_db_path()
        assert path.endswith(".db")
        assert "data" in path

    def test_init_creates_tables(self):
        from app.db.repository import init_db
        init_db()

    def test_save_and_delete(self):
        from app.db.repository import (
            save_analysis, init_db, clear_history,
            get_history_by_id, delete_history_by_id,
        )
        init_db()
        clear_history()
        record_id = save_analysis(
            title="Test", article_preview="Test",
            fake_probability=0.5, predicted_label="real",
            clickbait_probability=0.5, clickbait_label="not_clickbait",
            sentiment="neutral", category="other",
            analysis_summary="Test",
        )
        assert record_id > 0
        record = get_history_by_id(record_id)
        assert record is not None
        assert record["title"] == "Test"
        deleted = delete_history_by_id(record_id)
        assert deleted is True
