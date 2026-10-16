import type {
  FunnelMetric,
  RevenueMetric,
  DailyPoint,
  TrackedPage,
  ScoreExample,
  ConversationItem,
  PipelineStage,
  PipelineLead,
  IntegrationStatus,
  CampaignItem,
  VitgoldTeamMember,
  ImportedSpreadsheetData
} from '../types';

// 1. Funil de E-commerce (Print 1)
export const FUNNEL_METRICS: FunnelMetric[] = [
  {
    label: 'VISITAS',
    value: 19978,
    formattedValue: '19.978',
    conversionRate: '1,36%'
  },
  {
    label: 'PEDIDOS REALIZADOS',
    value: 271,
    formattedValue: '271',
    conversionRate: '87,82%'
  },
  {
    label: 'PEDIDOS PAGOS',
    value: 238,
    formattedValue: '238',
    isPrimary: true
  }
];

// 2. Performance de Receita (Print 1)
export const REVENUE_METRICS: RevenueMetric[] = [
  {
    title: 'RECEITA TOTAL',
    value: 'R$ 80.500,03',
    changePercent: '↑ 3.130,37% do período anterior',
    changePositive: true,
    tooltip: 'Total faturado no e-commerce Vitgold durante o período selecionado.'
  },
  {
    title: 'RECEITA GERADA COM RD STATION',
    value: 'R$ 22.007,15',
    changePercent: '↓ 0,00% do período anterior',
    changePositive: false,
    tooltip: 'Receita atribuída diretamente a leads e automações do RD Station.'
  },
  {
    title: 'PEDIDOS REALIZADOS',
    value: '271',
    changePercent: '↑ 5.220,00% do período anterior',
    changePositive: true,
    tooltip: 'Total de carrinhos convertidos em pedidos no checkout.'
  },
  {
    title: 'TICKET MÉDIO',
    value: 'R$ 297,04',
    changePercent: '↓ -40,29% do período anterior',
    changePositive: false,
    tooltip: 'Valor médio por pedido pago (R$ 80.500,03 / 238 pedidos).'
  }
];

// 3. Gráfico Diário de 30 Dias (Print 1)
export const DAILY_POINTS: DailyPoint[] = [
  { day: '12/09', orders: 8, revenue: 2376 },
  { day: '13', orders: 7, revenue: 2079 },
  { day: '14', orders: 13, revenue: 3861 },
  { day: '15', orders: 13, revenue: 3861 },
  { day: '16', orders: 10, revenue: 2970 },
  { day: '17', orders: 2, revenue: 594 },
  { day: '18', orders: 5, revenue: 1485 },
  { day: '19', orders: 4, revenue: 1188 },
  { day: '20/09', orders: 10, revenue: 2970 },
  { day: '21', orders: 11, revenue: 3267 },
  { day: '22', orders: 2, revenue: 594 },
  { day: '23', orders: 12, revenue: 3564 },
  { day: '24', orders: 6, revenue: 1782 },
  { day: '25', orders: 9, revenue: 2673 },
  { day: '26', orders: 7, revenue: 2079 },
  { day: '27/09', orders: 6, revenue: 1782 },
  { day: '28', orders: 8, revenue: 2376 },
  { day: '29', orders: 11, revenue: 3267 },
  { day: '30', orders: 5, revenue: 1485 },
  { day: '01/10', orders: 7, revenue: 2079 },
  { day: '02', orders: 6, revenue: 1782 },
  { day: '03', orders: 5, revenue: 1485 },
  { day: '04/10', orders: 5, revenue: 1485 },
  { day: '05', orders: 9, revenue: 2673 },
  { day: '06', orders: 9, revenue: 2673 },
  { day: '07', orders: 12, revenue: 3564 },
  { day: '08', orders: 6, revenue: 1782 },
  { day: '09', orders: 12, revenue: 3564 },
  { day: '10', orders: 7, revenue: 2079 },
  { day: '11/10', orders: 6, revenue: 1782 },
  { day: '12', orders: 7, revenue: 2079 }
];

