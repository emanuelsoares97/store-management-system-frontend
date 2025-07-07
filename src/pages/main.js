document.addEventListener('DOMContentLoaded', () => {
  const crudContent = document.getElementById('crud-content');

  document.querySelectorAll('.crud-actions button').forEach(btn => {
    btn.addEventListener('click', async (e) => {
      const entity = btn.getAttribute('data-entity');
      const action = btn.getAttribute('data-action');
      crudContent.innerHTML = '';

      if (entity === 'produtos' && action === 'listar') {
        await listarProdutos();
      } else {
        crudContent.innerHTML = `<p style="text-align:center;">Funcionalidade <b>${action}</b> para <b>${entity}</b> em construção.</p>`;
      }
    });
  });

  async function listarProdutos() {
    const token = localStorage.getItem('token');
    try {
      const response = await fetch('https://store-management-system-xemr.onrender.com/api/produtos', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      if (!response.ok) throw new Error('Erro ao buscar produtos');
      const produtos = await response.json();
      if (!Array.isArray(produtos) || produtos.length === 0) {
        crudContent.innerHTML = '<p>Nenhum produto encontrado.</p>';
        return;
      }
      let html = '<h2>Lista de Produtos</h2><table style="width:100%;border-collapse:collapse;margin-top:1rem;">';
      html += '<tr><th>ID</th><th>Nome</th><th>Preço</th></tr>';
      produtos.forEach(prod => {
        html += `<tr><td>${prod.id}</td><td>${prod.nome}</td><td>${prod.preco}</td></tr>`;
      });
      html += '</table>';
      crudContent.innerHTML = html;
    } catch (err) {
      crudContent.innerHTML = `<p style="color:red;">Erro ao buscar produtos.</p>`;
    }
  }
}); 