"use client";

import { useEffect, useState } from "react";
import { ArrowDownUp, Plus, Search, SlidersHorizontal } from "lucide-react";
import { api, type Lead } from "@/lib/api";

const columns = [
  { id: "new", title: "Novo lead", tint: "blue" },
  { id: "ai", title: "Em atendimento IA", tint: "purple" },
  { id: "waiting", title: "Aguardando vendedor", tint: "orange" },
  { id: "won", title: "Fechado", tint: "green" },
  { id: "lost", title: "Perdido", tint: "gray" },
];
const initials = (name: string) => name.split(" ").slice(0, 2).map((part) => part[0]).join("").toUpperCase();

export default function PipelinePage() {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [search, setSearch] = useState("");
  const [error, setError] = useState("");
  const refresh = () => api<Lead[]>("/leads").then(setLeads).catch((reason: Error) => setError(reason.message));
  useEffect(() => { void refresh(); }, []);
  const createLead = async (status = "new") => {
    const name = window.prompt("Nome do contato");
    if (!name) return;
    const phone = window.prompt("WhatsApp (com DDI, apenas números)");
    if (!phone) return;
    try {
      await api("/leads", { method: "POST", body: JSON.stringify({ name, phone, status }) });
      await refresh();
    } catch (reason) {
      setError((reason as Error).message);
    }
  };
  const moveLead = async (lead: Lead, status: string) => {
    try {
      const updated = await api<Lead>(`/leads/${lead.id}`, { method: "PATCH", body: JSON.stringify({ status }) });
      setLeads((items) => items.map((item) => item.id === lead.id ? updated : item));
    } catch (reason) { setError((reason as Error).message); }
  };

  return <section className="page">
    <div className="page-heading">
      <div><div className="eyebrow">VENDAS</div><h1>Pipeline</h1><p>Acompanhe seus contatos e avance cada negociação.</p></div>
      <button className="button primary" onClick={() => void createLead()}><Plus size={17} /> Novo contato</button>
    </div>
    <div className="toolbar"><div className="search-box"><Search size={17} /><input placeholder="Buscar contatos..." value={search} onChange={(event) => setSearch(event.target.value)} /></div><button className="button secondary"><SlidersHorizontal size={16} /> Filtros</button><button className="button secondary"><ArrowDownUp size={16} /> Mais recentes</button><span className="result-count">{leads.length} contatos</span></div>
    {error && <div className="error-banner">{error}</div>}
    <div className="kanban">{columns.map((column) => {
      const items = leads.filter((lead) => lead.status === column.id && lead.name.toLowerCase().includes(search.toLowerCase()));
      return (
        <div
          className="kanban-column"
          key={column.id}
          onDragOver={(event) => event.preventDefault()}
          onDrop={(event) => {
            const lead = leads.find((item) => item.id === event.dataTransfer.getData("text/plain"));
            if (lead) void moveLead(lead, column.id);
          }}
        >
          <div className="column-heading">
            <div className={`column-dot ${column.tint}`} />
            <strong>{column.title}</strong>
            <span className="count-pill">{items.length}</span>
            <button className="icon-button">···</button>
          </div>
          <div className="lead-stack">
            {items.map((lead) => (
              <article
                className="lead-card"
                key={lead.id}
                draggable
                onDragStart={(event) => event.dataTransfer.setData("text/plain", lead.id)}
              >
                <div className="lead-card-top">
                  <span className={`lead-avatar ${column.tint}`}>{initials(lead.name)}</span>
                  <button className="icon-button">···</button>
                </div>
                <strong>{lead.name}</strong>
                <span className="lead-company">{lead.company || lead.phone}</span>
                <div className="lead-card-footer">
                  <span className="source-tag">WhatsApp</span>
                  <span className="time-label">
                    {lead.last_interaction_at ? new Date(lead.last_interaction_at).toLocaleDateString("pt-BR") : "Novo"}
                  </span>
                </div>
              </article>
            ))}
            {items.length === 0 && <div className="empty-column">Nenhum contato nesta etapa</div>}
          </div>
          <button className="add-card" onClick={() => void createLead(column.id)}>
            <Plus size={15} /> Adicionar contato
          </button>
        </div>
      );
    })}</div>
  </section>;
}
