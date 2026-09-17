import os
from pathlib import Path
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker

BASE_DIR = Path(__file__).resolve().parent.parent.parent
DATA_DIR = BASE_DIR / "data"
DATABASE_PATH = DATA_DIR / "analyses.db"
MODELS_DIR = BASE_DIR / "models"


def get_db_path() -> str:
    DATA_DIR.mkdir(parents=True, exist_ok=True)
    return str(DATABASE_PATH)


def get_models_dir() -> str:
    MODELS_DIR.mkdir(parents=True, exist_ok=True)
    return str(MODELS_DIR)


DATABASE_URL = f"sqlite:///{get_db_path()}"
engine = create_engine(DATABASE_URL, connect_args={"check_same_thread": False})
SessionLocal = sessionmaker(bind=engine)
