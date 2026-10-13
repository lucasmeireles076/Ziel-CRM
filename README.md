# Ziel-CRM

Teste de CRM

## Mini-CRM Inteligente

MVP de CRM open source com pipeline de vendas, conversas sincronizadas pelo WhatsApp, respostas assistidas por Ollama e conectores preparados para Mercado Livre e Amazon.

## Stack

- **API:** Python 3.11+, FastAPI, Pydantic Settings, SQLAlchemy 2 assíncrono e PostgreSQL/pgvector.
- **Jobs:** Celery + Redis para a rotina diária de reativação.
- **Painel:** Next.js App Router, TypeScript, Tailwind CSS, CSS responsivo e Lucide.
- **Canais:** Evolution API v2 para WhatsApp; stubs desabilitados para Mercado Livre e Amazon.
- **IA:** Ollama local com `qwen2.5:7b` (configurável).

## Iniciar localmente com Docker

1. Execute `setup.cmd` para instalar as dependências do projeto (Python e frontend) e criar `.env` a partir do exemplo. O arquivo `.env` fica fora do Git; revise e altere as senhas locais antes de publicar qualquer serviço.

   Também é possível preparar apenas a configuração sem instalar dependências:

   ```powershell
   Copy-Item .env.example .env
   ```

2. Edite `.env` e troque `POSTGRES_PASSWORD` e `EVOLUTION_API_KEY`. Os valores precisam ser consistentes com `DATABASE_URL` se você alterar o usuário, senha ou nome do banco.

3. Instale e inicie o Ollama no host. Baixe e execute o modelo uma vez:

   ```powershell
   ollama run qwen2.5:7b
   ```

   Deixe o serviço Ollama ativo. No Docker Desktop para Windows, `host.docker.internal` permite que a API alcance o Ollama do host. Para vLLM ou outra instância, ajuste `OLLAMA_URL` e o endpoint de geração em `backend/app/services/ai_agent.py`.

4. Na raiz do projeto, construa e inicie os serviços:

   ```powershell
   .\start.cmd
   ```

   Ou rode diretamente `docker compose up --build`.

   O painel estará em <http://localhost:3000>, a documentação interativa da API em <http://localhost:8000/docs> e o Evolution Manager em <http://localhost:8080>. O worker Celery executa a rotina de reativação diariamente.

5. Na tela **Conexões**, clique em **Gerar QR Code**. O backend cria (ou reutiliza) a instância `crm` na Evolution API e configura o webhook interno. No WhatsApp do celular, abra **Dispositivos conectados → Conectar dispositivo** e escaneie o QR Code exibido.

6. Envie uma mensagem de teste ao número conectado. O contato e a interação devem aparecer no pipeline e na central de conversas. A resposta automática requer o Ollama ativo e o modelo já baixado.

## Rotas principais

- `POST /api/v1/whatsapp/webhook` — recebe `MESSAGES_UPSERT`, grava lead/histórico, gera resposta contextual e responde pelo WhatsApp.
- `GET /api/v1/whatsapp/connection` e `POST /api/v1/whatsapp/connect` — estado da instância e pareamento.
- `GET/POST /api/v1/leads`, `PATCH /api/v1/leads/{id}`, `GET /api/v1/leads/{id}/interactions` e `POST /api/v1/leads/{id}/messages`.
- `GET /api/v1/reports` — indicadores de mensagens, conversão e reativação.
- `GET/POST /api/v1/meli/webhook` e `GET/POST /api/v1/amazon/webhook` — respostas de verificação e stubs que registram eventos desabilitados e retornam sucesso.

## Observações do MVP

- As respostas da IA instruem o modelo a não inventar preços ou estoque e a encaminhar dúvidas sem informação confirmada. Estoque e preços não são consultados por este MVP.
- O job de reativação seleciona leads com última interação há mais de `REACTIVATION_DAYS`, exclui negócios fechados/perdidos e leads com pedidos. A integração deve estar conectada para que o envio funcione.
- Mercado Livre e Amazon ficam desabilitados por padrão (`MELI_ENABLED=false`, `AMAZON_ENABLED=false`). Os adaptadores ainda precisam das implementações OAuth/LWA/SQS antes de operar em produção.
- O esquema é criado automaticamente na inicialização para facilitar testes. Para produção, adicione migrações Alembic, autenticação de usuários e gestão segura de segredos antes de expor o serviço.
- O histórico mantém embeddings pgvector opcionais, mas a geração/busca semântica ainda não está ativada.

## Executar sem Docker (desenvolvimento)

Com PostgreSQL com extensão pgvector e Redis disponíveis, `setup.cmd` instala as dependências. Para iniciar a API e o frontend localmente:

```powershell
.\start-local.cmd
```

O script inicia a API e o frontend; PostgreSQL e Redis precisam estar disponíveis localmente e as URLs correspondentes configuradas em `.env`.
