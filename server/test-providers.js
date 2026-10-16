// Test various free open AI providers
async function testDuckDuckGo() {
  try {
    const statusRes = await fetch('https://duckduckgo.com/duckchat/v1/status', {
      headers: { 'x-vqd-accept': '1' }
    });
    const vqd = statusRes.headers.get('x-vqd-4');
    console.log('DuckDuckGo VQD:', vqd);
    if (vqd) {
      const chatRes = await fetch('https://duckduckgo.com/duckchat/v1/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-vqd-4': vqd
        },
        body: JSON.stringify({
          model: 'gpt-4o-mini',
          messages: [{ role: 'user', content: 'Olá Sofia da Vitgold' }]
        })
      });
      console.log('DDG status:', chatRes.status);
    }
  } catch (e) {
    console.log('DDG failed:', e.message);
  }
}

testDuckDuckGo();
