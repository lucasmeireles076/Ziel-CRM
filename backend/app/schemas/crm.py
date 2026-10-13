from datetime import datetime

from pydantic import BaseModel, ConfigDict, Field


class LeadCreate(BaseModel):
    name: str = Field(min_length=1, max_length=160)
    phone: str = Field(min_length=5, max_length=32)
    email: str | None = None
    company: str | None = None
    status: str = "new"


class LeadUpdate(BaseModel):
    name: str | None = None
    email: str | None = None
    company: str | None = None
    status: str | None = None


class LeadRead(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    id: str
    name: str
    phone: str
    email: str | None
    company: str | None
    status: str
    source: str
    last_interaction_at: datetime | None
    created_at: datetime


class InteractionRead(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    id: str
    lead_id: str
    channel: str
    direction: str
    content: str
    created_at: datetime


class SendMessage(BaseModel):
    text: str = Field(min_length=1, max_length=4000)


class ChannelCredentials(BaseModel):
    credentials: dict[str, str] = Field(default_factory=dict)
