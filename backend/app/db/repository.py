import sqlite3
from typing import Optional, List
from datetime import datetime
from sqlalchemy import create_engine
from .database import get_db_path, engine, SessionLocal
from .models import AnalysisHistory, Base


def init_db():
    Base.metadata.create_all(engine)


def get_connection():
    conn = sqlite3.connect(get_db_path(), timeout=30)
    conn.row_factory = sqlite3.Row
    conn.execute("PRAGMA journal_mode=WAL")
    return conn


def save_analysis(
    title: str,
    article_preview: str,
    fake_probability: float,
    predicted_label: str,
    clickbait_probability: float,
    clickbait_label: str,
    sentiment: str,
    category: str,
    analysis_summary: str,
) -> int:
    conn = get_connection()
    try:
        cursor = conn.cursor()
        cursor.execute(
            """INSERT INTO analysis_history
            (created_at, title, article_preview, fake_probability, predicted_label,
             clickbait_probability, clickbait_label, sentiment, category, analysis_summary)
            VALUES (datetime('now'), ?, ?, ?, ?, ?, ?, ?, ?, ?)""",
            (title, article_preview, fake_probability, predicted_label,
             clickbait_probability, clickbait_label, sentiment, category, analysis_summary),
        )
        conn.commit()
        row_id = cursor.lastrowid
    finally:
        conn.close()
    return row_id


def get_history(limit: int = 50, offset: int = 0) -> List[dict]:
    conn = get_connection()
    try:
        cursor = conn.cursor()
        cursor.execute(
            "SELECT * FROM analysis_history ORDER BY created_at DESC LIMIT ? OFFSET ?",
            (limit, offset),
        )
        rows = cursor.fetchall()
        return [dict(r) for r in rows]
    finally:
        conn.close()


def get_history_by_id(record_id: int) -> Optional[dict]:
    conn = get_connection()
    try:
        cursor = conn.cursor()
        cursor.execute("SELECT * FROM analysis_history WHERE id = ?", (record_id,))
        row = cursor.fetchone()
        if row is None:
            return None
        return dict(row)
    finally:
        conn.close()


def delete_history_by_id(record_id: int) -> bool:
    conn = get_connection()
    try:
        cursor = conn.cursor()
        cursor.execute("DELETE FROM analysis_history WHERE id = ?", (record_id,))
        conn.commit()
        deleted = cursor.rowcount > 0
        return deleted
    finally:
        conn.close()


def clear_history() -> int:
    conn = get_connection()
    try:
        cursor = conn.cursor()
        cursor.execute("DELETE FROM analysis_history")
        conn.commit()
        count = cursor.rowcount
        return count
    finally:
        conn.close()


def search_history(query: str, limit: int = 20) -> List[dict]:
    conn = get_connection()
    try:
        cursor = conn.cursor()
        cursor.execute(
            "SELECT * FROM analysis_history WHERE title LIKE ? OR article_preview LIKE ? ORDER BY created_at DESC LIMIT ?",
            (f"%{query}%", f"%{query}%", limit),
        )
        rows = cursor.fetchall()
        return [dict(r) for r in rows]
    finally:
        conn.close()
