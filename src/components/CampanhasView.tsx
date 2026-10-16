import React, { useState } from 'react';
import { 
  Send, 
  Plus, 
  X 
} from 'lucide-react';
import { CAMPAIGNS_LIST } from '../data/mockData';
import type { CampaignItem } from '../types';

export const CampanhasView: React.FC = () => {
  const [campaigns, setCampaigns] = useState<CampaignItem[]>(CAMPAIGNS_LIST);
  const [showModal, setShowModal] = useState(false);
  const [newCampaignName, setNewCampaignName] = useState('');
  const [selectedChannel, setSelectedChannel] = useState<'WhatsApp Cloud API' | 'Meta Ads CAPI' | 'RD Station Email'>('WhatsApp Cloud API');
  const [targetAudience, setTargetAudience] = useState('Leads Qualificados Score A e B');
  const [messageTemplate, setMessageTemplate] = useState('Olá {nome}! Notamos seu interesse no {produto}. Use o cupom ESPECIAL10 para 10% OFF hoje!');

  const handleCreateCampaign = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCampaignName.trim()) return;

    const newCamp: CampaignItem = {
      id: `camp-${Date.now()}`,
      name: newCampaignName,
      channel: selectedChannel,
      targetAudience,
      sentCount: 650,
      deliveredCount: 642,
      readCount: 520,
      replyCount: 180,
      conversionCount: 45,
      attributedRevenue: 13365.00,
      status: 'Ativa',
      scheduledDate: 'Hoje (Disparo Imediato)'
    };

    setCampaigns([newCamp, ...campaigns]);
    setShowModal(false);
    setNewCampaignName('');
  };

  const formatBRL = (val: number) => {
    return val.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
  };

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6">
      {/* Topo do Módulo */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-[#0F172A] flex items-center space-x-2">
            <span>Disparos & Cadastro de Campanhas</span>
            <span className="text-xs bg-[#4EC5E8]/15 text-[#03111C] font-bold px-2 py-0.5 rounded-full border border-[#4EC5E8]/30">
              API Oficial da Meta (Cloud API)
            </span>
          </h1>
          <p className="text-xs text-[#64748B]">
            Operação de campanhas comerciais padronizadas no WhatsApp com métricas de entrega e conversão
          </p>
        </div>

        <button
          onClick={() => setShowModal(true)}
          className="px-4 py-2 bg-[#4EC5E8] hover:bg-[#6DD3F5] text-[#03111C] rounded-xl text-xs font-bold flex items-center space-x-1.5 shadow-[0_0_15px_rgba(78,197,232,0.25)] transition-all"
        >
          <Plus className="w-3.5 h-3.5" />
          <span>Nova Campanha de Disparo</span>
        </button>
      </div>

      {/* Grid de Métricas Gerais de Campanhas */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white border border-[#E2E8F0] rounded-xl p-4 shadow-sm">
          <span className="text-[11px] font-bold text-[#64748B] uppercase tracking-wider block mb-1">
            Total Disparado (Mês)
          </span>
          <span className="text-2xl font-black text-[#0F172A]">7.510</span>
          <span className="text-[11px] text-emerald-600 font-semibold block mt-1">
            98.5% taxa de entrega na Meta
          </span>
        </div>

        <div className="bg-white border border-[#E2E8F0] rounded-xl p-4 shadow-sm">
          <span className="text-[11px] font-bold text-[#64748B] uppercase tracking-wider block mb-1">
            Taxa de Leitura Média
          </span>
          <span className="text-2xl font-black text-[#2E86D0]">82.8%</span>
          <span className="text-[11px] text-slate-500 font-medium block mt-1">
            6.225 mensagens abertas
          </span>
        </div>

        <div className="bg-white border border-[#E2E8F0] rounded-xl p-4 shadow-sm">
          <span className="text-[11px] font-bold text-[#64748B] uppercase tracking-wider block mb-1">
            Respostas de Clientes
          </span>
          <span className="text-2xl font-black text-[#06B6D4]">1.567</span>
          <span className="text-[11px] text-cyan-700 font-semibold block mt-1">
            Atendidas pela IA + Equipe
          </span>
        </div>

        <div className="bg-white border border-[#E2E8F0] rounded-xl p-4 shadow-sm">
          <span className="text-[11px] font-bold text-[#64748B] uppercase tracking-wider block mb-1">
            Receita Atribuída a Disparos
          </span>
          <span className="text-2xl font-black text-emerald-600">R$ 136.261,00</span>
          <span className="text-[11px] text-emerald-700 font-semibold block mt-1">
            495 pedidos gerados
          </span>
        </div>
      </div>

      {/* Lista de Campanhas */}
      <div className="bg-white border border-[#E2E8F0] rounded-xl shadow-sm overflow-hidden">
        <div className="p-4 border-b border-[#E2E8F0] bg-[#F8FAFC] flex items-center justify-between">
          <h3 className="text-xs font-bold text-[#0F172A] uppercase tracking-wider">
            Campanhas Ativas & Histórico
          </h3>
          <span className="text-xs text-[#64748B]">
            {campaigns.length} campanhas registradas
          </span>
        </div>

        <div className="divide-y divide-[#F1F5F9]">
          {campaigns.map((camp) => (
            <div key={camp.id} className="p-5 hover:bg-[#F8FAFC] transition-colors space-y-3">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div className="space-y-0.5">
                  <div className="flex items-center space-x-2">
                    <h4 className="text-sm font-bold text-[#0F172A]">{camp.name}</h4>
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                      camp.status === 'Ativa' ? 'bg-emerald-100 text-emerald-800' : 'bg-slate-100 text-slate-700'
                    }`}>
                      {camp.status}
                    </span>
                  </div>
                  <div className="text-xs text-[#64748B] flex items-center space-x-2">
                    <span className="font-medium text-[#2E86D0]">{camp.channel}</span>
                    <span>•</span>
                    <span>Público: {camp.targetAudience}</span>
                    <span>•</span>
                    <span>{camp.scheduledDate}</span>
                  </div>
                </div>

                <div className="text-right">
                  <span className="text-xs text-[#64748B] block">Receita Gerada</span>
                  <span className="text-base font-extrabold text-emerald-600">
                    {formatBRL(camp.attributedRevenue)}
                  </span>
                </div>
              </div>

              {/* Barra de Conversão em Fases (Estilo Chatfor) */}
              <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 pt-2 border-t border-[#F1F5F9] text-xs">
                <div className="bg-[#F8FAFC] p-2 rounded-lg border border-[#E2E8F0]">
                  <span className="text-[10px] text-[#64748B] block">Enviados</span>
                  <span className="font-bold text-[#0F172A]">{camp.sentCount}</span>
                </div>
                <div className="bg-[#F8FAFC] p-2 rounded-lg border border-[#E2E8F0]">
                  <span className="text-[10px] text-[#64748B] block">Entregues</span>
                  <span className="font-bold text-emerald-600">{camp.deliveredCount}</span>
                </div>
                <div className="bg-[#F8FAFC] p-2 rounded-lg border border-[#E2E8F0]">
                  <span className="text-[10px] text-[#64748B] block">Lidos ({((camp.readCount / camp.deliveredCount) * 100).toFixed(0)}%)</span>
                  <span className="font-bold text-[#2E86D0]">{camp.readCount}</span>
                </div>
                <div className="bg-[#F8FAFC] p-2 rounded-lg border border-[#E2E8F0]">
                  <span className="text-[10px] text-[#64748B] block">Respostas</span>
                  <span className="font-bold text-[#06B6D4]">{camp.replyCount}</span>
                </div>
                <div className="bg-[#E0F7FA] p-2 rounded-lg border border-[#B2EBF2]">
                  <span className="text-[10px] text-[#007791] block font-bold">Pedidos Fechados</span>
                  <span className="font-extrabold text-[#007791]">{camp.conversionCount} vendas</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Modal: Cadastro de Nova Campanha */}
      {showModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl space-y-4 border border-[#E2E8F0]">
            <div className="flex items-center justify-between border-b border-[#E2E8F0] pb-3">
              <div className="flex items-center space-x-2">
                <Send className="w-5 h-5 text-[#2E86D0]" />
                <h3 className="text-base font-bold text-[#0F172A]">Cadastrar Campanha de Disparo</h3>
              </div>
              <button onClick={() => setShowModal(false)} className="text-slate-400 hover:text-slate-600">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateCampaign} className="space-y-4">
              <div>
                <label className="text-xs font-semibold text-[#334155] block mb-1">
                  Nome da Campanha
                </label>
                <input
                  type="text"
                  required
                  placeholder="Ex: Reengajamento Black Friday Vitgold"
                  value={newCampaignName}
                  onChange={(e) => setNewCampaignName(e.target.value)}
                  className="w-full border border-[#CBD5E1] rounded-xl p-2.5 text-xs text-[#0F172A] focus:outline-none focus:border-[#4EC5E8]"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-[#334155] block mb-1">
                  Canal de Transmissão
                </label>
                <select
                  value={selectedChannel}
                  onChange={(e) => setSelectedChannel(e.target.value as any)}
                  className="w-full border border-[#CBD5E1] rounded-xl p-2.5 text-xs text-[#0F172A] focus:outline-none focus:border-[#4EC5E8]"
                >
                  <option value="WhatsApp Cloud API">WhatsApp Cloud API (Oficial da Meta)</option>
                  <option value="Meta Ads CAPI">Meta Ads (Conversions API)</option>
                  <option value="RD Station Email">RD Station Marketing (E-mail)</option>
                </select>
              </div>

              <div>
                <label className="text-xs font-semibold text-[#334155] block mb-1">
                  Segmento de Destino
                </label>
                <input
                  type="text"
                  value={targetAudience}
                  onChange={(e) => setTargetAudience(e.target.value)}
                  className="w-full border border-[#CBD5E1] rounded-xl p-2.5 text-xs text-[#0F172A] focus:outline-none focus:border-[#4EC5E8]"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-[#334155] block mb-1">
                  Template de Mensagem com Variáveis
                </label>
                <textarea
                  rows={4}
                  value={messageTemplate}
                  onChange={(e) => setMessageTemplate(e.target.value)}
                  className="w-full border border-[#CBD5E1] rounded-xl p-2.5 text-xs text-[#0F172A] font-mono leading-relaxed focus:outline-none focus:border-[#4EC5E8]"
                />
                <span className="text-[10px] text-slate-500 block mt-1">
                  Variáveis suportadas: {'{nome}'}, {'{produto}'}, {'{cupom}'}, {'{link_checkout}'}
                </span>
              </div>

              <div className="flex items-center justify-end space-x-2 pt-2 border-t border-[#E2E8F0]">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2 border border-[#CBD5E1] text-[#64748B] rounded-xl text-xs font-medium hover:bg-[#F8FAFC]"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-[#4EC5E8] hover:bg-[#6DD3F5] text-[#03111C] rounded-xl text-xs font-bold shadow-[0_0_15px_rgba(78,197,232,0.25)]"
                >
                  Ativar Campanha
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