// 4. Lead Tracking Real das Páginas Vitgold (Print 2)
export const TRACKED_PAGES: TrackedPage[] = [
  {
    id: '1',
    title: 'Zinco 25mg Vitgold 100 comprimidos - Vitgold Vitamins - Loja Oficial',
    url: 'www.vitgold.com.br/zinco-25mg-vitgold-kit-2-unidades-100-capsulas',
    active: true,
    visits: 3412,
    conversions: 84
  },
  {
    id: '2',
    title: 'Cranberry 500mg com Vitamina C Vitgold 60 cáps - Vitgold Vitamins - Loja Oficial',
    url: 'www.vitgold.com.br/xggo70xdf-cranberry-vitgold-60-capsulas',
    active: true,
    visits: 2890,
    conversions: 62
  },
  {
    id: '3',
    title: 'Vitamina K2 MK-7 (Menaquinona-7) 100mcg Vitgold 60 cápsulas | Vitgold',
    url: 'www.vitgold.com.br/vitamina-k2-mk-7-menaquinona-7-100mcg-vitgold-60-capsulas-1510',
    active: true,
    visits: 2150,
    conversions: 49
  },
  {
    id: '4',
    title: 'Vitgold Vitamins - Loja Oficial',
    url: 'www.vitgold.com.br/vitamina-k2-mk-7-100mcg-vitgold-60',
    active: true,
    visits: 4890,
    conversions: 112
  },
  {
    id: '5',
    title: 'Vitamina K2 60mcg + D3 2.000UI Kit 2x 60 Caps. - Vitgold Vitamins - Loja Oficial',
    url: 'www.vitgold.com.br/vitamina-k2-60mcg-d3-2000ui-kit-2x-60-caps',
    active: true,
    visits: 1980,
    conversions: 45
  },
  {
    id: '6',
    title: 'Vitamina E 400 UI Vitgold 60 cápsulas - Vitgold Vitamins - Loja Oficial',
    url: 'www.vitgold.com.br/vitamina-e-400-ui-vitgold-kit3x-60-capsulas',
    active: true,
    visits: 1420,
    conversions: 31
  },
  {
    id: '7',
    title: 'Vitamina E 400 UI Vitgold 100 cápsulas - Vitgold Vitamins - Loja Oficial',
    url: 'www.vitgold.com.br/vitamina-e-400-ui-vitgold-kit3x-100-capsulas',
    active: true,
    visits: 1150,
    conversions: 28
  },
  {
    id: '8',
    title: 'Vitamina E 1000UI Vigold 30 cápsulas - Vitgold Vitamins - Loja Oficial',
    url: 'www.vitgold.com.br/vitamina-e-1000ui-vigold-kit3x-30-capsulas',
    active: true,
    visits: 980,
    conversions: 19
  },
  {
    id: '9',
    title: 'Vitamina E 1000UI Vigold 30 cápsulas - Vitgold Vitamins - Loja Oficial',
    url: 'www.vitgold.com.br/vitamina-e-1000ui-vigold-kit2x-30-capsulas',
    active: true,
    visits: 890,
    conversions: 17
  },
  {
    id: '10',
    title: 'Vitamina E 1000UI Vigold 30 cápsulas | Vitgold',
    url: 'www.vitgold.com.br/vitamina-e-1000ui-vigold-30-capsulas-1585',
    active: true,
    visits: 760,
    conversions: 14
  }
];

// 5. Exemplos de Score de Perfil (Print 3)
export const SCORE_EXAMPLES: ScoreExample[] = [
  {
    name: 'Leonardo',
    classification: 'A',
    totalScore: 8.3,
    criteria: [
      { property: 'Cargo', term: 'Diretor', score: 8, weight: 0.80, total: 6.4 },
      { property: 'Segmento', term: 'Tecnologia', score: 10, weight: 0.10, total: 1.0 },
      { property: 'Tamanho', term: '2-5', score: 9, weight: 0.10, total: 0.9 }
    ]
  },
  {
    name: 'Danilo',
    classification: 'C',
    totalScore: 4.7,
    criteria: [
      { property: 'Cargo', term: 'Analista', score: 5, weight: 0.80, total: 4.0 },
      { property: 'Segmento', term: 'Saúde', score: 2, weight: 0.10, total: 0.2 },
      { property: 'Tamanho', term: '200-1.000', score: 5, weight: 0.10, total: 0.5 }
    ]
  }
];

