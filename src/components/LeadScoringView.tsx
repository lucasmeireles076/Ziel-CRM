import React, { useState } from 'react';
import { 
  HelpCircle, 
  Sparkles, 
  UserCheck, 
  Building2, 
  Phone, 
  Mail, 
  Send, 
  TrendingUp, 
  X,
  Activity,
  ChevronDown,
  ChevronUp,
  Briefcase,
  Target,
  Zap
} from 'lucide-react';

interface ContactScoringData {
  id: string;
  name: string;
  role: string;
  institution: string;
  phone: string;
  email: string;
  avatarColor: string;
  initials: string;
  ticketEstimado: string;
  produtosInteresse: string[];
  analyzed: boolean;
  score?: number;
  grade?: 'A' | 'B' | 'C' | 'D';
  breakdown?: {
    criteria: string;
    term: string;
    score: number;
    weight: number;
    total: number;
  }[];
  aiDiagnosis?: string;
  recommendedAction?: string;
}

interface ArchetypePonderation {
  id: string;
  name: string;
  role: string;
  company: string;
  classification: 'A' | 'B' | 'C' | 'D';
  classificationLabel: string;
  decisionPower: 'Decisor Direto' | 'Prescritor Técnico' | 'Avaliador de Cotação';
  segmentFit: string;
  readiness: string;
  keyFactors: { label: string; value: string }[];
  playbookGuideline: string;
  suggestedChannel: string;
}

