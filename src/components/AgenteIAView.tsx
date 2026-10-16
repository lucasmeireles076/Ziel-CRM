import React, { useState, useEffect } from 'react';
import { 
  Save, 
  CheckCircle2, 
  Terminal, 
  Cpu, 
  Send, 
  MessageSquare, 
  UserCheck, 
  ToggleLeft, 
  ToggleRight, 
  RefreshCw,
  Zap,
  Layers,
  ShieldCheck
} from 'lucide-react';

interface AIConfig {
  enabled: boolean;
  engine: 'local-open-source' | 'ollama';
  ollamaUrl: string;
  ollamaModel: string;
  identityMode: 'assistant' | 'first_person' | 'sofia';
  userName: string;
  botName: string;
  systemPrompt: string;
  signature: string;
  autoPilotDelayMs: number;
}

export const AgenteIAView: React.FC = () => {
  const [config, setConfig] = useState<AIConfig>({
    enabled: true,
    engine: 'ollama',
    ollamaUrl: 'http://localhost:11434',
    ollamaModel: 'qwen2.5:3b',
    identityMode: 'sofia',
    userName: 'Lucas',
    botName: 'Sofia',
    systemPrompt: 'Agir como SDR da Vitgold: atender com simpatia, entender a necessidade do cliente, responder com informações verificadas no site oficial e conduzir a conversa sem pressão. Quando não souber ou não encontrar a informação no site, responder exatamente: Vou verificar.',
    signature: '',
    autoPilotDelayMs: 1000
  });

  const [saving, setSaving] = useState(false);
  const [saveFeedback, setSaveFeedback] = useState<string | null>(null);
  const [ollamaStatus, setOllamaStatus] = useState<{ available: boolean; models: { name: string }[]; configuredModel?: string; error?: string }>({ available: false, models: [] });
  const [checkingOllama, setCheckingOllama] = useState(false);

  // Playground de Teste
  const [testInput, setTestInput] = useState('Como você pode me ajudar?');
  const [testOutput, setTestOutput] = useState<string | null>(null);
  const [testing, setTesting] = useState(false);
  const ollamaModelInstalled = ollamaStatus.models.some(model => model.name === config.ollamaModel);

  // Carrega configurações da API ao abrir a tela
  useEffect(() => {
    const fetchConfig = async () => {
      try {
        const res = await fetch('http://localhost:3001/api/ai/config');
        if (res.ok) {
          const data = await res.json();
          setConfig(data);
        }
      } catch (err) {
        console.log('Servidor local offline ou iniciando...');
      }
    };

    const fetchOllama = async () => {
      try {
        const res = await fetch('http://localhost:3001/api/ai/ollama-status');
        if (res.ok) {
          const data = await res.json();
          setOllamaStatus(data);
        }
      } catch (e) {}
    };

    fetchConfig();
    fetchOllama();
  }, []);

  const handleSaveConfig = async () => {
    setSaving(true);
    setSaveFeedback(null);
    try {
      const res = await fetch('http://localhost:3001/api/ai/config', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(config)
      });
      const data = await res.json().catch(() => ({}));
      if (res.ok) {
        setSaveFeedback('Configurações da IA Open Source salvas com sucesso!');
        setTimeout(() => setSaveFeedback(null), 3500);
      } else {
        setSaveFeedback(`Erro ao salvar: ${data.error || `HTTP ${res.status}`}`);
      }
    } catch (e: any) {
      setSaveFeedback(`Erro ao salvar: ${e.message}`);
    } finally {
      setSaving(false);
    }
  };

  const handleRunTest = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!testInput.trim()) return;

    setTesting(true);
    setTestOutput(null);
    try {
      const res = await fetch('http://localhost:3001/api/ai/test', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: testInput, senderName: 'Cliente Teste' })
      });
      const data = await res.json();
      if (res.ok && data.success) {
        setTestOutput(data.response);
      } else {
        setTestOutput(`Erro: ${data.error || 'Falha ao processar inferência'}`);
      }
    } catch (err: any) {
      setTestOutput(`Erro ao conectar com o serviço da IA: ${err.message}`);
    } finally {
      setTesting(false);
    }
  };

  const checkOllamaManual = async () => {
    setCheckingOllama(true);
    try {
      const res = await fetch('http://localhost:3001/api/ai/ollama-status');
      if (res.ok) {
        const data = await res.json();
        setOllamaStatus(data);
      }
    } catch (e) {}
    finally {
      setCheckingOllama(false);
    }
  };

  return (
    <div className="p-6 max-w-6xl mx-auto space-y-6 text-[#1E293B]">
      {/* 1. Header do Módulo */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#E2E8F0] pb-6">
        <div>
          <div className="flex items-center space-x-3">
            <h1 className="text-2xl font-black text-[#0F172A] tracking-tight">
              IA Open Source & Auto-Pilot WhatsApp
            </h1>
            <span className="text-xs bg-[#4EC5E8]/15 text-[#03111C] font-extrabold px-2.5 py-1 rounded-full border border-[#4EC5E8]/30 flex items-center space-x-1">
              <Zap className="w-3.5 h-3.5 text-[#2E86D0]" />
              <span>Responde por Você 24/7</span>
            </span>
          </div>
          <p className="text-xs text-[#64748B] mt-1">
            Configure o modelo de inteligência artificial open source local para responder contatos em seu nome pelo WhatsApp conectado.
          </p>
        </div>

        <button
          onClick={handleSaveConfig}
          disabled={saving}
          className="px-4 py-2.5 bg-[#4EC5E8] hover:bg-[#6DD3F5] text-[#03111C] rounded-xl text-xs font-bold flex items-center space-x-2 shadow-[0_0_15px_rgba(78,197,232,0.3)] transition-all active:scale-95 disabled:opacity-50 shrink-0"
        >
          <Save className="w-4 h-4" />
          <span>{saving ? 'Gravando...' : 'Salvar Parâmetros da IA'}</span>
        </button>
      </div>

      {saveFeedback && (
        <div className="p-3 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-xl text-xs font-semibold flex items-center space-x-2 animate-in fade-in">
          <CheckCircle2 className="w-4 h-4 text-emerald-600" />
          <span>{saveFeedback}</span>
        </div>
      )}

      {/* 2. Grid de Controle Principal */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Coluna 1 & 2: Seleção de Motor, Identidade e Playground */}
        <div className="lg:col-span-2 space-y-6">
          {/* Card: Status do Auto-Pilot e Seleção de Motor */}
          <div className="bg-white border border-[#E2E8F0] rounded-2xl p-6 shadow-sm space-y-5">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-100">
              <div className="space-y-1">
                <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">
                  Controle de Operação
                </span>
                <h3 className="text-sm font-bold text-slate-900 flex items-center space-x-2">
                  <span>Modo Auto-Pilot (Responder pelo WhatsApp)</span>
                </h3>
                <p className="text-xs text-slate-500">
                  Quando ativo, a IA responde de forma autônoma todas as mensagens recebidas de clientes.
                </p>
              </div>

              <button
                onClick={() => setConfig(prev => ({ ...prev, enabled: !prev.enabled }))}
                className={`px-4 py-2 rounded-xl text-xs font-extrabold flex items-center space-x-2 transition-all ${
                  config.enabled 
                    ? 'bg-emerald-500 text-white shadow-[0_0_15px_rgba(16,185,129,0.35)]' 
                    : 'bg-slate-200 text-slate-600 hover:bg-slate-300'
                }`}
              >
                {config.enabled ? <ToggleRight className="w-5 h-5" /> : <ToggleLeft className="w-5 h-5" />}
                <span>{config.enabled ? 'Auto-Pilot LIGADO' : 'Auto-Pilot DESLIGADO'}</span>
              </button>
            </div>

            {/* Seleção do Motor Open Source */}
            <div className="space-y-3">
              <label className="text-xs font-bold text-slate-800 flex items-center space-x-1.5">
                <Cpu className="w-4 h-4 text-[#2E86D0]" />
                <span>Motor de Inteligência Artificial:</span>
              </label>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {/* Opção 1: Local RAG Neural Engine */}
                <div 
                  onClick={() => setConfig(prev => ({ ...prev, engine: 'local-open-source' }))}
                  className={`p-4 rounded-xl border cursor-pointer transition-all ${
                    config.engine === 'local-open-source'
                      ? 'border-[#4EC5E8] bg-[#4EC5E8]/10 ring-2 ring-[#4EC5E8]/30 shadow-sm'
                      : 'border-slate-200 bg-slate-50 hover:border-slate-300'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-bold text-xs text-slate-900">Fallback local (sem LLM)</span>
                    <span className="text-[10px] bg-amber-100 text-amber-800 font-bold px-1.5 py-0.2 rounded">Respostas limitadas</span>
                  </div>
                  <p className="text-[11px] text-slate-600 leading-tight">
                    Responde saudações e consulta alguns dados do catálogo. Para conversa aberta e respostas contextualizadas, use o modelo generativo Ollama.
                  </p>
                </div>

                {/* Opção 2: Ollama Local LLM */}
                <div 
                  onClick={() => setConfig(prev => ({ ...prev, engine: 'ollama' }))}
                  className={`p-4 rounded-xl border cursor-pointer transition-all ${
                    config.engine === 'ollama'
                      ? 'border-[#4EC5E8] bg-[#4EC5E8]/10 ring-2 ring-[#4EC5E8]/30 shadow-sm'
                      : 'border-slate-200 bg-slate-50 hover:border-slate-300'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-bold text-xs text-slate-900">Conversa inteligente (Ollama)</span>
                    <span className={`text-[10px] font-bold px-1.5 py-0.2 rounded ${
                      ollamaModelInstalled ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'
                    }`}>
                      {ollamaModelInstalled ? 'Modelo pronto' : ollamaStatus.available ? 'Baixe o modelo' : 'Ollama offline'}
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-600 leading-tight">
                    Usa um modelo generativo local, com contexto da conversa e catálogo. As mensagens não são enviadas a um serviço externo.
                  </p>
                </div>
              </div>

              {config.engine === 'ollama' && (
                <div className="p-3 bg-slate-100 rounded-xl space-y-3 text-xs">
                  <div className="grid grid-cols-1 sm:grid-cols-[1fr_1fr_auto] gap-2 items-end">
                    <label className="space-y-1">
                      <span className="block text-[11px] font-semibold text-slate-600">Endereço do Ollama</span>
                      <input
                        type="url"
                        value={config.ollamaUrl}
                        onChange={(e) => setConfig(prev => ({ ...prev, ollamaUrl: e.target.value }))}
                        className="w-full bg-white border border-slate-300 rounded-lg px-2.5 py-2 text-xs text-slate-900"
                      />
                    </label>
                    <label className="space-y-1">
                      <span className="block text-[11px] font-semibold text-slate-600">Modelo instalado</span>
                      <input
                        type="text"
                        value={config.ollamaModel}
                        onChange={(e) => setConfig(prev => ({ ...prev, ollamaModel: e.target.value }))}
                        className="w-full bg-white border border-slate-300 rounded-lg px-2.5 py-2 text-xs text-slate-900"
                      />
                    </label>
                    <button
                      onClick={checkOllamaManual}
                      disabled={checkingOllama}
                      className="text-[11px] text-[#2E86D0] hover:underline font-bold flex items-center space-x-1 disabled:opacity-50 py-2"
                    >
                      <RefreshCw className={`w-3 h-3 ${checkingOllama ? 'animate-spin' : ''}`} />
                      <span>Verificar</span>
                    </button>
                  </div>
                  <p className="text-[11px] text-slate-600">
                    {ollamaModelInstalled
                      ? `Conectado: ${config.ollamaModel}`
                      : `Para habilitar conversa generativa: instale o Ollama e execute “ollama pull ${config.ollamaModel}”. Depois salve as configurações e verifique a conexão.`}
                  </p>
                </div>
              )}
            </div>

            {/* Modo de Identidade da Resposta */}
            <div className="space-y-3 pt-3 border-t border-slate-100">
              <label className="text-xs font-bold text-slate-800 flex items-center space-x-1.5">
                <UserCheck className="w-4 h-4 text-[#2E86D0]" />
                <span>Como a IA deve se apresentar no WhatsApp:</span>
              </label>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {[
                  {
                    id: 'assistant',
                    title: 'Assistente do Lucas',
                    example: '"Sou a assistente do Lucas na Vitgold..."'
                  },
                  {
                    id: 'first_person',
                    title: 'Em 1ª Pessoa (O Lucas)',
                    example: '"Oi! Aqui é o Lucas, tudo bem?..."'
                  },
                  {
                    id: 'sofia',
                    title: 'Sofia (Consultora Vitgold)',
                    example: '"Sou a Sofia, especialista Vitgold..."'
                  }
                ].map((item) => (
                  <div
                    key={item.id}
                    onClick={() => setConfig(prev => ({ ...prev, identityMode: item.id as any }))}
                    className={`p-3.5 rounded-xl border cursor-pointer transition-all ${
                      config.identityMode === item.id
                        ? 'border-[#2E86D0] bg-[#E0F7FA]/40 ring-2 ring-[#2E86D0]/20'
                        : 'border-slate-200 bg-white hover:border-slate-300'
                    }`}
                  >
                    <span className="text-xs font-bold text-slate-900 block mb-1">{item.title}</span>
                    <span className="text-[10px] text-slate-500 italic block">{item.example}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Prompt do Sistema e Assinatura */}
            <div className="space-y-3 pt-3 border-t border-slate-100">
              <div className="flex items-center justify-between">
                <label className="text-xs font-bold text-slate-800 flex items-center space-x-1.5">
                  <Terminal className="w-4 h-4 text-[#2E86D0]" />
                  <span>Prompt do Sistema (Instruções da IA):</span>
                </label>
              </div>

              <textarea
                rows={4}
                value={config.systemPrompt}
                onChange={(e) => setConfig(prev => ({ ...prev, systemPrompt: e.target.value }))}
                className="w-full bg-[#F8FAFC] border border-[#CBD5E1] rounded-xl p-3 text-xs text-[#0F172A] font-mono leading-relaxed focus:outline-none focus:border-[#4EC5E8]"
              />

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                <div className="space-y-1">
                  <label className="text-[11px] font-semibold text-slate-600">Assinatura no WhatsApp:</label>
                  <input
                    type="text"
                    value={config.signature}
                    onChange={(e) => setConfig(prev => ({ ...prev, signature: e.target.value }))}
                    className="w-full bg-[#F8FAFC] border border-[#CBD5E1] rounded-xl px-3 py-1.5 text-xs text-[#0F172A] focus:outline-none focus:border-[#4EC5E8]"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[11px] font-semibold text-slate-600">Tempo de Digitação (ms):</label>
                  <input
                    type="number"
                    step={200}
                    value={config.autoPilotDelayMs}
                    onChange={(e) => setConfig(prev => ({ ...prev, autoPilotDelayMs: Number(e.target.value) }))}
                    className="w-full bg-[#F8FAFC] border border-[#CBD5E1] rounded-xl px-3 py-1.5 text-xs text-[#0F172A] focus:outline-none focus:border-[#4EC5E8]"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Playground de Teste em Tempo Real */}
          <div className="bg-[#030711] text-white border border-[#1E293B] rounded-2xl p-6 shadow-xl space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <div className="w-7 h-7 rounded-lg bg-[#4EC5E8]/10 border border-[#4EC5E8]/30 flex items-center justify-center text-[#4EC5E8]">
                  <MessageSquare className="w-4 h-4" />
                </div>
                <h3 className="text-sm font-bold text-white">Simulador de Resposta da IA (Playground)</h3>
              </div>
              <span className="text-[10px] text-slate-400">Ambiente de Teste Local</span>
            </div>

            <form onSubmit={handleRunTest} className="space-y-3">
              <div className="flex space-x-2">
                <input
                  type="text"
                  value={testInput}
                  onChange={(e) => setTestInput(e.target.value)}
                  placeholder="Digite uma pergunta simulando um cliente do WhatsApp..."
                  className="flex-1 bg-[#0A1322] border border-[#1E293B] rounded-xl px-4 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-[#4EC5E8]"
                />
                <button
                  type="submit"
                  disabled={testing}
                  className="px-4 py-2.5 bg-[#4EC5E8] hover:bg-[#6DD3F5] text-[#03111C] font-bold text-xs rounded-xl transition-all shadow-[0_0_15px_rgba(78,197,232,0.3)] flex items-center space-x-1.5 disabled:opacity-50"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>{testing ? 'Testando...' : 'Enviar Teste'}</span>
                </button>
              </div>

              {testOutput && (
                <div className="p-4 bg-[#0A1322] border border-[#1E293B] rounded-xl space-y-2 animate-in fade-in">
                  <div className="flex items-center justify-between text-[11px] text-[#4EC5E8] font-bold">
                    <span>Prévia da Resposta no WhatsApp:</span>
                    <span className="text-[10px] text-slate-500">Motor: {config.engine}</span>
                  </div>
                  <p className="text-xs text-slate-200 whitespace-pre-line leading-relaxed font-sans bg-[#030711] p-3 rounded-lg border border-slate-800">
                    {testOutput}
                  </p>
                </div>
              )}
            </form>
          </div>
        </div>

        {/* Coluna 3: Conhecimento Clínico Ativo da Vitgold */}
        <div className="space-y-6">
          <div className="bg-white border border-[#E2E8F0] rounded-2xl p-5 shadow-sm space-y-4">
            <h3 className="text-sm font-bold text-slate-900 flex items-center space-x-2">
              <Layers className="w-4 h-4 text-[#2E86D0]" />
              <span>Base RAG de Suplementos Ativa</span>
            </h3>

            <p className="text-xs text-slate-500 leading-relaxed">
              Ao receber uma pergunta sobre um produto conhecido, a Sofia consulta a página oficial ao vivo. Se não encontrar a resposta, responde “Vou verificar”:
            </p>

            <div className="space-y-2.5">
              {[
                { title: 'Vitamina K2 + D3 2000 UI', formula: 'MK-7 Menaquinona + D3', focus: 'Fixação óssea & elasticidade arterial' },
                { title: 'Zinco Quelato 29.5mg', formula: 'Bisglicinato puro', focus: 'Imunidade celular & síntese proteica' },
                { title: 'Cranberry 500mg Softgel', formula: 'Extrato padronizado PACs', focus: 'Saúde urinária & prevenção de ITU' },
                { title: 'Ômega 3 EPA/DHA TG', formula: 'Óleo puro selo IFOS', focus: 'Anti-inflamatório articular & triglicerídeos' }
              ].map((item, idx) => (
                <div key={idx} className="p-3 bg-slate-50 border border-slate-200 rounded-xl space-y-1">
                  <div className="flex items-center justify-between">
                    <strong className="text-xs text-slate-900">{item.title}</strong>
                    <span className="text-[9px] bg-[#4EC5E8]/20 text-[#07192C] font-bold px-1.5 py-0.2 rounded">Ativo</span>
                  </div>
                  <div className="text-[10px] text-slate-600 font-mono">{item.formula}</div>
                  <p className="text-[11px] text-slate-500 leading-tight">{item.focus}</p>
                </div>
              ))}
            </div>

            <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-xl text-xs space-y-1 text-emerald-900">
              <div className="flex items-center space-x-1 font-bold">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                <span>Cupom Ativo do Lucas:</span>
              </div>
              <p className="text-[11px] text-emerald-800">
                Cupom promocional <strong className="font-mono bg-white px-1.5 py-0.5 rounded border border-emerald-300">LUCAS10</strong> injetado automaticamente em respostas de preço e compra.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