// 6. Conversas do ZielHub (Atendimento Vitgold WhatsApp/Instagram)
export const INITIAL_CONVERSATIONS: ConversationItem[] = [
  {
    id: 'c1',
    contactName: 'Mariana Silveira',
    phone: '+55 11 98452-1102',
    channel: 'whatsapp',
    status: 'abertas',
    lastMessage: 'Qual é a dosagem recomendada da Vitamina K2 MK-7 junto com a D3?',
    timestamp: '14:48',
    unreadCount: 1,
    agentActive: true,
    assignedTo: 'Mariana Nutricionista',
    messages: [
      { id: 'm1', sender: 'user', text: 'Olá! Vi o kit de Vitamina K2 + D3 no site da Vitgold.', timestamp: '14:45' },
      { id: 'm2', sender: 'agent', text: 'Olá, Mariana! Que ótimo ter você aqui na Vitgold. O Kit de Vitamina K2 MK-7 + D3 2.000UI é um dos nossos campeões de saúde óssea e cardiovascular.', timestamp: '14:46' },
      { id: 'm3', sender: 'user', text: 'Qual é a dosagem recomendada da Vitamina K2 MK-7 junto com a D3?', timestamp: '14:48' }
    ]
  },
  {
    id: 'c2',
    contactName: 'Carlos Eduardo Mendes',
    phone: '+55 21 99120-4491',
    channel: 'whatsapp',
    status: 'aguardando',
    lastMessage: 'Gostaria de saber o status do meu pedido #VT-9821.',
    timestamp: '13:15',
    unreadCount: 0,
    agentActive: false,
    assignedTo: 'Carlos Vendas',
    messages: [
      { id: 'm4', sender: 'user', text: 'Boa tarde! Fiz a compra ontem no site.', timestamp: '13:10' },
      { id: 'm5', sender: 'user', text: 'Gostaria de saber o status do meu pedido #VT-9821.', timestamp: '13:15' }
    ]
  },
  {
    id: 'c3',
    contactName: 'Fernanda Rocha',
    phone: '@fernandarocha_fit',
    channel: 'instagram',
    status: 'todas',
    lastMessage: 'Muito obrigada pelo cupom! Acabei de fechar o pedido do Cranberry.',
    timestamp: 'Ontem',
    unreadCount: 0,
    agentActive: true,
    assignedTo: 'Lucas Silva',
    messages: [
      { id: 'm6', sender: 'user', text: 'Oi, vocês têm desconto para primeira compra?', timestamp: 'Ontem 16:20' },
      { id: 'm7', sender: 'agent', text: 'Olá, Fernanda! Temos sim! Use o cupom BEMVINDO10 para 10% OFF em qualquer pedido acima de R$ 150.', timestamp: 'Ontem 16:21' },
      { id: 'm8', sender: 'user', text: 'Muito obrigada pelo cupom! Acabei de fechar o pedido do Cranberry.', timestamp: 'Ontem 16:35' }
    ]
  }
];

// 7. Pipeline de Vendas com Cores Oficiais da ZielHub (Zero Roxo) e No-Show Chatfor
export const PIPELINE_STAGES: PipelineStage[] = [
  { id: 'stage-1', name: 'Novo Lead', color: '#2E86D0', leadsCount: 42, totalValue: 12470 },
  { id: 'stage-2', name: 'Atendimento IA (ZielHub)', color: '#4EC5E8', leadsCount: 18, totalValue: 5340 },
  { id: 'stage-3', name: 'Qualificado (Score A/B)', color: '#10B981', leadsCount: 24, totalValue: 9800 },
  { id: 'stage-4', name: 'Carrinho Iniciado', color: '#F59E0B', leadsCount: 15, totalValue: 4455 },
  { id: 'stage-5', name: 'Pedido Faturado', color: '#06B6D4', leadsCount: 238, totalValue: 80500 }
];

export const PIPELINE_LEADS: PipelineLead[] = [
  { 
    id: 'l1', 
    name: 'Mariana Silveira', 
    company: 'Pessoa Física', 
    value: 297.00, 
    stageId: 'stage-2', 
    scoreGrade: 'A', 
    scoreValue: 8.5, 
    phone: '+55 11 98452-1102', 
    origin: 'WhatsApp',
    lastContactHoursAgo: 2 // Respondeu recentemente
  },
  { 
    id: 'l2', 
    name: 'Carlos Mendes', 
    company: 'Clínica Bem Estar', 
    value: 890.00, 
    stageId: 'stage-4', 
    scoreGrade: 'A', 
    scoreValue: 9.1, 
    phone: '+55 21 99120-4491', 
    origin: 'VTEX E-commerce',
    lastContactHoursAgo: 38 // ALERTA NO-SHOW Chatfor (> 24h sem contato)
  },
  { 
    id: 'l3', 
    name: 'Juliana Costa', 
    company: 'Pessoa Física', 
    value: 189.50, 
    stageId: 'stage-1', 
    scoreGrade: 'B', 
    scoreValue: 6.8, 
    phone: '+55 31 98741-2299', 
    origin: 'Meta Ads',
    lastContactHoursAgo: 4
  },
  { 
    id: 'l4', 
    name: 'Dr. Roberto Faro', 
    company: 'Faro Nutrição', 
    value: 1450.00, 
    stageId: 'stage-3', 
    scoreGrade: 'A', 
    scoreValue: 9.7, 
    phone: '+55 41 99234-8811', 
    origin: 'RD Station',
    lastContactHoursAgo: 1
  }
];

