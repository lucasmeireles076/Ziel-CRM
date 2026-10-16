async function checkVitgold() {
  try {
    const res = await fetch('https://vitgold.com.br');
    const text = await res.text();
    console.log('HTML Length:', text.length);
    const titleMatch = text.match(/<title>([^<]+)<\/title>/i);
    console.log('Title:', titleMatch ? titleMatch[1] : 'No title');
    
    // Look for product links or schema markup
    const links = [...text.matchAll(/href="([^"]+)"/g)].map(m => m[1]).filter(l => l.includes('vitamina') || l.includes('suplemento') || l.includes('produto') || l.includes('k2') || l.includes('zinco') || l.includes('cranberry'));
    console.log('Sample links found:', [...new Set(links)].slice(0, 10));
  } catch (err) {
    console.error('Error:', err.message);
  }
}
checkVitgold();
