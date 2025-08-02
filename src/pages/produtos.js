document.addEventListener('DOMContentLoaded', () => {
  const token = localStorage.getItem('token');
  const listaDiv = document.getElementById('produto-lista');
  const form = document.getElementById('form-produto');
  const msgDiv = document.getElementById('produto-criar-msg');
  let produtosCache = [];
  let categoriasCache = [];

  async function buscarCategorias() {
    try {
      const response = await fetch('https://store-management-system-xemr.onrender.com/api/category/list', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      if (!response.ok) throw new Error('Erro ao procurar categorias');
      const data = await response.json();
      categoriasCache = data.data.categories;
      console.log('Categorias carregadas:', categoriasCache);
    } catch (err) {
      categoriasCache = [];
    }
  }

  function renderSelectCategoria(selectedId = null) {
    let html = '<select name="category_id" required>';
    html += '<option value="">Selecione a categoria</option>';
    categoriasCache.forEach(cat => {
      console.log('Renderizando categoria:', cat);
      if (cat && cat.id && cat.name) {
        html += `<option value="${cat.id}"${selectedId == cat.id ? ' selected' : ''}>${cat.name}</option>`;
      }
    });
    html += '</select>';
    return html;
  }

  async function listarProdutos() {
    try {
      const response = await fetch('https://store-management-system-xemr.onrender.com/api/product/active', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      if (!response.ok) throw new Error('Erro ao procurar produtos');
      const data = await response.json();
      const produtos = data.data.products;
      produtosCache = produtos;
      if (!Array.isArray(produtos) || produtos.length === 0) {
        listaDiv.innerHTML = '<p>Nenhum produto encontrado.</p>';
        return;
      }
      let html = '<table style="width:100%;border-collapse:collapse;margin-top:1rem;">';
      html += '<tr><th>ID</th><th>Nome</th><th>Preço</th><th>Stock</th><th>Categoria</th><th>Ações</th></tr>';
      produtos.forEach(prod => {
        const categoriaNome = prod.category && prod.category.name ? prod.category.name : '-';
        html += `<tr>
          <td>${prod.id}</td>
          <td>${prod.name}</td>
          <td>${prod.price}</td>
          <td>${prod.stock_quantity}</td>
          <td>${categoriaNome}</td>
          <td>
            <button class="editar-btn" data-id="${prod.id}">Editar</button>
            <button class="eliminar-btn" data-id="${prod.id}">Eliminar</button>
          </td>
        </tr>`;
      });
      html += '</table>';
      listaDiv.innerHTML = html;
      addActionListeners();
    } catch (err) {
      listaDiv.innerHTML = `<p style=\"color:red;\">Erro ao procurar produtos.</p>`;
    }
  }

  function addActionListeners() {
    document.querySelectorAll('.editar-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const id = btn.getAttribute('data-id');
        exibirFormularioEdicao(id);
      });
    });
    document.querySelectorAll('.eliminar-btn').forEach(btn => {
      btn.addEventListener('click', async (e) => {
        const id = btn.getAttribute('data-id');
        if (confirm('Tem certeza que deseja eliminar este produto?')) {
          await eliminarProduto(id);
        }
      });
    });
  }

  function exibirFormularioEdicao(id) {
    const prod = produtosCache.find(p => p.id == id);
    if (!prod) return;
    listaDiv.innerHTML = `
      <h2>Editar Produto</h2>
      <form id="form-editar-produto">
        <label>Nome: <input name="name" value="${prod.name}" required /></label><br>
        <label>Preço: <input name="price" type="number" step="0.01" value="${prod.price}" required /></label><br>
        <label>Quantidade em Estoque: <input name="stock_quantity" type="number" value="${prod.stock_quantity}" required /></label><br>
        <label>Categoria: ${renderSelectCategoria(prod.category ? prod.category.id : null)}</label><br>
        <button type="submit">Salvar</button>
        <button type="button" id="cancelar-edicao">Cancelar</button>
      </form>
      <div id="editar-produto-msg"></div>
    `;
    document.getElementById('cancelar-edicao').onclick = listarProdutos;
    document.getElementById('form-editar-produto').onsubmit = async (e) => {
      e.preventDefault();
      const formEdit = e.target;
      const name = formEdit.name.value.trim();
      const price = formEdit.price.value.trim();
      const stock_quantity = formEdit.stock_quantity.value.trim();
      const category_id = formEdit.category_id.value;
      const msg = document.getElementById('editar-produto-msg');
      msg.textContent = '';
      if (!name || !price || !stock_quantity || !category_id) {
        msg.textContent = 'Todos os campos são obrigatórios.';
        msg.style.color = 'red';
        return;
      }
      try {
        const response = await fetch(`https://store-management-system-xemr.onrender.com/api/product/${id}/update`, {
          method: 'PATCH',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ name, price, stock_quantity, category_id })
        });
        const data = await response.json();
        if (!response.ok) {
          msg.textContent = data.message || 'Erro ao editar produto.';
          msg.style.color = 'red';
          return;
        }
        msg.textContent = data.message || 'Produto editado com sucesso!';
        msg.style.color = 'green';
        setTimeout(listarProdutos, 1000);
      } catch (err) {
        msg.textContent = 'Erro ao editar produto.';
        msg.style.color = 'red';
      }
    };
  }

  async function eliminarProduto(id) {
    try {
      const response = await fetch(`https://store-management-system-xemr.onrender.com/api/product/${id}/desactivate`, {
        method: 'PATCH',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      const data = await response.json();
      if (!response.ok) {
        alert(data.message || 'Erro ao eliminar produto.');
        return;
      }
      alert(data.message || 'Produto eliminado com sucesso!');
      await listarProdutos();
    } catch (err) {
      alert('Erro ao eliminar produto.');
    }
  }

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    msgDiv.textContent = '';
    const name = form.name.value.trim();
    const price = form.price.value.trim();
    const stock_quantity = form.stock_quantity.value.trim();
    const category_id = form.category_id.value;
    if (!name || !price || !stock_quantity || !category_id) {
      msgDiv.textContent = 'Todos os campos são obrigatórios.';
      msgDiv.style.color = 'red';
      return;
    }
    try {
      const response = await fetch('https://store-management-system-xemr.onrender.com/api/product/new', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ name, price, stock_quantity, category_id })
      });
      const data = await response.json();
      if (!response.ok) {
        msgDiv.textContent = data.message || 'Erro ao criar produto.';
        msgDiv.style.color = 'red';
        return;
      }
      msgDiv.textContent = data.message || 'Produto criado com sucesso!';
      msgDiv.style.color = 'green';
      form.reset();
      // Atualiza o select após criar
      renderCategoriaSelectCriacao();
      await listarProdutos();
    } catch (err) {
      msgDiv.textContent = 'Erro ao criar produto.';
      msgDiv.style.color = 'red';
    }
  });

  function renderCategoriaSelectCriacao() {
    // Remove qualquer input antigo de categoria
    const oldInput = form.querySelector('input[name="category_id"]');
    if (oldInput) oldInput.remove();
    // Remove select antigo se existir
    const oldSelectDiv = form.querySelector('.categoria-select-div');
    if (oldSelectDiv) oldSelectDiv.remove();
    // Cria e insere o select
    const btn = form.querySelector('button[type="submit"]');
    const div = document.createElement('div');
    div.className = 'categoria-select-div';
    div.innerHTML = `<label>Categoria: ${renderSelectCategoria()}</label><br>`;
    form.insertBefore(div, btn);
  }

  (async () => {
    await buscarCategorias();
    renderCategoriaSelectCriacao();
    listarProdutos();
  })();
}); 