// 8. Campanhas de Disparo (Feature Chatfor / Meta API Oficial)
export const CAMPAIGNS_LIST: CampaignItem[] = [
  {
    id: 'camp-1',
    name: 'Retomada de Carrinho Abandonado (Vitamina K2 + D3)',
    channel: 'WhatsApp Cloud API',
    targetAudience: 'Leads com carrinho aberto nas últimas 48h',
    sentCount: 1420,
    deliveredCount: 1398,
    readCount: 1145,
    replyCount: 382,
    conversionCount: 148,
    attributedRevenue: 43956.00,
    status: 'Ativa',
    scheduledDate: 'Diário automático'
  },
  {
    id: 'camp-2',
    name: 'Lançamento Linha Imunidade & Própolis Vitgold',
    channel: 'Meta Ads CAPI',
    targetAudience: 'Lookalike 1% Compradores Vitgold',
    sentCount: 5200,
    deliveredCount: 5120,
    readCount: 4300,
    replyCount: 890,
    conversionCount: 215,
    attributedRevenue: 63855.00,
    status: 'Ativa',
    scheduledDate: 'Semanal (Seg e Qui)'
  },
  {
    id: 'camp-3',
    name: 'Recompra Recorrente (Zinco & Vitamina C)',
    channel: 'WhatsApp Cloud API',
    targetAudience: 'Clientes que compraram há 60 dias (fim do frasco)',
    sentCount: 890,
    deliveredCount: 882,
    readCount: 780,
    replyCount: 295,
    conversionCount: 132,
    attributedRevenue: 28450.00,
    status: 'Ativa',
    scheduledDate: 'Gatilho pós-venda 60d'
  }
];

// 9. Equipe Vitgold: Controle de Uso, Tempo e Tag de Função
export const VITGOLD_TEAM: VitgoldTeamMember[] = [
  {
    id: 'u1',
    name: 'Dra. Mariana Rezende',
    email: 'mariana.nutri@vitgold.com.br',
    avatar: 'MR',
    roleTag: 'Nutricionista & Consultora',
    status: 'Online',
    onlineTimeToday: '6h 40m',
    avgResponseTime: '1m 10s',
    conversationsToday: 38,
    totalRevenueMonth: 28490.00,
    satisfactionScore: 4.9
  },
  {
    id: 'u2',
    name: 'Carlos Mendes',
    email: 'carlos.mendes@vitgold.com.br',
    avatar: 'CM',
    roleTag: 'Vendedor Sênior',
    status: 'Em Atendimento',
    onlineTimeToday: '7h 15m',
    avgResponseTime: '1m 45s',
    conversationsToday: 54,
    totalRevenueMonth: 34120.00,
    satisfactionScore: 4.8
  },
  {
    id: 'u3',
    name: 'Lucas Silva (Admin)',
    email: 'lucascm076@gmail.com',
    avatar: 'LS',
    roleTag: 'Gestor Comercial',
    status: 'Online',
    onlineTimeToday: '8h 20m',
    avgResponseTime: '55s',
    conversationsToday: 22,
    totalRevenueMonth: 41900.00,
    satisfactionScore: 5.0
  },
  {
    id: 'u4',
    name: 'Fernanda Rocha',
    email: 'fernanda.suporte@vitgold.com.br',
    avatar: 'FR',
    roleTag: 'Supervisor IA',
    status: 'Pausa / Almoço',
    onlineTimeToday: '4h 50m',
    avgResponseTime: '2m 10s',
    conversationsToday: 29,
    totalRevenueMonth: 15800.00,
    satisfactionScore: 4.7
  }
];

