import logging
from typing import Any

from app.core.config import get_settings
from app.services.channels.base import BaseChannelConnector

logger = logging.getLogger(__name__)


class MercadoLivreConnector(BaseChannelConnector):
    async def authenticate(self) -> bool:
        return get_settings().meli_enabled

    async def handle_webhook(self, payload: dict[str, Any]) -> dict[str, Any]:
        if not await self.authenticate():
            logger.info("Mercado Livre webhook received while integration is disabled")
            return {"status": "disabled"}
        logger.info("Mercado Livre webhook received for deferred integration")
        return {"status": "accepted"}

    async def send_message(self, recipient: str, message: str) -> dict[str, Any]:
        if not await self.authenticate():
            raise RuntimeError("Mercado Livre integration is disabled")
        raise NotImplementedError("Configure Mercado Livre OAuth before sending messages")
