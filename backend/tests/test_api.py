import pytest
from app.db.repository import (
    save_analysis,
    get_history,
    get_history_by_id,
    delete_history_by_id,
    clear_history,
    init_db,
)


@pytest.fixture(autouse=True)
def clean_db():
    """Ensure DB is clean between tests."""
    from app.db.repository import init_db, clear_history
    init_db()
    import time
    time.sleep(0.1)
    clear_history()
    yield
    time.sleep(0.1)
    clear_history()


class TestHealthEndpoint:
    def test_health_returns_status(self):
        from app.api.routes_health import router
        assert router is not None
        assert hasattr(router, 'routes')


class TestAnalysisFlow:
    def test_save_and_retrieve_analysis(self):
        """Should save and retrieve an analysis record."""
        record_id = save_analysis(
            title="Test Headline",
            article_preview="This is a test article",
            fake_probability=0.3,
            predicted_label="real",
            clickbait_probability=0.2,
            clickbait_label="not_clickbait",
            sentiment="neutral",
            category="technology",
            analysis_summary="Test analysis result",
        )
        assert record_id > 0

        record = get_history_by_id(record_id)
        assert record is not None
        assert record["title"] == "Test Headline"
        assert record["fake_probability"] == 0.3

    def test_get_history_empty(self):
        """History should be empty initially."""
        history = get_history()
        assert len(history) == 0

    def test_get_history_with_records(self):
        """History should return saved records."""
        save_analysis(
            title="Test 1", article_preview="Article 1",
            fake_probability=0.3, predicted_label="real",
            clickbait_probability=0.2, clickbait_label="not_clickbait",
            sentiment="neutral", category="other",
            analysis_summary="Test",
        )
        save_analysis(
            title="Test 2", article_preview="Article 2",
            fake_probability=0.8, predicted_label="fake",
            clickbait_probability=0.9, clickbait_label="clickbait",
            sentiment="negative", category="world",
            analysis_summary="Test",
        )
        history = get_history()
        assert len(history) == 2

    def test_delete_analysis(self):
        """Should delete an analysis record."""
        record_id = save_analysis(
            title="To Delete", article_preview="Article",
            fake_probability=0.5, predicted_label="real",
            clickbait_probability=0.5, clickbait_label="not_clickbait",
            sentiment="neutral", category="other",
            analysis_summary="Test",
        )
        deleted = delete_history_by_id(record_id)
        assert deleted is True

        record = get_history_by_id(record_id)
        assert record is None

    def test_delete_nonexistent(self):
        """Deleting non-existent record should return False."""
        deleted = delete_history_by_id(99999)
        assert deleted is False


class TestAnalysisValidation:
    def test_minimum_length_check(self):
        from app.config import settings
        assert settings.min_text_length >= 5

    def test_max_length_check(self):
        from app.config import settings
        assert settings.max_text_length > 1000

    def test_settings_instance(self):
        from app.config import settings
        assert isinstance(settings.backend_port, int)
