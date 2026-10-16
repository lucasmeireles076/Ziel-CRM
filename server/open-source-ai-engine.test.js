import assert from 'node:assert/strict';
import test from 'node:test';
import {
  aiAgentConfig,
  generateConversationalAIReply,
  updateAIAgentConfig
} from './open-source-ai-engine.js';

const originalConfig = { ...aiAgentConfig };

test.afterEach(() => {
  updateAIAgentConfig(originalConfig);
});

test('responds naturally to a greeting when Ollama is unavailable', async () => {
  const originalFetch = globalThis.fetch;
  let requestCount = 0;
  globalThis.fetch = async () => {
    requestCount += 1;
    throw new Error('connection refused');
  };
  updateAIAgentConfig({ engine: 'ollama', botName: 'Sofia' });

  try {
    const reply = await generateConversationalAIReply('Oi, tudo bem?');
    assert.match(reply, /^Oi.*Sou Sofia/);
    assert.equal(requestCount, 0);
  } finally {
    globalThis.fetch = originalFetch;
  }
});

test('uses the last product asked about for a follow-up price question', async () => {
  const originalFetch = globalThis.fetch;
  let pageUrl;
  let modelRequest;
  globalThis.fetch = async (url, options) => {
    if (new URL(String(url)).hostname === 'vitgold.com.br') {
      pageUrl = String(url);
      return {
        ok: true,
        url: String(url),
        text: async () => '<html><head><title>K2 com c&aacute;psulas Vitgold</title><meta name="description" content="Descri&ccedil;&atilde;o oficial K2"></head><body>Descrição oficial do produto</body></html>'
      };
    }
    modelRequest = JSON.parse(options.body);
    return { ok: true, json: async () => ({ message: { content: 'Encontrei a página oficial da K2.' } }) };
  };
  updateAIAgentConfig({ engine: 'ollama' });

  try {
    const reply = await generateConversationalAIReply('Quanto custa?', [
      { sender: 'user', text: 'Quero saber sobre vitamina K2' }
    ]);

    assert.equal(reply, 'Encontrei a página oficial da K2.');
    assert.match(pageUrl, /vitamina-k2-mk-7/);
    assert.match(modelRequest.messages[0].content, /K2 com cápsulas Vitgold/);
    assert.match(modelRequest.messages[0].content, /Descrição oficial K2/);
    assert.match(modelRequest.messages[0].content, /Descrição oficial do produto/);
  } finally {
    globalThis.fetch = originalFetch;
  }
});

test('answers Vou verificar when the official product page cannot be fetched', async () => {
  const originalFetch = globalThis.fetch;
  let requestCount = 0;
  globalThis.fetch = async () => {
    requestCount += 1;
    return { ok: false, status: 503 };
  };
  updateAIAgentConfig({ engine: 'ollama' });

  try {
    const reply = await generateConversationalAIReply('Qual é o preço do Zinco Quelato?');

    assert.equal(reply, 'Vou verificar');
    assert.equal(requestCount, 1);
  } finally {
    globalThis.fetch = originalFetch;
  }
});

test('rejects non-local Ollama URLs', () => {
  assert.throws(
    () => updateAIAgentConfig({ ollamaUrl: 'http://example.com:11434' }),
    /endereço do Ollama deve ser/
  );
});

test('sends greeting, conversation rules and catalog to the Ollama model', async () => {
  const originalFetch = globalThis.fetch;
  let requestBody;
  globalThis.fetch = async (url, options) => {
    if (new URL(String(url)).hostname === 'vitgold.com.br') {
      return {
        ok: true,
        url: String(url),
        text: async () => '<html><head><title>Loja Vitgold</title><meta name="description" content="Informações oficiais da loja"></head><body>Conteúdo do site Vitgold</body></html>'
      };
    }
    requestBody = JSON.parse(options.body);
    return {
      ok: true,
      json: async () => ({ message: { content: 'Oi! Como posso ajudar?' } })
    };
  };
  updateAIAgentConfig({
    engine: 'ollama',
    ollamaUrl: 'http://localhost:11434',
    ollamaModel: 'qwen2.5:3b'
  });

  try {
    const reply = await generateConversationalAIReply('Pode me ajudar?', [
      { sender: 'user', text: 'Oi' }
    ]);

    assert.equal(reply, 'Oi! Como posso ajudar?');
    assert.equal(requestBody.model, 'qwen2.5:3b');
    assert.match(requestBody.messages[0].content, /agir como SDR da Vitgold/);
    assert.match(requestBody.messages[0].content, /Não diagnostique/);
    assert.match(requestBody.messages[0].content, /Vou verificar/);
    assert.match(requestBody.messages[0].content, /Conteúdo do site Vitgold/);
    assert.deepEqual(requestBody.messages.slice(1), [
      { role: 'user', content: 'Oi' },
      { role: 'user', content: 'Pode me ajudar?' }
    ]);
  } finally {
    globalThis.fetch = originalFetch;
  }
});

test('does not invent open-ended answers when the local model is offline', async () => {
  const originalFetch = globalThis.fetch;
  globalThis.fetch = async () => {
    throw new Error('connection refused');
  };
  updateAIAgentConfig({ engine: 'ollama' });

  try {
    const reply = await generateConversationalAIReply('Me conte uma curiosidade');

    assert.equal(reply, 'Vou verificar');
  } finally {
    globalThis.fetch = originalFetch;
  }
});
