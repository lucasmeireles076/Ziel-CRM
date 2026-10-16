import React from 'react';
import { 
  BarChart3, 
  Target, 
  Award, 
  MessageSquare, 
  Bot, 
  Kanban, 
  Share2
} from 'lucide-react';
import type { NavigationTab } from '../types';

interface NavigationProps {
  activeTab: NavigationTab;
  onTabChange: (tab: NavigationTab) => void;
}

export const Navigation: React.FC<NavigationProps> = ({ activeTab, onTabChange }) => {
  const tabs = [
    { id: 'ecommerce' as NavigationTab, label: 'Análise de E-commerce', icon: BarChart3, badge: 'RD DS' },
    { id: 'tracking' as NavigationTab, label: 'Lead Tracking', icon: Target, badge: 'Vitgold' },
    { id: 'scoring' as NavigationTab, label: 'Perfil & Interesse (Scoring)', icon: Award },
    { id: 'conversas' as NavigationTab, label: 'Conversas (ZielHub)', icon: MessageSquare, badge: 'Live' },
    { id: 'agente' as NavigationTab, label: 'Agente de IA', icon: Bot },
    { id: 'funis' as NavigationTab, label: 'Funis & Pipeline', icon: Kanban },
    { id: 'integracoes' as NavigationTab, label: 'Central de Integrações', icon: Share2, badge: '5 Ativas' }
  ];

  return (
    <nav className="bg-white border-b border-[#E2E8F0] px-6 overflow-x-auto scrollbar-none">
      <div className="flex space-x-1 min-w-max">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              className={`flex items-center space-x-2 py-3.5 px-3.5 text-xs font-medium border-b-2 transition-all relative ${
                isActive
                  ? 'border-[#00B4D8] text-[#07192C] font-semibold'
                  : 'border-transparent text-[#64748B] hover:text-[#07192C] hover:border-[#CBD5E1]'
              }`}
            >
              <Icon className={`w-4 h-4 ${isActive ? 'text-[#00B4D8]' : 'text-[#94A3B8]'}`} />
              <span>{tab.label}</span>
              {tab.badge && (
                <span className={`text-[10px] px-1.5 py-0.5 rounded font-semibold ${
                  isActive 
                    ? 'bg-[#E0F7FA] text-[#007791]' 
                    : 'bg-[#F1F5F9] text-[#64748B]'
                }`}>
                  {tab.badge}
                </span>
              )}
            </button>
          );
        })}
      </div>
    </nav>
  );
};
