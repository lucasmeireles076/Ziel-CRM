"use client";

import { useEffect, useState } from "react";
import { CheckCircle2, ExternalLink, KeyRound, MessageCircle, QrCode } from "lucide-react";
import { QRCodeSVG } from "qrcode.react";

const API_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8000";
type Connection = { instance?: { state?: string }; state?: string; base64?: string; code?: string; qrcode?: { base64?: string; code?: string } };

export default function SettingsPage() {
  const [qr, setQr] = useState("");
  const [state, setState] = useState("Não conectado");
  const [error, setError] = useState("");
  useEffect(() => {
    let mounted = true;
    fetch(`${API_URL}/api/v1/whatsapp/connection`, { cache: "no-store" })
      .then(async (response) => {
        if (!response.ok) throw new Error("Não foi possível verificar o status do WhatsApp.");
        return response.json() as Promise<Connection>;
      })
      .then((data) => {
        if (mounted) setState(data.instance?.state ?? data.state ?? "Não conectado");
      })
      .catch((reason: Error) => {
        if (mounted) setError(reason.message);
      });
    return () => { mounted = false; };
  }, []);
  useEffect(() => {
    if (!qr) return;
    const timer = window.setInterval(async () => {
      try {
        const response = await fetch(`${API_URL}/api/v1/whatsapp/connection`, { cache: "no-store" });
        if (!response.ok) throw new Error("Não foi possível verificar o status do WhatsApp.");
        const data: Connection = await response.json();
        const currentState = data.instance?.state ?? data.state ?? "Aguardando leitura do QR Code";
        setState(currentState);
        if (currentState.toLowerCase() === "open") setQr("");
      } catch (reason) { setError((reason as Error).message); }
    }, 4000);
    return () => window.clearInterval(timer);
  }, [qr]);
  const connect = async () => {
    setError("");
    try {
      const response = await fetch(`${API_URL}/api/v1/whatsapp/connect`, { method: "POST" });
      if (!response.ok) throw new Error("Não foi possível solicitar o QR Code. Verifique a Evolution API.");
      const data: Connection = await response.json();
      const qrValue = data.base64 ?? data.qrcode?.base64 ?? data.code ?? data.qrcode?.code ?? "";
      setQr(qrValue.startsWith("data:") || !qrValue ? qrValue : qrValue.startsWith("iVBOR") ? `data:image/png;base64,${qrValue}` : qrValue);
      setState(data.instance?.state ?? data.state ?? (data.code ? "Aguardando leitura do QR Code" : "Solicitação enviada"));
    } catch (reason) { setError((reason as Error).message); }
  };
  return <section className="page">
    <div className="page-heading"><div><div className="eyebrow">CONFIGURAÇÕES</div><h1>Conexões</h1><p>Gerencie seus canais e integrações.</p></div></div>
    <div className="settings-section"><div className="section-title"><h2>Canais conectados</h2><p>Conecte seus pontos de contato ao Fluxo CRM.</p></div>
      <article className="integration-card whatsapp-card"><div className="integration-main"><div className="integration-icon whatsapp"><MessageCircle size={21} /></div><div><h3>WhatsApp</h3><p>Conecte sua conta via Evolution API para receber e enviar mensagens.</p></div><span className={`integration-state ${state.toLowerCase() === "open" ? "connected" : "disconnected"}`}><i className="status-dot" />{state}</span></div>
        <div className="qr-area">{qr ? qr.startsWith("data:") ? <img className="qr-image" src={qr} alt="QR Code para conectar WhatsApp" /> : <QRCodeSVG className="qr-image qr-svg" value={qr} size={128} level="M" /> : <div className="qr-placeholder"><QrCode size={34} /><span>Seu QR Code aparecerá aqui</span></div>}<div><strong>Pareie seu WhatsApp</strong><p>Abra o WhatsApp no celular, acesse <b>Dispositivos conectados</b> e escaneie o QR Code.</p><button className="button primary" onClick={connect}><QrCode size={16} /> Gerar QR Code</button></div></div>
      </article>
    </div>
    <div className="settings-section"><div className="section-title"><h2>Marketplaces</h2><p>Os conectores estão preparados e serão liberados em breve.</p></div>
      <div className="marketplace-grid">{["Mercado Livre", "Amazon SP-API"].map((name) => <article className="integration-card marketplace-card" key={name}><div className="marketplace-heading"><div className="integration-icon marketplace"><KeyRound size={20} /></div><span className="coming-soon">EM BREVE</span></div><h3>{name}</h3><p>Configure suas credenciais para sincronizar pedidos e clientes.</p><label>Client ID<input placeholder="Insira seu Client ID" disabled /></label><label>Client Secret<input placeholder="Insira seu Client Secret" disabled /></label><button className="button secondary full-width" disabled><CheckCircle2 size={16} /> Aguardar liberação</button></article>)}</div>
    </div>
    <div className="help-note"><ExternalLink size={16} /><span>Precisa de ajuda? Consulte a documentação da Evolution API para configurar sua instância e webhook.</span></div>
    {error && <div className="error-banner">{error}</div>}
  </section>;
}
