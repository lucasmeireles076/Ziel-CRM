from functools import lru_cache

from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    app_name: str = "Mini CRM"
    database_url: str = "postgresql+asyncpg://crm:crm@postgres:5432/crm"
    redis_url: str = "redis://redis:6379/0"
    cors_origins: str = "http://localhost:3000"
    evolution_api_url: str = "http://evolution-api:8080"
    evolution_api_key: str = ""
    evolution_instance: str = "crm"
    whatsapp_webhook_url: str = "http://api:8000/api/v1/whatsapp/webhook"
    ollama_url: str = "http://host.docker.internal:11434"
    ollama_model: str = "qwen2.5:7b"
    meli_enabled: bool = False
    amazon_enabled: bool = False
    reactivation_days: int = 15
    reactivation_message: str = (
        "Oi {name}! Faz um tempinho desde nossa última conversa. "
        "Posso ajudar você com alguma coisa?"
    )

    model_config = SettingsConfigDict(env_file=".env", case_sensitive=False, extra="ignore")

    @property
    def cors_origin_list(self) -> list[str]:
        return [origin.strip() for origin in self.cors_origins.split(",") if origin.strip()]


@lru_cache
def get_settings() -> Settings:
    return Settings()
