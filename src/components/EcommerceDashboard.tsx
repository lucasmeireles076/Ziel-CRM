import React, { useState } from 'react';
import { 
  Calendar, 
  ChevronDown, 
  Info, 
  ArrowRight, 
  HelpCircle,
  TrendingUp,
  TrendingDown
} from 'lucide-react';
import { REVENUE_METRICS, DAILY_POINTS } from '../data/mockData';

export const EcommerceDashboard: React.FC = () => {
  const [period, setPeriod] = useState('Últimos 30 dias');
  const [hoveredPoint, setHoveredPoint] = useState<number | null>(null);

  // SVG Spline Math
  const width = 1100;
  const height = 240;
  const paddingX = 40;
  const paddingY = 20;

  const maxOrders = 15;
  const minOrders = 0;

  const points = DAILY_POINTS.map((pt, idx) => {
    const x = paddingX + (idx / (DAILY_POINTS.length - 1)) * (width - 2 * paddingX);
    const y = height - paddingY - ((pt.orders - minOrders) / (maxOrders - minOrders)) * (height - 2 * paddingY);
    return { x, y, pt };
  });

  // Calculate smooth SVG curve path (catmull-rom to cubic bezier)
  const createSmoothPath = (pts: { x: number; y: number }[]) => {
    if (pts.length === 0) return '';
    let d = `M ${pts[0].x} ${pts[0].y}`;
    for (let i = 0; i < pts.length - 1; i++) {
      const p0 = pts[i === 0 ? 0 : i - 1];
      const p1 = pts[i];
      const p2 = pts[i + 1];
      const p3 = pts[i + 2 < pts.length ? i + 2 : i + 1];

      const cp1x = p1.x + (p2.x - p0.x) / 6;
      const cp1y = p1.y + (p2.y - p0.y) / 6;
      const cp2x = p2.x - (p3.x - p1.x) / 6;
      const cp2y = p2.y - (p3.y - p1.y) / 6;

      d += ` C ${cp1x} ${cp1y}, ${cp2x} ${cp2y}, ${p2.x} ${p2.y}`;
    }
    return d;
  };

  const linePath = createSmoothPath(points);
  const areaPath = `${linePath} L ${points[points.length - 1].x} ${height - paddingY} L ${points[0].x} ${height - paddingY} Z`;

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6">
      {/* 1. Cabeçalho da Seção com Filtros de Período */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          {/* Breadcrumb / Seletor */}
          <button className="flex items-center space-x-1 text-xs text-[#64748B] hover:text-[#0F172A] mb-1 font-medium bg-[#F1F5F9] px-2.5 py-1 rounded border border-[#E2E8F0]">
            <span>Análise de ecommerce</span>
            <ChevronDown className="w-3 h-3 text-[#94A3B8]" />
          </button>
          <div className="flex items-center space-x-2">
            <h1 className="text-2xl font-bold text-[#0F172A]">Análise do ecommerce</h1>
            <Info className="w-4 h-4 text-[#94A3B8] cursor-pointer hover:text-[#475569]" />
          </div>
        </div>

        {/* Controles de Data e Atualização */}
        <div className="flex flex-col sm:flex-row sm:items-center gap-3">
          <div className="relative">
            <button 
              onClick={() => setPeriod(period === 'Últimos 30 dias' ? 'Últimos 7 dias' : 'Últimos 30 dias')}
              className="flex items-center space-x-2 bg-white border border-[#CBD5E1] rounded-md px-3 py-1.5 text-xs font-medium text-[#334155] shadow-sm hover:border-[#94A3B8] transition-colors"
            >
              <Calendar className="w-3.5 h-3.5 text-[#64748B]" />
              <span>Período: {period}</span>
              <ChevronDown className="w-3.5 h-3.5 text-[#94A3B8]" />
            </button>
          </div>
          <span className="text-[11px] text-[#94A3B8]">
            Última atualização em: 12/10/2026
          </span>
        </div>
      </div>

      {/* 3. Funil de Conversão do E-commerce Vitgold (Fiel ao Print 1) */}
      <div className="bg-white border border-[#E2E8F0] rounded-xl p-4 shadow-sm">
        <div className="flex flex-col md:flex-row items-stretch justify-between gap-3 relative">
          
          {/* Etapa 1: Visitas */}
          <div className="flex-1 bg-[#F8FAFC] rounded-lg p-5 border border-[#E2E8F0] flex flex-col justify-center items-center text-center">
            <span className="text-[11px] font-bold text-[#64748B] tracking-wider uppercase mb-1">
              VISITAS
            </span>
            <span className="text-3xl font-extrabold text-[#0F172A]">
              19.978
            </span>
          </div>

          {/* Conector 1: Taxa de Conversão */}
          <div className="flex items-center justify-center -my-2 md:-mx-2 z-10">
            <div className="bg-[#1E293B] text-white text-[11px] font-bold px-2.5 py-1 rounded-md shadow-sm flex items-center space-x-1">
              <span>1,36%</span>
              <ArrowRight className="w-3 h-3 text-[#94A3B8]" />
            </div>
          </div>

          {/* Etapa 2: Pedidos Realizados */}
          <div className="flex-1 bg-[#F8FAFC] rounded-lg p-5 border border-[#E2E8F0] flex flex-col justify-center items-center text-center">
            <span className="text-[11px] font-bold text-[#64748B] tracking-wider uppercase mb-1">
              PEDIDOS REALIZADOS
            </span>
            <span className="text-3xl font-extrabold text-[#0F172A]">
              271
            </span>
          </div>

          {/* Conector 2: Taxa de Conversão */}
          <div className="flex items-center justify-center -my-2 md:-mx-2 z-10">
            <div className="bg-[#1E293B] text-white text-[11px] font-bold px-2.5 py-1 rounded-md shadow-sm flex items-center space-x-1">
              <span>87,82%</span>
              <ArrowRight className="w-3 h-3 text-[#94A3B8]" />
            </div>
          </div>

          {/* Etapa 3: Pedidos Pagos (Destaque Ciano RD) */}
          <div className="flex-1 bg-[#00B4D8] rounded-lg p-5 shadow-sm flex flex-col justify-center items-center text-center text-white">
            <span className="text-[11px] font-bold text-[#07192C]/80 tracking-wider uppercase mb-1">
              PEDIDOS PAGOS
            </span>
            <span className="text-3xl font-black text-[#07192C]">
              238
            </span>
          </div>
        </div>

        {/* 4. Gráfico de Spline Diária de Pedidos Pagos (Fiel ao Print 1) */}
        <div className="mt-8 pt-4 border-t border-[#F1F5F9]">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-2">
              <span className="text-xs font-semibold text-[#334155]">Evolução Temporal</span>
            </div>
            <button className="flex items-center space-x-1.5 text-xs text-[#475569] border border-[#CBD5E1] rounded px-2.5 py-1 bg-white hover:bg-[#F8FAFC]">
              <span>Visualizar por dia</span>
              <ChevronDown className="w-3 h-3 text-[#94A3B8]" />
            </button>
          </div>

          {/* Gráfico SVG Puro com Spline ZielHub Electric Cyan & Technical Blue */}
          <div className="relative w-full overflow-x-auto">
            <svg 
              viewBox={`0 0 ${width} ${height}`} 
              className="w-full h-auto min-w-[700px] overflow-visible"
            >
              <defs>
                <linearGradient id="zielhubGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#4EC5E8" stopOpacity="0.30" />
                  <stop offset="80%" stopColor="#2E86D0" stopOpacity="0.05" />
                  <stop offset="100%" stopColor="#2E86D0" stopOpacity="0.0" />
                </linearGradient>
              </defs>

              {/* Linhas de Grade Horizontais */}
              {[1, 4, 7, 11, 14].map((val) => {
                const y = height - paddingY - ((val - minOrders) / (maxOrders - minOrders)) * (height - 2 * paddingY);
                return (
                  <g key={val}>
                    <line
                      x1={paddingX}
                      y1={y}
                      x2={width - paddingX}
                      y2={y}
                      stroke="#F1F5F9"
                      strokeWidth="1"
                    />
                    <text
                      x={paddingX - 12}
                      y={y + 3}
                      fill="#94A3B8"
                      fontSize="10"
                      textAnchor="end"
                      fontFamily="Inter, sans-serif"
                    >
                      {val}
                    </text>
                  </g>
                );
              })}

              {/* Área com Preenchimento Gradiente ZielHub */}
              <path d={areaPath} fill="url(#zielhubGrad)" />

              {/* Linha Curva em Spline ZielHub Blue */}
              <path
                d={linePath}
                fill="none"
                stroke="#2E86D0"
                strokeWidth="2.2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />

              {/* Pontos e Tooltip Interativo */}
              {points.map((pt, idx) => {
                const isHovered = hoveredPoint === idx;
                return (
                  <g key={idx}>
                    {/* Linha Guia Vertical no Hover */}
                    {isHovered && (
                      <line
                        x1={pt.x}
                        y1={paddingY}
                        x2={pt.x}
                        y2={height - paddingY}
                        stroke="#4EC5E8"
                        strokeDasharray="3 3"
                        strokeWidth="1"
                        opacity="0.8"
                      />
                    )}

                    {/* Ponto Clicável */}
                    <circle
                      cx={pt.x}
                      cy={pt.y}
                      r={isHovered ? 5.5 : 2.5}
                      fill={isHovered ? '#4EC5E8' : '#2E86D0'}
                      stroke="#FFFFFF"
                      strokeWidth={isHovered ? 2 : 0}
                      className="cursor-pointer transition-all"
                      onMouseEnter={() => setHoveredPoint(idx)}
                      onMouseLeave={() => setHoveredPoint(null)}
                    />

                    {/* Labels do Eixo X */}
                    {(idx % 2 === 0 || idx === DAILY_POINTS.length - 1) && (
                      <text
                        x={pt.x}
                        y={height - 4}
                        fill="#94A3B8"
                        fontSize="9"
                        textAnchor="middle"
                        fontFamily="Inter, sans-serif"
                      >
                        {pt.pt.day}
                      </text>
                    )}
                  </g>
                );
              })}
            </svg>

            {/* Tooltip Flutuante no Hover */}
            {hoveredPoint !== null && (
              <div 
                className="absolute z-20 bg-[#0F172A] text-white text-xs rounded-xl px-3 py-2 shadow-lg pointer-events-none transform -translate-x-1/2 -translate-y-full border border-[#1E293B]"
                style={{
                  left: `${(points[hoveredPoint].x / width) * 100}%`,
                  top: `${(points[hoveredPoint].y / height) * 100}%`
                }}
              >
                <div className="font-bold text-[#4EC5E8]">{points[hoveredPoint].pt.day}</div>
                <div className="text-[11px] text-slate-200">
                  Pedidos Pagos: <span className="font-bold text-white">{points[hoveredPoint].pt.orders}</span>
                </div>
                <div className="text-[11px] text-slate-200">
                  Receita Estimada: <span className="font-bold text-emerald-400">R$ {points[hoveredPoint].pt.revenue.toLocaleString('pt-BR')},00</span>
                </div>
              </div>
            )}
          </div>

          {/* Legenda do Gráfico */}
          <div className="flex items-center justify-center space-x-2 mt-4 text-xs text-[#64748B]">
            <div className="w-4 h-0.5 bg-[#2E86D0] rounded-full"></div>
            <span className="font-medium">Pedidos Pagos</span>
          </div>
        </div>
      </div>

      {/* 5. Performance de Receita (Fiel ao Print 1) */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-1.5">
            <h2 className="text-base font-bold text-[#0F172A]">Performance de receita</h2>
            <Info className="w-3.5 h-3.5 text-[#94A3B8] cursor-pointer" />
          </div>
          <button className="flex items-center space-x-1 text-xs text-[#007791] hover:underline font-medium">
            <span>Seus números estão diferentes?</span>
            <HelpCircle className="w-3.5 h-3.5 text-[#007791]" />
          </button>
        </div>

        {/* Grid dos 4 Cards de Métricas Financeiras */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {REVENUE_METRICS.map((metric, idx) => (
            <div 
              key={idx}
              className="bg-white border border-[#E2E8F0] rounded-xl p-4 shadow-sm hover:border-[#CBD5E1] transition-all flex flex-col justify-between"
            >
              <div>
                <span className="text-[11px] font-bold text-[#64748B] tracking-wider uppercase block mb-1.5">
                  {metric.title}
                </span>
                <span className="text-2xl font-black text-[#0F172A] block tracking-tight">
                  {metric.value}
                </span>
              </div>
              <div className="mt-3 pt-2.5 border-t border-[#F8FAFC] flex items-center space-x-1.5 text-xs">
                {metric.changePositive ? (
                  <TrendingUp className="w-3.5 h-3.5 text-[#16A34A] flex-shrink-0" />
                ) : (
                  <TrendingDown className="w-3.5 h-3.5 text-[#E11D48] flex-shrink-0" />
                )}
                <span className={`text-[11px] font-semibold ${
                  metric.changePositive ? 'text-[#16A34A]' : 'text-[#E11D48]'
                }`}>
                  {metric.changePercent}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
