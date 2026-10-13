import logging
from typing import Any

from app.core.config import get_settings
from app.services.channels.base import BaseChannelConnector

logger = logging.getLogger(__name__)


class AmazonConnector(BaseChannelConnector):
    async def authenticate(self) -> bool:
        return get_settings().amazon_enabled

    async def handle_webhook(self, payload: dict[str, Any]) -> dict[str, Any]:
        if not await self.authenticate():
            logger.info("Amazon event received while integration is disabled")
            return {"status": "disabled"}
        logger.info("Amazon event received for deferred integration")
        return {"status": "accepted"}

    async def send_message(self, recipient: str, message: str) -> dict[str, Any]:
        if not await self.authenticate():
            raise RuntimeError("Amazon integration is disabled")
        raise NotImplementedError("Configure Amazon LWA/IAM before sending messages")
