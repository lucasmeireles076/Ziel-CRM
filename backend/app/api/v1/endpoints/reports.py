from datetime import datetime, timedelta, timezone

from fastapi import APIRouter, Depends
from sqlalchemy import func, select
from sqlalchemy.ext.asyncio import AsyncSession

from app.core.database import get_db
from app.models.entities import Interaction, Lead

router = APIRouter(prefix="/reports", tags=["reports"])


@router.get("")
async def get_reports(session: AsyncSession = Depends(get_db)) -> dict:
    today = datetime.now(timezone.utc).date()
    since = datetime.now(timezone.utc) - timedelta(days=6)
    messages_today = await session.scalar(
        select(func.count(Interaction.id)).where(func.date(Interaction.created_at) == today)
    )
    outbound_messages = await session.scalar(
        select(func.count(Interaction.id)).where(
            Interaction.direction == "outbound", Interaction.automated.is_(True)
        )
    ) or 0
    inbound_messages = await session.scalar(
        select(func.count(Interaction.id)).where(Interaction.direction == "inbound")
    ) or 0
    new_leads = await session.scalar(select(func.count(Lead.id)).where(Lead.created_at >= since)) or 0
    won_leads = await session.scalar(select(func.count(Lead.id)).where(Lead.status == "won")) or 0
    lead_count = await session.scalar(select(func.count(Lead.id))) or 0
    reactivated = await session.scalar(
        select(func.count(Lead.id)).where(Lead.reactivated_at >= since)
    ) or 0
    daily = await session.execute(
        select(func.date(Interaction.created_at), func.count(Interaction.id))
        .where(Interaction.created_at >= since)
        .group_by(func.date(Interaction.created_at))
        .order_by(func.date(Interaction.created_at))
    )
    return {
        "messages_today": messages_today or 0,
        "ai_response_rate": min(round(outbound_messages / inbound_messages * 100), 100)
        if inbound_messages
        else 0,
        "reactivated_contacts": reactivated,
        "new_leads_7d": new_leads,
        "conversion_rate": round(won_leads / lead_count * 100) if lead_count else 0,
        "messages_by_day": [{"date": str(day), "count": count} for day, count in daily.all()],
    }
