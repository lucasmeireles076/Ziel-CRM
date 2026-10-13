import logging
from typing import Any

from fastapi import APIRouter, Request
from fastapi.responses import PlainTextResponse

from app.services.channels.meli_connector import MercadoLivreConnector

logger = logging.getLogger(__name__)
router = APIRouter(prefix="/meli", tags=["mercado-livre"])


@router.post("/webhook")
async def meli_webhook(payload: dict[str, Any]) -> dict[str, Any]:
    return await MercadoLivreConnector().handle_webhook(payload)


@router.get("/webhook")
async def meli_verification(request: Request) -> Any:
    logger.info("Mercado Livre verification ping received")
    challenge = request.query_params.get("hub.challenge")
    if challenge:
        return PlainTextResponse(challenge)
    return {"status": "ok"}
