import React, { useState } from 'react';
import { 
  FileSpreadsheet, 
  UploadCloud, 
  BarChart, 
  FileCheck
} from 'lucide-react';
import { SAMPLE_SPREADSHEET_DATA } from '../data/mockData';
import type { ImportedSpreadsheetData } from '../types';

export const ImportadorPlanilhaView: React.FC = () => {
  const [data, setData] = useState<ImportedSpreadsheetData | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);

  const handleLoadSample = () => {
    setIsProcessing(true);
    setTimeout(() => {
      setData(SAMPLE_SPREADSHEET_DATA);
      setIsProcessing(false);
    }, 500);
  };

  const handleSimulatedUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsProcessing(true);
    setTimeout(() => {
      setData({
        ...SAMPLE_SPREADSHEET_DATA,
        fileName: file.name,
        processedDate: new Date().toLocaleString()
      });
      setIsProcessing(false);
    }, 600);
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
            <span>Importador Inteligente de Planilhas</span>
            <span className="text-xs bg-emerald-100 text-emerald-800 font-bold px-2 py-0.5 rounded-full border border-emerald-200">
              Excel (.xlsx) & CSV
            </span>
          </h1>
          <p className="text-xs text-[#64748B]">
            Transforme planilhas de vendas, leads e pedidos em relatórios visuais e dashboards interativos
          </p>
        </div>

        <button
          onClick={handleLoadSample}
          disabled={isProcessing}
          className="px-4 py-2 bg-[#4EC5E8] hover:bg-[#6DD3F5] text-[#03111C] rounded-xl text-xs font-bold flex items-center space-x-1.5 shadow-[0_0_15px_rgba(78,197,232,0.25)] transition-all disabled:opacity-50"
        >
          <FileCheck className="w-3.5 h-3.5" />
          <span>{isProcessing ? 'Processando Planilha...' : 'Carregar Planilha Modelo Vitgold'}</span>
        </button>
      </div>

      {/* Área de Upload (Drag & Drop) */}
      {!data && (
        <div className="bg-white border-2 border-dashed border-[#CBD5E1] hover:border-[#4EC5E8] rounded-2xl p-10 text-center transition-colors flex flex-col items-center justify-center space-y-4">
          <div className="w-16 h-16 rounded-2xl bg-[#4EC5E8]/10 border border-[#4EC5E8]/20 flex items-center justify-center text-[#2E86D0]">
            <UploadCloud className="w-8 h-8" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-[#0F172A]">
              Arraste e solte sua planilha de vendas aqui
            </h3>
            <p className="text-xs text-[#64748B] mt-1">
              Suporte completo a arquivos .XLSX, .XLS e .CSV exportados da VTEX, ERP ou bancos de dados
            </p>
          </div>

          <label className="cursor-pointer px-4 py-2 bg-[#030711] hover:bg-[#0E1A2D] text-white rounded-xl text-xs font-semibold shadow-sm transition-colors">
            <span>Selecionar Arquivo no Computador</span>
            <input type="file" accept=".xlsx,.xls,.csv" onChange={handleSimulatedUpload} className="hidden" />
          </label>
        </div>
      )}

      {/* Relatório e Dashboard Gerados a partir da Planilha */}
      {data && (
        <div className="space-y-6">
          {/* Card de Confirmação do Arquivo */}
          <div className="bg-white border border-[#E2E8F0] rounded-xl p-4 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-lg bg-emerald-100 text-emerald-700 flex items-center justify-center">
                <FileSpreadsheet className="w-5 h-5" />
              </div>
              <div>
                <div className="flex items-center space-x-2">
                  <h4 className="text-xs font-bold text-[#0F172A]">{data.fileName}</h4>
                  <span className="text-[10px] bg-emerald-50 text-emerald-700 font-semibold px-2 py-0.2 rounded border border-emerald-200">
                    Processada com Sucesso
                  </span>
                </div>
                <span className="text-[11px] text-[#64748B]">
                  {data.rowCount} linhas analisadas • {data.processedDate}
                </span>
              </div>
            </div>

            <label className="cursor-pointer text-xs text-[#2E86D0] hover:underline font-semibold flex items-center space-x-1">
              <span>Importar outra planilha</span>
              <input type="file" accept=".xlsx,.xls,.csv" onChange={handleSimulatedUpload} className="hidden" />
            </label>
          </div>

          {/* Cards de Métricas Extraídas */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-white border border-[#E2E8F0] rounded-xl p-4 shadow-sm">
              <span className="text-[11px] font-bold text-[#64748B] uppercase tracking-wider block mb-1">
                Faturamento Total
              </span>
              <span className="text-2xl font-black text-[#0F172A]">
                {formatBRL(data.totalVolume)}
              </span>
              <span className="text-[11px] text-emerald-600 font-semibold block mt-1">
                Soma de todos os pedidos da planilha
              </span>
            </div>

            <div className="bg-white border border-[#E2E8F0] rounded-xl p-4 shadow-sm">
              <span className="text-[11px] font-bold text-[#64748B] uppercase tracking-wider block mb-1">
                Ticket Médio
              </span>
              <span className="text-2xl font-black text-[#2E86D0]">
                {formatBRL(data.avgTicket)}
              </span>
              <span className="text-[11px] text-slate-500 font-medium block mt-1">
                {data.rowCount} transações calculadas
              </span>
            </div>

            <div className="bg-white border border-[#E2E8F0] rounded-xl p-4 shadow-sm">
              <span className="text-[11px] font-bold text-[#64748B] uppercase tracking-wider block mb-1">
                Categoria Líder de Vendas
              </span>
              <span className="text-lg font-black text-[#0E7490] line-clamp-1">
                {data.topCategory}
              </span>
              <span className="text-[11px] text-slate-500 font-medium block mt-1">
                Maior volume faturado no lote
              </span>
            </div>

            <div className="bg-white border border-[#E2E8F0] rounded-xl p-4 shadow-sm">
              <span className="text-[11px] font-bold text-[#64748B] uppercase tracking-wider block mb-1">
                Integridade dos Dados
              </span>
              <span className="text-2xl font-black text-emerald-600">100%</span>
              <span className="text-[11px] text-emerald-700 font-semibold block mt-1">
                Zero linhas corrompidas
              </span>
            </div>
          </div>

          {/* Gráfico de Barras SVG Original de Vendas por Categoria */}
          <div className="bg-white border border-[#E2E8F0] rounded-xl p-5 shadow-sm space-y-4">
            <h3 className="text-xs font-bold text-[#0F172A] uppercase tracking-wider flex items-center space-x-1.5">
              <BarChart className="w-4 h-4 text-[#2E86D0]" />
              <span>Distribuição de Vendas da Planilha por Categoria</span>
            </h3>

            <div className="space-y-3 pt-2">
              {[
                { cat: 'Ossos & Articulações (K2 + D3)', val: 18450, pct: 42, color: '#4EC5E8' },
                { cat: 'Imunidade (Zinco + Própolis + Vit C)', val: 12200, pct: 28, color: '#2E86D0' },
                { cat: 'Pele & Cabelos (Cranberry & Colágeno)', val: 7800, pct: 18, color: '#0B2A4A' },
                { cat: 'Ômegas & Vitaminas Puras', val: 5506, pct: 12, color: '#6DD3F5' }
              ].map((item, idx) => (
                <div key={idx} className="space-y-1">
                  <div className="flex justify-between text-xs">
                    <span className="font-semibold text-[#1E293B]">{item.cat}</span>
                    <div className="space-x-2">
                      <span className="font-bold text-[#0F172A]">{formatBRL(item.val)}</span>
                      <span className="text-slate-500 font-medium">({item.pct}%)</span>
                    </div>
                  </div>
                  <div className="w-full h-3 bg-slate-100 rounded-full overflow-hidden">
                    <div
                      className="h-full rounded-full transition-all duration-700"
                      style={{ width: `${item.pct}%`, backgroundColor: item.color }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Tabela dos Registros Importados */}
          <div className="bg-white border border-[#E2E8F0] rounded-xl shadow-sm overflow-hidden">
            <div className="p-4 border-b border-[#E2E8F0] bg-[#F8FAFC]">
              <h3 className="text-xs font-bold text-[#0F172A] uppercase tracking-wider">
                Amostra das Transações Importadas
              </h3>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse text-xs">
                <thead>
                  <tr className="border-b border-[#E2E8F0] bg-[#F8FAFC] text-[11px] font-bold text-[#64748B]">
                    <th className="py-2.5 px-4">Cliente</th>
                    <th className="py-2.5 px-4">Produto Vitgold</th>
                    <th className="py-2.5 px-4">Categoria</th>
                    <th className="py-2.5 px-4">Canal</th>
                    <th className="py-2.5 px-4 text-right">Valor</th>
                    <th className="py-2.5 px-4 text-right">Data</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#F1F5F9]">
                  {data.rows.map((row) => (
                    <tr key={row.id} className="hover:bg-[#F8FAFC] transition-colors">
                      <td className="py-3 px-4 font-bold text-[#0F172A]">{row.cliente}</td>
                      <td className="py-3 px-4 text-[#334155]">{row.produto}</td>
                      <td className="py-3 px-4">
                        <span className="bg-[#E0F7FA] text-[#007791] font-semibold px-2 py-0.5 rounded text-[10px]">
                          {row.categoria}
                        </span>
                      </td>
                      <td className="py-3 px-4 text-[#2E86D0] font-medium">{row.canal}</td>
                      <td className="py-3 px-4 text-right font-mono font-bold text-emerald-600">
                        {formatBRL(row.valor)}
                      </td>
                      <td className="py-3 px-4 text-right text-slate-500 font-mono">{row.data}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
