"""AI NewsGuard — FastAPI Application Entry Point"""

import logging
from contextlib import asynccontextmanager
from pathlib import Path

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.api.routes_health import router as health_router
from app.api.routes_analyze import router as analyze_router
from app.api.routes_history import router as history_router
from app.api.routes_models import router as models_router
from app.api.routes_evaluation import router as evaluation_router
from app.db.repository import init_db

logger = logging.getLogger("ai_newsguard")
logging.basicConfig(level=logging.INFO)

MODELS_DIR = Path(__file__).resolve().parent.parent / "models"


def _load_models():
    """Load saved ML models at startup (if available)."""
    try:
        import joblib
        model_path = MODELS_DIR / "fake_news_model.joblib"
        vectorizer_path = MODELS_DIR / "tfidf_vectorizer.joblib"

        if model_path.exists() and vectorizer_path.exists():
            model = joblib.load(model_path)
            vectorizer = joblib.load(vectorizer_path)

            # Determine model name from metadata
            model_name = type(model).__name__

            from app.services.analysis_service import set_fake_news_model
            set_fake_news_model(model, vectorizer, model_name)
            logger.info(f"Loaded fake news model: {model_name}")
        else:
            logger.warning(
                "No fake news model found. Train with: python -m app.ml.train_fake_news"
            )
    except Exception as e:
        logger.error(f"Failed to load models: {e}")


@asynccontextmanager
async def lifespan(app: FastAPI):
    """Startup and shutdown events."""
    # Startup
    init_db()
    logger.info("Database initialized.")
    _load_models()
    logger.info("AI NewsGuard backend ready.")
    yield
    # Shutdown
    logger.info("AI NewsGuard backend shutting down.")


app = FastAPI(
    title="AI NewsGuard",
    description="Fake News & Clickbait Analysis System — AI/ML powered news analysis API",
    version="0.1.0",
    lifespan=lifespan,
)

# CORS — allow frontend to communicate with backend
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:3000",
        "http://127.0.0.1:3000",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Mount API routers
app.include_router(health_router, prefix="/api", tags=["Health"])
app.include_router(analyze_router, prefix="/api", tags=["Analysis"])
app.include_router(history_router, prefix="/api", tags=["History"])
app.include_router(models_router, prefix="/api", tags=["Models"])
app.include_router(evaluation_router, prefix="/api", tags=["Evaluation"])


@app.get("/", tags=["Root"])
async def root():
    return {
        "service": "AI NewsGuard",
        "version": "0.1.0",
        "status": "running",
        "docs": "/docs",
    }
