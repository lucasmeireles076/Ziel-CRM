async function extractProductsFromCategory(url) {
  try {
    const res = await fetch(url);
    if (!res.ok) return [];
    const html = await res.text();
    
    // Extract product cards
    // In Irroba platform, products typically have title and price in .product-thumb or .item
    const titles = [...html.matchAll(/<a[^>]+title="([^"]+)"[^>]*href="([^"]+)"/gi)]
      .map(m => ({ title: m[1], url: m[2] }))
      .filter(p => p.title.length > 5 && !p.title.includes('Vitgold') && !p.title.includes('Categorias'));

    return titles;
  } catch(e) {
    return [];
  }
}

async function run() {
  const cats = [
    'https://vitgold.com.br/categorias/calcio',
    'https://vitgold.com.br/categorias/cranberry',
    'https://vitgold.com.br/categorias/magnesio',
    'https://vitgold.com.br/categorias/coenzima-q10'
  ];
  for (const cat of cats) {
    console.log('--- ' + cat + ' ---');
    const prods = await extractProductsFromCategory(cat);
    console.log(prods.slice(0, 3));
  }
}

run();
