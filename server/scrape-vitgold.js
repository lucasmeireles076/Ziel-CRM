// Node 24 native fetch

async function main() {
  try {
    const res = await fetch('https://vitgold.com.br');
    const html = await res.text();
    console.log('Homepage HTML length:', html.length);
    
    // Check product links
    const productLinks = [...html.matchAll(/href="([^"]+)"/g)]
      .map(m => m[1])
      .filter(l => l.includes('vitgold.com.br/') || (l.startsWith('/') && l.length > 5 && !l.includes('institucional') && !l.includes('login') && !l.includes('carrinho')));
    
    const unique = [...new Set(productLinks)];
    console.log('Unique links count:', unique.length);
    console.log('Sample links:', unique.slice(0, 15));

    // Try fetching search or specific product
    const k2Res = await fetch('https://vitgold.com.br/vitamina-k2-mk-7-menaquinona-7-100mcg-vitgold-60-capsulas-1510');
    console.log('K2 page status:', k2Res.status);
    if (k2Res.ok) {
      const k2Html = await k2Res.text();
      const title = k2Html.match(/<title>([^<]+)<\/title>/i)?.[1];
      const desc = k2Html.match(/name="description" content="([^"]+)"/i)?.[1];
      console.log('K2 Title:', title);
      console.log('K2 Meta Desc:', desc);

      // Price extraction
      const priceMatches = [...k2Html.matchAll(/R\$\s*[\d\.,]+/g)].map(m => m[0]);
      console.log('K2 sample prices:', [...new Set(priceMatches)].slice(0, 5));
    }
  } catch (err) {
    console.error('Error:', err);
  }
}

main();
