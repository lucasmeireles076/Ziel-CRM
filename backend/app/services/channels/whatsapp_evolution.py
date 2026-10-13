import logging
from typing import Any

import httpx

from app.core.config import get_settings

logger = logging.getLogger(__name__)


class EvolutionWhatsApp:
    def __init__(self) -> None:
        self.settings = get_settings()
        self.base_url = self.settings.evolution_api_url.rstrip("/")
        self.headers = {"apikey": self.settings.evolution_api_key}

    async def _request(self, method: str, path: str, **kwargs: Any) -> dict[str, Any]:
        async with httpx.AsyncClient(timeout=20) as client:
            response = await client.request(method, f"{self.base_url}{path}", headers=self.headers, **kwargs)
            response.raise_for_status()
            if not response.content:
                return {}
            return response.json()

    async def send_message(self, recipient: str, message: str) -> dict[str, Any]:
        return await self._request(
            "POST",
            f"/message/sendText/{self.settings.evolution_instance}",
            json={"number": recipient, "text": message},
        )

    async def connection_state(self) -> dict[str, Any]:
        return await self._request("GET", f"/instance/connectionState/{self.settings.evolution_instance}")

    async def connect(self) -> dict[str, Any]:
        try:
            return await self._request(
                "POST",
                "/instance/create",
                json={
                    "instanceName": self.settings.evolution_instance,
                    "integration": "WHATSAPP-BAILEYS",
                    "qrcode": True,
                },
            )
        except httpx.HTTPStatusError as exc:
            if exc.response.status_code != 409 and "already exists" not in exc.response.text.lower():
                raise
        return await self._request("GET", f"/instance/connect/{self.settings.evolution_instance}")

    async def set_webhook(self, webhook_url: str) -> dict[str, Any]:
        return await self._request(
            "POST",
            f"/webhook/set/{self.settings.evolution_instance}",
            json={"webhook": {"enabled": True, "url": webhook_url, "events": ["MESSAGES_UPSERT"]}},
        )


def normalize_message(payload: dict[str, Any]) -> dict[str, Any] | None:
    data = payload.get("data") or {}
    key = data.get("key") or {}
    message = data.get("message") or {}
    if key.get("fromMe"):
        return None
    remote_jid = key.get("remoteJid") or ""
    if not remote_jid or remote_jid.endswith("@g.us") or remote_jid.endswith("@broadcast"):
        return None
    content = (
        (message.get("conversation") or "")
        or ((message.get("extendedTextMessage") or {}).get("text") or "")
        or ((message.get("imageMessage") or {}).get("caption") or "")
        or ((message.get("videoMessage") or {}).get("caption") or "")
    ).strip()
    if not content:
        logger.info("Ignoring WhatsApp webhook without supported text content")
        return None
    return {
        "phone": remote_jid.split("@", 1)[0].split(":", 1)[0],
        "name": data.get("pushName") or "Contato WhatsApp",
        "content": content,
        "external_id": key.get("id"),
    }
