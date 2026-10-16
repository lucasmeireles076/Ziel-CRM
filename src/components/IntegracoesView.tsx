import React, { useState } from 'react';
import { 
  Share2, 
  CheckCircle2, 
  Radio, 
  ShoppingBag, 
  MessageSquare, 
  Boxes, 
  Play, 
  Terminal,
  ExternalLink
} from 'lucide-react';
import { INTEGRATIONS_LIST } from '../data/mockData';

export const IntegracoesView: React.FC = () => {
  const [integrations] = useState(INTEGRATIONS_LIST);
  const [eventLogs, setEventLogs] = useState<string[]>([
    '[15:10:04] [RD Station] Webhook de conversão recebido: Lead Mariana Silveira (Zinco 25mg Vitgold)',
    '[15:12:30] [Meta CAPI] Evento Purchase disparado: R$ 297,04 (Order #VT-9821) - Match Quality 8.9',
    '[15:15:12] [VTEX] Sincronização de estoque concluída para 184 SKUs da Vitgold'
  ]);
  const [isSimulating, setIsSimulating] = useState(false);

  const simulatePurchaseEvent = () => {
    setIsSimulating(true);
    const orderId = `VT-${Math.floor(1000 + Math.random() * 9000)}`;
    const value = (120 + Math.random() * 200).toFixed(2);
    const now = new Date().toLocaleTimeString();

    setTimeout(() => {
      setEventLogs(prev => [
        `[${now}] [Simulador] Novo pedido capturado na VTEX Vitgold: Pedido #${orderId} no valor de R$ ${value}`,
        `[${now}] [Meta CAPI] POST https://graph.facebook.com/v19.0/pixel/events -> Evento "Purchase" enviado com sucesso (Status 200 OK)`,
        `[${now}] [RD Station] POST /platform/conversions -> Conversão registrada para lead e pontuação acrescida (+15 pts no Interesse)`,
        ...prev
      ]);
      setIsSimulating(false);
    }, 600);
  };

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-[#0F172A] flex items-center space-x-2">
            <span>Central de Integrações e APIs</span>
            <span className="text-xs bg-[#E0F7FA] text-[#007791] font-bold px-2 py-0.5 rounded-full">
              5 Serviços Conectados
            </span>
          </h1>
          <p className="text-xs text-[#64748B]">
            Conectividade unificada entre RD Station, Meta Ads, ZielHub, VTEX e Marketplaces
          </p>
        </div>

        <button
          onClick={simulatePurchaseEvent}
          disabled={isSimulating}
          className="px-4 py-2 bg-[#00B4D8] hover:bg-[#0096C7] text-white rounded-lg text-xs font-semibold flex items-center space-x-1.5 shadow-sm transition-all disabled:opacity-50"
        >
          <Play className="w-3.5 h-3.5" />
          <span>{isSimulating ? 'Disparando Eventos...' : 'Simular Pedido no E-commerce'}</span>
        </button>
      </div>

      {/* Grid de Cards das Integrações */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {integrations.map((item) => (
          <div 
            key={item.id}
            className="bg-white border border-[#E2E8F0] rounded-xl p-5 shadow-sm hover:border-[#CBD5E1] transition-all flex flex-col justify-between"
          >
            <div className="space-y-3">
              <div className="flex items-start justify-between">
                <div className="w-10 h-10 rounded-lg bg-[#E0F7FA] border border-[#B2EBF2] flex items-center justify-center text-[#007791]">
                  {item.id === 'rd-station' && <Share2 className="w-5 h-5" />}
                  {item.id === 'meta-capi' && <Radio className="w-5 h-5 text-[#1877F2]" />}
                  {item.id === 'vtex-ecommerce' && <ShoppingBag className="w-5 h-5 text-[#F71963]" />}
                  {item.id === 'zielhub-kommo' && <MessageSquare className="w-5 h-5 text-[#2E86D0]" />}
                  {item.id === 'marketplaces' && <Boxes className="w-5 h-5 text-[#F59E0B]" />}
                </div>

                <span className="inline-flex items-center space-x-1 text-[11px] font-semibold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Conectado</span>
                </span>
              </div>

              <div>
                <span className="text-[10px] font-bold text-[#64748B] uppercase tracking-wider block">
                  {item.category}
                </span>
                <h3 className="text-sm font-bold text-[#0F172A] mt-0.5">
                  {item.name}
                </h3>
                <p className="text-xs text-[#64748B] mt-1 leading-relaxed">
                  {item.description}
                </p>
              </div>

              {item.metrics && (
                <div className="grid grid-cols-2 gap-2 pt-2 border-t border-[#F1F5F9]">
                  {item.metrics.map((m, mIdx) => (
                    <div key={mIdx} className="bg-[#F8FAFC] p-2 rounded-lg border border-[#E2E8F0]">
                      <span className="text-[10px] text-[#64748B] block truncate">{m.label}</span>
                      <span className="text-xs font-bold text-[#0F172A] block truncate">{m.value}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="mt-4 pt-3 border-t border-[#F1F5F9] flex items-center justify-between text-[11px] text-[#94A3B8]">
              <span>Sync: {item.lastSync}</span>
              <button className="text-[#007791] hover:underline font-semibold flex items-center space-x-0.5">
                <span>Configurar</span>
                <ExternalLink className="w-2.5 h-2.5" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Terminal de Logs de Eventos em Tempo Real */}
      <div className="bg-[#07192C] rounded-xl border border-[#13253B] shadow-sm overflow-hidden">
        <div className="p-3.5 bg-[#0A2240] border-b border-[#13253B] flex items-center justify-between">
          <div className="flex items-center space-x-2 text-white text-xs font-bold">
            <Terminal className="w-4 h-4 text-[#00B4D8]" />
            <span>Console de Eventos Server-Side (Meta CAPI & RD Station Webhooks)</span>
          </div>
          <span className="text-[10px] text-emerald-400 font-mono flex items-center space-x-1">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            <span>Escutando Webhooks</span>
          </span>
        </div>

        <div className="p-4 font-mono text-xs text-slate-300 space-y-1.5 max-h-56 overflow-y-auto">
          {eventLogs.map((log, lIdx) => (
            <div key={lIdx} className="leading-relaxed">
              <span className="text-[#00B4D8]">{log.substring(0, 10)}</span>
              <span>{log.substring(10)}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
