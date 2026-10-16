async function chatTurn(message, history = []) {
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
  console.log(`\n👤 Usuário: "${message}"`);
  console.log(`🤖 Sofia: \n${data.text}`);
  return data.text;
}

async function run() {
  const history = [];

  const q1 = "E como eu devo tomar a vitamina K2? Precisa ser em jejum?";
  const r1 = await chatTurn(q1, history);
  history.push({ sender: 'user', text: q1 }, { sender: 'agent', text: r1 });

  const q2 = "Vocês têm algo para imunidade e queda de cabelo?";
  const r2 = await chatTurn(q2, history);
  history.push({ sender: 'user', text: q2 }, { sender: 'agent', text: r2 });

  const q3 = "E se eu tiver crises frequentes de infecção urinária?";
  const r3 = await chatTurn(q3, history);
}

run();
