import logging
from datetime import datetime, timezone
from typing import Any

import httpx
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession

from app.core.database import get_db
from app.models.entities import Interaction, Lead
from app.services.ai_agent import generate_reply
from app.services.channels.whatsapp_evolution import EvolutionWhatsApp, normalize_message

logger = logging.getLogger(__name__)
router = APIRouter(prefix="/whatsapp", tags=["whatsapp"])


@router.post("/webhook")
async def receive_webhook(
    payload: dict[str, Any], session: AsyncSession = Depends(get_db)
) -> dict[str, str]:
    event = payload.get("event", "").lower()
    if event and event not in {"messages.upsert", "messages_upsert"}:
        return {"status": "ignored"}
    normalized = normalize_message(payload)
    if not normalized:
        return {"status": "ignored"}
    external_id = normalized["external_id"]
    if external_id and await session.scalar(
        select(Interaction.id).where(Interaction.external_id == external_id)
    ):
        return {"status": "duplicate"}

    lead = await session.scalar(select(Lead).where(Lead.phone == normalized["phone"]))
    if lead is None:
        lead = Lead(phone=normalized["phone"], name=normalized["name"], source="whatsapp")
        session.add(lead)
        await session.flush()
    elif lead.name == "Novo contato" or not lead.name:
        lead.name = normalized["name"]
    lead.last_interaction_at = datetime.now(timezone.utc)
    session.add(
        Interaction(
            lead_id=lead.id, channel="whatsapp", direction="inbound",
            content=normalized["content"], external_id=external_id,
        )
    )
    await session.flush()
    history = list(
        (
            await session.scalars(
                select(Interaction)
                .where(Interaction.lead_id == lead.id)
                .order_by(Interaction.created_at.desc())
                .limit(12)
            )
        ).all()
    )
    history.reverse()
    try:
        reply = await generate_reply(lead, history)
        result = await EvolutionWhatsApp().send_message(lead.phone, reply)
    except (httpx.HTTPError, RuntimeError, ValueError):
        await session.commit()
        logger.exception("WhatsApp message was stored, but automated reply failed")
        return {"status": "stored_reply_failed"}
    session.add(
        Interaction(
            lead_id=lead.id, channel="whatsapp", direction="outbound", content=reply,
            automated=True,
            external_id=(result.get("key") or {}).get("id"),
        )
    )
    lead.last_interaction_at = datetime.now(timezone.utc)
    await session.commit()
    return {"status": "processed"}


@router.get("/connection")
async def connection_state() -> dict:
    try:
        return await EvolutionWhatsApp().connection_state()
    except (httpx.HTTPError, ValueError) as exc:
        logger.exception("Could not read Evolution API connection state")
        raise HTTPException(status_code=502, detail="Could not reach Evolution API") from exc


@router.post("/connect")
async def connect_whatsapp() -> dict:
    try:
        evolution = EvolutionWhatsApp()
        result = await evolution.connect()
        await evolution.set_webhook(evolution.settings.whatsapp_webhook_url)
        return result
    except (httpx.HTTPError, ValueError) as exc:
        logger.exception("Could not request WhatsApp QR code")
        raise HTTPException(status_code=502, detail="Could not request WhatsApp QR code") from exc
