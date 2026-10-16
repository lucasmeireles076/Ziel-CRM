import React, { useState } from 'react';
import { 
  Pill, 
  TrendingUp, 
  Package, 
  Users, 
  ShoppingCart, 
  ShieldCheck, 
  Download, 
  ArrowUpRight, 
  DollarSign
} from 'lucide-react';

export const VitgoldDashboard: React.FC = () => {
  const [selectedPeriod, setSelectedPeriod] = useState<'7d' | '30d' | '90d' | '12m'>('30d');
  const [activeCategory, setActiveCategory] = useState<'todos' | 'vitaminas' | 'minerais' | 'especiais'>('todos');

  // Métricas exclusivas da operação da Vitgold
  const kpis = [
    {
      title: 'Frascos Vendidos no Mês',
      value: '14.820 un',
      growth: '+18.4%',
      desc: 'vs. mês anterior (12.518 un)',
      icon: Package,
      badge: 'Meta: 15.000 un (98.8%)'
    },
    {
      title: 'Faturamento Suplementos',
      value: 'R$ 892.400',
      growth: '+22.6%',
      desc: 'Ticket Médio: R$ 186,40',
      icon: DollarSign,
      badge: 'Recorde Trimestral'
    },
    {
      title: 'Prescritores & Nutris Ativos',
      value: '384 parceiros',
      growth: '+31 novos',
      desc: 'Receitas digitais com cupom nutri',
      icon: Users,
      badge: 'Programa NutriGold'
    },
    {
      title: 'Taxa de Recompra (60 dias)',
      value: '42.8%',
      growth: '+4.2%',
      desc: 'Ciclo médio de reposição K2/D3',
      icon: TrendingUp,
      badge: 'Alta Fidelidade'
    }
  ];

  const skus = [
    {
      name: 'Vitamina K2 + D3 2000 UI',
      category: 'vitaminas',
      sold: '5.630 frascos',
      revenue: 'R$ 382.840',
      stock: '4.210 un',
      stockDays: '22 dias',
      anvisa: 'Reg. 6.7324.0019',
      status: 'Alta Demanda'
    },
    {
      name: 'Zinco Quelato 29.5mg',
      category: 'minerais',
      sold: '4.001 frascos',
      revenue: 'R$ 236.059',
      stock: '2.890 un',
      stockDays: '19 dias',
      anvisa: 'Reg. 6.7324.0024',
      status: 'Normal'
    },
    {
      name: 'Cranberry 500mg Softgel',
      category: 'especiais',
      sold: '3.112 frascos',
      revenue: 'R$ 183.608',
      stock: '1.940 un',
      stockDays: '16 dias',
      anvisa: 'Reg. 6.7324.0031',
      status: 'Estoque Baixo'
    },
    {
      name: 'Ômega 3 TG 1000mg',
      category: 'especiais',
      sold: '2.077 frascos',
      revenue: 'R$ 89.893',
      stock: '3.100 un',
      stockDays: '35 dias',
      anvisa: 'Reg. 6.7324.0012',
      status: 'Normal'
    }
  ];

  const filteredSkus = skus.filter(s => activeCategory === 'todos' || s.category === activeCategory);

  return (
    <div className="p-6 max-w-[1600px] mx-auto space-y-6">
      {/* Banner de Personalização do Perfil Vitgold */}
      <div className="bg-gradient-to-r from-[#111827] via-[#1E293B] to-[#0F172A] border border-red-500/30 rounded-2xl p-6 text-white shadow-xl relative overflow-hidden">
        <div className="absolute right-0 top-0 bottom-0 w-96 bg-red-600/10 rounded-full blur-3xl pointer-events-none"></div>

        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 relative z-10">
          <div className="space-y-1.5">
            <div className="flex items-center space-x-2.5">
              <span className="w-8 h-8 rounded-xl bg-red-600 flex items-center justify-center text-white font-bold shadow-[0_0_15px_rgba(220,38,38,0.5)]">
                🌿
              </span>
              <h1 className="text-2xl font-black tracking-tight text-white flex items-center space-x-2">
                <span>Painel Operacional Vitgold</span>
                <span className="text-xs bg-red-600/30 text-red-300 border border-red-500/40 px-2.5 py-0.5 rounded-full font-bold">
                  Tema Vitgold (Opções em Vermelho • Hover em Azul)
                </span>
              </h1>
            </div>
            <p className="text-xs text-slate-300 max-w-2xl leading-relaxed">
              Visão consolidada de produção, giro de estoque, prescrições de nutricionistas e pedidos e-commerce dos suplementos premium Vitgold Brasil.
            </p>
          </div>

          {/* Filtros de Período Personalizados: Vermelho no ativo / Hover em Azul */}
          <div className="flex items-center space-x-1.5 bg-[#030711]/70 p-1.5 rounded-xl border border-slate-700">
            {(['7d', '30d', '90d', '12m'] as const).map((period) => (
              <button
                key={period}
                onClick={() => setSelectedPeriod(period)}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all duration-200 ${
                  selectedPeriod === period
                    ? 'bg-red-600 text-white shadow-md hover:bg-blue-600'
                    : 'text-slate-400 hover:text-white hover:bg-blue-600 hover:text-white'
                }`}
              >
                {period === '7d' ? 'Últimos 7 dias' : period === '30d' ? 'Últimos 30 dias' : period === '90d' ? 'Trimestre' : '12 Meses'}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Grid de KPIs Operacionais Vitgold */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {kpis.map((kpi, idx) => {
          const Icon = kpi.icon;
          return (
            <div 
              key={idx}
              className="bg-white border border-[#E2E8F0] rounded-2xl p-5 shadow-sm hover:shadow-md transition-shadow relative overflow-hidden"
            >
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                  {kpi.title}
                </span>
                <div className="w-9 h-9 rounded-xl bg-red-50 text-red-600 flex items-center justify-center">
                  <Icon className="w-4 h-4" />
                </div>
              </div>

              <div className="flex items-baseline space-x-2">
                <span className="text-2xl font-black text-[#0F172A]">{kpi.value}</span>
                <span className="text-xs font-bold text-emerald-600 flex items-center">
                  <ArrowUpRight className="w-3.5 h-3.5" />
                  <span>{kpi.growth}</span>
                </span>
              </div>

              <div className="flex items-center justify-between mt-3 pt-3 border-t border-slate-100 text-[11px] text-slate-500">
                <span>{kpi.desc}</span>
                <span className="bg-red-50 text-red-700 font-bold px-2 py-0.5 rounded-full border border-red-200">
                  {kpi.badge}
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Seção Principal: Giro de Estoque por SKU & Canais de Venda */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Tabela de SKUs com botões interativos: Vermelho no default / Hover no Azul */}
        <div className="lg:col-span-2 bg-white border border-[#E2E8F0] rounded-2xl p-6 shadow-sm space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <h2 className="text-base font-bold text-[#0F172A] flex items-center space-x-2">
                <Pill className="w-4 h-4 text-red-600" />
                <span>Desempenho por Linha & Giro de Estoque</span>
              </h2>
              <p className="text-xs text-slate-500">
                Volume de frascos despachados e dias de cobertura logística por produto
              </p>
            </div>

            {/* Categorias: Botões com Opções em Vermelho e Hover em Azul */}
            <div className="flex items-center space-x-1.5 bg-slate-100 p-1 rounded-xl">
              {(['todos', 'vitaminas', 'minerais', 'especiais'] as const).map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-3 py-1 rounded-lg text-xs font-bold capitalize transition-all duration-200 ${
                    activeCategory === cat
                      ? 'bg-red-600 text-white shadow-sm hover:bg-blue-600'
                      : 'text-slate-600 hover:text-white hover:bg-blue-600'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="border-b border-[#E2E8F0] bg-slate-50 text-[11px] font-bold text-slate-500">
                  <th className="py-2.5 px-3">Suplemento / Fórmula</th>
                  <th className="py-2.5 px-3">Frascos Vendidos</th>
                  <th className="py-2.5 px-3">Receita Bruta</th>
                  <th className="py-2.5 px-3">Estoque Disponível</th>
                  <th className="py-2.5 px-3">Cobertura</th>
                  <th className="py-2.5 px-3 text-right">Ação</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredSkus.map((sku, sIdx) => (
                  <tr key={sIdx} className="hover:bg-slate-50">
                    <td className="py-3 px-3">
                      <div className="font-bold text-slate-900">{sku.name}</div>
                      <div className="text-[10px] text-slate-400 font-mono">{sku.anvisa}</div>
                    </td>
                    <td className="py-3 px-3 font-semibold text-slate-800">{sku.sold}</td>
                    <td className="py-3 px-3 font-mono font-bold text-emerald-700">{sku.revenue}</td>
                    <td className="py-3 px-3">
                      <span className="font-semibold text-slate-800">{sku.stock}</span>
                    </td>
                    <td className="py-3 px-3">
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                        sku.status === 'Estoque Baixo' ? 'bg-amber-100 text-amber-800 border border-amber-300' : 'bg-slate-100 text-slate-700'
                      }`}>
                        {sku.stockDays}
                      </span>
                    </td>
                    <td className="py-3 px-3 text-right">
                      {/* Botão com regra exigida: Opção em Vermelho, Hover em Azul */}
                      <button
                        onClick={() => alert(`Solicitando reposição de lote para ${sku.name}`)}
                        className="px-2.5 py-1 bg-red-600 text-white rounded-lg text-[11px] font-bold shadow-sm hover:bg-blue-600 transition-colors"
                      >
                        Repor Lote
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Lateral: Vendas por Canal e Ações da Operação */}
        <div className="space-y-6">
          <div className="bg-white border border-[#E2E8F0] rounded-2xl p-5 shadow-sm space-y-4">
            <h3 className="text-sm font-bold text-slate-900 flex items-center space-x-2">
              <ShoppingCart className="w-4 h-4 text-red-600" />
              <span>Vendas por Canal de Distribuição</span>
            </h3>

            <div className="space-y-3">
              {[
                { channel: 'E-commerce Próprio (Shopify)', share: '46%', value: 'R$ 410.500', color: 'bg-red-600' },
                { channel: 'Prescrição Nutricionistas', share: '24%', value: 'R$ 214.176', color: 'bg-emerald-500' },
                { channel: 'WhatsApp Direct (Sofia IA)', share: '18%', value: 'R$ 160.632', color: 'bg-[#4EC5E8]' },
                { channel: 'Mercado Livre Full', share: '12%', value: 'R$ 107.088', color: 'bg-amber-500' }
              ].map((item, iIdx) => (
                <div key={iIdx} className="space-y-1">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-semibold text-slate-700">{item.channel}</span>
                    <span className="font-bold text-slate-900">{item.share} ({item.value})</span>
                  </div>
                  <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden">
                    <div 
                      className={`${item.color} h-2 rounded-full`} 
                      style={{ width: item.share }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>

            <div className="pt-3 border-t border-slate-100">
              {/* Botões de Ação com Tema Exclusivo Vitgold */}
              <button 
                onClick={() => alert('Exportando relatório consolidado Vitgold...')}
                className="w-full py-2 bg-red-600 text-white rounded-xl text-xs font-bold hover:bg-blue-600 transition-all flex items-center justify-center space-x-2 shadow-sm"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Exportar Relatório Vitgold (PDF/XLSX)</span>
              </button>
            </div>
          </div>

          {/* Card ANVISA & Conformidade */}
          <div className="bg-red-50/60 border border-red-200 rounded-2xl p-4 text-xs space-y-2">
            <div className="flex items-center space-x-2 text-red-800 font-bold">
              <ShieldCheck className="w-4 h-4 text-red-600" />
              <span>Garantia de Qualidade & ANVISA</span>
            </div>
            <p className="text-[11px] text-red-900 leading-relaxed">
              Todos os lotes possuem certificação analítica por cromatografia e pureza comprovada. Lote atual em despacho: <strong>VG-2026-MK7</strong> com 100% dos testes aprovados.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
