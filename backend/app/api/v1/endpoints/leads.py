from datetime import datetime, timezone
import logging

import httpx
from fastapi import APIRouter, Depends, HTTPException, Query, status
from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession

from app.core.database import get_db
from app.models.entities import Interaction, Lead
from app.schemas.crm import InteractionRead, LeadCreate, LeadRead, LeadUpdate, SendMessage
from app.services.channels.whatsapp_evolution import EvolutionWhatsApp

router = APIRouter(prefix="/leads", tags=["leads"])
logger = logging.getLogger(__name__)


@router.get("", response_model=list[LeadRead])
async def list_leads(
    status_filter: str | None = Query(default=None, alias="status"),
    session: AsyncSession = Depends(get_db),
) -> list[Lead]:
    statement = select(Lead).order_by(Lead.created_at.desc())
    if status_filter:
        statement = statement.where(Lead.status == status_filter)
    return list((await session.scalars(statement)).all())


@router.post("", response_model=LeadRead, status_code=status.HTTP_201_CREATED)
async def create_lead(data: LeadCreate, session: AsyncSession = Depends(get_db)) -> Lead:
    existing = await session.scalar(select(Lead).where(Lead.phone == data.phone))
    if existing:
        raise HTTPException(status_code=409, detail="A lead with this phone already exists")
    lead = Lead(**data.model_dump(), source="manual")
    session.add(lead)
    await session.commit()
    await session.refresh(lead)
    return lead


@router.patch("/{lead_id}", response_model=LeadRead)
async def update_lead(
    lead_id: str, data: LeadUpdate, session: AsyncSession = Depends(get_db)
) -> Lead:
    lead = await session.get(Lead, lead_id)
    if not lead:
        raise HTTPException(status_code=404, detail="Lead not found")
    for key, value in data.model_dump(exclude_unset=True).items():
        setattr(lead, key, value)
    await session.commit()
    await session.refresh(lead)
    return lead


@router.get("/{lead_id}/interactions", response_model=list[InteractionRead])
async def get_interactions(lead_id: str, session: AsyncSession = Depends(get_db)) -> list[Interaction]:
    if not await session.get(Lead, lead_id):
        raise HTTPException(status_code=404, detail="Lead not found")
    result = await session.scalars(
        select(Interaction).where(Interaction.lead_id == lead_id).order_by(Interaction.created_at.asc())
    )
    return list(result.all())


@router.post("/{lead_id}/messages", response_model=InteractionRead, status_code=status.HTTP_201_CREATED)
async def send_message(
    lead_id: str, data: SendMessage, session: AsyncSession = Depends(get_db)
) -> Interaction:
    lead = await session.get(Lead, lead_id)
    if not lead:
        raise HTTPException(status_code=404, detail="Lead not found")
    try:
        result = await EvolutionWhatsApp().send_message(lead.phone, data.text)
    except (httpx.HTTPError, ValueError) as exc:
        logger.exception("WhatsApp message delivery failed")
        raise HTTPException(status_code=502, detail="WhatsApp message could not be sent") from exc
    interaction = Interaction(
        lead_id=lead.id, channel="whatsapp", direction="outbound", content=data.text,
        external_id=(result.get("key") or {}).get("id"),
    )
    session.add(interaction)
    lead.last_interaction_at = datetime.now(timezone.utc)
    await session.commit()
    await session.refresh(interaction)
    return interaction
