async function findChat() {
  const res = await fetch('https://vitgold.com.br');
  const html = await res.text();
  const keywords = ['chat', 'whatsapp', 'jivo', 'tidio', 'tawk', 'sac', 'atendimento', 'duvidas'];
  for (const kw of keywords) {
    const matches = [...html.matchAll(new RegExp(kw, 'gi'))];
    console.log(kw + ' occurrences:', matches.length);
  }
  
  // Look for whatsapp links
  const wa = [...html.matchAll(/https?:\/\/(?:api|web|wa\.me)[^\s"'<>]+/gi)].map(m => m[0]);
  console.log('WhatsApp links:', [...new Set(wa)]);

  // Look for script tags
  const scripts = [...html.matchAll(/<script[^>]+src="([^"]+)"/gi)]
    .map(m => m[1])
    .filter(s => s.includes('chat') || s.includes('bot') || s.includes('whats') || s.includes('sac') || s.includes('atendimento'));
  console.log('Chat scripts:', scripts);

  // Look for iframe or external chat widget
  const iframes = [...html.matchAll(/<iframe[^>]+src="([^"]+)"/gi)].map(m => m[1]);
  console.log('Iframes:', iframes);
}
findChat();
