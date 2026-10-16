import express from 'express';
import cors from 'cors';
import QRCode from 'qrcode';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';
import makeWASocket, { 
  useMultiFileAuthState, 
  DisconnectReason 
} from '@whiskeysockets/baileys';

import { 
  generateOpenSourceAIReply, 
  generateConversationalAIReply,
  getAIAgentConfig, 
  updateAIAgentConfig, 
  loadAIAgentConfig,
  saveAIAgentConfig,
  checkOllamaAvailability,
  VITGOLD_CATALOG
} from './open-source-ai-engine.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Garante que o processo nunca caia por erro de rede do socket
process.on('uncaughtException', (err) => {
  console.log('[WhatsApp Error Handler]', err.message);
});
process.on('unhandledRejection', (reason) => {
  console.log('[WhatsApp Rejection Handler]', reason);
});

const app = express();
const PORT = process.env.PORT || 3001;
const AUTH_DIR = join(__dirname, 'auth_info_baileys');

app.use(cors());
app.use(express.json());

// Estado global da conexão
let sock = null;
let connectionStatus = 'disconnected'; // 'disconnected' | 'connecting' | 'connected'
let currentQrCodeDataUrl = null;
let currentQrRaw = null;
let connectedUser = null;
const messageHistory = [];

function logMessage(msg) {
  const existingMessage = msg.id && messageHistory.find(existing => existing.id === msg.id);
  if (existingMessage) {
    Object.assign(existingMessage, msg);
    return;
  }
  messageHistory.unshift(msg);
  if (messageHistory.length > 80) messageHistory.pop();
}

app.get('/', (req, res) => {
  res.json({
    service: 'ZielHub CRM API',
    status: 'online',
    endpoints: [
      '/api/whatsapp/status',
      '/api/whatsapp/messages',
      '/api/ai/config',
      '/api/ai/ollama-status',
      '/api/vitgold/catalog'
    ]
  });
});

