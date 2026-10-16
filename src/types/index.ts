export type UserRoleProfile = 'admin' | 'vitgold' | 'geral';

export type NavigationTab = 
  // Atendimento & Chat
  | 'conversas' 
  | 'agente' 
  // Comercial & CRM
  | 'funis' 
  | 'scoring' 
  // Marketing & Campanhas
  | 'campanhas'
  | 'tracking' 
  | 'ecommerce' 
  // Inteligência & BI
  | 'bi'
  | 'importador'
  // Gestão Vitgold
  | 'equipe-vitgold'
  | 'integracoes';

export interface FunnelMetric {
  label: string;
  value: number;
  formattedValue: string;
  conversionRate?: string;
  isPrimary?: boolean;
}

export interface RevenueMetric {
  title: string;
  value: string;
  subValue?: string;
  changePercent: string;
  changePositive: boolean;
  tooltip?: string;
}

export interface DailyPoint {
  day: string;
  orders: number;
  revenue: number;
}

export interface TrackedPage {
  id: string;
  title: string;
  url: string;
  active: boolean;
  visits: number;
  conversions: number;
}

export interface ScoreCriterion {
  property: string;
  term: string;
  score: number;
  weight: number;
  total: number;
}

export interface ScoreExample {
  name: string;
  criteria: ScoreCriterion[];
  totalScore: number;
  classification: 'A' | 'B' | 'C' | 'D';
}

export interface MessageItem {
  id: string;
  sender: 'user' | 'agent' | 'human';
  text: string;
  timestamp: string;
}

export type ChatMessage = MessageItem;

export interface ConversationItem {
  id: string;
  contactName: string;
  phone: string;
  channel: 'whatsapp' | 'instagram' | 'web';
  status: 'todas' | 'abertas' | 'aguardando' | 'fechadas';
  lastMessage: string;
  timestamp: string;
  unreadCount: number;
  agentActive: boolean;
  assignedTo?: string;
  messages: MessageItem[];
}

export interface PipelineStage {
  id: string;
  name: string;
  color: string;
  leadsCount: number;
  totalValue: number;
}

export interface PipelineLead {
  id: string;
  name: string;
  company: string;
  value: number;
  stageId: string;
  scoreGrade: 'A' | 'B' | 'C' | 'D';
  scoreValue: number;
  phone: string;
  origin: 'WhatsApp' | 'RD Station' | 'Meta Ads' | 'VTEX E-commerce';
  lastContactHoursAgo: number; // Para controle de no-show Chatfor
}

export interface IntegrationStatus {
  id: string;
  name: string;
  category: 'CRM & Marketing' | 'Mídia Paga' | 'E-commerce & Marketplace';
  description: string;
  icon: string;
  connected: boolean;
  syncStatus: 'idle' | 'syncing' | 'synced' | 'error';
  lastSync: string;
  metrics?: { label: string; value: string }[];
}

// Nova Interface: Campanhas de Disparo (Chatfor)
export interface CampaignItem {
  id: string;
  name: string;
  channel: 'WhatsApp Cloud API' | 'Meta Ads CAPI' | 'RD Station Email';
  targetAudience: string;
  sentCount: number;
  deliveredCount: number;
  readCount: number;
  replyCount: number;
  conversionCount: number;
  attributedRevenue: number;
  status: 'Ativa' | 'Concluída' | 'Agendada' | 'Pausada';
  scheduledDate: string;
}

// Nova Interface: Membro da Equipe Vitgold (Controle de Uso, Tempo e Tag)
export interface VitgoldTeamMember {
  id: string;
  name: string;
  email: string;
  avatar: string;
  roleTag: 'Nutricionista & Consultora' | 'Vendedor Sênior' | 'Gestor Comercial' | 'Supervisor IA' | 'Suporte & SAC';
  status: 'Online' | 'Em Atendimento' | 'Pausa / Almoço' | 'Offline';
  onlineTimeToday: string; // Ex: "7h 45m"
  avgResponseTime: string; // Ex: "1m 15s"
  conversationsToday: number;
  totalRevenueMonth: number;
  satisfactionScore: number; // 0 a 5.0
}

// Nova Interface: Dados Importados da Planilha
export interface ImportedSpreadsheetData {
  fileName: string;
  rowCount: number;
  totalVolume: number;
  avgTicket: number;
  topCategory: string;
  processedDate: string;
  rows: {
    id: string;
    cliente: string;
    produto: string;
    categoria: string;
    valor: number;
    data: string;
    canal: string;
  }[];
}
