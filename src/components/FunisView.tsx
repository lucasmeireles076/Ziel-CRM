import React, { useState } from 'react';
import { 
  Plus, 
  ArrowRight,
  Clock, 
  AlertTriangle, 
  Send,
  GripVertical,
  Filter,
  CheckCircle2,
  Sparkles,
  Search
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { PIPELINE_STAGES, PIPELINE_LEADS } from '../data/mockData';
import type { PipelineLead } from '../types';

export const FunisView: React.FC = () => {
  const [leads, setLeads] = useState<PipelineLead[]>(PIPELINE_LEADS);
  const [draggedLeadId, setDraggedLeadId] = useState<string | null>(null);
  const [dragOverStageId, setDragOverStageId] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [originFilter, setOriginFilter] = useState<string>('all');
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const moveLead = (leadId: string, targetStageId: string) => {
    const lead = leads.find(l => l.id === leadId);
    const targetStage = PIPELINE_STAGES.find(s => s.id === targetStageId);

    setLeads(prev => prev.map(l => l.id === leadId ? { ...l, stageId: targetStageId } : l));

    if (lead && targetStage) {
      setToastMessage(`Oportunidade "${lead.name}" movida para "${targetStage.name}"`);
      setTimeout(() => setToastMessage(null), 3500);

      // Efeito de celebração se for a última etapa (Ganho / Fechamento)
      if (targetStageId === 'stage-5') {
        confetti({
          particleCount: 60,
          spread: 70,
          origin: { y: 0.7 }
        });
      }
    }
  };

  const handleDragStart = (e: React.DragEvent, leadId: string) => {
    e.dataTransfer.setData('text/plain', leadId);
    e.dataTransfer.effectAllowed = 'move';
    setDraggedLeadId(leadId);
  };

  const handleDragEnd = () => {
    setDraggedLeadId(null);
    setDragOverStageId(null);
  };

  const handleDragOver = (e: React.DragEvent, stageId: string) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
    if (dragOverStageId !== stageId) {
      setDragOverStageId(stageId);
    }
  };

  const handleDragLeave = (e: React.DragEvent) => {
    // Evita resetar se estiver arrastando sobre elementos filhos
    if (!e.currentTarget.contains(e.relatedTarget as Node)) {
      setDragOverStageId(null);
    }
  };

  const handleDrop = (e: React.DragEvent, stageId: string) => {
    e.preventDefault();
    const leadId = e.dataTransfer.getData('text/plain') || draggedLeadId;
    if (leadId) {
      moveLead(leadId, stageId);
    }
    setDraggedLeadId(null);
    setDragOverStageId(null);
  };

  const formatBRL = (val: number) => {
    return val.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
  };

  // Filtragem dos leads
  const filteredLeads = leads.filter(lead => {
    const matchesSearch = lead.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          lead.company.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesOrigin = originFilter === 'all' || lead.origin.toLowerCase().includes(originFilter.toLowerCase());
    return matchesSearch && matchesOrigin;
  });

  const totalPipelineValue = filteredLeads.reduce((acc, curr) => acc + curr.value, 0);

  return (
    <div className="p-6 max-w-[1600px] mx-auto space-y-6">
      {/* Toast Notificação de Ação */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#030711] text-white px-4 py-3 rounded-2xl border border-[#4EC5E8]/40 shadow-2xl flex items-center space-x-3 animate-in slide-in-from-bottom duration-300">
          <Sparkles className="w-4 h-4 text-[#4EC5E8]" />
          <span className="text-xs font-bold text-slate-100">{toastMessage}</span>
        </div>
      )}

      {/* Top Header & Controles do Pipeline */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 bg-white p-5 rounded-2xl border border-[#E2E8F0] shadow-sm">
        <div>
          <div className="flex items-center space-x-3 mb-1">
            <h1 className="text-xl font-bold text-[#0F172A] tracking-tight">
              Pipeline Kanban de Vendas ZielHub
            </h1>
            <span className="text-xs bg-[#4EC5E8]/15 text-[#03111C] font-extrabold px-2.5 py-1 rounded-full border border-[#4EC5E8]/30">
              Hold & Drop Ativo 🖱️
            </span>
            <span className="text-xs bg-emerald-50 text-emerald-700 font-bold px-2.5 py-1 rounded-full border border-emerald-200">
              Total: {formatBRL(totalPipelineValue)}
            </span>
          </div>
          <p className="text-xs text-[#64748B]">
            Arraste os cards com o mouse entre as etapas para atualizar status e sincronizar com o Chatfor e RD Station
          </p>
        </div>

        {/* Filtros e Busca */}
        <div className="flex flex-wrap items-center gap-3">
          <div className="relative">
            <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Buscar por lead ou empresa..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl pl-8 pr-3 py-1.5 text-xs text-[#0F172A] placeholder-slate-400 focus:outline-none focus:border-[#4EC5E8] w-56"
            />
          </div>

          <div className="flex items-center space-x-1.5 bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl p-1 text-xs">
            <Filter className="w-3.5 h-3.5 text-slate-400 ml-1.5" />
            <select
              value={originFilter}
              onChange={(e) => setOriginFilter(e.target.value)}
              className="bg-transparent text-xs text-[#0F172A] font-semibold focus:outline-none pr-2 cursor-pointer"
            >
              <option value="all">Todas as Origens</option>
              <option value="whatsapp">WhatsApp Direct</option>
              <option value="e-commerce">E-commerce Vitgold</option>
              <option value="rd station">RD Station Marketing</option>
              <option value="meta">Meta Ads</option>
            </select>
          </div>

          <button className="px-4 py-2 bg-[#4EC5E8] hover:bg-[#6DD3F5] text-[#03111C] rounded-xl text-xs font-bold flex items-center space-x-1.5 shadow-[0_0_15px_rgba(78,197,232,0.25)] transition-all">
            <Plus className="w-3.5 h-3.5" />
            <span>Nova Oportunidade</span>
          </button>
        </div>
      </div>

      {/* Kanban Board das Etapas - FLUIDO E COM ESPAÇAMENTO GENEROSO (Zero Quebras) */}
      <div className="flex gap-5 overflow-x-auto pb-6 px-1">
        {PIPELINE_STAGES.map((stage) => {
          const stageLeads = filteredLeads.filter(l => l.stageId === stage.id);
          const stageTotal = stageLeads.reduce((acc, curr) => acc + curr.value, 0);
          const isOverThisStage = dragOverStageId === stage.id;

          return (
            <div 
              key={stage.id} 
              onDragOver={(e) => handleDragOver(e, stage.id)}
              onDragLeave={handleDragLeave}
              onDrop={(e) => handleDrop(e, stage.id)}
              className={`w-80 min-w-[320px] max-w-[340px] flex-shrink-0 bg-[#F8FAFC] border rounded-2xl flex flex-col max-h-[760px] transition-all duration-200 ${
                isOverThisStage 
                  ? 'border-[#4EC5E8] ring-4 ring-[#4EC5E8]/25 bg-[#4EC5E8]/5 shadow-xl scale-[1.01]' 
                  : 'border-[#E2E8F0] shadow-sm'
              }`}
            >
              {/* Header da Coluna */}
              <div className="p-4 border-b border-[#E2E8F0] bg-white rounded-t-2xl flex items-center justify-between">
                <div className="flex items-center space-x-2.5">
                  <span 
                    className="w-3.5 h-3.5 rounded-full shadow-sm" 
                    style={{ backgroundColor: stage.color }}
                  />
                  <h3 className="text-xs font-extrabold text-[#0F172A] uppercase tracking-wide">
                    {stage.name}
                  </h3>
                </div>
                <span className="text-[11px] font-black text-[#64748B] bg-[#F1F5F9] px-2.5 py-0.5 rounded-full border border-[#E2E8F0]">
                  {stageLeads.length}
                </span>
              </div>

              {/* Subtotal da Etapa - Espaçoso e Legível */}
              <div className="px-4 py-2 bg-[#F1F5F9]/60 text-xs font-semibold text-[#64748B] border-b border-[#E2E8F0] flex items-center justify-between">
                <span>Subtotal da Fase:</span>
                <span className="text-xs font-extrabold text-[#0F172A]">
                  {formatBRL(stageTotal)}
                </span>
              </div>

              {/* Cards de Oportunidades com Suporte a Drag & Drop */}
              <div className="p-3 space-y-3 flex-1 overflow-y-auto min-h-[300px]">
                {stageLeads.length === 0 ? (
                  <div className={`h-36 rounded-xl border-2 border-dashed flex flex-col items-center justify-center p-4 text-center transition-colors ${
                    isOverThisStage 
                      ? 'border-[#4EC5E8] bg-[#4EC5E8]/10 text-[#03111C]' 
                      : 'border-slate-200 text-slate-400'
                  }`}>
                    <p className="text-xs font-medium">Solte o card aqui</p>
                    <span className="text-[10px] mt-1 text-slate-400">Nenhuma oportunidade nesta etapa</span>
                  </div>
                ) : (
                  stageLeads.map((lead) => {
                    const isNoShow = lead.lastContactHoursAgo > 24;
                    const isBeingDragged = draggedLeadId === lead.id;

                    return (
                      <div
                        key={lead.id}
                        draggable="true"
                        onDragStart={(e) => handleDragStart(e, lead.id)}
                        onDragEnd={handleDragEnd}
                        className={`bg-white border rounded-xl p-4 shadow-sm hover:shadow-md transition-all cursor-grab active:cursor-grabbing space-y-2.5 relative select-none group ${
                          isBeingDragged 
                            ? 'opacity-40 scale-95 border-[#4EC5E8] ring-2 ring-[#4EC5E8]' 
                            : isNoShow 
                              ? 'border-red-300 ring-1 ring-red-200' 
                              : 'border-[#E2E8F0] hover:border-[#4EC5E8]/60'
                        }`}
                      >
                        {/* Alça visual de Drag */}
                        <div className="absolute top-2.5 right-2 opacity-0 group-hover:opacity-100 transition-opacity text-slate-300 hover:text-slate-500">
                          <GripVertical className="w-4 h-4" />
                        </div>

                        {/* Alerta de No-Show (Chatfor) */}
                        {isNoShow && (
                          <div className="bg-red-50 text-red-700 text-[10px] font-bold px-2.5 py-1 rounded-lg flex items-center justify-between border border-red-200">
                            <div className="flex items-center space-x-1.5">
                              <AlertTriangle className="w-3.5 h-3.5 text-red-500 shrink-0" />
                              <span>No-Show ({lead.lastContactHoursAgo}h sem resposta)</span>
                            </div>
                            <span className="text-[9px] bg-red-200 px-1.5 py-0.2 rounded text-red-900 font-extrabold uppercase">
                              Ação
                            </span>
                          </div>
                        )}

                        {/* Nome do Contato e Tag de Score */}
                        <div className="flex items-start justify-between pr-4">
                          <span className="text-xs font-bold text-[#0F172A] leading-snug">
                            {lead.name}
                          </span>
                          <span className={`text-[10px] font-extrabold px-2 py-0.5 rounded-full shrink-0 ${
                            lead.scoreGrade === 'A' ? 'bg-emerald-100 text-emerald-800 border border-emerald-200' :
                            lead.scoreGrade === 'B' ? 'bg-lime-100 text-lime-800 border border-lime-200' :
                            lead.scoreGrade === 'C' ? 'bg-amber-100 text-amber-800 border border-amber-200' : 'bg-slate-100 text-slate-800'
                          }`}>
                            Score {lead.scoreGrade} ({lead.scoreValue})
                          </span>
                        </div>

                        {/* Empresa ou Instituição */}
                        <div className="text-[11px] text-[#64748B] flex items-center space-x-1.5">
                          <span>{lead.company}</span>
                        </div>

                        {/* Valor da Oportunidade e Origem */}
                        <div className="flex items-center justify-between text-xs font-black text-[#2E86D0] pt-1.5 border-t border-[#F1F5F9]">
                          <span className="text-[13px]">{formatBRL(lead.value)}</span>
                          <span className="text-[10px] bg-[#F1F5F9] text-[#475569] font-medium px-2 py-0.5 rounded-md border border-[#E2E8F0]">
                            {lead.origin}
                          </span>
                        </div>

                        {/* Footer do Card: Ações Rápidas */}
                        <div className="pt-2 flex items-center justify-between border-t border-slate-50 text-[11px]">
                          {isNoShow ? (
                            <button
                              title="Disparar mensagem no WhatsApp via Sofia"
                              className="text-[11px] text-red-600 hover:text-red-700 font-bold flex items-center space-x-1"
                            >
                              <Send className="w-3 h-3" />
                              <span>Retomar no Zap</span>
                            </button>
                          ) : (
                            <span className="text-[10px] text-slate-400 flex items-center space-x-1">
                              <Clock className="w-3 h-3" />
                              <span>{lead.lastContactHoursAgo}h atrás</span>
                            </span>
                          )}

                          {stage.id !== 'stage-5' ? (
                            <button
                              onClick={() => {
                                const nextStageIndex = PIPELINE_STAGES.findIndex(s => s.id === stage.id) + 1;
                                if (nextStageIndex < PIPELINE_STAGES.length) {
                                  moveLead(lead.id, PIPELINE_STAGES[nextStageIndex].id);
                                }
                              }}
                              className="text-[11px] text-[#2E86D0] hover:text-[#0B2A4A] font-bold flex items-center space-x-0.5 hover:underline"
                            >
                              <span>Avançar</span>
                              <ArrowRight className="w-3 h-3" />
                            </button>
                          ) : (
                            <span className="text-[10px] text-emerald-600 font-bold flex items-center space-x-0.5">
                              <CheckCircle2 className="w-3 h-3" />
                              <span>Fechado</span>
                            </span>
                          )}
                        </div>
                      </div>
                    );
                  })
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
