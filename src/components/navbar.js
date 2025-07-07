export function loadNavbar(elementId) {
    const html = `
      <nav>
        <a href="index.html">Início</a>
        <a href="products.html">Produtos</a>
        <a href="sales.html">Vendas</a>
      </nav>
    `
    document.getElementById(elementId).innerHTML = html
  }
  