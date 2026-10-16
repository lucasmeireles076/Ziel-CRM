import React from 'react';
import { 
  MessageSquare, 
  Bot, 
  Kanban, 
  Award, 
  Send, 
  Target, 
  BarChart3, 
  LineChart, 
  FileSpreadsheet, 
  Users, 
  Share2, 
  ArrowRightLeft
} from 'lucide-react';
import type { NavigationTab, UserRoleProfile } from '../types';

interface SidebarProps {
  activeTab: NavigationTab;
  onTabChange: (tab: NavigationTab) => void;
  currentProfile: UserRoleProfile;
  onProfileChange: (profile: UserRoleProfile) => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  activeTab,
  onTabChange,
  currentProfile,
  onProfileChange
}) => {
  const isVitgold = currentProfile === 'vitgold';

  // 1. Menu e Ordem de Botões para o Perfil ADMIN GERAL (ZielHub)
  // Foco em Gestão Executiva, CRM, BI e Inteligência
  const adminMenuCategories = [
    {
      category: 'Comercial & CRM',
      items: [
        { id: 'funis' as NavigationTab, label: 'Pipeline Kanban (Hold & Drop)', icon: Kanban, badge: 'Vendas' },
        { id: 'scoring' as NavigationTab, label: 'Perfil & Lead Scoring', icon: Award, badge: 'Score IA' }
      ]
    },
    {
      category: 'Inteligência & BI',
      items: [
        { id: 'bi' as NavigationTab, label: 'Painel BI & Forecast', icon: LineChart, badge: 'Previsões' },
        { id: 'importador' as NavigationTab, label: 'Importador de Planilha', icon: FileSpreadsheet, badge: 'Excel/CSV' }
      ]
    },
    {
      category: 'Atendimento & Chat',
      items: [
        { id: 'conversas' as NavigationTab, label: 'Conversas Omnichannel', icon: MessageSquare, badge: 'Live' },
        { id: 'agente' as NavigationTab, label: 'Agente IA (Sofia)', icon: Bot, badge: 'Auto-Pilot' }
      ]
    },
    {
      category: 'Marketing & Campanhas',
      items: [
        { id: 'campanhas' as NavigationTab, label: 'Disparos & Campanhas', icon: Send, badge: 'Meta API' },
        { id: 'tracking' as NavigationTab, label: 'Lead Tracking & Pixel', icon: Target }
      ]
    },
    {
      category: 'Gestão & Integrações',
      items: [
        { id: 'equipe-vitgold' as NavigationTab, label: 'Equipe, Uso & Tempo', icon: Users, badge: 'Tags' },
        { id: 'integracoes' as NavigationTab, label: 'Central de Integrações', icon: Share2, badge: '5 Ativas' }
      ]
    }
  ];

  // 2. Menu e Ordem de Botões para o Perfil OPERACIONAL VITGOLD
  // Foco em Operação de Loja, Suplementos, Sofia IA Nutricional e Pedidos (REORGANIZADO)
  const vitgoldMenuCategories = [
    {
      category: '🏪 Operação Loja & E-commerce',
      items: [
        { id: 'ecommerce' as NavigationTab, label: 'Painel Operacional Vitgold', icon: BarChart3, badge: 'Loja Oficial' },
        { id: 'tracking' as NavigationTab, label: 'Rastreamento de Pedidos & Loja', icon: Target, badge: 'vitgold.com.br' }
      ]
    },
    {
      category: '💬 Atendimento & Nutrição',
      items: [
        { id: 'conversas' as NavigationTab, label: 'Conversas Omnichannel', icon: MessageSquare, badge: 'Sofia IA' },
        { id: 'agente' as NavigationTab, label: 'Sofia Consultora Nutricional', icon: Bot, badge: 'Ativa' }
      ]
    },
    {
      category: '👥 Gestão da Equipe Vitgold',
      items: [
        { id: 'equipe-vitgold' as NavigationTab, label: 'Equipe, Uso & Tempo', icon: Users, badge: 'Score Equipe' }
      ]
    },
    {
      category: '📦 Importação & Giro de Estoque',
      items: [
        { id: 'importador' as NavigationTab, label: 'Importador de Pedidos & Planilhas', icon: FileSpreadsheet, badge: 'Relatórios' },
        { id: 'bi' as NavigationTab, label: 'Análise BI & Giro de Estoque', icon: LineChart, badge: 'Previsão SKUs' }
      ]
    },
    {
      category: '📢 Campanhas & Prescritores',
      items: [
        { id: 'campanhas' as NavigationTab, label: 'Disparos & Campanhas', icon: Send, badge: 'LUCAS10' },
        { id: 'funis' as NavigationTab, label: 'Pipeline de Prescritores & Nutris', icon: Kanban },
        { id: 'scoring' as NavigationTab, label: 'Score Clínico de Clientes', icon: Award }
      ]
    },
    {
      category: '⚙️ Conexões da Loja',
      items: [
        { id: 'integracoes' as NavigationTab, label: 'Central de Integrações', icon: Share2, badge: 'Irroba/WhatsApp' }
      ]
    }
  ];

  // Seleciona as categorias e a ordem dos botões conforme o perfil ativo
  const menuCategories = isVitgold ? vitgoldMenuCategories : adminMenuCategories;

  return (
    <aside 
      className={`w-64 border-r flex flex-col justify-between flex-shrink-0 select-none min-h-screen transition-colors duration-300 ${
        isVitgold 
          ? 'bg-[#0E0304] border-red-950/60 text-slate-300' 
          : 'bg-[#030711] border-[#1E293B] text-slate-300'
      }`}
    >
      <div>
        {/* 1. Header do Sidebar: Logo de Marca Personalizado conforme o Perfil */}
        <div 
          className={`p-4 border-b flex items-center justify-between transition-colors ${
            isVitgold 
              ? 'bg-[#180507] border-red-950/70' 
              : 'bg-[#060D1A] border-[#1E293B]'
          }`}
        >
          {isVitgold ? (
            <div className="flex items-center space-x-2.5">
              <div className="w-8 h-8 rounded-xl bg-red-600 flex items-center justify-center text-white font-extrabold text-sm shadow-[0_0_15px_rgba(220,38,38,0.6)]">
                🌿
              </div>
              <div>
                <div className="flex items-center space-x-1.5">
                  <span className="font-extrabold text-white text-sm tracking-tight">Vitgold</span>
                  <span className="text-[9px] font-bold bg-red-600/30 text-red-300 px-1.5 py-0.2 rounded border border-red-500/40">
                    OFICIAL
                  </span>
                </div>
                <span className="text-[10px] text-red-300/70 block leading-tight">Loja & Suplementação</span>
              </div>
            </div>
          ) : (
            <div className="flex items-center space-x-2.5">
              <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-[#2E86D0] to-[#4EC5E8] flex items-center justify-center text-[#03111C] font-black text-sm shadow-md shadow-[#4EC5E8]/20">
                Z
              </div>
              <div>
                <div className="flex items-center space-x-1.5">
                  <span className="font-extrabold text-white text-sm tracking-tight">ZielHub</span>
                  <span className="text-[10px] font-bold bg-[#4EC5E8]/10 text-[#4EC5E8] px-1.5 py-0.2 rounded border border-[#4EC5E8]/20">
                    CRM
                  </span>
                </div>
                <span className="text-[10px] text-slate-400 block leading-tight">Hub Central de Gestão</span>
              </div>
            </div>
          )}
        </div>

        {/* 2. Card de Identidade do Perfil com Avatar e Troca Rápida */}
        <div 
          className={`p-3 border-b transition-colors ${
            isVitgold 
              ? 'bg-[#150406] border-red-950/60' 
              : 'bg-[#0A1322] border-[#1E293B]/60'
          }`}
        >
          <div className="flex items-center justify-between mb-1.5">
            <span className="text-[9px] uppercase font-extrabold tracking-wider text-slate-400">
              Perfil Ativo
            </span>
            <button
              onClick={() => onProfileChange(isVitgold ? 'admin' : 'vitgold')}
              className={`text-[10px] font-bold flex items-center space-x-1 transition-colors ${
                isVitgold ? 'text-red-400 hover:text-blue-400' : 'text-[#4EC5E8] hover:text-white'
              }`}
              title="Clique para alternar de perfil"
            >
              <ArrowRightLeft className="w-3 h-3" />
              <span>Alternar</span>
            </button>
          </div>

          <div 
            onClick={() => onProfileChange(isVitgold ? 'admin' : 'vitgold')}
            className={`p-2 rounded-xl border flex items-center space-x-2.5 cursor-pointer transition-all ${
              isVitgold
                ? 'bg-red-950/30 border-red-800/40 hover:border-blue-500'
                : 'bg-[#030711] border-[#1E293B] hover:border-[#4EC5E8]'
            }`}
          >
            <img
              src={
                isVitgold
                  ? 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=120&h=120&q=80'
                  : 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=120&h=120&q=80'
              }
              alt="Avatar do Perfil"
              className={`w-7 h-7 rounded-full object-cover ring-2 ${
                isVitgold ? 'ring-red-500' : 'ring-[#4EC5E8]'
              }`}
            />
            <div className="flex-1 min-w-0">
              <span className="text-xs font-bold text-white block truncate">
                {isVitgold ? 'Sofia • Vitgold' : 'Lucas • ZielHub'}
              </span>
              <span className={`text-[10px] block truncate ${isVitgold ? 'text-red-300' : 'text-[#4EC5E8]'}`}>
                {isVitgold ? 'Opções em Vermelho • Hover Azul' : 'Visão Executiva & BI'}
              </span>
            </div>
          </div>
        </div>

        {/* 3. Menus Verticais com Ordem e Cores que Mudam Conforme o Perfil */}
        <div className="py-3 px-2 space-y-4 overflow-y-auto max-h-[calc(100vh-230px)] scrollbar-none">
          {menuCategories.map((group, gIdx) => (
            <div key={gIdx} className="space-y-1">
              <div className={`px-2.5 py-1 text-[10px] font-extrabold uppercase tracking-widest ${
                isVitgold ? 'text-red-400/90' : 'text-slate-400'
              }`}>
                {group.category}
              </div>

              <div className="space-y-0.5">
                {group.items.map((item) => {
                  const Icon = item.icon;
                  const isActive = activeTab === item.id;

                  // No perfil Vitgold: OPÇÃO EM VERMELHO e HOVER EM AZUL (Diretriz explícita do usuário)
                  // No perfil Admin: Ciano ZielHub com hover azul marinho
                  const buttonStyle = isVitgold
                    ? isActive
                      ? 'bg-red-600 text-white shadow-[0_0_18px_rgba(220,38,38,0.5)] font-bold'
                      : 'text-slate-300 hover:bg-blue-600 hover:text-white'
                    : isActive
                      ? 'bg-[#4EC5E8] text-[#03111C] shadow-[0_0_20px_rgba(78,197,232,0.25)] font-bold'
                      : 'text-slate-300 hover:bg-[#0E1A2D] hover:text-white';

                  return (
                    <button
                      key={item.id}
                      onClick={() => onTabChange(item.id)}
                      className={`w-full flex items-center justify-between px-2.5 py-2 rounded-xl text-xs font-medium transition-all group cursor-pointer ${buttonStyle}`}
                    >
                      <div className="flex items-center space-x-2.5 min-w-0">
                        <Icon className={`w-4 h-4 flex-shrink-0 transition-colors ${
                          isActive 
                            ? isVitgold ? 'text-white' : 'text-[#03111C]'
                            : isVitgold 
                              ? 'text-slate-400 group-hover:text-white' 
                              : 'text-slate-400 group-hover:text-[#4EC5E8]'
                        }`} />
                        <span className="truncate">{item.label}</span>
                      </div>

                      {item.badge && (
                        <span className={`text-[10px] font-bold px-1.5 py-0.2 rounded-md ${
                          isActive 
                            ? isVitgold
                              ? 'bg-white/20 text-white'
                              : 'bg-[#03111C]/20 text-[#03111C]' 
                            : isVitgold
                              ? 'bg-red-950/60 text-red-300 group-hover:bg-blue-700 group-hover:text-white'
                              : 'bg-[#1E293B] text-slate-400 group-hover:text-slate-200'
                        }`}>
                          {item.badge}
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 4. Rodapé do Sidebar: Status Dinâmico */}
      <div 
        className={`p-3 border-t transition-colors ${
          isVitgold 
            ? 'bg-[#150406] border-red-950/70' 
            : 'bg-[#060D1A] border-[#1E293B]'
        }`}
      >
        {isVitgold ? (
          <div className="space-y-1.5 text-[11px]">
            <div className="flex items-center justify-between">
              <span className="text-red-300 flex items-center space-x-1.5">
                <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse"></span>
                <span>vitgold.com.br</span>
              </span>
              <span className="text-[10px] text-emerald-400 font-mono font-bold">14.820 un</span>
            </div>
            <div className="text-[10px] text-slate-400 flex items-center justify-between">
              <span>Cupom Ativo</span>
              <span className="font-mono text-white font-bold bg-red-700/60 px-1.5 py-0.2 rounded">LUCAS10</span>
            </div>
          </div>
        ) : (
          <div className="space-y-1.5 text-[11px]">
            <div className="flex items-center justify-between">
              <span className="text-slate-400 flex items-center space-x-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                <span>API Meta Oficial</span>
              </span>
              <span className="text-[10px] text-emerald-400 font-mono font-bold">200 OK</span>
            </div>
            <div className="text-[10px] text-slate-400 flex items-center justify-between">
              <span>ZielHub KommoHub</span>
              <span className="font-mono text-[#4EC5E8] font-bold">v2.6</span>
            </div>
          </div>
        )}
      </div>
    </aside>
  );
};
