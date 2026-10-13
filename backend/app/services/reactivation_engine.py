from datetime import datetime, timedelta, timezone

from sqlalchemy import exists, select
from sqlalchemy.ext.asyncio import AsyncSession

from app.core.config import get_settings
from app.models.entities import Interaction, Lead, Order
from app.services.channels.whatsapp_evolution import EvolutionWhatsApp


async def reactivate_inactive_leads(session: AsyncSession) -> int:
    settings = get_settings()
    cutoff = datetime.now(timezone.utc) - timedelta(days=settings.reactivation_days)
    leads = (
        await session.scalars(
            select(Lead).where(
                Lead.status.notin_(("won", "lost")),
                Lead.last_interaction_at.is_not(None),
                Lead.last_interaction_at < cutoff,
                ~exists(select(Order.id).where(Order.lead_id == Lead.id)),
            )
        )
    ).all()
    whatsapp = EvolutionWhatsApp()
    sent = 0
    for lead in leads:
        message = settings.reactivation_message.format(name=lead.name)
        result = await whatsapp.send_message(lead.phone, message)
        now = datetime.now(timezone.utc)
        session.add(
            Interaction(
                lead_id=lead.id,
                channel="whatsapp",
                direction="outbound",
                content=message,
                external_id=(result.get("key") or {}).get("id"),
            )
        )
        lead.last_interaction_at = now
        lead.reactivated_at = now
        await session.commit()
        sent += 1
    return sent
