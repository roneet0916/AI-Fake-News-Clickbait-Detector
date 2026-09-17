"""AI NewsGuard - Configuration"""
import os

BACKEND_PORT = int(os.environ.get("BACKEND_PORT", "8000"))
FRONTEND_PORT = int(os.environ.get("FRONTEND_PORT", "3000"))
DATABASE_PATH = os.environ.get("DATABASE_PATH", "backend/data/analyses.db")
MODELS_DIR = os.environ.get("MODELS_DIR", "backend/models/")
MAX_TEXT_LENGTH = int(os.environ.get("MAX_TEXT_LENGTH", str(10000)))
MIN_TEXT_LENGTH = int(os.environ.get("MIN_TEXT_LENGTH", "10"))


class Settings:
    backend_port: int = BACKEND_PORT
    database_path: str = DATABASE_PATH
    models_dir: str = MODELS_DIR
    max_text_length: int = MAX_TEXT_LENGTH
    min_text_length: int = MIN_TEXT_LENGTH


settings = Settings()
