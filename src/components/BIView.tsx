import React from 'react';
import { 
  PieChart, 
  BrainCircuit, 
  ArrowUpRight, 
  Flame
} from 'lucide-react';

export const BIView: React.FC = () => {
  const channelBreakdown = [
    { name: 'WhatsApp (ZielHub/Chatfor)', percent: 45, value: 'R$ 61.317,00', color: '#4EC5E8' },
    { name: 'Meta Ads (Instagram & FB)', percent: 28, value: 'R$ 38.153,00', color: '#2E86D0' },
    { name: 'Loja Oficial VTEX Direta', percent: 17, value: 'R$ 23.164,00', color: '#0B2A4A' },
    { name: 'Marketplaces (ML & Amazon)', percent: 10, value: 'R$ 13.626,00', color: '#6DD3F5' }
  ];

  // Matriz de Objeções Mapeadas pela Neural Intelligence da Chatfor
  const objectionsMatrix = [
    {
      objecao: 'Dúvida se a Vitamina K2 MK-7 realmente precisa ser tomada com D3',
      frequencia: '34% dos atendimentos',
      taxaConversaoScript: '78.4%',
      scriptRecomendado: 'Explicar a sinergia cálcio-óssea: a D3 absorve o cálcio e a K2 MK-7 direciona diretamente para os ossos evitando calcificação arterial.'
    },
    {
      objecao: 'Preço do frete para regiões Norte e Nordeste',
      frequencia: '26% dos atendimentos',
      taxaConversaoScript: '64.2%',
      scriptRecomendado: 'Oferecer Kit Promocional com frete grátis acima de R$ 199 + cupom BEMVINDO10.'
    },
    {
      objecao: 'Diferença entre o Zinco Quelato Vitgold vs Zinco comum',
      frequencia: '19% dos atendimentos',
      taxaConversaoScript: '82.0%',
      scriptRecomendado: 'Apresentar a biodisponibilidade e absorção celular 3x superior do mineral quelado sem desconforto gástrico.'
    }
  ];

  const heatmapDays = ['Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado'];
  const heatmapHours = ['08h - 11h', '11h - 14h', '14h - 17h', '17h - 20h'];
  
  // Intensidade de calor (0 a 100)
  const heatmapValues = [
    [45, 60, 85, 55],
    [50, 75, 95, 70],
    [65, 80, 98, 80],
    [55, 85, 92, 75],
    [70, 90, 88, 60],
    [40, 65, 50, 35]
  ];

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6">
      {/* Topo do Módulo */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-[#0F172A] flex items-center space-x-2">
            <span>Painel de BI & Neural Intelligence</span>
            <span className="text-xs bg-[#4EC5E8]/15 text-[#03111C] font-bold px-2.5 py-0.5 rounded-full border border-[#4EC5E8]/30">
              Machine Learning Comercial
            </span>
          </h1>
          <p className="text-xs text-[#64748B]">
            Inteligência de receita, LTV, CAC, previsão de vendas e mapeamento de objeções da Vitgold
          </p>
        </div>

        <div className="flex items-center space-x-2">
          <span className="text-xs text-[#64748B]">Previsão de Fechamento Outubro:</span>
          <span className="text-sm font-extrabold text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-md border border-emerald-200">
            R$ 165.400,00 (+38%)
          </span>
        </div>
      </div>

      {/* Grid de KPIs de Alto Nível de BI */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white border border-[#E2E8F0] rounded-xl p-5 shadow-sm">
          <span className="text-[11px] font-bold text-[#64748B] uppercase tracking-wider block mb-1">
            LTV (Lifetime Value)
          </span>
          <div className="flex items-baseline space-x-2">
            <span className="text-2xl font-black text-[#0F172A]">R$ 890,00</span>
            <span className="text-xs font-bold text-emerald-600 flex items-center">
              <ArrowUpRight className="w-3 h-3" /> 14%
            </span>
          </div>
          <span className="text-[11px] text-slate-500 block mt-1">
            Recompra média de 3.2 frascos/ano
          </span>
        </div>

        <div className="bg-white border border-[#E2E8F0] rounded-xl p-5 shadow-sm">
          <span className="text-[11px] font-bold text-[#64748B] uppercase tracking-wider block mb-1">
            CAC Médio (Custo de Aquisição)
          </span>
          <div className="flex items-baseline space-x-2">
            <span className="text-2xl font-black text-[#2E86D0]">R$ 42,15</span>
            <span className="text-xs font-bold text-emerald-600 flex items-center">
              ↓ 8% custo menor
            </span>
          </div>
          <span className="text-[11px] text-slate-500 block mt-1">
            Meta CAPI otimizando compras
          </span>
        </div>

        <div className="bg-white border border-[#E2E8F0] rounded-xl p-5 shadow-sm">
          <span className="text-[11px] font-bold text-[#64748B] uppercase tracking-wider block mb-1">
            Relação LTV / CAC
          </span>
          <div className="flex items-baseline space-x-2">
            <span className="text-2xl font-black text-[#0E7490]">21.1x</span>
            <span className="text-xs font-bold text-emerald-600">
              Excelente (Meta &gt; 3x)
            </span>
          </div>
          <span className="text-[11px] text-slate-500 block mt-1">
            Alta margem e lucratividade
          </span>
        </div>

        <div className="bg-white border border-[#E2E8F0] rounded-xl p-5 shadow-sm">
          <span className="text-[11px] font-bold text-[#64748B] uppercase tracking-wider block mb-1">
            Taxa de Conversão WhatsApp
          </span>
          <div className="flex items-baseline space-x-2">
            <span className="text-2xl font-black text-[#4EC5E8]">32.4%</span>
            <span className="text-xs font-bold text-emerald-600">
              IA Sofia + Handoff
            </span>
          </div>
          <span className="text-[11px] text-slate-500 block mt-1">
            3x superior ao checkout direto
          </span>
        </div>
      </div>

      {/* Grid: Donut SVG de Canais + Heatmap de Horários de Conversão */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Painel Esquerdo: Donut Chart de Conversão por Canal (5 colunas) */}
        <div className="lg:col-span-5 bg-white border border-[#E2E8F0] rounded-xl p-5 shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xs font-bold text-[#0F172A] uppercase tracking-wider flex items-center space-x-1.5">
                <PieChart className="w-4 h-4 text-[#2E86D0]" />
                <span>Atribuição de Receita por Canal</span>
              </h3>
              <span className="text-[10px] text-slate-400">Últimos 30 dias</span>
            </div>

            {/* Donut SVG Original Customizado ZielHub Colors */}
            <div className="flex items-center justify-center py-4">
              <svg viewBox="0 0 160 160" className="w-44 h-44">
                {/* 1. WhatsApp 45% (dasharray = 0.45 * 377 = 169.65) */}
                <circle
                  cx="80"
                  cy="80"
                  r="60"
                  fill="transparent"
                  stroke="#4EC5E8"
                  strokeWidth="20"
                  strokeDasharray="169.65 377"
                  strokeDashoffset="0"
                />
                {/* 2. Meta Ads 28% (dasharray = 0.28 * 377 = 105.56) */}
                <circle
                  cx="80"
                  cy="80"
                  r="60"
                  fill="transparent"
                  stroke="#2E86D0"
                  strokeWidth="20"
                  strokeDasharray="105.56 377"
                  strokeDashoffset="-169.65"
                />
                {/* 3. VTEX Direta 17% (dasharray = 0.17 * 377 = 64.09) */}
                <circle
                  cx="80"
                  cy="80"
                  r="60"
                  fill="transparent"
                  stroke="#0B2A4A"
                  strokeWidth="20"
                  strokeDasharray="64.09 377"
                  strokeDashoffset="-275.21"
                />
                {/* 4. Marketplaces 10% (dasharray = 0.10 * 377 = 37.7) */}
                <circle
                  cx="80"
                  cy="80"
                  r="60"
                  fill="transparent"
                  stroke="#6DD3F5"
                  strokeWidth="20"
                  strokeDasharray="37.7 377"
                  strokeDashoffset="-339.3"
                />
                {/* Texto Central */}
                <text x="80" y="75" textAnchor="middle" fill="#0F172A" fontSize="18" fontWeight="800">
                  R$ 136k
                </text>
                <text x="80" y="92" textAnchor="middle" fill="#64748B" fontSize="9" fontWeight="600">
                  Total Canais
                </text>
              </svg>
            </div>
          </div>

          {/* Legenda de Canais */}
          <div className="space-y-2 pt-2 border-t border-[#F1F5F9] text-xs">
            {channelBreakdown.map((item, idx) => (
              <div key={idx} className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: item.color }} />
                  <span className="text-[#334155] font-medium">{item.name}</span>
                </div>
                <div className="flex items-center space-x-3">
                  <span className="font-bold text-[#0F172A]">{item.value}</span>
                  <span className="font-semibold text-slate-500 w-8 text-right">{item.percent}%</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Painel Direito: Heatmap de Horários de Conversão no WhatsApp (7 colunas) */}
        <div className="lg:col-span-7 bg-white border border-[#E2E8F0] rounded-xl p-5 shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-xs font-bold text-[#0F172A] uppercase tracking-wider flex items-center space-x-1.5">
              <Flame className="w-4 h-4 text-amber-500" />
              <span>Mapa de Calor: Pico de Conversão no WhatsApp (Chatfor)</span>
            </h3>
            <span className="text-[10px] text-slate-400">Intensidade de Vendas</span>
          </div>

          <p className="text-xs text-[#64748B] leading-relaxed">
            Identifica os períodos de maior prontidão de compra para alocar o Agente Sofia e os vendedores humanos da Vitgold nos momentos mais quentes.
          </p>

          <div className="overflow-x-auto pt-2">
            <table className="w-full text-center text-xs">
              <thead>
                <tr>
                  <th className="py-1 px-2 text-left text-[11px] text-[#64748B] font-bold">Dia da Semana</th>
                  {heatmapHours.map((h, i) => (
                    <th key={i} className="py-1 px-2 text-[10px] text-[#64748B] font-bold">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-[#F1F5F9]">
                {heatmapDays.map((day, dIdx) => (
                  <tr key={dIdx}>
                    <td className="py-2.5 px-2 text-left font-semibold text-[#0F172A]">{day}</td>
                    {heatmapHours.map((_, hIdx) => {
                      const val = heatmapValues[dIdx][hIdx];
                      const bgColor = 
                        val > 90 ? 'bg-[#2E86D0] text-white font-bold' :
                        val > 75 ? 'bg-[#4EC5E8] text-[#03111C] font-bold' :
                        val > 55 ? 'bg-[#6DD3F5]/30 text-[#0B2A4A] font-semibold' :
                        'bg-slate-100 text-slate-600';

                      return (
                        <td key={hIdx} className="py-2 px-2">
                          <div className={`py-1.5 px-2 rounded-lg text-xs transition-all ${bgColor}`}>
                            {val}%
                          </div>
                        </td>
                      );
                    })}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Matriz de Objeções: Neural Intelligence (Chatfor) */}
      <div className="bg-white border border-[#E2E8F0] rounded-xl p-5 shadow-sm space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <BrainCircuit className="w-5 h-5 text-[#2E86D0]" />
            <h3 className="text-sm font-bold text-[#0F172A]">
              Matriz de Objeções & Aprendizado com Conversas Reais (Neural Intelligence)
            </h3>
          </div>
          <span className="text-xs bg-[#4EC5E8]/10 text-[#0E7490] font-bold px-2 py-0.5 rounded">
            Auto-aprendizado Ativo
          </span>
        </div>

        <p className="text-xs text-[#64748B]">
          A IA analisa as mensagens trocadas no WhatsApp da Vitgold, identifica onde o cliente hesitou e aplica os scripts validados pelos vendedores que mais convertem.
        </p>

        <div className="space-y-3 pt-1">
          {objectionsMatrix.map((item, idx) => (
            <div key={idx} className="p-4 bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl space-y-2">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <span className="text-xs font-bold text-[#0F172A]">{item.objecao}</span>
                <div className="flex items-center space-x-2">
                  <span className="text-[11px] text-slate-500 font-medium">Freq: {item.frequencia}</span>
                  <span className="text-[11px] bg-emerald-100 text-emerald-800 font-bold px-2 py-0.5 rounded">
                    {item.taxaConversaoScript} de Sucesso
                  </span>
                </div>
              </div>
              <div className="text-xs text-[#0B2A4A] bg-white p-2.5 rounded-lg border border-[#E2E8F0] font-medium leading-relaxed">
                💡 <strong>Script de Fechamento do Melhor Vendedor:</strong> {item.scriptRecomendado}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