// 10. Dados Iniciais para o Módulo de Importação de Planilha
export const SAMPLE_SPREADSHEET_DATA: ImportedSpreadsheetData = {
  fileName: 'relatorio_vendas_outubro_vitgold.xlsx',
  rowCount: 148,
  totalVolume: 43956.00,
  avgTicket: 297.00,
  topCategory: 'Ossos & Articulações (K2+D3)',
  processedDate: '15/10/2026, 15:45',
  rows: [
    { id: '1', cliente: 'Mariana Silveira', produto: 'Kit Vitamina K2 MK-7 + D3 2.000UI', categoria: 'Ossos', valor: 297.00, data: '14/10/2026', canal: 'WhatsApp' },
    { id: '2', cliente: 'Clínica Bem Estar', produto: 'Zinco Quelato 25mg 100 Caps (Kit 4x)', categoria: 'Imunidade', valor: 450.00, data: '14/10/2026', canal: 'VTEX E-commerce' },
    { id: '3', cliente: 'Fernanda Rocha', produto: 'Cranberry 500mg com Vitamina C 60 Caps', categoria: 'Pele & Saúde', valor: 189.50, data: '13/10/2026', canal: 'Instagram' },
    { id: '4', cliente: 'Dr. Roberto Faro', produto: 'Ômega 3 Fish Oil Concentrado 1000mg', categoria: 'Ômegas', valor: 590.00, data: '13/10/2026', canal: 'RD Station' },
    { id: '5', cliente: 'João Paulo Guimarães', produto: 'Vitamina E 400 UI 100 cápsulas', categoria: 'Vitaminas', valor: 149.00, data: '12/10/2026', canal: 'Mercado Livre' },
    { id: '6', cliente: 'Beatriz Vasconcelos', produto: 'Colágeno Hidrolisado + Ácido Hialurônico', categoria: 'Pele', valor: 310.00, data: '12/10/2026', canal: 'WhatsApp' },
    { id: '7', cliente: 'Farmácia Saúde Total', produto: 'Kit Imunidade Forte (Zinco + Vit C + Própolis)', categoria: 'Imunidade', valor: 1250.00, data: '11/10/2026', canal: 'WhatsApp B2B' }
  ]
};

// 11. Central de Integrações
export const INTEGRATIONS_LIST: IntegrationStatus[] = [
  {
    id: 'rd-station',
    name: 'RD Station Marketing & CRM',
    category: 'CRM & Marketing',
    description: 'Sincronização bidirecional de eventos de conversão, lead tracking e pontuações de Lead Scoring.',
    icon: 'Share2',
    connected: true,
    syncStatus: 'synced',
    lastSync: 'Hoje, 15:10',
    metrics: [
      { label: 'Leads Sincronizados', value: '10.000' },
      { label: 'Receita Atribuída', value: 'R$ 22.007,15' }
    ]
  },
  {
    id: 'meta-capi',
    name: 'Meta Ads (Conversions API - CAPI)',
    category: 'Mídia Paga',
    description: 'Envio server-side de eventos de Purchase, AddToCart e PageView para otimização de campanhas de tráfego.',
    icon: 'Radio',
    connected: true,
    syncStatus: 'synced',
    lastSync: 'Tempo Real (Ativo)',
    metrics: [
      { label: 'Event Match Quality', value: '8.9 / 10' },
      { label: 'Eventos Últimas 24h', value: '1.420' }
    ]
  },
  {
    id: 'vtex-ecommerce',
    name: 'VTEX E-commerce (Vitgold Loja Oficial)',
    category: 'E-commerce & Marketplace',
    description: 'Ingestão contínua de pedidos, catálogo de vitaminas, status de pagamento e abandono de carrinho.',
    icon: 'ShoppingBag',
    connected: true,
    syncStatus: 'synced',
    lastSync: 'Há 5 minutos',
    metrics: [
      { label: 'Pedidos Mês', value: '271' },
      { label: 'Catálogo Ativo', value: '184 SKUs' }
    ]
  },
  {
    id: 'zielhub-kommo',
    name: 'ZielHub / WhatsApp Cloud API',
    category: 'CRM & Marketing',
    description: 'Motor de atendimento inteligente com Agente IA GPT-4o-mini sobre WhatsApp e Instagram da Vitgold.',
    icon: 'MessageSquare',
    connected: true,
    syncStatus: 'synced',
    lastSync: 'Tempo Real (SSE Conectado)',
    metrics: [
      { label: 'Conta Ativa', value: 'Vitgold (Admin)' },
      { label: 'Agente de IA', value: 'Online (08:00 - 19:00)' }
    ]
  },
  {
    id: 'marketplaces',
    name: 'Hub de Marketplaces (Mercado Livre / Amazon / Shopee)',
    category: 'E-commerce & Marketplace',
    description: 'Conciliação unificada de vendas e estoque entre os maiores marketplaces do Brasil.',
    icon: 'Boxes',
    connected: true,
    syncStatus: 'idle',
    lastSync: 'Hoje, 14:00',
    metrics: [
      { label: 'Pedidos Integrados', value: '142' },
      { label: 'Faturamento Extra', value: 'R$ 41.280,00' }
    ]
  }
];
