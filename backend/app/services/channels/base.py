from abc import ABC, abstractmethod
from typing import Any


class BaseChannelConnector(ABC):
    @abstractmethod
    async def authenticate(self) -> bool:
        raise NotImplementedError

    @abstractmethod
    async def handle_webhook(self, payload: dict[str, Any]) -> dict[str, Any]:
        raise NotImplementedError

    @abstractmethod
    async def send_message(self, recipient: str, message: str) -> dict[str, Any]:
        raise NotImplementedError
