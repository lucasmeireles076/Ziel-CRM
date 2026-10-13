import asyncio

from celery import Celery

from app.core.config import get_settings
from app.core.database import SessionLocal
from app.services.reactivation_engine import reactivate_inactive_leads

settings = get_settings()
celery_app = Celery("mini_crm", broker=settings.redis_url, backend=settings.redis_url)
celery_app.conf.beat_schedule = {
    "reactivate-inactive-leads-daily": {
        "task": "app.workers.celery_app.reactivate_inactive_leads_task",
        "schedule": 24 * 60 * 60,
    }
}
celery_app.conf.timezone = "UTC"


@celery_app.task(name="app.workers.celery_app.reactivate_inactive_leads_task")
def reactivate_inactive_leads_task() -> int:
    async def run() -> int:
        async with SessionLocal() as session:
            return await reactivate_inactive_leads(session)

    return asyncio.run(run())
