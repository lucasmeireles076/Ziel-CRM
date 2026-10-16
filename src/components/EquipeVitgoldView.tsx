import React, { useState } from 'react';
import { 
  Clock, 
  Tag, 
  Plus, 
  MoreVertical
} from 'lucide-react';
import { VITGOLD_TEAM } from '../data/mockData';
import type { VitgoldTeamMember } from '../types';

export const EquipeVitgoldView: React.FC = () => {
  const [team, setTeam] = useState<VitgoldTeamMember[]>(VITGOLD_TEAM);
  const [showAddModal, setShowAddModal] = useState(false);
  const [newName, setNewName] = useState('');
  const [newEmail, setNewEmail] = useState('');
  const [newRoleTag, setNewRoleTag] = useState<VitgoldTeamMember['roleTag']>('Nutricionista & Consultora');

  const handleAddMember = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newName.trim() || !newEmail.trim()) return;

    const newMember: VitgoldTeamMember = {
      id: `u-${Date.now()}`,
      name: newName,
      email: newEmail,
      avatar: newName.substring(0, 2).toUpperCase(),
      roleTag: newRoleTag,
      status: 'Online',
      onlineTimeToday: '0h 05m',
      avgResponseTime: '1m 20s',
      conversationsToday: 0,
      totalRevenueMonth: 0,
      satisfactionScore: 5.0
    };

    setTeam([...team, newMember]);
    setShowAddModal(false);
    setNewName('');
    setNewEmail('');
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
            <span>Gestão da Equipe Vitgold</span>
            <span className="text-xs bg-emerald-100 text-emerald-800 font-bold px-2.5 py-0.5 rounded-full border border-emerald-200">
              Controle de Uso, Tempo & Tags
            </span>
          </h1>
          <p className="text-xs text-[#64748B]">
            Acompanhamento em tempo real de horas trabalhadas, SLA de resposta, tags funcionais e conversões
          </p>
        </div>

        <button
          onClick={() => setShowAddModal(true)}
          className="px-4 py-2 bg-[#10B981] hover:bg-[#059669] text-white rounded-lg text-xs font-semibold flex items-center space-x-1.5 shadow-sm transition-all"
        >
          <Plus className="w-3.5 h-3.5" />
          <span>Adicionar Usuário / Atendente</span>
        </button>
      </div>

      {/* Grid de Resumo de Produtividade da Equipe */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white border border-[#E2E8F0] rounded-xl p-5 shadow-sm">
          <span className="text-[11px] font-bold text-[#64748B] uppercase tracking-wider block mb-1">
            Atendentes Online Agora
          </span>
          <div className="flex items-center space-x-2">
            <span className="text-2xl font-black text-[#0F172A]">
              {team.filter(t => t.status === 'Online' || t.status === 'Em Atendimento').length}
            </span>
            <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded">
              de {team.length} membros
            </span>
          </div>
          <span className="text-[11px] text-slate-500 block mt-1">
            Capacidade de fila em 100%
          </span>
        </div>

        <div className="bg-white border border-[#E2E8F0] rounded-xl p-5 shadow-sm">
          <span className="text-[11px] font-bold text-[#64748B] uppercase tracking-wider block mb-1">
            Tempo Médio de Resposta (SLA)
          </span>
          <div className="flex items-center space-x-2">
            <span className="text-2xl font-black text-[#2E86D0]">1m 18s</span>
            <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded">
              Meta: &lt; 3m
            </span>
          </div>
          <span className="text-[11px] text-slate-500 block mt-1">
            Resposta imediata aos clientes
          </span>
        </div>

        <div className="bg-white border border-[#E2E8F0] rounded-xl p-5 shadow-sm">
          <span className="text-[11px] font-bold text-[#64748B] uppercase tracking-wider block mb-1">
            Conversas Atendidas Hoje
          </span>
          <div className="flex items-center space-x-2">
            <span className="text-2xl font-black text-[#0E7490]">
              {team.reduce((acc, curr) => acc + curr.conversationsToday, 0)}
            </span>
            <span className="text-xs font-bold text-[#03111C] bg-[#4EC5E8]/20 px-2 py-0.5 rounded">
              + IA Sofia
            </span>
          </div>
          <span className="text-[11px] text-slate-500 block mt-1">
            WhatsApp e Instagram integrados
          </span>
        </div>

        <div className="bg-white border border-[#E2E8F0] rounded-xl p-5 shadow-sm">
          <span className="text-[11px] font-bold text-[#64748B] uppercase tracking-wider block mb-1">
            Satisfação do Cliente (CSAT)
          </span>
          <div className="flex items-center space-x-2">
            <span className="text-2xl font-black text-amber-500">4.9 / 5.0</span>
            <span className="text-xs font-bold text-amber-700 bg-amber-50 px-2 py-0.5 rounded">
              Excelente
            </span>
          </div>
          <span className="text-[11px] text-slate-500 block mt-1">
            Avaliações pós-atendimento
          </span>
        </div>
      </div>

      {/* Tabela de Controle de Usuários, Tempo e Tags de Função */}
      <div className="bg-white border border-[#E2E8F0] rounded-xl shadow-sm overflow-hidden">
        <div className="p-4 border-b border-[#E2E8F0] bg-[#F8FAFC] flex items-center justify-between">
          <h3 className="text-xs font-bold text-[#0F172A] uppercase tracking-wider">
            Quadro de Usuários & Controle de Jornada (Vitgold)
          </h3>
          <span className="text-xs text-[#64748B]">
            {team.length} profissionais ativos
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="border-b border-[#E2E8F0] bg-[#F8FAFC] text-[11px] font-bold text-[#64748B]">
                <th className="py-3 px-4">Usuário</th>
                <th className="py-3 px-4">Tag de Função</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4">Tempo Online Hoje</th>
                <th className="py-3 px-4">SLA Resposta</th>
                <th className="py-3 px-4 text-center">Atendimentos</th>
                <th className="py-3 px-4 text-right">Faturamento Mês</th>
                <th className="py-3 px-4 text-right"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#F1F5F9]">
              {team.map((member) => (
                <tr key={member.id} className="hover:bg-[#F8FAFC] transition-colors">
                  <td className="py-3.5 px-4">
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 rounded-full bg-[#07192C] text-white text-xs font-bold flex items-center justify-center">
                        {member.avatar}
                      </div>
                      <div>
                        <div className="font-bold text-[#0F172A]">{member.name}</div>
                        <div className="text-[11px] text-[#64748B]">{member.email}</div>
                      </div>
                    </div>
                  </td>

                  <td className="py-3.5 px-4">
                    <span className={`inline-flex items-center space-x-1 text-[11px] font-semibold px-2.5 py-1 rounded-md border ${
                      member.roleTag === 'Nutricionista & Consultora' ? 'bg-emerald-50 text-emerald-800 border-emerald-200' :
                      member.roleTag === 'Vendedor Sênior' ? 'bg-sky-50 text-sky-800 border-sky-200' :
                      member.roleTag === 'Gestor Comercial' ? 'bg-[#4EC5E8]/10 text-[#03111C] border-[#4EC5E8]/30 font-bold' :
                      member.roleTag === 'Supervisor IA' ? 'bg-cyan-50 text-cyan-800 border-cyan-200' :
                      'bg-slate-50 text-slate-800 border-slate-200'
                    }`}>
                      <Tag className="w-3 h-3 flex-shrink-0" />
                      <span>{member.roleTag}</span>
                    </span>
                  </td>

                  <td className="py-3.5 px-4">
                    <span className={`inline-flex items-center space-x-1.5 text-[11px] font-semibold px-2 py-0.5 rounded-full ${
                      member.status === 'Online' ? 'bg-emerald-100 text-emerald-800' :
                      member.status === 'Em Atendimento' ? 'bg-blue-100 text-blue-800' :
                      member.status === 'Pausa / Almoço' ? 'bg-amber-100 text-amber-800' :
                      'bg-slate-100 text-slate-600'
                    }`}>
                      <span className={`w-1.5 h-1.5 rounded-full ${
                        member.status === 'Online' ? 'bg-emerald-500' :
                        member.status === 'Em Atendimento' ? 'bg-blue-500' :
                        member.status === 'Pausa / Almoço' ? 'bg-amber-500' : 'bg-slate-400'
                      }`} />
                      <span>{member.status}</span>
                    </span>
                  </td>

                  <td className="py-3.5 px-4 font-mono text-[#0F172A] font-medium">
                    <div className="flex items-center space-x-1">
                      <Clock className="w-3.5 h-3.5 text-[#64748B]" />
                      <span>{member.onlineTimeToday}</span>
                    </div>
                  </td>

                  <td className="py-3.5 px-4 font-mono font-medium text-slate-700">
                    {member.avgResponseTime}
                  </td>

                  <td className="py-3.5 px-4 text-center font-bold text-[#0F172A]">
                    {member.conversationsToday}
                  </td>

                  <td className="py-3.5 px-4 text-right font-mono font-bold text-emerald-600">
                    {formatBRL(member.totalRevenueMonth)}
                  </td>

                  <td className="py-3.5 px-4 text-right">
                    <button className="text-slate-400 hover:text-slate-600 p-1 rounded">
                      <MoreVertical className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal: Adicionar Novo Usuário */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl space-y-4 border border-[#E2E8F0]">
            <h3 className="text-base font-bold text-[#0F172A] border-b border-[#E2E8F0] pb-3">
              Cadastrar Usuário da Equipe Vitgold
            </h3>

            <form onSubmit={handleAddMember} className="space-y-4">
              <div>
                <label className="text-xs font-semibold text-[#334155] block mb-1">
                  Nome Completo
                </label>
                <input
                  type="text"
                  required
                  placeholder="Ex: Dra. Camila Santos"
                  value={newName}
                  onChange={(e) => setNewName(e.target.value)}
                  className="w-full border border-[#CBD5E1] rounded-lg p-2.5 text-xs text-[#0F172A] focus:outline-none focus:border-emerald-500"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-[#334155] block mb-1">
                  E-mail Corporativo
                </label>
                <input
                  type="email"
                  required
                  placeholder="camila.nutri@vitgold.com.br"
                  value={newEmail}
                  onChange={(e) => setNewEmail(e.target.value)}
                  className="w-full border border-[#CBD5E1] rounded-lg p-2.5 text-xs text-[#0F172A] focus:outline-none focus:border-emerald-500"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-[#334155] block mb-1">
                  Tag de Função
                </label>
                <select
                  value={newRoleTag}
                  onChange={(e) => setNewRoleTag(e.target.value as any)}
                  className="w-full border border-[#CBD5E1] rounded-lg p-2.5 text-xs text-[#0F172A] focus:outline-none focus:border-emerald-500"
                >
                  <option value="Nutricionista & Consultora">Nutricionista & Consultora</option>
                  <option value="Vendedor Sênior">Vendedor Sênior</option>
                  <option value="Gestor Comercial">Gestor Comercial</option>
                  <option value="Supervisor IA">Supervisor IA</option>
                  <option value="Suporte & SAC">Suporte & SAC</option>
                </select>
              </div>

              <div className="flex items-center justify-end space-x-2 pt-2 border-t border-[#E2E8F0]">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 border border-[#CBD5E1] text-[#64748B] rounded-lg text-xs font-medium hover:bg-[#F8FAFC]"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-[#10B981] hover:bg-[#059669] text-white rounded-lg text-xs font-semibold shadow-sm"
                >
                  Adicionar à Equipe
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
