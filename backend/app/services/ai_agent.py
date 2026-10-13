import logging

import httpx

from app.core.config import get_settings
from app.models.entities import Interaction, Lead

logger = logging.getLogger(__name__)


async def generate_reply(lead: Lead, history: list[Interaction]) -> str:
    settings = get_settings()
    transcript = "\n".join(
        f"{'Cliente' if item.direction == 'inbound' else 'Assistente'}: {item.content}"
        for item in history[-12:]
    )
    prompt = (
        "Você é um assistente consultivo amigável, direto e focado em ajudar o cliente. "
        "Responda em português brasileiro. Nunca invente preços, disponibilidade, prazos ou políticas; "
        "quando não souber, diga que vai confirmar com um vendedor. "
        f"Cliente: {lead.name}\nHistórico:\n{transcript}\n"
        "Escreva somente a próxima mensagem, de forma concisa."
    )
    try:
        async with httpx.AsyncClient(timeout=90) as client:
            response = await client.post(
                f"{settings.ollama_url.rstrip('/')}/api/generate",
                json={"model": settings.ollama_model, "prompt": prompt, "stream": False},
            )
            response.raise_for_status()
            answer = response.json().get("response", "").strip()
            if answer:
                return answer
            raise RuntimeError("Ollama returned an empty response")
    except (httpx.HTTPError, ValueError) as exc:
        logger.exception("Could not generate WhatsApp reply with Ollama")
        raise RuntimeError("AI response generation failed") from exc
