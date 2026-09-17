"""AI NewsGuard — FastAPI Application Entry Point"""

from contextlib import asynccontextmanager
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.api.routes_health import router as health_router
from app.api.routes_models import router as models_router
from app.api.routes_evaluation import router as evaluation_router
from app.db.repository import init_db


@asynccontextmanager
async def lifespan(app: FastAPI):
    """Startup and shutdown events."""
    # Startup: initialize database tables
    init_db()
    yield
    # Shutdown: cleanup if needed


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

# Mount routers
app.include_router(health_router, prefix="/api", tags=["Health"])
app.include_router(models_router, prefix="/api", tags=["Models"])
app.include_router(evaluation_router, prefix="/api", tags=["Evaluation"])


@app.get("/", tags=["Root"])
async def root():
    return {
        "service": "AI NewsGuard",
        "version": "0.1.0",
        "docs": "/docs",
    }