// Inicializa ou reinicializa a conexão com o WhatsApp
async function startWhatsAppBot() {
  try {
    connectionStatus = 'connecting';
    console.log('[WhatsApp] Iniciando conexão Baileys oficial...');

    if (!fs.existsSync(AUTH_DIR)) {
      fs.mkdirSync(AUTH_DIR, { recursive: true });
    }

    const { state, saveCreds } = await useMultiFileAuthState(AUTH_DIR);

    sock = makeWASocket({
      auth: state,
      printQRInTerminal: true,
      browser: ['ZielHub CRM (Lucas)', 'Chrome', '124.0.0']
    });

    sock.ev.on('creds.update', saveCreds);

    sock.ev.on('connection.update', async (update) => {
      const { connection, lastDisconnect, qr } = update;

      if (qr) {
        currentQrRaw = qr;
        currentQrCodeDataUrl = await QRCode.toDataURL(qr, {
          width: 320,
          margin: 2,
          color: {
            dark: '#03111C',
            light: '#FFFFFF'
          }
        });
        console.log('[WhatsApp] Novo QR Code gerado! Pronto para leitura no celular.');
      }

      if (connection === 'close') {
        const statusCode = lastDisconnect?.error?.output?.statusCode;
        const isLoggedOut = statusCode === DisconnectReason.loggedOut;
        
        console.log('[WhatsApp] Conexão encerrada. Status:', statusCode, 'Deslogado:', isLoggedOut, 'Erro:', lastDisconnect?.error?.message);
        connectionStatus = 'disconnected';
        currentQrCodeDataUrl = null;
        connectedUser = null;

        if (isLoggedOut) {
          console.log('[WhatsApp] Sessão deslogada. Limpando credenciais e gerando novo QR Code...');
          try {
            if (fs.existsSync(AUTH_DIR)) {
              fs.rmSync(AUTH_DIR, { recursive: true, force: true });
            }
          } catch (e) {}
        }

        // Reconecta sempre após 2.5 segundos para manter o QR Code ou a sessão ativa
        setTimeout(() => startWhatsAppBot(), 2500);
      } else if (connection === 'open') {
        connectionStatus = 'connected';
        currentQrCodeDataUrl = null;
        connectedUser = sock.user;
        console.log('[WhatsApp] ✅ Conectado com sucesso! Usuário:', sock.user?.id || sock.user?.name);
      }
    });

    // Escuta de mensagens recebidas
    sock.ev.on('messages.upsert', async ({ messages, type }) => {
      if (type !== 'notify' && type !== 'append') return;

      for (const msg of messages) {
        if (!msg.message) continue;
        
        const isFromMe = msg.key.fromMe;
        const sender = msg.key.remoteJid;
        const currentConfig = getAIAgentConfig();
        
        const text = 
          msg.message.conversation || 
          msg.message.extendedTextMessage?.text || 
          msg.message.imageMessage?.caption || 
          msg.message.videoMessage?.caption ||
          msg.message.buttonsResponseMessage?.selectedDisplayText ||
          msg.message.listResponseMessage?.title ||
          '';

        const senderName = msg.pushName || sender?.replace('@s.whatsapp.net', '') || 'Cliente';

        console.log(`[WhatsApp] Mensagem de ${senderName} (${sender}): "${text}" [FromMe: ${isFromMe}]`);

        logMessage({
          id: msg.key.id,
          from: sender,
          senderName: isFromMe ? `${currentConfig.botName || 'Sofia'} • SDR Vitgold` : senderName,
          text,
          fromMe: isFromMe,
          timestamp: new Date().toISOString()
        });

        // Se for mensagem recebida de cliente e a IA estiver habilitada para responder pelo usuário
        if (type === 'notify' && !isFromMe && sender && !sender.endsWith('@g.us') && text && currentConfig.enabled) {
          try {
            console.log(`[WhatsApp] SDR Vitgold gerando resposta para ${senderName}...`);
            
            if (!global.whatsappHistories) {
              global.whatsappHistories = new Map();
            }
            if (!global.whatsappHistories.has(sender)) {
              const previousMessages = messageHistory
                .filter(message => message.from === sender && message.id !== msg.key.id && message.text)
                .reverse()
                .slice(-20)
                .map(message => ({
                  sender: message.fromMe ? 'agent' : 'user',
                  text: message.text,
                  fromMe: message.fromMe
                }));
              global.whatsappHistories.set(sender, previousMessages);
            }
            const contactHistory = global.whatsappHistories.get(sender);

            const replyText = await generateConversationalAIReply(text, contactHistory, senderName);

            // Armazena no histórico do contato
            contactHistory.push({ sender: 'user', text, fromMe: false });
            contactHistory.push({ sender: 'agent', text: replyText, fromMe: true });
            if (contactHistory.length > 20) contactHistory.splice(0, 2);

            // Simula digitação humana
            try {
              await sock.sendPresenceUpdate('composing', sender);
            } catch (presenceError) {
              console.warn('[WhatsApp] Não foi possível atualizar presença para digitando:', presenceError.message);
            }
            await new Promise(r => setTimeout(r, currentConfig.autoPilotDelayMs || 1000));
            try {
              await sock.sendPresenceUpdate('paused', sender);
            } catch (presenceError) {
              console.warn('[WhatsApp] Não foi possível atualizar presença para pausado:', presenceError.message);
            }

            // Envia resposta no WhatsApp
            const sentMessage = await sock.sendMessage(sender, { text: replyText });

            logMessage({
              id: sentMessage?.key?.id || `reply-${Date.now()}`,
              from: sender,
              senderName: `${currentConfig.botName} • SDR Vitgold`,
              text: replyText,
              fromMe: true,
              timestamp: new Date().toISOString()
            });

            console.log(`[WhatsApp] ✅ Resposta personalizada enviada com sucesso para ${sender}!`);
          } catch (replyErr) {
            console.error('[WhatsApp] Erro ao enviar resposta da IA:', replyErr);
          }
        }
      }
    });

  } catch (err) {
    console.error('[WhatsApp] Falha ao iniciar bot:', err);
    connectionStatus = 'disconnected';
  }
}

// =====================================================================
// Rotas da API REST para o Frontend CRM
// =====================================================================

// 1. Status atual do WhatsApp e QR Code
app.get('/api/whatsapp/status', (req, res) => {
  res.json({
    status: connectionStatus,
    qrCodeDataUrl: currentQrCodeDataUrl,
    connectedUser: connectedUser ? {
      id: connectedUser.id,
      name: connectedUser.name || 'WhatsApp Conectado',
      phone: connectedUser.id?.split('@')[0]?.split(':')[0] || ''
    } : null,
    uptime: process.uptime()
  });
});

// 2. Histórico de mensagens
app.get('/api/whatsapp/messages', (req, res) => {
  res.json({
    total: messageHistory.length,
    messages: messageHistory
  });
});

