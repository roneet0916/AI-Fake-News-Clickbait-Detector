"""History API routes — GET/DELETE /api/history"""

from fastapi import APIRouter, HTTPException, Query
from typing import Optional

from app.db.repository import (
    get_history,
    get_history_by_id,
    delete_history_by_id,
    search_history,
)

router = APIRouter(prefix="/history")


@router.get("")
async def list_history(
    limit: int = Query(default=50, ge=1, le=200, description="Max records to return"),
    offset: int = Query(default=0, ge=0, description="Offset for pagination"),
    search: Optional[str] = Query(default=None, description="Search query"),
):
    """List analysis history, optionally filtered by search query."""
    if search:
        entries = search_history(query=search, limit=limit)
    else:
        entries = get_history(limit=limit, offset=offset)

    return {
        "total": len(entries),
        "entries": entries,
    }


@router.get("/{record_id}")
async def get_history_record(record_id: int):
    """Get a specific analysis history record by ID."""
    record = get_history_by_id(record_id)
    if record is None:
        raise HTTPException(status_code=404, detail="Analysis record not found.")
    return record


@router.delete("/{record_id}")
async def delete_history_record(record_id: int):
    """Delete a specific analysis history record."""
    deleted = delete_history_by_id(record_id)
    if not deleted:
        raise HTTPException(status_code=404, detail="Analysis record not found.")
    return {"message": "Record deleted successfully.", "id": record_id}
