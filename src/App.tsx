import { useState } from 'react';
import { Sidebar } from './components/Sidebar';
import { Header } from './components/Header';
import { EcommerceDashboard } from './components/EcommerceDashboard';
import { LeadTrackingView } from './components/LeadTrackingView';
import { LeadScoringView } from './components/LeadScoringView';
import { ConversasView } from './components/ConversasView';
import { AgenteIAView } from './components/AgenteIAView';
import { FunisView } from './components/FunisView';
import { IntegracoesView } from './components/IntegracoesView';
import { CampanhasView } from './components/CampanhasView';
import { BIView } from './components/BIView';
import { ImportadorPlanilhaView } from './components/ImportadorPlanilhaView';
import { EquipeVitgoldView } from './components/EquipeVitgoldView';
import { VitgoldDashboard } from './components/VitgoldDashboard';
import type { NavigationTab, UserRoleProfile } from './types';

export function App() {
  const [activeTab, setActiveTab] = useState<NavigationTab>('conversas');
  const [currentProfile, setCurrentProfile] = useState<UserRoleProfile>('admin');

  const isVitgold = currentProfile === 'vitgold';

  // Mapeamento dos títulos das abas para o Header (contextual por perfil)
  const tabTitles: Record<NavigationTab, string> = {
    'conversas': isVitgold ? 'Conversas WhatsApp & SDR Sofia' : 'Central de Conversas Omnichannel',
    'agente': isVitgold ? 'Agente SDR Sofia (Vitgold)' : 'Configuração do Agente de IA',
    'funis': isVitgold ? 'Pipeline de Prescritores & Nutricionistas' : 'Pipeline Comercial Kanban (Hold & Drop)',
    'scoring': isVitgold ? 'Score Clínico de Recompra de Clientes' : 'Perfil & Lead Scoring (Contatos & IA)',
    'campanhas': isVitgold ? 'Campanhas de Suplementos (Meta Ads / Cupom LUCAS10)' : 'Gestão & Cadastro de Campanhas',
    'tracking': isVitgold ? 'Rastreamento de Pedidos & E-commerce Vitgold' : 'Lead Tracking & Pixel E-commerce',
    'ecommerce': isVitgold ? 'Painel Operacional Vitgold (Loja vitgold.com.br)' : 'Análise de E-commerce Vitgold',
    'bi': isVitgold ? 'BI & Previsão de Giro de Estoque por SKU' : 'Business Intelligence & Forecast',
    'importador': isVitgold ? 'Importador de Planilha de Pedidos Vitgold' : 'Importador de Planilha para Dashboard',
    'equipe-vitgold': 'Equipe Vitgold (Controle de Uso, Tempo & Tags)',
    'integracoes': isVitgold ? 'Integrações de Loja (Irroba, WhatsApp, Meta)' : 'Central de Integrações e APIs'
  };

  const handleProfileChange = (newProfile: UserRoleProfile) => {
    setCurrentProfile(newProfile);
    if (newProfile === 'vitgold') {
      // Ao clicar na foto da Vitgold, a tela toda muda imediatamente para o painel operacional da Vitgold
      setActiveTab('ecommerce');
    } else {
      // Ao clicar na foto do Lucas, a tela toda muda imediatamente para o pipeline/chat executivo ZielHub
      setActiveTab('funis');
    }
  };

  return (
    <div 
      className={`min-h-screen flex font-sans transition-colors duration-300 ${
        isVitgold 
          ? 'bg-[#FDFBFB] text-slate-900' 
          : 'bg-[#F8FAFC] text-slate-800'
      }`}
    >
      {/* 1. Menu Lateral na Vertical: Ordem dos botões e cores mudam com o perfil */}
      <Sidebar
        activeTab={activeTab}
        onTabChange={setActiveTab}
        currentProfile={currentProfile}
        onProfileChange={handleProfileChange}
      />

      {/* 2. Container Principal */}
      <div className="flex-1 flex flex-col min-w-0 overflow-y-auto max-h-screen">
        {/* Header Superior com Troca de Perfil DIRETO NAS FOTOS DOS AVATARES */}
        <Header 
          currentProfile={currentProfile}
          onProfileChange={handleProfileChange}
          activeTabLabel={tabTitles[activeTab]}
          onNavigateConversations={() => setActiveTab('conversas')}
        />

        {/* Faixa Superior Notificando a Troca de Contexto do Perfil */}
        {isVitgold ? (
          <div className="bg-gradient-to-r from-red-600 via-rose-600 to-red-700 text-white px-6 py-1.5 text-xs font-bold flex items-center justify-between shadow-sm animate-in fade-in">
            <div className="flex items-center space-x-2">
              <span className="w-2 h-2 rounded-full bg-white animate-pulse"></span>
              <span>Modo Operação Vitgold Ativo: Menus reordenados para priorizar vendas, pedidos e atendimento Sofia IA.</span>
            </div>
            <span className="hidden sm:inline bg-black/20 text-white px-2 py-0.5 rounded text-[10px] font-mono">
              Opções em Vermelho • Hover em Azul
            </span>
          </div>
        ) : (
          <div className="bg-[#03111C] border-b border-[#1E293B] text-slate-300 px-6 py-1 text-[11px] font-medium flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#4EC5E8]"></span>
              <span className="text-slate-300">Modo Executivo ZielHub Admin: Foco em Pipeline Comercial, BI, Forecast e Automação de IA.</span>
            </div>
            <span className="text-[10px] text-[#4EC5E8] font-bold">
              Tema ZielHub Ciano/Azul
            </span>
          </div>
        )}

        {/* Área de Conteúdo da Aba Ativa */}
        <main className="flex-1 pb-10">
          {/* Se estiver no perfil Vitgold e na aba ecommerce, exibe o VitgoldDashboard especializado */}
          {isVitgold && activeTab === 'ecommerce' ? (
            <VitgoldDashboard />
          ) : (
            <>
              {activeTab === 'conversas' && <ConversasView />}
              {activeTab === 'agente' && <AgenteIAView />}
              {activeTab === 'funis' && <FunisView />}
              {activeTab === 'scoring' && <LeadScoringView />}
              {activeTab === 'campanhas' && <CampanhasView />}
              {activeTab === 'tracking' && <LeadTrackingView />}
              {activeTab === 'ecommerce' && <EcommerceDashboard />}
              {activeTab === 'bi' && <BIView />}
              {activeTab === 'importador' && <ImportadorPlanilhaView />}
              {activeTab === 'equipe-vitgold' && <EquipeVitgoldView />}
              {activeTab === 'integracoes' && <IntegracoesView />}
            </>
          )}
        </main>
      </div>

    </div>
  );
}

export default App;