// 3. Enviar mensagem de teste manual via CRM
app.post('/api/whatsapp/send', async (req, res) => {
  try {
    const { phone, message } = req.body;
    if (!sock || connectionStatus !== 'connected') {
      return res.status(400).json({ error: 'WhatsApp não está conectado no momento.' });
    }
    if (!phone || !message) {
      return res.status(400).json({ error: 'Telefone e mensagem são obrigatórios.' });
    }

    const cleanPhone = phone.replace(/\D/g, '');
    const jid = `${cleanPhone}@s.whatsapp.net`;

    const sentMessage = await sock.sendMessage(jid, { text: message });

    logMessage({
      id: sentMessage?.key?.id || `manual-${Date.now()}`,
      from: jid,
      senderName: getAIAgentConfig().userName || 'Atendente',
      text: message,
      fromMe: true,
      timestamp: new Date().toISOString()
    });

    res.json({ success: true, message: 'Mensagem enviada com sucesso!' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 4. Desconectar e reiniciar sessão
app.post('/api/whatsapp/disconnect', async (req, res) => {
  try {
    if (sock) {
      try { await sock.logout(); } catch(e) {}
      sock = null;
    }
    if (fs.existsSync(AUTH_DIR)) {
      fs.rmSync(AUTH_DIR, { recursive: true, force: true });
    }
    connectionStatus = 'disconnected';
    currentQrCodeDataUrl = null;
    connectedUser = null;

    setTimeout(() => startWhatsAppBot(), 1000);
    res.json({ success: true, message: 'Sessão desconectada. Gerando novo QR Code...' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// =====================================================================
// Rotas da IA Open Source (Configurações, Testes e Ollama)
// =====================================================================

// 5. Obter configuração atual da IA
app.get('/api/ai/config', (req, res) => {
  res.json(getAIAgentConfig());
});

// 6. Atualizar configuração da IA
app.post('/api/ai/config', async (req, res) => {
  try {
    const updated = updateAIAgentConfig(req.body);
    await saveAIAgentConfig(updated);
    res.json({ success: true, config: updated });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 7. Testar resposta da IA em tempo real no CRM
app.post('/api/ai/test', async (req, res) => {
  try {
    const { message, senderName } = req.body;
    if (typeof message !== 'string' || !message.trim()) {
      return res.status(400).json({ error: 'Mensagem é obrigatória.' });
    }
    const reply = await generateOpenSourceAIReply(message, senderName || 'Usuário Teste');
    res.json({
      success: true,
      query: message,
      response: reply,
      engine: getAIAgentConfig().engine
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 8. Conversa verdadeira multi-turn entre Usuário e Atendente Sofia
app.post('/api/conversations/sofia-chat', async (req, res) => {
  try {
    const { message, history = [], senderName = 'Lucas' } = req.body;
    if (typeof message !== 'string' || !message.trim()) {
      return res.status(400).json({ error: 'Mensagem é obrigatória.' });
    }
    if (!Array.isArray(history)) {
      return res.status(400).json({ error: 'O histórico deve ser uma lista de mensagens.' });
    }

    const reply = await generateConversationalAIReply(message, history.slice(-10), senderName);

    res.json({
      success: true,
      sender: 'agent',
      senderName: getAIAgentConfig().botName || 'Sofia (Vitgold)',
      text: reply,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      engine: getAIAgentConfig().engine
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 8. Checar status do Ollama Local
app.get('/api/ai/ollama-status', async (req, res) => {
  const status = await checkOllamaAvailability();
  res.json(status);
});

// 9. Catálogo de Produtos e Ofertas Reais da Vitgold
app.get('/api/vitgold/catalog', (req, res) => {
  res.json({
    success: true,
    store: 'https://vitgold.com.br',
    coupon: getAIAgentConfig().couponCode || 'LUCAS10',
    totalProducts: Object.keys(VITGOLD_CATALOG).length,
    products: VITGOLD_CATALOG
  });
});

// Inicia servidor Express e o Bot
await loadAIAgentConfig();

app.listen(PORT, () => {
  console.log(`=================================================`);
  console.log(`🤖 Servidor WhatsApp Vitgold com IA Open Source Rodando`);
  console.log(`🌐 Porta API: http://localhost:${PORT}`);
  console.log(`📱 Status Endpoint: http://localhost:${PORT}/api/whatsapp/status`);
  console.log(`🧠 IA Config Endpoint: http://localhost:${PORT}/api/ai/config`);
  console.log(`=================================================`);
  startWhatsAppBot();
});
