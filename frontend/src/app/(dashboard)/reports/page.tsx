"use client";

import { useEffect, useState } from "react";
import { ArrowUpRight, Bot, MessageSquare, RefreshCw, Users } from "lucide-react";
import { api } from "@/lib/api";

type Reports = { messages_today: number; ai_response_rate: number; reactivated_contacts: number; new_leads_7d: number; conversion_rate: number; messages_by_day: { date: string; count: number }[] };
const number = (value?: number) => value?.toLocaleString("pt-BR") ?? "—";

export default function ReportsPage() {
  const [data, setData] = useState<Reports | null>(null);
  const [error, setError] = useState("");
  useEffect(() => { api<Reports>("/reports").then(setData).catch((reason: Error) => setError(reason.message)); }, []);
  const cards = [
    { title: "Mensagens hoje", value: number(data?.messages_today), note: "mensagens registradas", icon: MessageSquare, color: "blue" },
    { title: "Respostas do agente", value: `${number(data?.ai_response_rate)}%`, note: "do total de mensagens", icon: Bot, color: "purple" },
    { title: "Novos contatos", value: number(data?.new_leads_7d), note: "nos últimos 7 dias", icon: Users, color: "green" },
    { title: "Contatos reativados", value: number(data?.reactivated_contacts), note: "pela régua automática", icon: RefreshCw, color: "orange" },
  ];
  const max = Math.max(1, ...(data?.messages_by_day.map((day) => day.count) ?? [1]));
  return <section className="page">
    <div className="page-heading"><div><div className="eyebrow">DESEMPENHO</div><h1>Relatórios</h1><p>Uma visão geral da operação e dos resultados.</p></div><button className="button secondary"><ArrowUpRight size={16} /> Últimos 7 dias</button></div>
    {error && <div className="error-banner">{error}</div>}
    <div className="metric-grid">{cards.map(({ title, value, note, icon: Icon, color }) => <article className="metric-card" key={title}><span className={`metric-icon ${color}`}><Icon size={18} /></span><span className="metric-title">{title}</span><strong>{value}</strong><span className="muted">{note}</span></article>)}</div>
    <div className="report-grid"><article className="panel chart-panel"><div className="panel-heading"><div><h2>Volume de mensagens</h2><p>Atividade diária nos últimos 7 dias</p></div><span className="legend"><i /> Mensagens</span></div>
      <div className="bar-chart">{(data?.messages_by_day ?? []).map((day) => <div className="bar-group" key={day.date}><span className="bar-value">{day.count}</span><div className="bar" style={{ height: `${Math.max(4, day.count / max * 100)}%` }} /><span className="bar-label">{new Date(`${day.date}T12:00:00`).toLocaleDateString("pt-BR", { weekday: "short" })}</span></div>)}</div>
      {!data?.messages_by_day.length && <div className="chart-empty">Os dados de mensagens aparecerão aqui.</div>}
    </article><article className="panel conversion-panel"><div className="panel-heading"><div><h2>Conversão</h2><p>Leads que chegaram a negócio fechado</p></div></div><div className="conversion-value">{number(data?.conversion_rate)}<small>%</small></div><div className="progress-track"><span style={{ width: `${Math.min(data?.conversion_rate ?? 0, 100)}%` }} /></div><span className="muted">Acompanhe as etapas no pipeline</span></article></div>
  </section>;
}
