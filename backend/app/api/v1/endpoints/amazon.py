import logging
from typing import Any

from fastapi import APIRouter, Request

from app.services.channels.amazon_connector import AmazonConnector

logger = logging.getLogger(__name__)
router = APIRouter(prefix="/amazon", tags=["amazon"])


@router.post("/webhook")
async def amazon_webhook(payload: dict[str, Any]) -> dict[str, Any]:
    return await AmazonConnector().handle_webhook(payload)


@router.get("/webhook")
async def amazon_verification(request: Request) -> dict[str, str]:
    logger.info("Amazon verification ping received")
    challenge = request.query_params.get("challenge")
    if challenge:
        return {"challenge": challenge}
    return {"status": "ok"}