export const LeadScoringView: React.FC = () => {
  const [showExplanationModal, setShowExplanationModal] = useState(false);
  const [analyzingContactId, setAnalyzingContactId] = useState<string | null>(null);
  const [selectedFilterGrade, setSelectedFilterGrade] = useState<string>('todos');
  const [expandedArchetypeId, setExpandedArchetypeId] = useState<string | null>('arch-1');

  // 1. Contatos Fictícios Integrados para Análise com IA
  const [contacts, setContacts] = useState<ContactScoringData[]>([
    {
      id: 'contact-1',
      name: 'Dra. Beatriz Mendonça',
      role: 'Médica Nutróloga & Medicina Preventiva',
      institution: 'Clínica Longevidade Plena (São Paulo/SP)',
      phone: '+55 (11) 98844-2109',
      email: 'dra.beatriz@longevidadeplena.com.br',
      avatarColor: 'from-[#2E86D0] to-[#4EC5E8]',
      initials: 'BM',
      ticketEstimado: 'R$ 3.800,00 / mês',
      produtosInteresse: ['Vitamina K2 + D3 2000 UI', 'Ômega 3 TG 1000mg', 'Zinco Quelato'],
      analyzed: false
    },
    {
      id: 'contact-2',
      name: 'Rodrigo Fagundes',
      role: 'Preparador Físico & Triatleta',
      institution: 'CT Performance & Saúde (Belo Horizonte/MG)',
      phone: '+55 (31) 99123-7744',
      email: 'rodrigo.fagundes@ctperformance.com.br',
      avatarColor: 'from-emerald-500 to-teal-400',
      initials: 'RF',
      ticketEstimado: 'R$ 1.250,00 / mês',
      produtosInteresse: ['Zinco Quelato 29.5mg', 'Magnésio Dimalato', 'Vitamina C'],
      analyzed: false
    },
    {
      id: 'contact-3',
      name: 'Larissa Couto',
      role: 'Consumidora Final & Assinante Prime',
      institution: 'Consumo Pessoal / Saúde Feminina (Curitiba/PR)',
      phone: '+55 (41) 99655-3312',
      email: 'larissa.couto@gmail.com',
      avatarColor: 'from-amber-500 to-orange-400',
      initials: 'LC',
      ticketEstimado: 'R$ 340,00 / pedido',
      produtosInteresse: ['Cranberry 500mg Softgel', 'Colágeno Verisol'],
      analyzed: false
    }
  ]);

  // 2. Exemplos Documentados de Ponderação (SEM MÉTRICAS CLUTTER, COM ALTA INTERAÇÃO E HOVER)
  const archetypes: ArchetypePonderation[] = [
    {
      id: 'arch-1',
      name: 'Leonardo Vasconcelos',
      role: 'Diretor de Operações e Parcerias',
      company: 'Rede Saúde Integrada (Tecnologia & Clínicas)',
      classification: 'A',
      classificationLabel: 'Grupo A • Prontidão Máxima',
      decisionPower: 'Decisor Direto',
      segmentFit: 'Estratégico Alto Valor',
      readiness: 'Abordagem Comercial Imediata (< 15 min)',
      keyFactors: [
        { label: 'Poder de Assinatura', value: 'Autonomia para contratos anuais' },
        { label: 'Segmento de Atuação', value: 'Clínicas privadas e centros estéticos' },
        { label: 'Porte Institucional', value: 'Rede em expansão (12 unidades)' },
        { label: 'Objetivo Principal', value: 'Fornecimento direto de K2+D3 em lote' }
      ],
      playbookGuideline: 'Agendar call executiva de 20 minutos com Head de Parcerias Vitgold. Enviar apresentação corporativa com tabela de descontos por volume e laudos ANVISA.',
      suggestedChannel: 'WhatsApp Executivo + Reunião Google Meet'
    },
    {
      id: 'arch-2',
      name: 'Camila Duarte',
      role: 'Nutricionista Chefe & Prescritora',
      company: 'Consultório NutriVida (Saúde da Mulher)',
      classification: 'B',
      classificationLabel: 'Grupo B • Prescrição Qualificada',
      decisionPower: 'Prescritor Técnico',
      segmentFit: 'Prescrição Recorrente',
      readiness: 'Cadência de Nutrição Ativa (< 24 horas)',
      keyFactors: [
        { label: 'Poder de Prescrição', value: '80+ pacientes mensais em acompanhamento' },
        { label: 'Segmento de Atuação', value: 'Saúde preventiva e longevidade' },
        { label: 'Porte Institucional', value: 'Consultório boutique de alta renda' },
        { label: 'Objetivo Principal', value: 'Prescrição de Cranberry e Zinco Quelato' }
      ],
      playbookGuideline: 'Enviar kit físico de amostras para o consultório acompanhado de bloco de receitas personalizado e cupom de indicação NutriGold com comissão.',
      suggestedChannel: 'WhatsApp Consultoria + Kit Degustação'
    },
    {
      id: 'arch-3',
      name: 'Danilo Alvarenga',
      role: 'Analista de Suprimentos & Farmácia',
      company: 'Hospital & Centro Médico São Lucas',
      classification: 'C',
      classificationLabel: 'Grupo C • Fluxo Técnico Educativo',
      decisionPower: 'Avaliador de Cotação',
      segmentFit: 'Institucional Regulatório',
      readiness: 'Régua de E-mails & Laudos Técnicos',
      keyFactors: [
        { label: 'Poder de Assinatura', value: 'Elabora parecer técnico para compras' },
        { label: 'Segmento de Atuação', value: 'Hospitalar e compras compartilhadas' },
        { label: 'Porte Institucional', value: 'Grande porte (processo licitatório)' },
        { label: 'Objetivo Principal', value: 'Validação de especificações técnicas' }
      ],
      playbookGuideline: 'Inserir na régua automatizada de nutrição técnica do RD Station com foco em estabilidade molecular, biodisponibilidade e fichas técnicas em PDF.',
      suggestedChannel: 'E-mail Corporativo + WhatsApp Institucional'
    }
  ];

  const requestAIScoring = (contactId: string) => {
    setAnalyzingContactId(contactId);

    setTimeout(() => {
      setContacts(prev => prev.map(c => {
        if (c.id === contactId) {
          if (c.id === 'contact-1') {
            return {
              ...c,
              analyzed: true,
              score: 9.4,
              grade: 'A',
              breakdown: [
                { criteria: 'Perfil Profissional / Prescritor', term: 'Médica Nutróloga (400+ pacientes)', score: 10, weight: 0.40, total: 4.0 },
                { criteria: 'Poder de Compra & Prescrição', term: 'Ticket estimado > R$ 3.000/mês', score: 9.5, weight: 0.30, total: 2.85 },
                { criteria: 'Engajamento no WhatsApp e Site', term: 'Interação com Sofia + Download Tabela Técnica', score: 8.5, weight: 0.30, total: 2.55 }
              ],
              aiDiagnosis: 'Lead Grupo A com fit máximo para parcerias de prescrição médica Vitgold. Altíssima propensão a converter pacientes para K2+D3.',
              recommendedAction: 'Enviar Kit Boas-Vindas Prescritor + Cadastrar no Programa de Bonificação Nutri pelo WhatsApp.'
            };
          } else if (c.id === 'contact-2') {
            return {
              ...c,
              analyzed: true,
              score: 7.8,
              grade: 'B',
              breakdown: [
                { criteria: 'Perfil Profissional / Treinador', term: 'Preparador Físico / Atleta', score: 8.0, weight: 0.40, total: 3.2 },
                { criteria: 'Poder de Compra Coletivo', term: 'Ticket estimado R$ 1.250/mês (80 alunos)', score: 7.5, weight: 0.30, total: 2.25 },
                { criteria: 'Engajamento no E-commerce', term: '3 visitas na página de Zinco Quelato', score: 7.8, weight: 0.30, total: 2.34 }
              ],
              aiDiagnosis: 'Lead Grupo B qualificado. Excelente influenciador de nicho esportivo com interesse comprovado em Zinco Quelato e recuperação muscular.',
              recommendedAction: 'Disparar cupom promocional para os alunos da assessoria (CUPOM: RODRIGO10) e amostras de sachê.'
            };
          } else {
            return {
              ...c,
              analyzed: true,
              score: 6.3,
              grade: 'B',
              breakdown: [
                { criteria: 'Perfil Consumidor', term: 'Consumidora Recorrente (Saúde Feminina)', score: 6.5, weight: 0.40, total: 2.6 },
                { criteria: 'Recorrência de Compra', term: 'Recompra a cada 60 dias (Cranberry)', score: 7.0, weight: 0.30, total: 2.1 },
                { criteria: 'Abertura de E-mail / WhatsApp', term: 'Abriu campanha de Prevenção & Imunidade', score: 5.3, weight: 0.30, total: 1.59 }
              ],
              aiDiagnosis: 'Lead Grupo B com alta lealdade à categoria Cranberry. Potencial para migração para o plano de assinatura automática.',
              recommendedAction: 'Oferecer assinatura trimestral com 15% OFF fixo e frete grátis garantido.'
            };
          }
        }
        return c;
      }));
      setAnalyzingContactId(null);
    }, 850);
  };

  const gradeCards = [
    { grade: 'A', range: '10 – 7.5', color: '#2B8A3E', border: '#B2F2BB', desc: 'Leads quentes com altíssimo poder de compra e fit ideal.' },
    { grade: 'B', range: '7.4 – 5.0', color: '#40C057', border: '#D8F5A2', desc: 'Bons prospects com potencial de nutrição e recompra.' },
    { grade: 'C', range: '4.9 – 2.5', color: '#FAB005', border: '#FFE066', desc: 'Interesse inicial; necessitam de régua educativa.' },
    { grade: 'D', range: '2.4 – 0', color: '#868E96', border: '#E9ECEF', desc: 'Baixo fit ou contatos fora do perfil demográfico.' }
  ];

  const filteredArchetypes = archetypes.filter(a => {
    if (selectedFilterGrade === 'todos') return true;
    return a.classification === selectedFilterGrade;
  });

  return (
    <div className="p-6 max-w-6xl mx-auto space-y-8 text-[#1E293B]">
      {/* 1. Header com Botão no Canto Superior para Explicação */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#E2E8F0] pb-6">
        <div>
          <div className="flex items-center space-x-2">
            <h1 className="text-2xl font-bold text-[#07192C]">Lead Scoring & Contatos Integrados</h1>
            <span className="text-xs bg-[#4EC5E8]/15 text-[#03111C] font-extrabold px-2.5 py-0.5 rounded-full border border-[#4EC5E8]/30">
              IA Sofia Integrada
            </span>
          </div>
          <p className="text-sm text-[#475569] mt-1 max-w-3xl">
            Monitore o perfil de interesse dos contatos da Vitgold e acione diagnósticos de inteligência preditiva com um clique.
          </p>
        </div>

        {/* Botão no canto superior exigido pelo usuário */}
        <button
          onClick={() => setShowExplanationModal(true)}
          className="px-4 py-2.5 bg-white hover:bg-[#F8FAFC] text-[#07192C] border border-[#CBD5E1] hover:border-[#4EC5E8] rounded-xl text-xs font-bold flex items-center space-x-2 shadow-sm transition-all duration-200 shrink-0 hover:shadow hover:-translate-y-0.5 active:scale-95"
        >
          <HelpCircle className="w-4 h-4 text-[#2E86D0]" />
          <span>Como funciona a métrica de score?</span>
        </button>
      </div>

      {/* 2. Seção de Contatos Integrados com Solicitação de Análise de Score com IA */}
      <div className="space-y-4">
        <div>
          <h2 className="text-lg font-bold text-[#0F172A] flex items-center space-x-2">
            <Activity className="w-5 h-5 text-[#2E86D0]" />
            <span>Contatos Integrados para Análise de Score</span>
          </h2>
          <p className="text-xs text-[#64748B]">
            Selecione qualquer contato para solicitar o cálculo inteligente de perfil e interesse realizado pela IA Sofia.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-4">
          {contacts.map((contact) => (
            <div 
              key={contact.id}
              className={`bg-white border rounded-2xl p-5 shadow-sm transition-all duration-300 ${
                contact.analyzed 
                  ? 'border-[#4EC5E8]/60 ring-2 ring-[#4EC5E8]/20 shadow-md' 
                  : 'border-[#E2E8F0] hover:border-[#4EC5E8]/50 hover:shadow-md hover:-translate-y-0.5'
              }`}
            >
              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                {/* Info do Contato */}
                <div className="flex items-start space-x-4">
                  <div className={`w-12 h-12 rounded-2xl bg-gradient-to-tr ${contact.avatarColor} flex items-center justify-center text-white font-extrabold text-sm shadow shrink-0`}>
                    {contact.initials}
                  </div>
                  <div className="space-y-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <h3 className="text-sm font-bold text-[#0F172A]">{contact.name}</h3>
                      <span className="text-[11px] bg-slate-100 text-slate-700 font-semibold px-2 py-0.5 rounded-md border border-slate-200">
                        {contact.role}
                      </span>
                    </div>

                    <div className="flex flex-wrap items-center gap-3 text-xs text-slate-500">
                      <span className="flex items-center space-x-1">
                        <Building2 className="w-3.5 h-3.5 text-slate-400" />
                        <span>{contact.institution}</span>
                      </span>
                      <span className="flex items-center space-x-1">
                        <Phone className="w-3.5 h-3.5 text-slate-400" />
                        <span>{contact.phone}</span>
                      </span>
                      <span className="flex items-center space-x-1">
                        <Mail className="w-3.5 h-3.5 text-slate-400" />
                        <span>{contact.email}</span>
                      </span>
                    </div>

                    <div className="flex flex-wrap items-center gap-1.5 pt-1">
                      <span className="text-[10px] text-slate-400 font-semibold uppercase">Interesse:</span>
                      {contact.produtosInteresse.map((prod, pIdx) => (
                        <span key={pIdx} className="text-[10px] bg-[#4EC5E8]/10 text-[#07192C] font-semibold px-2 py-0.5 rounded-full border border-[#4EC5E8]/20">
                          {prod}
                        </span>
                      ))}
                      <span className="text-[10px] bg-emerald-50 text-emerald-700 font-bold px-2 py-0.5 rounded-full border border-emerald-200 ml-2">
                        Ticket: {contact.ticketEstimado}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Ação: Botão ou Score Result */}
                <div className="flex items-center space-x-3 shrink-0 self-end lg:self-center">
                  {!contact.analyzed ? (
                    <button
                      onClick={() => requestAIScoring(contact.id)}
                      disabled={analyzingContactId === contact.id}
                      className="px-4 py-2.5 bg-gradient-to-r from-[#03111C] to-[#0A2540] hover:from-[#0B2A4A] hover:to-[#2E86D0] text-white rounded-xl text-xs font-bold flex items-center space-x-2 shadow-md hover:shadow-lg transition-all duration-200 active:scale-95"
                    >
                      <Sparkles className={`w-4 h-4 text-[#4EC5E8] ${analyzingContactId === contact.id ? 'animate-spin' : ''}`} />
                      <span>{analyzingContactId === contact.id ? 'Calculando com IA Sofia...' : 'Solicitar Análise de Score com IA'}</span>
                    </button>
                  ) : (
                    <div className="flex items-center space-x-3 bg-[#F8FAFC] border border-[#E2E8F0] p-2.5 rounded-xl shadow-inner">
                      <div className="text-right">
                        <span className="text-[10px] text-slate-500 font-bold uppercase block leading-tight">Classificação</span>
                        <span className="text-xs font-bold text-slate-700">Grupo {contact.grade} ({contact.score})</span>
                      </div>
                      <div 
                        className="w-10 h-10 rounded-xl flex items-center justify-center font-extrabold text-white text-lg shadow-sm"
                        style={{
                          backgroundColor: contact.grade === 'A' ? '#2B8A3E' :
                                           contact.grade === 'B' ? '#40C057' :
                                           contact.grade === 'C' ? '#FAB005' : '#868E96'
                        }}
                      >
                        {contact.grade}
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Detalhamento do Score Calculado quando Analisado */}
              {contact.analyzed && contact.breakdown && (
                <div className="mt-4 pt-4 border-t border-[#E2E8F0] space-y-3 bg-[#F8FAFC] -mx-5 -mb-5 p-5 rounded-b-2xl animate-in fade-in duration-300">
                  <div className="flex flex-col md:flex-row gap-4 items-stretch">
                    {/* Tabela de Pesos do Contato */}
                    <div className="flex-1 overflow-x-auto bg-white rounded-xl border border-[#E2E8F0] p-3 shadow-sm">
                      <table className="w-full text-left border-collapse text-xs">
                        <thead>
                          <tr className="border-b border-[#E2E8F0] text-[11px] font-bold text-[#64748B]">
                            <th className="py-1.5 px-2">Dimensão Qualificada</th>
                            <th className="py-1.5 px-2">Evidência / Termo</th>
                            <th className="py-1.5 px-2 text-right">Nota x Peso = Total</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                          {contact.breakdown.map((row, rIdx) => (
                            <tr key={rIdx} className="hover:bg-slate-50 transition-colors">
                              <td className="py-2 px-2 font-medium text-slate-700">{row.criteria}</td>
                              <td className="py-2 px-2 text-slate-600">{row.term}</td>
                              <td className="py-2 px-2 text-right font-mono font-bold text-slate-800">
                                {row.score.toFixed(1)} x {row.weight.toFixed(2)} = <strong className="text-[#2E86D0]">{row.total.toFixed(2)}</strong>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                        <tfoot>
                          <tr className="border-t border-[#E2E8F0] font-bold bg-[#F8FAFC]">
                            <td colSpan={2} className="py-1.5 px-2 text-slate-800">Score de Qualificação Final:</td>
                            <td className="py-1.5 px-2 text-right font-mono font-black text-emerald-700 text-sm">
                              {contact.score?.toFixed(1)} / 10.0
                            </td>
                          </tr>
                        </tfoot>
                      </table>
                    </div>

                    {/* Diagnóstico da IA e Ação Recomendada */}
                    <div className="w-full md:w-80 bg-white border border-[#E2E8F0] rounded-xl p-3.5 space-y-2.5 shadow-sm flex flex-col justify-between">
                      <div>
                        <div className="flex items-center space-x-1.5 text-xs font-bold text-[#07192C] mb-1">
                          <Sparkles className="w-3.5 h-3.5 text-[#4EC5E8]" />
                          <span>Diagnóstico Preditivo da IA:</span>
                        </div>
                        <p className="text-[11px] text-slate-600 leading-relaxed">
                          {contact.aiDiagnosis}
                        </p>
                      </div>

                      <div className="pt-2 border-t border-slate-100">
                        <span className="text-[10px] font-bold text-emerald-800 uppercase block mb-1">
                          Próxima Ação Comercial:
                        </span>
                        <p className="text-[11px] text-slate-700 font-semibold mb-2">
                          {contact.recommendedAction}
                        </p>

                        <button 
                          onClick={() => alert(`Iniciando fluxo de contato com ${contact.name} via WhatsApp!`)}
                          className="w-full py-1.5 bg-[#4EC5E8] hover:bg-[#6DD3F5] text-[#03111C] rounded-lg text-xs font-bold flex items-center justify-center space-x-1 transition-all active:scale-95"
                        >
                          <Send className="w-3 h-3" />
                          <span>Acionar no WhatsApp</span>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* 3. Seção Metodologia Base (Cards A, B, C, D) com Hover Aprimorado */}
      <div className="space-y-4 pt-4 border-t border-[#E2E8F0]">
        <div>
          <h2 className="text-base font-bold text-[#0F172A] mb-1">Matriz de Classificação de Leads</h2>
          <p className="text-xs text-[#475569]">
            Distribuição automática da base em 4 grupos de prontidão comercial baseada na nota final.
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {gradeCards.map((item) => (
            <div
              key={item.grade}
              className="bg-white border rounded-2xl p-4 text-center shadow-sm flex flex-col justify-between items-center hover:shadow-lg hover:-translate-y-1 transition-all duration-300 cursor-default group"
              style={{ borderColor: item.border }}
            >
              <div className="flex flex-col items-center">
                <span
                  className="text-4xl font-extrabold mb-1 group-hover:scale-110 transition-transform duration-200"
                  style={{ color: item.color }}
                >
                  {item.grade}
                </span>
                <span className="text-xs font-bold text-[#64748B]">
                  Nota {item.range}
                </span>
              </div>
              <p className="text-[11px] text-slate-500 mt-2 leading-tight">
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* 4. EXEMPLOS DOCUMENTADOS DE PONDERAÇÃO (SEM MÉTRICAS, COM ALTA INTERATIVIDADE E HOVER) */}
      <div className="space-y-4 pt-4 border-t border-[#E2E8F0]">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h2 className="text-base font-bold text-[#0F172A] flex items-center space-x-2">
              <Briefcase className="w-4 h-4 text-[#2E86D0]" />
              <span>Exemplos Documentados de Ponderação</span>
            </h2>
            <p className="text-xs text-[#64748B]">
              Perfis de referência qualitativos e diretrizes comerciais estratégicas para condução de oportunidades.
            </p>
          </div>

          {/* Filtro Interativo por Grupo */}
          <div className="flex items-center space-x-1.5 bg-[#F1F5F9] p-1 rounded-xl self-start sm:self-auto">
            <span className="text-[10px] font-bold text-slate-400 px-2 uppercase">Filtrar:</span>
            {(['todos', 'A', 'B', 'C'] as const).map((grade) => (
              <button
                key={grade}
                onClick={() => setSelectedFilterGrade(grade)}
                className={`px-3 py-1 rounded-lg text-xs font-bold transition-all duration-200 ${
                  selectedFilterGrade === grade
                    ? 'bg-white text-[#07192C] shadow-sm border border-[#E2E8F0]'
                    : 'text-slate-600 hover:text-[#07192C] hover:bg-white/50'
                }`}
              >
                {grade === 'todos' ? 'Todos os Perfis' : `Grupo ${grade}`}
              </button>
            ))}
          </div>
        </div>

        {/* Grid de Cards dos Perfis de Referência - ALTA INTERATIVIDADE E HOVER ELEGANTE */}
        <div className="grid grid-cols-1 gap-4">
          {filteredArchetypes.map((arch) => {
            const isExpanded = expandedArchetypeId === arch.id;

            return (
              <div 
                key={arch.id}
                className="bg-white border border-[#E2E8F0] hover:border-[#4EC5E8] rounded-2xl p-5 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-0.5 space-y-4"
              >
                {/* Header do Card */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div className="flex items-center space-x-3.5">
                    <div className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center font-bold text-slate-700 text-sm border border-slate-200">
                      {arch.name.slice(0, 2).toUpperCase()}
                    </div>
                    <div>
                      <div className="flex items-center space-x-2">
                        <h3 className="text-sm font-bold text-[#0F172A]">{arch.name}</h3>
                        <span className="text-[11px] text-[#64748B]">({arch.role})</span>
                      </div>
                      <p className="text-xs text-slate-500 flex items-center space-x-1.5 mt-0.5">
                        <Building2 className="w-3.5 h-3.5 text-slate-400" />
                        <span>{arch.company}</span>
                      </p>
                    </div>
                  </div>

                  {/* Badges de Decisão e Classificação */}
                  <div className="flex items-center space-x-2 shrink-0">
                    <span className="text-[11px] font-semibold bg-slate-100 text-slate-700 px-2.5 py-1 rounded-lg border border-slate-200">
                      {arch.decisionPower}
                    </span>

                    <span 
                      className="text-xs font-extrabold px-3 py-1 rounded-lg text-white shadow-sm"
                      style={{
                        backgroundColor: arch.classification === 'A' ? '#2B8A3E' :
                                         arch.classification === 'B' ? '#40C057' : '#FAB005'
                      }}
                    >
                      {arch.classificationLabel}
                    </span>
                  </div>
                </div>

                {/* Chips com Fatores de Ponderação Qualitativos (Substitui as fórmulas matemáticas numéricas) */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5 pt-2">
                  {arch.keyFactors.map((kf, kfIdx) => (
                    <div 
                      key={kfIdx}
                      className="bg-[#F8FAFC] hover:bg-[#F1F5F9] border border-[#E2E8F0] hover:border-[#CBD5E1] p-3 rounded-xl transition-all duration-200"
                    >
                      <span className="text-[10px] font-bold text-slate-400 uppercase block mb-0.5">
                        {kf.label}
                      </span>
                      <span className="text-xs font-semibold text-[#0F172A] leading-snug block">
                        {kf.value}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Footer Interativo: Playbook e Ação */}
                <div className="pt-2 border-t border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div className="flex items-center space-x-2 text-xs text-slate-500">
                    <Target className="w-3.5 h-3.5 text-[#2E86D0]" />
                    <span>Fit de Segmento: <strong className="text-slate-800">{arch.segmentFit}</strong></span>
                    <span className="text-slate-300">•</span>
                    <span>Canal Sugerido: <strong className="text-slate-800">{arch.suggestedChannel}</strong></span>
                  </div>

                  <button
                    onClick={() => setExpandedArchetypeId(isExpanded ? null : arch.id)}
                    className="inline-flex items-center space-x-1.5 text-xs font-bold text-[#2E86D0] hover:text-[#0B2A4A] transition-colors self-end sm:self-auto py-1 px-2.5 rounded-lg hover:bg-slate-100"
                  >
                    <span>{isExpanded ? 'Ocultar Diretrizes' : 'Ver Diretrizes de Atendimento'}</span>
                    {isExpanded ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
                  </button>
                </div>

                {/* Gaveta Expansível com o Playbook Comercial */}
                {isExpanded && (
                  <div className="bg-[#030711] text-white p-4 rounded-xl border border-slate-800 space-y-2 animate-in fade-in duration-200">
                    <div className="flex items-center space-x-2 text-xs font-bold text-[#4EC5E8]">
                      <Zap className="w-3.5 h-3.5" />
                      <span>Playbook Comercial Recomendado (SLA: {arch.readiness})</span>
                    </div>
                    <p className="text-xs text-slate-300 leading-relaxed">
                      {arch.playbookGuideline}
                    </p>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* MODAL EXPLICATIVO: "Como funciona a métrica de score" */}
      {showExplanationModal && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white text-slate-900 border border-slate-200 rounded-2xl w-full max-w-3xl overflow-hidden shadow-2xl flex flex-col max-h-[88vh] animate-in fade-in zoom-in-95 duration-200">
            {/* Header do Modal */}
            <div className="px-6 py-4 border-b border-slate-200 flex items-center justify-between bg-slate-50">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-xl bg-[#4EC5E8]/15 border border-[#4EC5E8]/30 flex items-center justify-center text-[#2E86D0]">
                  <HelpCircle className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-slate-900">
                    Como funciona a métrica de Lead Scoring?
                  </h3>
                  <p className="text-xs text-slate-500">
                    Metodologia combinada de Perfil Demográfico x Interesse Comportamental
                  </p>
                </div>
              </div>

              <button 
                onClick={() => setShowExplanationModal(false)}
                className="p-1.5 text-slate-400 hover:text-slate-800 hover:bg-slate-200 rounded-xl transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Conteúdo do Modal */}
            <div className="p-6 overflow-y-auto space-y-6 text-xs text-slate-600 leading-relaxed">
              <div className="space-y-2">
                <h4 className="text-sm font-bold text-slate-900 flex items-center space-x-2">
                  <span className="w-5 h-5 rounded-full bg-[#4EC5E8]/20 text-[#03111C] font-bold text-[11px] flex items-center justify-center">1</span>
                  <span>O que é o Lead Scoring?</span>
                </h4>
                <p>
                  O Lead Scoring é um algoritmo que pontua cada contato da sua base com uma nota de <strong>0 a 10</strong>. Essa nota determina o nível de maturidade e a probabilidade de compra do lead para os suplementos Vitgold (K2+D3, Zinco Quelato, Cranberry, etc.).
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-2">
                  <h5 className="font-bold text-slate-900 flex items-center space-x-1.5">
                    <UserCheck className="w-4 h-4 text-[#2E86D0]" />
                    <span>Dimensão 1: Perfil (Fit Demográfico)</span>
                  </h5>
                  <p className="text-[11px]">
                    Avalia quem é o contato. Prescritores de saúde (médicos nutrólogos, nutricionistas) e centros esportivos recebem prioridade máxima pelo efeito multiplicador de prescrição, enquanto consumidores finais variam de acordo com poder aquisitivo.
                  </p>
                  <ul className="list-disc pl-4 text-[10px] space-y-1 text-slate-500">
                    <li>Médico / Nutrólogo: Alta Prioridade (Multiplicador de Receitas)</li>
                    <li>Personal / Atleta: Médio/Alto (Prescrição de Zinco & Magnésio)</li>
                    <li>Consumidor Consciente: Recompra de rotina no e-commerce</li>
                  </ul>
                </div>

                <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-2">
                  <h5 className="font-bold text-slate-900 flex items-center space-x-1.5">
                    <TrendingUp className="w-4 h-4 text-emerald-600" />
                    <span>Dimensão 2: Interesse (Comportamento)</span>
                  </h5>
                  <p className="text-[11px]">
                    Avalia o que o lead faz em tempo real. Mede aberturas de e-mail, conversas no WhatsApp com a Sofia, visitas ao e-commerce Vitgold e downloads de laudos técnicos dos suplementos.
                  </p>
                  <ul className="list-disc pl-4 text-[10px] space-y-1 text-slate-500">
                    <li>Conversa no WhatsApp com Sofia: Engajamento Quente</li>
                    <li>Visitas recorrentes a páginas de produto: Alta Intenção</li>
                    <li>Download de tabela nutricional: Validação Técnica</li>
                  </ul>
                </div>
              </div>

              <div className="space-y-3">
                <h4 className="text-sm font-bold text-slate-900 flex items-center space-x-2">
                  <span className="w-5 h-5 rounded-full bg-[#4EC5E8]/20 text-[#03111C] font-bold text-[11px] flex items-center justify-center">2</span>
                  <span>Classificação em Grupos e SLA de Atendimento:</span>
                </h4>
                
                <div className="space-y-2">
                  <div className="p-3 rounded-xl border border-emerald-200 bg-emerald-50/70 flex items-center justify-between">
                    <div>
                      <strong className="text-emerald-900 font-bold">Grupo A (Score 7.5 a 10.0)</strong>
                      <p className="text-[11px] text-emerald-800">Leads quentes. SLA: Atendimento humano via WhatsApp em até 15 minutos.</p>
                    </div>
                    <span className="text-xs font-black text-emerald-800 px-2.5 py-1 bg-white rounded-lg border border-emerald-300">Pronto p/ Venda</span>
                  </div>

                  <div className="p-3 rounded-xl border border-lime-200 bg-lime-50/70 flex items-center justify-between">
                    <div>
                      <strong className="text-lime-900 font-bold">Grupo B (Score 5.0 a 7.4)</strong>
                      <p className="text-[11px] text-lime-800">Leads qualificados. SLA: Oferta com cupom ou amostra grátis em até 24 horas.</p>
                    </div>
                    <span className="text-xs font-black text-lime-800 px-2.5 py-1 bg-white rounded-lg border border-lime-300">Nutrição Ativa</span>
                  </div>

                  <div className="p-3 rounded-xl border border-amber-200 bg-amber-50/70 flex items-center justify-between">
                    <div>
                      <strong className="text-amber-900 font-bold">Grupo C (Score 2.5 a 4.9)</strong>
                      <p className="text-[11px] text-amber-800">Interesse em aprendizado. Fluxo automático de e-mails educativos RD Station.</p>
                    </div>
                    <span className="text-xs font-black text-amber-800 px-2.5 py-1 bg-white rounded-lg border border-amber-300">Automação</span>
                  </div>

                  <div className="p-3 rounded-xl border border-slate-200 bg-slate-50 flex items-center justify-between">
                    <div>
                      <strong className="text-slate-800 font-bold">Grupo D (Score 0.0 a 2.4)</strong>
                      <p className="text-[11px] text-slate-600">Baixo fit comercial. Reciclagem periódica em campanhas sazonais.</p>
                    </div>
                    <span className="text-xs font-black text-slate-700 px-2.5 py-1 bg-white rounded-lg border border-slate-300">Descarte / Frio</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Footer do Modal */}
            <div className="px-6 py-3 border-t border-slate-200 bg-slate-50 flex items-center justify-end">
              <button
                onClick={() => setShowExplanationModal(false)}
                className="px-4 py-2 bg-[#07192C] hover:bg-[#0E2A4A] text-white rounded-xl text-xs font-bold transition-colors"
              >
                Entendi, Fechar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
