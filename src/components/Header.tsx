import React from 'react';
import { 
  Bell, 
  QrCode,
  ArrowRightLeft
} from 'lucide-react';
import type { UserRoleProfile } from '../types';

interface HeaderProps {
  currentProfile: UserRoleProfile;
  onProfileChange: (newProfile: UserRoleProfile) => void;
  activeTabLabel: string;
  onNavigateConversations: () => void;
}

export const Header: React.FC<HeaderProps> = ({ 
  currentProfile, 
  onProfileChange, 
  activeTabLabel,
  onNavigateConversations
}) => {
  const isVitgold = currentProfile === 'vitgold';

  return (
    <header 
      className={`sticky top-0 z-40 px-5 py-2.5 flex flex-wrap items-center justify-between gap-3 shadow-md transition-all duration-300 ${
        isVitgold 
          ? 'bg-gradient-to-r from-[#160607] via-[#22080A] to-[#120405] text-white border-b border-red-900/50 shadow-[0_4px_20px_rgba(220,38,38,0.15)]'
          : 'bg-[#030711] text-white border-b border-[#1E293B]'
      }`}
    >
      {/* Esquerda: Identidade do Perfil & Título do Módulo */}
      <div className="flex items-center space-x-3">
        {isVitgold ? (
          <div className="flex items-center space-x-2.5">
            <span className="w-8 h-8 rounded-xl bg-red-600 flex items-center justify-center text-white font-extrabold shadow-[0_0_15px_rgba(220,38,38,0.6)] animate-pulse">
              🌿
            </span>
            <div>
              <div className="flex items-center space-x-2">
                <span className="text-xs font-black tracking-tight text-white uppercase">
                  Vitgold Suplementos
                </span>
                <span className="text-[9px] bg-red-600/30 text-red-300 border border-red-500/40 px-2 py-0.2 rounded-full font-extrabold">
                  Operação E-commerce
                </span>
              </div>
              <h2 className="text-sm font-bold text-slate-200 tracking-tight flex items-center space-x-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-red-500"></span>
                <span>{activeTabLabel}</span>
              </h2>
            </div>
          </div>
        ) : (
          <div className="flex items-center space-x-2.5">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-[#2E86D0] to-[#4EC5E8] flex items-center justify-center text-[#03111C] font-black text-xs shadow-md shadow-[#4EC5E8]/20">
              ZH
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <span className="text-xs font-black tracking-tight text-white uppercase">
                  ZielHub CRM
                </span>
                <span className="text-[9px] bg-[#4EC5E8]/20 text-[#4EC5E8] border border-[#4EC5E8]/30 px-2 py-0.2 rounded-full font-extrabold">
                  Admin Geral
                </span>
              </div>
              <h2 className="text-sm font-bold text-slate-200 tracking-tight flex items-center space-x-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-[#4EC5E8]"></span>
                <span>{activeTabLabel}</span>
              </h2>
            </div>
          </div>
        )}
      </div>

      {/* Centro: TROCA DE PERFIL DIRETO NAS FOTOS (Avatares Interativos do Lucas e da Sofia) */}
      <div className="flex items-center space-x-2 bg-black/50 p-1.5 rounded-2xl border border-white/10 backdrop-blur-md shadow-inner">
        <span className="text-[10px] uppercase font-extrabold tracking-wider text-slate-400 pl-2 pr-1 hidden lg:flex items-center space-x-1">
          <ArrowRightLeft className="w-3 h-3 text-[#4EC5E8]" />
          <span>Trocar Perfil:</span>
        </span>

        {/* 1. Foto do Lucas (Admin Geral ZielHub) */}
        <button
          onClick={() => onProfileChange('admin')}
          title="Clique na foto para ativar o perfil Admin Geral (Lucas • ZielHub)"
          className={`group relative flex items-center space-x-2.5 px-3 py-1.5 rounded-xl transition-all duration-300 cursor-pointer ${
            !isVitgold
              ? 'bg-[#4EC5E8]/20 border border-[#4EC5E8] shadow-[0_0_15px_rgba(78,197,232,0.35)] scale-[1.02]'
              : 'opacity-50 hover:opacity-100 hover:bg-white/5 border border-transparent'
          }`}
        >
          <div className="relative">
            <img
              src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=120&h=120&q=80"
              alt="Lucas Admin"
              className={`w-8 h-8 rounded-full object-cover transition-all ${
                !isVitgold
                  ? 'ring-2 ring-[#4EC5E8]'
                  : 'grayscale-[50%] group-hover:grayscale-0'
              }`}
            />
            <span className={`w-2.5 h-2.5 rounded-full absolute -bottom-0.5 -right-0.5 border-2 border-[#030711] ${
              !isVitgold ? 'bg-[#4EC5E8] shadow-[0_0_8px_#4EC5E8]' : 'bg-slate-500'
            }`}></span>
          </div>

          <div className="text-left">
            <div className="flex items-center space-x-1.5">
              <span className={`text-xs font-bold leading-none ${!isVitgold ? 'text-white' : 'text-slate-400 group-hover:text-white'}`}>
                Lucas
              </span>
              {!isVitgold && (
                <span className="text-[8px] bg-[#4EC5E8] text-[#03111C] font-black px-1.5 py-0.2 rounded uppercase">
                  Ativo
                </span>
              )}
            </div>
            <span className="text-[9px] text-slate-400 block leading-tight mt-0.5">Admin ZielHub</span>
          </div>
        </button>

        <div className="h-6 w-[1px] bg-white/10"></div>

        {/* 2. Foto da Sofia / Vitgold (Operação Suplementos E-commerce) */}
        <button
          onClick={() => onProfileChange('vitgold')}
          title="Clique na foto para ativar o perfil Operacional Vitgold (Sofia • Suplementos & E-commerce)"
          className={`group relative flex items-center space-x-2.5 px-3 py-1.5 rounded-xl transition-all duration-300 cursor-pointer ${
            isVitgold
              ? 'bg-red-950/70 border border-red-500 shadow-[0_0_18px_rgba(220,38,38,0.5)] scale-[1.02]'
              : 'opacity-50 hover:opacity-100 hover:bg-white/5 border border-transparent'
          }`}
        >
          <div className="relative">
            <img
              src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=120&h=120&q=80"
              alt="Sofia Vitgold"
              className={`w-8 h-8 rounded-full object-cover transition-all ${
                isVitgold
                  ? 'ring-2 ring-red-500'
                  : 'grayscale-[50%] group-hover:grayscale-0'
              }`}
            />
            <span className={`w-2.5 h-2.5 rounded-full absolute -bottom-0.5 -right-0.5 border-2 border-[#030711] ${
              isVitgold ? 'bg-red-500 shadow-[0_0_8px_#EF4444]' : 'bg-slate-500'
            }`}></span>
          </div>

          <div className="text-left">
            <div className="flex items-center space-x-1.5">
              <span className={`text-xs font-bold leading-none ${isVitgold ? 'text-white' : 'text-slate-400 group-hover:text-white'}`}>
                Vitgold
              </span>
              {isVitgold && (
                <span className="text-[8px] bg-red-600 text-white font-black px-1.5 py-0.2 rounded uppercase shadow-sm">
                  Ativo
                </span>
              )}
            </div>
            <span className="text-[9px] text-red-300/80 block leading-tight mt-0.5">Operação Loja</span>
          </div>
        </button>
      </div>

      {/* Direita: Acesso às conversas WhatsApp & Notificações */}
      <div className="flex items-center space-x-3">
        {/* Status de Conexão Vitgold ou ZielHub */}
        {isVitgold ? (
          <div className="hidden xl:flex items-center space-x-2 bg-red-950/40 border border-red-800/40 px-3 py-1 rounded-xl text-[11px] text-red-200">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            <span>Loja vitgold.com.br Online</span>
          </div>
        ) : (
          <div className="hidden xl:flex items-center space-x-2 bg-[#0A1322] border border-[#1E293B] px-3 py-1 rounded-xl text-[11px] text-slate-300">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            <span>Pipeline KommoHub v2.6</span>
          </div>
        )}

        {/* Botão de Conexão WhatsApp Real Baileys */}
        <button
          onClick={onNavigateConversations}
          title="Abrir conversas e conexão do WhatsApp"
          className="px-3.5 py-1.5 bg-gradient-to-r from-emerald-600 to-teal-500 hover:from-emerald-500 hover:to-teal-400 text-white rounded-xl text-xs font-bold flex items-center space-x-1.5 shadow-[0_0_15px_rgba(16,185,129,0.3)] transition-all cursor-pointer"
        >
          <QrCode className="w-3.5 h-3.5" />
          <span>Conversas WhatsApp</span>
          <span className="w-2 h-2 rounded-full bg-white animate-pulse"></span>
        </button>

        <button 
          title="Notificações"
          className="relative p-2 text-slate-400 hover:text-white hover:bg-white/5 rounded-xl transition-colors cursor-pointer"
        >
          <Bell className="w-4 h-4" />
          <span className={`w-2 h-2 rounded-full absolute top-1.5 right-1.5 ${
            isVitgold ? 'bg-red-500 shadow-[0_0_8px_#EF4444]' : 'bg-[#4EC5E8] shadow-[0_0_8px_#4EC5E8]'
          }`}></span>
        </button>
      </div>
    </header>
  );
};
