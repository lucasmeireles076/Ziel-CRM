import { spawn } from 'child_process';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const ROOT_DIR = join(__dirname, '..');

console.log('===============================================================');
console.log('🚀 INICIANDO VITGOLD CRM + SERVIÇO WHATSAPP IA OPEN SOURCE');
console.log('===============================================================');

// 1. Inicia o Servidor Backend WhatsApp + IA Open Source (Porta 3001)
const serverProc = spawn('node', ['server/whatsapp-bot.js'], {
  cwd: ROOT_DIR,
  stdio: 'inherit',
  shell: true
});

// 2. Inicia o Frontend Vite (Porta 5173)
const viteProc = spawn('npm.cmd', ['run', 'dev'], {
  cwd: ROOT_DIR,
  stdio: 'inherit',
  shell: true
});

function cleanup() {
  console.log('\n🛑 Encerrando todos os serviços locais...');
  try { serverProc.kill(); } catch (e) {}
  try { viteProc.kill(); } catch (e) {}
  process.exit();
}

process.on('SIGINT', cleanup);
process.on('SIGTERM', cleanup);
