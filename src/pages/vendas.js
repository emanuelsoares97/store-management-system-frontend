document.addEventListener('DOMContentLoaded', () => {
  const token = localStorage.getItem('token');
  const listaDiv = document.getElementById('venda-lista');
  const form = document.getElementById('form-venda');
  const msgDiv = document.getElementById('venda-criar-msg');
  let usersCache = [];
  let produtosCache = [];

  async function buscarUsers() {
    try {
      const response = await fetch('https://store-management-system-xemr.onrender.com/api/user/actives', {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (!response.ok) throw new Error('Erro ao buscar utilizadores');
      const data = await response.json();
      usersCache = data.data.users;
    } catch (err) {
      usersCache = [];
    }
  }

  async function buscarProdutos() {
    try {
      const response = await fetch('https://store-management-system-xemr.onrender.com/api/product/active', {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (!response.ok) throw new Error('Erro ao buscar produtos');
      const data = await response.json();
      produtosCache = data.data.products;
    } catch (err) {
      produtosCache = [];
    }
  }

  function renderSelectUser(selectedId = null) {
    let html = '<label>Utilizador: <select name="user_id" required>';
    html += '<option value="">Selecione o utilizador</option>';
    usersCache.forEach(user => {
      html += `<option value="${user.id}"${selectedId == user.id ? ' selected' : ''}>${user.name} (${user.email})</option>`;
    });
    html += '</select></label><br>';
    return html;
  }

  function renderSelectProduto(selectedId = null) {
    let html = '<label>Produto: <select name="product_id" required>';
    html += '<option value="">Selecione o produto</option>';
    produtosCache.forEach(prod => {
      html += `<option value="${prod.id}"${selectedId == prod.id ? ' selected' : ''}>${prod.name}</option>`;
    });
    html += '</select></label><br>';
    return html;
  }

  async function listarVendas() {
    try {
      const response = await fetch('https://store-management-system-xemr.onrender.com/api/sale/list', {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (!response.ok) throw new Error('Erro ao buscar vendas');
      const data = await response.json();
      const vendas = data.data.sales;
      if (!Array.isArray(vendas) || vendas.length === 0) {
        listaDiv.innerHTML = '<p>Nenhuma venda encontrada.</p>';
        return;
      }
      let html = '<table style="width:100%;border-collapse:collapse;margin-top:1rem;">';
      html += '<tr><th>ID</th><th>Utilizador</th><th>Produto</th><th>Quantidade</th><th>Cliente</th></tr>';
      vendas.forEach(venda => {
        const userNome = venda.user && venda.user.name ? venda.user.name : '-';
        const produtoNome = venda.product && venda.product.name ? venda.product.name : '-';
        const clienteNome = venda.customer && venda.customer.name ? venda.customer.name : (venda.customer || '-');
        html += `<tr>
          <td>${venda.id}</td>
          <td>${userNome}</td>
          <td>${produtoNome}</td>
          <td>${venda.quantity}</td>
          <td>${clienteNome}</td>
        </tr>`;
      });
      html += '</table>';
      listaDiv.innerHTML = html;
    } catch (err) {
      listaDiv.innerHTML = `<p style=\"color:red;\">Erro ao buscar vendas.</p>`;
    }
  }

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    msgDiv.textContent = '';
    const customer = form.customer.value.trim();
    const user_id = form.user_id.value;
    const product_id = form.product_id.value;
    const quantity = form.quantity.value;
    if (!user_id || !product_id || !quantity) {
      msgDiv.textContent = 'Utilizador, produto e quantidade são obrigatórios.';
      msgDiv.style.color = 'red';
      return;
    }
    try {
      const body = { user_id, product_id, quantity };
      if (customer) body.customer = { name: customer };
      const response = await fetch('https://store-management-system-xemr.onrender.com/api/sale/register', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(body)
      });
      const data = await response.json();
      if (!response.ok) {
        msgDiv.textContent = data.message || 'Erro ao registrar venda.';
        msgDiv.style.color = 'red';
        return;
      }
      msgDiv.textContent = data.message || 'Venda registrada com sucesso!';
      msgDiv.style.color = 'green';
      form.reset();
      await listarVendas();
    } catch (err) {
      msgDiv.textContent = 'Erro ao registrar venda.';
      msgDiv.style.color = 'red';
    }
  });

  (async () => {
    await buscarUsers();
    await buscarProdutos();
    // Renderiza selects
    const userDiv = form.querySelector('.user-select-div');
    userDiv.innerHTML = renderSelectUser();
    const produtoDiv = form.querySelector('.produto-select-div');
    produtoDiv.innerHTML = renderSelectProduto();
    listarVendas();
  })();
}); 