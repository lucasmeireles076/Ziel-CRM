"use client";

import { FormEvent, useCallback, useEffect, useState } from "react";
import { MessageCircle, Search, Send } from "lucide-react";
import { api, type Interaction, type Lead } from "@/lib/api";

export default function ChatPage() {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [active, setActive] = useState<Lead | null>(null);
  const [messages, setMessages] = useState<Interaction[]>([]);
  const [text, setText] = useState("");
  const [error, setError] = useState("");
  const refreshLeads = useCallback(async () => {
    try {
      const rows = await api<Lead[]>("/leads");
      setLeads(rows);
      setActive((current) => current ? rows.find((lead) => lead.id === current.id) ?? rows[0] ?? null : rows[0] ?? null);
    } catch (reason) { setError((reason as Error).message); }
  }, []);
  useEffect(() => { void refreshLeads(); const timer = window.setInterval(refreshLeads, 5000); return () => window.clearInterval(timer); }, [refreshLeads]);
  useEffect(() => {
    if (!active) { setMessages([]); return; }
    let mounted = true;
    const refresh = () => api<Interaction[]>(`/leads/${active.id}/interactions`)
      .then((rows) => { if (mounted) setMessages(rows); })
      .catch((reason: Error) => { if (mounted) setError(reason.message); });
    void refresh();
    const timer = window.setInterval(refresh, 3000);
    return () => { mounted = false; window.clearInterval(timer); };
  }, [active]);
  const send = async (event: FormEvent) => {
    event.preventDefault();
    if (!active || !text.trim()) return;
    try {
      const newMessage = await api<Interaction>(`/leads/${active.id}/messages`, { method: "POST", body: JSON.stringify({ text }) });
      setMessages((items) => [...items, newMessage]);
      setText("");
    } catch (reason) { setError((reason as Error).message); }
  };
  return <section className="page chat-page">
    <div className="page-heading"><div><div className="eyebrow">ATENDIMENTO</div><h1>Conversas</h1><p>Suas conversas do WhatsApp, em um só lugar.</p></div><span className="live-pill"><span className="status-dot" /> Sincronização ativa</span></div>
    {error && <div className="error-banner">{error}</div>}
    <div className="chat-layout">
      <aside className="conversation-list"><div className="conversation-title"><strong>Caixa de entrada</strong><span className="count-pill">{leads.length}</span></div><div className="search-box compact"><Search size={15} /><input placeholder="Buscar conversa..." /></div>
        {leads.map((lead) => <button className={`conversation-item ${active?.id === lead.id ? "selected" : ""}`} key={lead.id} onClick={() => setActive(lead)}><span className="lead-avatar blue">{lead.name.split(" ").slice(0, 2).map((part) => part[0]).join("").toUpperCase()}</span><span className="conversation-summary"><strong>{lead.name}</strong><span>{lead.phone}</span></span><span className="whatsapp-badge">WA</span></button>)}
        {leads.length === 0 && <div className="empty-state">Nenhuma conversa ainda.<br />As mensagens recebidas aparecem aqui.</div>}
      </aside>
      <div className="chat-window">
        {active ? <>
          <div className="chat-header"><span className="lead-avatar green">{active.name.split(" ").slice(0, 2).map((part) => part[0]).join("").toUpperCase()}</span><div><strong>{active.name}</strong><span className="muted block">{active.phone} · WhatsApp</span></div><span className="ai-indicator"><span className="status-dot" /> IA ativa</span></div>
          <div className="message-stream"><div className="date-divider"><span>Histórico da conversa</span></div>
            {messages.map((message) => <div className={`message-row ${message.direction === "outbound" ? "outgoing" : ""}`} key={message.id}><div className="message-bubble">{message.content}<span className="message-time">{new Date(message.created_at).toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit" })}</span></div></div>)}
            {messages.length === 0 && <div className="empty-state"><MessageCircle size={28} /><br />Envie uma mensagem para iniciar a conversa.</div>}
          </div>
          <form className="message-compose" onSubmit={send}><input value={text} onChange={(event) => setText(event.target.value)} placeholder="Escreva uma mensagem..." /><button className="button primary" type="submit" disabled={!text.trim()}><Send size={16} /> Enviar</button></form>
        </> : <div className="empty-state"><MessageCircle size={32} /><br />Selecione uma conversa</div>}
      </div>
    </div>
  </section>;
}
