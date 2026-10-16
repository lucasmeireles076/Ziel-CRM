async function testModel(modelName) {
  const t0 = Date.now();
  try {
    const res = await fetch('https://text.pollinations.ai/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        messages: [
          { role: 'system', content: 'Você é a Sofia da Vitgold. Responda em 1 frase curta amigável.' },
          { role: 'user', content: 'Olá Sofia!' }
        ],
        model: modelName
      }),
      signal: AbortSignal.timeout(10000)
    });
    const txt = await res.text();
    console.log(`Model: ${modelName} | Time: ${Date.now() - t0}ms | Response: ${txt.trim().slice(0, 70)}...`);
  } catch (err) {
    console.log(`Model: ${modelName} failed: ${err.message}`);
  }
}

async function run() {
  await testModel('openai-fast');
  await testModel('mistral');
  await testModel('qwen');
  await testModel('llama');
}

run();
