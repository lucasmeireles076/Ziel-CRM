from datetime import datetime
from uuid import uuid4

from pgvector.sqlalchemy import Vector
from sqlalchemy import Boolean, DateTime, Float, ForeignKey, String, Text, func
from sqlalchemy.orm import DeclarativeBase, Mapped, mapped_column, relationship


class Base(DeclarativeBase):
    pass


class Lead(Base):
    __tablename__ = "leads"

    id: Mapped[str] = mapped_column(String(36), primary_key=True, default=lambda: str(uuid4()))
    name: Mapped[str] = mapped_column(String(160), default="Novo contato")
    phone: Mapped[str] = mapped_column(String(32), unique=True, index=True)
    email: Mapped[str | None] = mapped_column(String(255), nullable=True)
    company: Mapped[str | None] = mapped_column(String(160), nullable=True)
    status: Mapped[str] = mapped_column(String(40), default="new", index=True)
    source: Mapped[str] = mapped_column(String(40), default="whatsapp")
    last_interaction_at: Mapped[datetime | None] = mapped_column(DateTime(timezone=True), nullable=True)
    reactivated_at: Mapped[datetime | None] = mapped_column(DateTime(timezone=True), nullable=True)
    created_at: Mapped[datetime] = mapped_column(DateTime(timezone=True), server_default=func.now())
    interactions: Mapped[list["Interaction"]] = relationship(back_populates="lead", cascade="all, delete-orphan")


class Interaction(Base):
    __tablename__ = "interactions"

    id: Mapped[str] = mapped_column(String(36), primary_key=True, default=lambda: str(uuid4()))
    lead_id: Mapped[str] = mapped_column(ForeignKey("leads.id", ondelete="CASCADE"), index=True)
    channel: Mapped[str] = mapped_column(String(40), default="whatsapp")
    direction: Mapped[str] = mapped_column(String(12))
    content: Mapped[str] = mapped_column(Text)
    automated: Mapped[bool] = mapped_column(Boolean, default=False)
    external_id: Mapped[str | None] = mapped_column(String(180), unique=True, nullable=True)
    created_at: Mapped[datetime] = mapped_column(DateTime(timezone=True), server_default=func.now(), index=True)
    embedding: Mapped[list[float] | None] = mapped_column(Vector(768), nullable=True)
    lead: Mapped[Lead] = relationship(back_populates="interactions")


class Order(Base):
    __tablename__ = "orders"

    id: Mapped[str] = mapped_column(String(36), primary_key=True, default=lambda: str(uuid4()))
    lead_id: Mapped[str] = mapped_column(ForeignKey("leads.id", ondelete="CASCADE"), index=True)
    channel: Mapped[str] = mapped_column(String(40))
    external_id: Mapped[str] = mapped_column(String(180))
    amount: Mapped[float | None] = mapped_column(Float, nullable=True)
    status: Mapped[str] = mapped_column(String(40), default="pending")


class ChannelIntegration(Base):
    __tablename__ = "channel_integrations"

    id: Mapped[str] = mapped_column(String(36), primary_key=True, default=lambda: str(uuid4()))
    channel: Mapped[str] = mapped_column(String(40), unique=True)
    enabled: Mapped[bool] = mapped_column(Boolean, default=False)
    credentials: Mapped[str | None] = mapped_column(Text, nullable=True)
