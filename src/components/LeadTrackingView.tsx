import React, { useState } from 'react';
import { 
  Search, 
  ChevronDown, 
  MoreVertical, 
  ExternalLink, 
  X, 
  Layers,
  ArrowUpDown
} from 'lucide-react';
import { TRACKED_PAGES } from '../data/mockData';

export const LeadTrackingView: React.FC = () => {
  const [showBanner, setShowBanner] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [statusFilter, setStatusFilter] = useState('Páginas ativas');

  const filteredPages = TRACKED_PAGES.filter(p => 
    p.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    p.url.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const toggleSelectAll = () => {
    if (selectedIds.length === filteredPages.length) {
      setSelectedIds([]);
    } else {
      setSelectedIds(filteredPages.map(p => p.id));
    }
  };

  const toggleSelectOne = (id: string) => {
    if (selectedIds.includes(id)) {
      setSelectedIds(selectedIds.filter(item => item !== id));
    } else {
      setSelectedIds([...selectedIds, id]);
    }
  };

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6">
      {/* Título Principal */}
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-[#0F172A]">Lead Tracking</h1>
        <span className="text-xs bg-[#E0F7FA] text-[#007791] font-semibold px-2.5 py-1 rounded-full border border-[#B2EBF2]">
          Vitgold E-commerce Pixel Ativo
        </span>
      </div>

      {/* 1. Banner de Integração e Rastreamento (Fiel ao Print 2) */}
      {showBanner && (
        <div className="bg-white border border-[#E2E8F0] border-l-4 border-l-[#00B4D8] rounded-md p-5 shadow-sm relative transition-all">
          <div className="flex flex-col sm:flex-row items-start space-y-4 sm:space-y-0 sm:space-x-5 pr-8">
            {/* Ilustração / Ícone representativo */}
            <div className="w-16 h-16 rounded-lg bg-gradient-to-br from-[#E0F7FA] to-[#B2EBF2] flex items-center justify-center flex-shrink-0 border border-[#80DEEA]">
              <Layers className="w-8 h-8 text-[#007791]" />
            </div>

            <div className="space-y-2 flex-1">
              <h3 className="text-base font-bold text-[#0F172A]">
                Rastreie os acessos em todos os seus sites
              </h3>
              <p className="text-xs text-[#475569] leading-relaxed max-w-3xl">
                Aumente suas possibilidades de segmentação e qualificação de leads integrando seus sites ao RD Station Marketing. Instale o Código de Monitoramento para saber quando e quais páginas foram visitadas pelos seus leads.
              </p>
              <div className="flex items-center space-x-4 pt-1">
                <button className="px-4 py-2 bg-[#00B4D8] hover:bg-[#0096C7] text-white text-xs font-semibold rounded-md shadow-sm transition-colors">
                  Integrar o RD Station com outros Sites
                </button>
                <button className="text-xs text-[#007791] hover:underline font-semibold">
                  Saiba Mais
                </button>
              </div>
            </div>
          </div>

          <button 
            onClick={() => setShowBanner(false)}
            className="absolute top-4 right-4 text-[#94A3B8] hover:text-[#475569] p-1 rounded"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* 2. Barra de Ferramentas: Busca e Filtro de Páginas */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="relative flex-1 max-w-md">
          <Search className="w-4 h-4 text-[#94A3B8] absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Buscar pelo título da página"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-white border border-[#CBD5E1] rounded-md pl-9 pr-4 py-1.5 text-xs text-[#1E293B] placeholder-[#94A3B8] focus:outline-none focus:border-[#00B4D8] transition-colors shadow-sm"
          />
        </div>

        <div className="flex items-center space-x-2">
          <button 
            onClick={() => setStatusFilter(statusFilter === 'Páginas ativas' ? 'Todas as páginas' : 'Páginas ativas')}
            className="flex items-center space-x-2 bg-white border border-[#CBD5E1] rounded-md px-3 py-1.5 text-xs font-medium text-[#334155] shadow-sm hover:border-[#94A3B8]"
          >
            <span>{statusFilter}</span>
            <ChevronDown className="w-3.5 h-3.5 text-[#94A3B8]" />
          </button>
        </div>
      </div>

      {/* 3. Tabela de Rastreamento (Fiel ao Print 2) */}
      <div className="bg-white border border-[#E2E8F0] rounded-xl shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-[#E2E8F0] bg-[#F8FAFC] text-[11px] font-bold text-[#64748B] tracking-wider uppercase">
                <th className="py-3 px-4 w-12 text-center">
                  <input
                    type="checkbox"
                    checked={selectedIds.length === filteredPages.length && filteredPages.length > 0}
                    onChange={toggleSelectAll}
                    className="rounded border-[#CBD5E1] text-[#00B4D8] focus:ring-[#00B4D8] cursor-pointer"
                  />
                </th>
                <th className="py-3 px-4">
                  TÍTULO DA PÁGINA
                </th>
                <th className="py-3 px-4 flex items-center space-x-1 cursor-pointer hover:text-[#0F172A]">
                  <span>URL</span>
                  <ArrowUpDown className="w-3 h-3 text-[#94A3B8]" />
                </th>
                <th className="py-3 px-4 w-16 text-right"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#F1F5F9] text-xs">
              {filteredPages.map((page) => {
                const isSelected = selectedIds.includes(page.id);
                return (
                  <tr 
                    key={page.id} 
                    className={`hover:bg-[#F8FAFC] transition-colors ${isSelected ? 'bg-[#E0F7FA]/30' : ''}`}
                  >
                    <td className="py-3 px-4 text-center">
                      <input
                        type="checkbox"
                        checked={isSelected}
                        onChange={() => toggleSelectOne(page.id)}
                        className="rounded border-[#CBD5E1] text-[#00B4D8] focus:ring-[#00B4D8] cursor-pointer"
                      />
                    </td>
                    <td className="py-3.5 px-4 font-medium text-[#1E293B]">
                      <div className="line-clamp-1">{page.title}</div>
                    </td>
                    <td className="py-3.5 px-4">
                      <a 
                        href={`https://${page.url}`} 
                        target="_blank" 
                        rel="noreferrer"
                        className="text-[#0284C7] hover:underline flex items-center space-x-1 group"
                      >
                        <span className="line-clamp-1">{page.url}</span>
                        <ExternalLink className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0" />
                      </a>
                    </td>
                    <td className="py-3.5 px-4 text-right">
                      <button className="text-[#94A3B8] hover:text-[#334155] p-1 rounded hover:bg-[#F1F5F9]">
                        <MoreVertical className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* 4. Rodapé da Tabela: Paginação Exata do Print 2 */}
        <div className="p-4 border-t border-[#E2E8F0] bg-white flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#64748B]">
          {/* Seletor de Registros por Página */}
          <div className="flex items-center space-x-2">
            <span>Exibindo</span>
            <button className="flex items-center space-x-1 border border-[#CBD5E1] rounded px-2 py-1 bg-white hover:border-[#94A3B8] font-medium text-[#334155]">
              <span>10</span>
              <ChevronDown className="w-3 h-3 text-[#94A3B8]" />
            </button>
            <span>de 10000</span>
          </div>

          {/* Paginação Numérica com Elipses */}
          <div className="flex items-center space-x-1">
            <button className="px-2.5 py-1 text-[#64748B] hover:text-[#0F172A] disabled:opacity-50 font-medium">
              Anterior
            </button>
            <button className="w-7 h-7 rounded font-bold bg-[#E0F7FA] text-[#007791] border border-[#B2EBF2] flex items-center justify-center">
              1
            </button>
            <button className="w-7 h-7 rounded text-[#64748B] hover:bg-[#F1F5F9] flex items-center justify-center">
              2
            </button>
            <button className="w-7 h-7 rounded text-[#64748B] hover:bg-[#F1F5F9] flex items-center justify-center">
              3
            </button>
            <button className="w-7 h-7 rounded text-[#64748B] hover:bg-[#F1F5F9] flex items-center justify-center">
              4
            </button>
            <button className="w-7 h-7 rounded text-[#64748B] hover:bg-[#F1F5F9] flex items-center justify-center">
              5
            </button>
            <span className="px-1 text-[#94A3B8]">...</span>
            <button className="w-8 h-7 rounded text-[#64748B] hover:bg-[#F1F5F9] flex items-center justify-center">
              1000
            </button>
            <button className="px-2.5 py-1 text-[#0284C7] hover:underline font-semibold">
              Próxima
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
