document.addEventListener('DOMContentLoaded', () => {
  const token = localStorage.getItem('token');
  const listaDiv = document.getElementById('categoria-lista');
  const form = document.getElementById('form-categoria');
  const msgDiv = document.getElementById('categoria-criar-msg');

  async function listarCategorias() {
    try {
      const response = await fetch('https://store-management-system-xemr.onrender.com/api/category/list', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      if (!response.ok) throw new Error('Erro ao buscar categorias');
      const data = await response.json();
      const categorias = data.data.categories;
      console.log(data)
      if (!Array.isArray(categorias) || categorias.length === 0) {
        listaDiv.innerHTML = '<p>Nenhuma categoria encontrada.</p>';
        return;
      }
      let html = '<table style="width:100%;border-collapse:collapse;margin-top:1rem;">';
      html += '<tr><th>ID</th><th>Nome</th></tr>';
      categorias.forEach(cat => {
        html += `<tr><td>${cat.id}</td><td>${cat.name}</td></tr>`;
      });
      html += '</table>';
      listaDiv.innerHTML = html;
    } catch (err) {
      listaDiv.innerHTML = `<p style="color:red;">Erro ao buscar categorias.</p>`;
    }
  }

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    msgDiv.textContent = '';
    const name = form.nome.value.trim();
    if (!name) {
      msgDiv.textContent = 'O nome é obrigatório.';
      msgDiv.style.color = 'red';
      return;
    }
    try {
      const response = await fetch('https://store-management-system-xemr.onrender.com/api/category/new', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ name })
      });
      const data = await response.json();
      if (!response.ok) {
        msgDiv.textContent = data.message || 'Erro ao criar categoria.';
        msgDiv.style.color = 'red';
        return;
      }
      msgDiv.textContent = data.message || 'Categoria criada com sucesso!';
      msgDiv.style.color = 'green';
      form.reset();
      await listarCategorias();
    } catch (err) {
      msgDiv.textContent = 'Erro ao criar categoria.';
      msgDiv.style.color = 'red';
    }
  });

  listarCategorias();
}); 