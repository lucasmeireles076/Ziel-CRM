async function chatTurn(message, history = []) {
  const t0 = Date.now();
  const res = await fetch('http://localhost:3001/api/conversations/sofia-chat', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      message,
      history,
      senderName: 'Lucas Demo'
    })
  });
  const data = await res.json();
  console.log(`\n========================================`);
  console.log(`⏱️ Tempo: ${Date.now() - t0}ms | Engine: ${data.engine}`);
  console.log(`👤 Usuário: "${message}"`);
  console.log(`🤖 Sofia: \n${data.text}`);
  console.log(`========================================`);
  return data.text;
}

async function runDemo() {
  const history = [];

  // Turn 1
  const q1 = "Olá Sofia, tudo bem? Tenho 48 anos, sinto dor no joelho ao levantar e muito cansaço à noite.";
  const r1 = await chatTurn(q1, history);
  history.push({ sender: 'user', text: q1 });
  history.push({ sender: 'agent', text: r1 });

  // Turn 2 (contextual follow-up)
  const q2 = "Qual o preço exato dessa Vitamina K2 de 60 cápsulas e quanto tempo dura o pote?";
  const r2 = await chatTurn(q2, history);
  history.push({ sender: 'user', text: q2 });
  history.push({ sender: 'agent', text: r2 });

  // Turn 3 (cupom / checkout)
  const q3 = "Tenho direito a algum cupom de desconto ou frete grátis para finalizar?";
  const r3 = await chatTurn(q3, history);
}

runDemo();
